# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: npm-install
npm-install: ## runs 'npm install'
	@npm install

.PHONY: knora-stack
knora-stack: ## gets and runs the knora-stack
	@git clone --single-branch --depth 1 https://github.com/dasch-swiss/knora-api.git $(PWD)/.tmp/knora-stack
	$(MAKE) -C $(PWD)/.tmp/knora-stack stack-up
	sleep 15
	$(MAKE) -C $(PWD)/.tmp/knora-stack init-db-test
	sleep 15
	$(MAKE) -C $(PWD)/.tmp/knora-stack stack-restart-api

.PHONY: generate-client-code
generate-client-code: ## generates client code from Knora
	curl -o $(PWD)/.tmp/ts.zip http://localhost:3333/clientapi/typescript
	mkdir -p $(PWD)/.tmp/ts
	unzip $(PWD)/.tmp/ts.zip -d $(PWD)/.tmp/ts/

.PHONY: integrate-client-code
integrate-client-code: ## intregates generated client code
	npm run integrate-admin-code /tmp/ts
	npm run integrate-v2-test-data /tmp/ts
	npm run expand-jsonld-test-data

.PHONY: unit-tests
unit-tests: ## runs the unit tests
	npm test

.PHONY: test-integration
test-integration: ## first starts the knora-stack and then runs the tests
	@$(MAKE) -f $(THIS_FILE) clean-local-tmp
	@$(MAKE) -f $(THIS_FILE) knora-stack
	@$(MAKE) -f $(THIS_FILE) generate-client-code
	@$(MAKE) -f $(THIS_FILE) integrate-client-code
	@$(MAKE) -f $(THIS_FILE) unit-tests

.PHONY: test
test:
	@$(MAKE) -f $(THIS_FILE) clean-local-tmp
	@$(MAKE) -f $(THIS_FILE) generate-client-code
	@$(MAKE) -f $(THIS_FILE) integrate-client-code
	@$(MAKE) -f $(THIS_FILE) unit-tests

.PHONY: clean-local-tmp
clean-local-tmp:
	@rm -rf $(PWD)/.tmp
	@mkdir $(PWD)/.tmp

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
