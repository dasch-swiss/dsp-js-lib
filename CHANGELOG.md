# Changelog

### [1.1.1](https://www.github.com/dasch-swiss/dsp-js-lib/compare/v1.1.0...v1.1.1) (2021-01-19)


### Bug Fixes

* metadata endpoint after DSP-API v.13.0.0 release (DSP-1232) ([#294](https://www.github.com/dasch-swiss/dsp-js-lib/issues/294)) ([07c908b](https://www.github.com/dasch-swiss/dsp-js-lib/commit/07c908bc7570b04d0c40afd8b6982b01b2adda16))

## [1.1.0](https://www.github.com/dasch-swiss/dsp-js-lib/compare/v1.0.1...v1.1.0) (2021-01-12)


### Maintenance

* **CI:** Bring back release-please-action ([#283](https://www.github.com/dasch-swiss/dsp-js-lib/issues/283)) ([4d1f07b](https://www.github.com/dasch-swiss/dsp-js-lib/commit/4d1f07bf687e8774dda59405cbda92927b198af1))
* Try to re-activate release pr ([#287](https://www.github.com/dasch-swiss/dsp-js-lib/issues/287)) ([3cf4b42](https://www.github.com/dasch-swiss/dsp-js-lib/commit/3cf4b42a18c3140808e17500ac08442460760ac3))
* update PR title guideline and templates (DSP-1189) ([#288](https://www.github.com/dasch-swiss/dsp-js-lib/issues/288)) ([d9ab6f6](https://www.github.com/dasch-swiss/dsp-js-lib/commit/d9ab6f6bee0b2156c62f3e1157f0a86eec057d79))


### Documentation

* **README:** improve explanation about endpoints (DSP-1192) ([#289](https://www.github.com/dasch-swiss/dsp-js-lib/issues/289)) ([876ff97](https://www.github.com/dasch-swiss/dsp-js-lib/commit/876ff97f6ffdc33773a9a3687b63458f80fc2460))


### Enhancements

* **endpoint:** Retry failed HTTP requests (DSP-170) ([#286](https://www.github.com/dasch-swiss/dsp-js-lib/issues/286)) ([c2fa0b3](https://www.github.com/dasch-swiss/dsp-js-lib/commit/c2fa0b3db9f0dcea8e721c240eb717ae62ae251e))
* Support Edit List Feature Toggle Endpoints (DSP-1180) ([#281](https://www.github.com/dasch-swiss/dsp-js-lib/issues/281)) ([7c09fc1](https://github.com/dasch-swiss/dsp-js-lib/commit/7c09fc1e522a7f4996fd4edeeb0b6fb50df6af14))

## v1.0.1 (17/12/2020)

#### Enhancements

- [#268](https://github.com/dasch-swiss/dsp-js-lib/pull/268) DSP-1126 Finish metadata endpoint in JS-LIB

---

## v1.0.0 (17/12/2020)

#### Breaking changes

- [#138](https://github.com/dasch-swiss/dsp-js-lib/pull/138) test (admin): adapt test for updateUserSystemAdminMembership
- [#259](https://github.com/dasch-swiss/dsp-js-lib/pull/259) DSP-1035 - MockResource Rename Methods
- [#191](https://github.com/dasch-swiss/dsp-js-lib/pull/191) Rename package

#### Enhancements

- [#171](https://github.com/dasch-swiss/dsp-js-lib/pull/171) Test Framework: Do Not Check for Exact Number of Search Results in E2E Tests
- [#151](https://github.com/dasch-swiss/dsp-js-lib/pull/151) feature (value): add uuid to write / update value response
- [#142](https://github.com/dasch-swiss/dsp-js-lib/pull/142) Util for permission handling
- [#265](https://github.com/dasch-swiss/dsp-js-lib/pull/265) DSP-442 Add Convenience Methods to Ontology Information
- [#258](https://github.com/dasch-swiss/dsp-js-lib/pull/258) DSP-1064 Create metadata endpoint in JS-LIB
- [#269](https://github.com/dasch-swiss/dsp-js-lib/pull/269) DSP-883 Support New Edit List Endpoints
- [#261](https://github.com/dasch-swiss/dsp-js-lib/pull/261) DSP-915 - Missing lastModificationDate property 
- [#246](https://github.com/dasch-swiss/dsp-js-lib/pull/246) DSP-743 Support the api route /health
- [#243](https://github.com/dasch-swiss/dsp-js-lib/pull/243) DSP-676 Add Support for Additional Methods in Admin Permission Endpoint 
- [#235](https://github.com/dasch-swiss/dsp-js-lib/pull/235) DSP-428 Create res properties
- [#232](https://github.com/dasch-swiss/dsp-js-lib/pull/232) Add missing declarations
- [#229](https://github.com/dasch-swiss/dsp-js-lib/pull/229) Mock minimal ontology
- [#227](https://github.com/dasch-swiss/dsp-js-lib/pull/227) Export BaseValue
- [#59](https://github.com/dasch-swiss/dsp-js-lib/pull/59) Add support for time value
- [#144](https://github.com/dasch-swiss/dsp-js-lib/pull/144) Add util for handling of cardinalities
- [#163](https://github.com/dasch-swiss/dsp-js-lib/pull/163) Determine link prop Iri form link value prop…
- [#169](https://github.com/dasch-swiss/dsp-js-lib/pull/169) Paging: Make ReadResource[] a ReadResourceSequence
- [#225](https://github.com/dasch-swiss/dsp-js-lib/pull/225) Export IPermissions, IFulltextSearchParams, ILabelSearchParams interfaces
- [#218](https://github.com/dasch-swiss/dsp-js-lib/pull/218) Create and delete resource class
- [#204](https://github.com/dasch-swiss/dsp-js-lib/pull/204) Get ontologies by project iri
- [#208](https://github.com/dasch-swiss/dsp-js-lib/pull/208) Create and delete ontology
- [#215](https://github.com/dasch-swiss/dsp-js-lib/pull/215) Mock resources
- [#209](https://github.com/dasch-swiss/dsp-js-lib/pull/209) fix: Replace DateDate by Date
- [#200](https://github.com/dasch-swiss/dsp-js-lib/pull/200) Readme and workflow fix
- [#187](https://github.com/dasch-swiss/dsp-js-lib/pull/187) Explain how to build a local dev version
- [#185](https://github.com/dasch-swiss/dsp-js-lib/pull/185) Return property defs by type

#### Bug Fixes

- [#175](https://github.com/dasch-swiss/dsp-js-lib/pull/175) Fix Import from RxJS
- [#160](https://github.com/dasch-swiss/dsp-js-lib/pull/160) Updated json2typescript to 1.4.1
- [#173](https://github.com/dasch-swiss/dsp-js-lib/pull/173) Add missing decorator
- [#168](https://github.com/dasch-swiss/dsp-js-lib/pull/168) Fix return type of link prop method
- [#166](https://github.com/dasch-swiss/dsp-js-lib/pull/166) fix (index.ts): export PropertyDefinition
- [#164](https://github.com/dasch-swiss/dsp-js-lib/pull/164) Fix import from index.ts
- [#158](https://github.com/dasch-swiss/dsp-js-lib/pull/158) fix (index.ts): add geoname values to public api
- [#150](https://github.com/dasch-swiss/dsp-js-lib/pull/150) fix (index.ts): add time values to public api
- [#266](https://github.com/dasch-swiss/dsp-js-lib/pull/266) DSP-1138 Add missing guiOrder to serialize IHasProperty
- [#250](https://github.com/dasch-swiss/dsp-js-lib/pull/250) Handle Empty Response when Requesting Ontologies for a Project
- [#244](https://github.com/dasch-swiss/dsp-js-lib/pull/244) Add missing exports for ResourcePropertyDefinitionWit…
- [#240](https://github.com/dasch-swiss/dsp-js-lib/pull/240) Revert change for tsconfig
- [#198](https://github.com/dasch-swiss/dsp-js-lib/pull/198) Bug fix in npm publishing process
- [#196](https://github.com/dasch-swiss/dsp-js-lib/pull/196) ontology IRI: ignore port if not running on localhost
- [#194](https://github.com/dasch-swiss/dsp-js-lib/pull/194) Fix bug ApiResonseError
- [#183](https://github.com/dasch-swiss/dsp-js-lib/pull/183) Ontology Cache: Ignore third-party properties consistently
- [#179](https://github.com/dasch-swiss/dsp-js-lib/pull/179) Add missing exports
- [#178](https://github.com/dasch-swiss/dsp-js-lib/pull/178) Export missing member
- [#176](https://github.com/dasch-swiss/dsp-js-lib/pull/176) Make RxJS a Peer Dep
- [#174](https://github.com/dasch-swiss/dsp-js-lib/pull/174) Add Missing Exports to Index.ts

#### Documentation

- [#264](https://github.com/dasch-swiss/dsp-js-lib/pull/264) Improve Docs
- [#252](https://github.com/dasch-swiss/dsp-js-lib/pull/252) DSP-920 Renaming default github branch to "main"
- [#249](https://github.com/dasch-swiss/dsp-js-lib/pull/249) Explain integration with knora-api
- [#248](https://github.com/dasch-swiss/dsp-js-lib/pull/248) Update CHANGELOG

#### Dependencies

- [#263](https://github.com/dasch-swiss/dsp-js-lib/pull/263) Chore(deps): Bump highlight.js from 9.18.1 to 9.18.5
- [#247](https://github.com/dasch-swiss/dsp-js-lib/pull/247) Update knora api
- [#237](https://github.com/dasch-swiss/dsp-js-lib/pull/237) DSP-671 Update dsp-api rc.16
- [#234](https://github.com/dasch-swiss/dsp-js-lib/pull/234) Knora): Use rc.15
- [#231](https://github.com/dasch-swiss/dsp-js-lib/pull/231) Update knora api version to rc.12
- [#222](https://github.com/dasch-swiss/dsp-js-lib/pull/222) Bump elliptic from 6.5.2 to 6.5.3
- [#219](https://github.com/dasch-swiss/dsp-js-lib/pull/219) Bump lodash from 4.17.15 to 4.17.19
- [#211](https://github.com/dasch-swiss/dsp-js-lib/pull/211) Use knora-api 13.0.0-rc.8
- [#172](https://github.com/dasch-swiss/dsp-js-lib/pull/172) Test Framework: Update from Angular 7 to Angular 9

#### Maintenance

- [#262](https://github.com/dasch-swiss/dsp-js-lib/pull/262) Update Knora to v13.0.0-rc.24
- [#255](https://github.com/dasch-swiss/dsp-js-lib/pull/255) DSP-978 generate changelog automatically
- [#245](https://github.com/dasch-swiss/dsp-js-lib/pull/245) Security update for node-forge
- [#242](https://github.com/dasch-swiss/dsp-js-lib/pull/242) DSP-618 Update release process
- [#239](https://github.com/dasch-swiss/dsp-js-lib/pull/239) Refactor Ontologies Endpoint
- [#241](https://github.com/dasch-swiss/dsp-js-lib/pull/241) DSP-702 Add template for PRs
- [#220](https://github.com/dasch-swiss/dsp-js-lib/pull/220) Bump dsp-api (DSP-512)
- [#223](https://github.com/dasch-swiss/dsp-js-lib/pull/223) Update process of release notes
- [#217](https://github.com/dasch-swiss/dsp-js-lib/pull/217) Update .grenrc

---

## v0.2.0 (29/01/2020)

#### Breaking changes

- Breaking change in format of knora-api:lastModificationDate [#47](https://github.com/dasch-swiss/knora-api-js-lib/issues/47)

#### Enhancements

- Missing label in ReadOntology [#139](https://github.com/dasch-swiss/knora-api-js-lib/issues/139)

### Compatibility

This release is compatible with knora-api [v12.0.0](https://github.com/dasch-swiss/knora-api/releases/tag/v12.0.0) 

---

## 0.1.0 (18/12/2019)

Basic implementation of admin and v2 endpoints.
