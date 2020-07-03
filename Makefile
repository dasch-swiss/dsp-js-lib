# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include vars.mk

define update-version
	# update version: first as dry-run.
	# The user has to confirm the update.
	# If everything is fine, it will commit and push the updated packages
	CURRENT_VERSION=`node -pe "require('./package.json').version"` && \
	npm version $(1) --preid=$(2) --git-tag-version=false --commit-hooks=false && \
	NEXT_VERSION=`node -pe "require('./package.json').version"` && \
	echo "This will update from $$CURRENT_VERSION to $$NEXT_VERSION ($(1)). Do you want to continue? [Y/n]" && \
	read ans && \
	([ $${ans:-N} != Y ] && npm version $$CURRENT_VERSION --git-tag-version=false --commit-hooks=false && exit 1) || \
	([ $${ans:-N} == Y ]) && \
	git add package.json && \
	git add package-lock.json && \
	git commit -m "release($(1)): $$NEXT_VERSION" && \
	git push
endef

#################################
# General targets
#################################

# Clones the knora-api git repository
.PHONY: clone-knora-stack
clone-knora-stack:
	@git clone --branch v13.0.0-rc.7 --single-branch --depth 1 https://github.com/dasch-swiss/knora-api.git $(CURRENT_DIR)/.tmp/knora-stack

#################################
# Integration test targets
#################################

.PHONY: npm-install
npm-install: ## runs 'npm install'
	@npm install
	@npm run peer-deps

.PHONY: knora-stack
knora-stack: ## runs the knora-stack
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-without-api
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack print-env-file
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-config
	sleep 15
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack init-db-test
	sleep 15
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-restart-api
	sleep 35
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-logs-api-no-follow

.PHONY: generate-test-data
generate-test-data: ## downloads generated test data from Knora-API
	@rm -rf $(CURRENT_DIR)/.tmp/typescript
	mkdir -p $(CURRENT_DIR)/.tmp/typescript
	sleep 240
	curl --fail --retry 5 --retry-connrefused -w http_code -o $(CURRENT_DIR)/.tmp/ts.zip http://localhost:3333/clientapitest
	sleep 120
	unzip $(CURRENT_DIR)/.tmp/ts.zip -d $(CURRENT_DIR)/.tmp/typescript

.PHONY: delete-test-data
delete-test-data: ## delete static test data before integration
	rm -rf test/data/api/admin/groups/*
	rm -rf test/data/api/admin/lists/*
	rm -rf test/data/api/admin/permissions/*
	rm -rf test/data/api/admin/projects/*
	rm -rf test/data/api/admin/users/*
	rm -rf test/data/api/v2/lists/*
	rm -rf test/data/api/v2/ontologies/*
	rm -rf test/data/api/v2/resources/*
	rm -rf test/data/api/v2/values/*

.PHONY: integrate-test-data
integrate-test-data: ## integrates generated test data
	npm run integrate-admin-test-data $(CURRENT_DIR)/.tmp/typescript/test-data
	npm run integrate-v2-test-data $(CURRENT_DIR)/.tmp/typescript/test-data
	npm run expand-jsonld-test-data

.PHONY: unit-tests
unit-tests: ## runs the unit tests
	npm test

.PHONY: e2e-tests
e2e-tests: ## runs the e2e tests
	sudo npm install yalc -g
	npm run prepare-dev-publication
	npm run yalc-publish
	cd test-framework && yalc remove --all && yalc add @dasch-swiss/dsp-js && npm install && npm run webdriver-update && npm run e2e && npm run build-app && docker build .

.PHONY: build
build: ## builds the lib
	npm run build

.PHONY: test-ci
test-ci: ## first starts the knora-stack and then runs the tests
	@$(MAKE) -f $(THIS_FILE) clean
	@$(MAKE) -f $(THIS_FILE) local-tmp
	@$(MAKE) -f $(THIS_FILE) clone-knora-stack
	@$(MAKE) -f $(THIS_FILE) knora-stack
	@$(MAKE) -f $(THIS_FILE) test

.PHONY: test
test: ## run tests
	@$(MAKE) -f $(THIS_FILE) delete-test-data
	@$(MAKE) -f $(THIS_FILE) generate-test-data
	@$(MAKE) -f $(THIS_FILE) integrate-test-data
	@$(MAKE) -f $(THIS_FILE) unit-tests
	@$(MAKE) -f $(THIS_FILE) build
	@$(MAKE) -f $(THIS_FILE) e2e-tests

.PHONY: local-tmp
local-tmp:
	@mkdir -p $(CURRENT_DIR)/.tmp

.PHONY: clean
clean:
	@rm -rf $(CURRENT_DIR)/.tmp

.PHONY: next-release-candidate
next-release-candidate: ## updates version to next release candidate e.g. from 3.0.0-rc.0 to 3.0.0-rc.1 or from 3.0.0 to 3.0.1-rc.0
	@$(call update-version,prerelease,rc)

.PHONY: release-patch
release-patch: ## updates version to next PATCH version e.g. from 3.0.0 to 3.0.1
	@$(call update-version,patch)

.PHONY: prerelease-patch
prerelease-patch: ## updates version to next PATCH as release-candidate e.g. from 3.0.1 to 3.0.2-rc.0
	@$(call update-version,prepatch,rc)

.PHONY: release-minor
release-minor: ## updates version to next MINOR version e.g. from 3.0.0 to 3.1.0
	@$(call update-version,minor)

.PHONY: prerelease-minor
prerelease-minor: ## updates version to next MINOR as release-candidate e.g. from 3.1.0 to 3.2.0-rc.0
	@$(call update-version,preminor,rc)

.PHONY: release-major
release-major: ## updates version to next MAJOR version e.g. from 3.0.0 to 4.0.0
	@$(call update-version,major)

.PHONY: prerelease-major
prerelease-major: ## updates version to next MAJOR as release candidate e.g. from 4.0.0 to 5.0.0-rc.0
	@$(call update-version,premajor,rc)

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
