.PHONY: help

run-dev:
	npm run start:dev

run-build:
	npm run build

run:
	npm start

test:
	npm run test

test-watch:
	npm run test:watch


create:
	npx nest g $(arg1) $(arg2) --no-spec	


help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo "  create   - Generate NestJS module or service"
	@echo "  build    - Build the project"
	@echo "  start    - Start the project"
	@echo "  test     - Run tests"
	@echo "  clean    - Clean up generated files"
	@echo "  help     - Display this help message"