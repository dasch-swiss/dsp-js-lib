# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: npm-install
npm-install: ## runs 'npm install'
	@npm install

.PHONY: knora-stack
knora-stack: local-tmp ## gets and runs the knora-stack
	@rm -rf $(CURRENT_DIR)/.tmp/knora-stack
	@git clone -b wip/add-js-lib-tests-to-ci --single-branch --depth 1 https://github.com/dasch-swiss/knora-api.git $(CURRENT_DIR)/.tmp/knora-stack
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-up
	sleep 15
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack init-db-test
	sleep 15
	$(MAKE) -C $(CURRENT_DIR)/.tmp/knora-stack stack-restart-api

.PHONY: generate-client-code
generate-client-code: local-tmp ## generates client code from Knora
	curl -o $(CURRENT_DIR)/.tmp/ts.zip http://localhost:3333/clientapi/typescript
	rm -rf $(CURRENT_DIR)/.tmp/ts
	mkdir $(CURRENT_DIR)/.tmp/ts/
	unzip $(CURRENT_DIR)/.tmp/ts.zip -d $(CURRENT_DIR)/.tmp/ts/

.PHONY: integrate-client-code
integrate-client-code: ## intregates generated client code
	npm run integrate-admin-code $(CURRENT_DIR)/.tmp/ts
	npm run integrate-v2-test-data $(CURRENT_DIR)/.tmp/ts
	npm run expand-jsonld-test-data

.PHONY: unit-tests
unit-tests: ## runs the unit tests
	npm test

.PHONY: test-integration
test-integration: ## first starts the knora-stack and then runs the tests
	@$(MAKE) -f $(THIS_FILE) knora-stack
	@$(MAKE) -f $(THIS_FILE) test

.PHONY: test
test: ## run tests
	@$(MAKE) -f $(THIS_FILE) generate-client-code
	@$(MAKE) -f $(THIS_FILE) integrate-client-code
	@$(MAKE) -f $(THIS_FILE) unit-tests

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
