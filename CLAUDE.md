# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DSP-JS-LIB is a TypeScript library providing a JavaScript/TypeScript interface for DSP-API (Digital Scholarly Publishing API). It's framework-agnostic and works with Angular, React, Vue.js, etc.

## Development Commands

### Essential Commands
- `npm run peer-deps` - Install RxJS peer dependency (required before building/testing)
- `npm test` - Run unit tests via Karma
- `npm run build` - Build the library to `build/` directory
- `npm run build-local` - Complete local development setup (install → peer-deps → prepare-dev → yalc-publish)

### Make Commands (Preferred)
- `make npm-install` - Install dependencies and peer dependencies
- `make unit-tests` - Run unit tests
- `make build` - Build the library
- `make e2e-tests` - Run full end-to-end testing pipeline
- `make help` - Show all available make targets

### Linting
- `npx tslint --project tsconfig.json` - Run TSLint (no npm script available)

## Project Architecture

### Directory Structure
```
src/
├── api/                  # Endpoint implementations
│   ├── admin/           # User, Group, Project, Permission, List management
│   ├── v2/              # Authentication, Ontology, Resource, Values, Search, List
│   ├── system/          # Health monitoring
│   └── endpoint.ts      # Base Endpoint class with HTTP methods
├── models/              # TypeScript data models (~218 files)
│   ├── admin/           # Admin models
│   ├── v2/              # V2 models (resources, ontologies, search, etc.)
│   └── system/          # System models
├── cache/               # Performance caching implementations
└── index.ts             # Public exports (268+ exports)
```

### Main Endpoints

#### Admin Endpoints
- `admin.usersEndpoint` - User management
- `admin.groupsEndpoint` - Group management
- `admin.projectsEndpoint` - Project management
- `admin.permissionsEndpoint` - Permission management
- `admin.listsEndpoint` - List management

#### V2 Endpoints
- `v2.auth` - Authentication (login, logout, checkCredentials)
- `v2.onto` - Ontology management
- `v2.res` - Resource operations
- `v2.values` - Value operations
- `v2.list` - List access
- `v2.search` - Search operations

#### System Endpoints
- `system.healthEndpoint` - Health monitoring

## Code Patterns & Conventions

### Model Creation Pattern (Read/Create/Update)
The library uses a 3-layer pattern for models:
- `Read*` classes - Deserialize API responses (use @JsonObject decorators)
- `Create*` classes - Serialize requests to create resources
- `Update*` classes - Handle resource updates

Example: `ReadFileValue` → `CreateFileValue` → `UpdateFileValue`

### JSON-LD & json2typescript
Models use json2typescript library with decorators:
```typescript
@JsonObject("ClassName")
export class ClassName {
    @JsonProperty(Constants.PropertyName, DataType, optional)
    propertyName: Type = defaultValue;
}
```

### Constants
All JSON-LD property IRIs are defined in `src/models/v2/Constants.ts`. When adding new properties, add the constant there first.

### TSLint Rules
- **Double quotes only** - No single quotes
- **Member ordering**: Static fields → Instance fields → Constructors → Static methods → Instance methods

## Testing

### Test Framework
- **Runner**: Karma with ChromeHeadless
- **Framework**: Jasmine
- **Mocking**: jasmine-ajax for HTTP requests

### Test File Locations
- Unit tests: Co-located as `*.spec.ts` next to source files
- Test data: `test/data/api/` directory

### CRITICAL: Test Data Management

**The test data in `test/data/api/v2/values/`, `test/data/api/v2/resources/`, etc. is auto-generated and will be DELETED during CI!**

The CI workflow runs:
1. `make prepare-test-data` which calls `delete-test-data`
2. This executes `rm -rf test/data/api/v2/values/*` (and similar for other directories)
3. Then regenerates test data from DSP-API release

**For custom test data (not from DSP-API), use:**
```
test/data/api/v2/manually-generated/
```

This directory is preserved during CI and is where custom test fixtures should be placed.

### JSON-LD Test Data Pattern
Test data comes in pairs:
- `filename.json` - Source file with `@context` (JSON-LD compact form)
- `filename-expanded.json` - Auto-generated expanded form

The expansion script (`scripts/expand-jsonld-test-data-files.js`) generates `-expanded.json` files from source files. For manually-generated test data, you may need to create both files or run the expansion locally.

### Test Pattern Example
```typescript
const jsonConvert = new JsonConvert(
    OperationMode.ENABLE,
    ValueCheckingMode.DISALLOW_NULL,
    false,
    PropertyMatchingRule.CASE_STRICT
);

// Load test data
const response = require("../../../../test/data/api/v2/manually-generated/my-test-data-expanded.json");

// Deserialize
const result = jsonConvert.deserialize(response, MyModelClass);
```

## Adding New Value Types

When adding a new value type (like StillImageVectorFileValue):

1. **Add constant** in `src/models/v2/Constants.ts`:
   ```typescript
   static MyNewValue = Constants.KnoraApiV2 + Constants.HashDelimiter + "MyNewValue";
   ```

2. **Create Read model** in `src/models/v2/resources/values/read/`:
   ```typescript
   @JsonObject("ReadMyNewValue")
   export class ReadMyNewValue extends ReadFileValue {
       // properties with @JsonProperty decorators
   }
   ```

3. **Create Create model** in `src/models/v2/resources/values/create/`:
   ```typescript
   @JsonObject("CreateMyNewValue")
   export class CreateMyNewValue extends CreateFileValue {
       constructor() {
           super(Constants.MyNewValue);
       }
   }
   ```

4. **Create Update model** in `src/models/v2/resources/values/update/`:
   ```typescript
   @JsonObject("UpdateMyNewValue")
   export class UpdateMyNewValue extends UpdateFileValue {
       constructor() {
           super(Constants.MyNewValue);
       }
   }
   ```

5. **Add conversion case** in `src/models/v2/resources/ResourcesConversionUtil.ts`:
   ```typescript
   case Constants.MyNewValue: {
       const myVal = handleSimpleValue(valueJsonld, ReadMyNewValue, jsonConvert);
       value = myVal.pipe(map((val: ReadMyNewValue) => {
           val.strval = val.fileUrl;
           return val;
       }));
       break;
   }
   ```

6. **Export** in `src/index.ts`

7. **Add tests** with test data in `test/data/api/v2/manually-generated/`

## Build Output
- Compiles to ES5 JavaScript with ES6 modules
- Generates declaration files (.d.ts) for TypeScript consumers
- Outputs to `build/` directory with source maps

## Local Development with Yalc
For testing changes in a consuming project without publishing:
```bash
npm run yalc-publish
# In consuming project:
yalc add @dasch-swiss/dsp-js
```

## Important Notes

- **RxJS Peer Dependency**: Always run `npm run peer-deps` after `npm install`
- **No VS Code Settings**: Project has no `.vscode/` directory
- **Strict TypeScript**: No implicit any, strict null checks enabled
- **Conventional Commits**: Required for PRs
- **No Ignored Tests**: CI fails on `fit()`, `fdescribe()` in test files