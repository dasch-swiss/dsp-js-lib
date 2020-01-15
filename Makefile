# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: generate-client-code
generate-client-code: ## generates client code from Knora
	curl -o /tmp/ts.zip http://localhost:3333/clientapi/typescript
	mkdir -p /tmp/ts
	tar -C /tmp/ts -xf /tmp/ts.zip

.PHONY: integrate-client-code
integrate-client-code: ## intregates generated client code
	npm run integrate-admin-code /tmp/ts
	npm run integrate-v2-test-data /tmp/ts
	npm run expand-jsonld-test-data

.PHONY: unit-tests
unit-tests: ## runs the unit tests
	npm test

.PHONY: test
test: clean
	@$(MAKE) -f $(THIS_FILE) generate-client-code
	@$(MAKE) -f $(THIS_FILE) integrate-client-code
	@$(MAKE) -f $(THIS_FILE) unit-tests

.PHONY: clean
clean: ## cleans tmp files
	@rm -rf /tmp/ts

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
