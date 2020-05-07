# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include vars.mk

#################################
# General targets
#################################

# Clones the knora-api git repository
.PHONY: clone-knora-stack
clone-knora-stack:
	@git clone --single-branch --depth 1 https://github.com/dasch-swiss/knora-api.git $(CURRENT_DIR)/.tmp/knora-stack

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
	sleep 90
	curl -o $(CURRENT_DIR)/.tmp/ts.zip http://localhost:3333/clientapitest
	sleep 45
	unzip $(CURRENT_DIR)/.tmp/ts.zip -d $(CURRENT_DIR)/.tmp/typescript

.PHONY: integrate-test-data
integrate-test-data: ## intregates generated test data
	rm -rf test/data/api/admin/*
	rm -rf test/data/api/v2/lists/*
	rm -rf test/data/api/v2/ontologies/*
	rm -rf test/data/api/v2/resources/*
	rm -rf test/data/api/v2/values/*
	npm run integrate-admin-test-data $(CURRENT_DIR)/.tmp/typescript/test-data
	npm run integrate-v2-test-data $(CURRENT_DIR)/.tmp/typescript/test-data
	npm run expand-jsonld-test-data

.PHONY: unit-tests
unit-tests: ## runs the unit tests
	npm test

.PHONY: e2e-tests
e2e-tests: ## runs the e2e tests
	sudo npm install yalc -g
	npm run yalc-publish
	cd test-framework && yalc remove --all && yalc add @knora/api && npm install && npm run webdriver-update && npm run e2e && npm run build-app && docker build .

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

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
