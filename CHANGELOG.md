# Changelog

## v1.0.0-rc.13 (12/10/2020)

## Enhancements

- [#243](https://github.com/dasch-swiss/dsp-js-lib/pull/243) DSP-676 Add Support for Additional Methods in Admin Permission Endpoint
- [#235](https://github.com/dasch-swiss/dsp-js-lib/pull/235) DSP-428 Create res properties

## Bug fixes

- [#244](https://github.com/dasch-swiss/dsp-js-lib/pull/244) Add missing exports for ResourcePropertyDefinitionWit…
- [#240](https://github.com/dasch-swiss/dsp-js-lib/pull/240) Revert change for tsconfig

## Maintenance

- [#245](https://github.com/dasch-swiss/dsp-js-lib/pull/245) Security update for node-forge
- [#242](https://github.com/dasch-swiss/dsp-js-lib/pull/242) DSP-618 Update release process
- [#239](https://github.com/dasch-swiss/dsp-js-lib/pull/239) Refactor Ontologies Endpoint
- [#241](https://github.com/dasch-swiss/dsp-js-lib/pull/241) DSP-702 Add template for PRs

#### Dependencies

- [#246](https://github.com/dasch-swiss/dsp-js-lib/pull/246) Knora): Use rc.17

---

## v1.0.0-rc.12 (22/09/2020)

#### Dependencies

- [#237](https://github.com/dasch-swiss/dsp-js-lib/pull/237) DSP-671 Update dsp-api rc.16

---

## v1.0.0-rc.11 (15/09/2020)

#### Dependencies

- [#234](https://github.com/dasch-swiss/dsp-js-lib/pull/234) Knora): Use rc.15

---

## v1.0.0-rc.10 (02/09/2020)

#### Enhancements

- [#232](https://github.com/dasch-swiss/dsp-js-lib/pull/232) Add missing declarations

---

## v1.0.0-rc.9 (18/08/2020)

#### Dependencies

- [#231](https://github.com/dasch-swiss/dsp-js-lib/pull/231) Update knora api version to rc.12

---

## v1.0.0-rc.8 (18/08/2020)

#### Enhancements

- [#229](https://github.com/dasch-swiss/dsp-js-lib/pull/229) Mock minimal ontology

---

## v1.0.0-rc.7 (12/08/2020)

#### Enhancements

- [#227](https://github.com/dasch-swiss/dsp-js-lib/pull/227) Export BaseValue

---

## v1.0.0-rc.6 (06/08/2020)

#### Enhancements

- [#225](https://github.com/dasch-swiss/dsp-js-lib/pull/225) Export IPermissions, IFulltextSearchParams, ILabelSearchParams interfaces
- [#218](https://github.com/dasch-swiss/dsp-js-lib/pull/218) Create and delete resource class

#### Dependencies

- [#222](https://github.com/dasch-swiss/dsp-js-lib/pull/222) Bump elliptic from 6.5.2 to 6.5.3
- [#219](https://github.com/dasch-swiss/dsp-js-lib/pull/219) Bump lodash from 4.17.15 to 4.17.19

#### Other

- [#220](https://github.com/dasch-swiss/dsp-js-lib/pull/220) Bump dsp-api (DSP-512)
- [#223](https://github.com/dasch-swiss/dsp-js-lib/pull/223) Update process of release notes
- [#217](https://github.com/dasch-swiss/dsp-js-lib/pull/217) Update .grenrc

---

## v1.0.0-rc.5 (14/07/2020)
#### Enhancements:

- [#204](https://github.com/dasch-swiss/dsp-js-lib/pull/204) Get ontologies by project iri
- [#208](https://github.com/dasch-swiss/dsp-js-lib/pull/208) Create and delete ontology
- [#215](https://github.com/dasch-swiss/dsp-js-lib/pull/215) Mock resources
- [#209](https://github.com/dasch-swiss/dsp-js-lib/pull/209) fix: Replace DateDate by Date

#### Dependencies:

- [#211](https://github.com/dasch-swiss/dsp-js-lib/pull/211) Use knora-api 13.0.0-rc.8
---

## v1.0.0-rc.4 (23/06/2020)
### Enhancements

- [#203](https://github.com/dasch-swiss/knora-api-js-lib/pull/203) Sync Test Data
- [#199](https://github.com/dasch-swiss/knora-api-js-lib/pull/199) Mock Ontology Data
- [#206](https://github.com/dasch-swiss/knora-api-js-lib/pull/206) Mock User Data
---

## v1.0.0-rc.3 (18/06/2020)

#### Enhancements:

- [#200](https://github.com/dasch-swiss/knora-api-js-lib/pull/200) Readme and workflow fix

---

## v1.0.0-rc.2 (12/06/2020)

#### Breaking changes:

- [#191](https://github.com/dasch-swiss/knora-api-js-lib/pull/191) Rename package

#### Bug Fixes:

- [#198](https://github.com/dasch-swiss/knora-api-js-lib/pull/198) Bug fix in npm publishing process
- [#196](https://github.com/dasch-swiss/knora-api-js-lib/pull/196) ontology IRI: ignore port if not running on localhost
- [#194](https://github.com/dasch-swiss/knora-api-js-lib/pull/194) Fix bug ApiResonseError

**Compatibility**

This release is compatible with knora-api v13.0.0-rc.4
---

## v1.0.0-rc.1 (26/05/2020)
### Features

- improve access to property definitions and add convenience methods ([#185](https://github.com/dasch-swiss/knora-api-js-lib/pull/185))

### Bug Fixes

- make handling of third-party property definitions consistent ([#183](https://github.com/dasch-swiss/knora-api-js-lib/pull/183))

### Breaking Changes

- `IResourceClassAndPropertyDefinitions` was renamed to `ResourceClassAndPropertyDefinitions` ([#185](https://github.com/dasch-swiss/knora-api-js-lib/pull/185)):
  adapt usage when accessing entity info on `ReadResource` or using `OntologyCache.getResourceClassDefinition`.

**Compatibility**

This release is compatible with knora-api v13.0.0-rc.3
---

## v1.0.0-rc.0 (07/05/2020)
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

### Compatibility

This release is compatible with knora-api v13.0.0-PR1.
---

## v0.2.0 (29/01/2020)
**Breaking Knora API Changes**

- Breaking change in format of knora-api:lastModificationDate [#47](https://github.com/dasch-swiss/knora-api-js-lib/issues/47)

**Enhancement**

- Missing label in ReadOntology [#139](https://github.com/dasch-swiss/knora-api-js-lib/issues/139)

**Compatibility**

This release is compatible with knora-api [v12.0.0](https://github.com/dasch-swiss/knora-api/releases/tag/v12.0.0) 
---

## 0.1.0 (18/12/2019)
Basic implementation of admin and v2 endpoints.