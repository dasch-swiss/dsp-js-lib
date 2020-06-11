# 1.0.0-rc.2

#### Breaking changes:

- [#191](https://github.com/dasch-swiss/knora-api-js-lib/pull/191) Rename package

#### Bug Fixes:

- [#196](https://github.com/dasch-swiss/knora-api-js-lib/pull/196) ontology IRI: ignore port if not running on localhost
- [#194](https://github.com/dasch-swiss/knora-api-js-lib/pull/194) Fix bug ApiResonseError

**Compatibility**

This release is compatible with knora-api v13.0.0-rc.3

# 1.0.0-rc.1

### Features
- improve access to property definitions and add convenience methods ([#185](https://github.com/dasch-swiss/knora-api-js-lib/pull/185))

### Bug Fixes
- make handling of third-party property definitions consistent ([#183](https://github.com/dasch-swiss/knora-api-js-lib/pull/183))

### Breaking Changes
- `IResourceClassAndPropertyDefinitions` was renamed to `ResourceClassAndPropertyDefinitions` ([#185](https://github.com/dasch-swiss/knora-api-js-lib/pull/185)):
  adapt usage when accessing entity info on `ReadResource` or using `OntologyCache.getResourceClassDefinition`.

# 1.0.0-rc.0

### Features
- add support for time value ([#59](https://github.com/dasch-swiss/knora-api-js-lib/pull/59))
- add util for handling of cardinalities ([#144](https://github.com/dasch-swiss/knora-api-js-lib/pull/144))
- add util for handling of permissions ([#142](https://github.com/dasch-swiss/knora-api-js-lib/pull/142))
- add uuid to update responses ([#151](https://github.com/dasch-swiss/knora-api-js-lib/pull/151))
- add util to determine link prop from link value prop ([#163](https://github.com/dasch-swiss/knora-api-js-lib/pull/163))

### Bug Fixes
- add time value to public API ([#150](https://github.com/dasch-swiss/knora-api-js-lib/pull/150))
- add geoname value to public API ([#158](https://github.com/dasch-swiss/knora-api-js-lib/pull/158))
- add property definition to public API ([#166](https://github.com/dasch-swiss/knora-api-js-lib/pull/166))
- add missing decorator for json2typescript ([#173](https://github.com/dasch-swiss/knora-api-js-lib/pull/173))
- update to json2typescript 1.4.1 (previous version of json2typescript had a bug) ([#160](https://github.com/dasch-swiss/knora-api-js-lib/pull/160))
- fix wrong internal import path to RxJS ([#175](https://github.com/dasch-swiss/knora-api-js-lib/pull/175))
- add missing classes to public API ([#174](https://github.com/dasch-swiss/knora-api-js-lib/pull/174))
- make RxJS a peer dependency ([#176](https://github.com/dasch-swiss/knora-api-js-lib/pull/176))
- add delete resource response to public API ([#178](https://github.com/dasch-swiss/knora-api-js-lib/pull/178))
- use consistent naming convention for v2 and admin endpoints ([#179](https://github.com/dasch-swiss/knora-api-js-lib/pull/179))

### Breaking Changes
- return multiple resources as `ReadResourceSequence` (instead of ReadResource[]) with a flag indicating whether there could be more results ([#169](https://github.com/dasch-swiss/knora-api-js-lib/pull/169))
