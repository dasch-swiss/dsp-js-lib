# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Core Structure
DSP-JS-LIB is a TypeScript library providing a JavaScript/TypeScript interface for DSP-API (Digital Scholarly Publishing API). It uses endpoint-based architecture mirroring DSP-API's REST endpoints.

### Main Endpoints

#### Admin Endpoints
- **admin.usersEndpoint** - User management (getUsers, getUserByIri/Email/Username, createUser, updateUser*, addUserToGroup/Project*, deleteUser)
- **admin.groupsEndpoint** - Group management (getGroups, createGroup, getGroupByIri, updateGroup*, deleteGroup, getGroupMembers)
- **admin.projectsEndpoint** - Project management (getProjects, createProject, getProject*, updateProject, deleteProject, getProjectMembers/AdminMembers*)
- **admin.permissionsEndpoint** - Permission management (getProjectPermissions, get/create/updateAdministrativePermission*, get/create/updateDefaultObjectAccessPermission*, deletePermission)
- **admin.listsEndpoint** - List management (getLists, getListsInProject, createList, updateListInfo, createChildNode, repositionChildNode, deleteListNode)

#### V2 Endpoints  
- **v2.auth** - Authentication (login, logout, checkCredentials)
- **v2.onto** - Ontology management (getOntology/OntologiesMetadata, create/update/deleteOntology, create/update/deleteResourceClass*, create/update/deleteResourceProperty*, cardinality management)
- **v2.res** - Resource operations (getResource/Resources, createResource, updateResourceMetadata, deleteResource, eraseResource)
- **v2.values** - Value operations (getValue, createValue, updateValue, deleteValue)
- **v2.list** - List access (getNode, getList)
- **v2.search** - Search operations (doFulltextSearch, doExtendedSearch, doSearchByLabel, doSearchIncomingLinks, doSearchStillImageRepresentations, all with count query variants)

#### System Endpoints
- **system.healthEndpoint** - Health monitoring (getHealthStatus)
- **system.versionEndpoint** - Version info (getVersion)

### Key Directories
- `src/api/` - API endpoint implementations organized by endpoint type
- `src/models/` - TypeScript models for all API responses
- `src/cache/` - Caching implementations for performance
- `test/` - Mock data and testing utilities
- `test-framework/` - Angular test application for integration testing

### Technology Stack
- **TypeScript 4.8.3** - Primary language with strict null checks
- **RxJS 6.x** - Reactive programming (peer dependency)
- **JSON-LD** - Semantic web data handling
- **Karma + Jasmine** - Testing framework with ChromeHeadless

### Development Dependencies
- **RxJS peer dependency**: Install with `npm install rxjs@6.x --save` or use `npm run peer-deps`
- **Test data**: Downloaded from DSP-API v30.18.4 via `make prepare-test-data`

### Code Quality
- **TSLint** configuration with custom rules (double quotes, member ordering)
- **TypeScript** with strict null checks and no implicit any
- **Test coverage** via karma-typescript
- **Conventional commits** required for PRs

### Build Output
- Compiles to ES5 JavaScript with ES6 modules
- Generates declaration files for TypeScript consumers
- Outputs to `build/` directory with source maps

### Local Development
1. Run `make npm-install` to setup dependencies
2. Use `npm run yalc-publish` for local library publishing
3. Test changes with `make unit-tests`
4. Build with `make build`

### Testing
- Unit tests use Karma with real API response mocking
- Test data is downloaded from DSP-API releases
- Integration tests available in `test-framework/` Angular app
- No ignored tests allowed (CI fails on `fit`, `fdescribe`, etc.)

### Settings and Configuration
- **Claude settings** - `.claude/settings.json` (default permissions) and `.claude/settings.local.json` (allows Bash find commands)
- **No VS Code settings** - No `.vscode/` directory in project root
- **TSLint configuration** - Uses `tslint.json` with custom rules (double quotes, member ordering)
- **TypeScript configuration** - `tsconfig.json` with strict null checks and ES5 target
- **Karma configuration** - `karma.conf.js` for test execution with ChromeHeadless