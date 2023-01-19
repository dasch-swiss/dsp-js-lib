# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include vars.mk

# Function to get github release asset id and to download client-test-data.zip from knora-api release
define download-test-data
    ASSET_ID=`curl -H "Accept: application/vnd.github.v3.raw" -s https://api.github.com/repos/$(1)/releases \
    | jq ". | map(select(.tag_name == \"$(2)\"))[0].assets | map(select(.name == \"client-test-data.zip\"))[0].id"` && \
    echo $$ASSET_ID && \
    curl -L -J -O -H "Accept: application/octet-stream" https://api.github.com/repos/$(1)/releases/assets/$$ASSET_ID
endef

#################################
# General targets
#################################

# Clones the knora-api git repository
.PHONY: clone-knora-stack
clone-knora-stack:
	@git clone --branch $(API_VERSION) --single-branch --depth 1 https://github.com/dasch-swiss/knora-api.git $(CURRENT_DIR)/.tmp/knora-stack

#################################
# Integration test targets
#################################

.PHONY: npm-install
npm-install: ## runs 'npm install'
	@npm install
	@npm run peer-deps

.PHONY: knora-stack
knora-stack: ## runs the knora-stack
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack init-db-test
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-without-app
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-logs-api-no-follow

.PHONY: get-test-data-from-release 
get-test-data-from-release: ## get the test-data from assets in github release corresponding to the DSP-API version in vars.mk
	@rm -rf client-test-data.zip
	@$(call download-test-data,$(API_REPO),$(API_VERSION))

.PHONY: generate-test-data
generate-test-data: ## generate test data from Knora-API
	@rm -rf $(CURRENT_DIR)/.tmp/typescript
	mkdir -p $(CURRENT_DIR)/.tmp/typescript
	unzip $(CURRENT_DIR)/client-test-data.zip -d $(CURRENT_DIR)/.tmp/typescript

.PHONY: delete-test-data
delete-test-data: ## delete static test data before integration
	rm -rf test/data/api/system/health/*
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
	npm run integrate-system-test-data $(CURRENT_DIR)/.tmp/typescript/test-data
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
	cd test-framework && yalc add @dasch-swiss/dsp-js && npm install && npm run webdriver-update && npm run e2e && npm run build-app && docker build .

.PHONY: build
build: ## builds the lib
	npm run build

.PHONY: prepare-test-ci
prepare-test-ci: ## clean up test environment and starts the knora-stack
	@$(MAKE) -f $(THIS_FILE) clean
	@$(MAKE) -f $(THIS_FILE) local-tmp
	@$(MAKE) -f $(THIS_FILE) clone-knora-stack
	@$(MAKE) -f $(THIS_FILE) knora-stack

.PHONY: prepare-test-data
prepare-test-data: ## prepares test data from knora-api
	@$(MAKE) -f $(THIS_FILE) delete-test-data
	@$(MAKE) -f $(THIS_FILE) generate-test-data
	@$(MAKE) -f $(THIS_FILE) integrate-test-data

.PHONY: test
test: npm-install prepare-test-ci prepare-test-data unit-tests build e2e-tests ## runs all preparations and tests

.PHONY: local-tmp
local-tmp:
	@mkdir -p $(CURRENT_DIR)/.tmp

.PHONY: clean
clean:
	@rm -rf $(CURRENT_DIR)/.tmp

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
