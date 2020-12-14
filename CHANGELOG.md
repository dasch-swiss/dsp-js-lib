# Changelog

## v1.0.0 (14/12/2020)

#### Breaking changes

- [#259](https://github.com/dasch-swiss/dsp-js-lib/pull/259) DSP-1035 - MockResource Rename Methods
- [#214](https://github.com/dasch-swiss/dsp-ui-lib/pull/214) DSP-759 Check if a Given Date Can Be Edited / Rename ValueTypeService to ValueService
- [#191](https://github.com/dasch-swiss/dsp-js-lib/pull/191) Rename package
- [#138](https://github.com/dasch-swiss/dsp-js-lib/pull/138) test (admin): adapt test for updateUserSystemAdminMembership

#### Enhancements

- [#265](https://github.com/dasch-swiss/dsp-js-lib/pull/265) DSP-442 Add Convenience Methods to Ontology Information
- [#258](https://github.com/dasch-swiss/dsp-js-lib/pull/258) DSP-1064 Create metadata endpoint in JS-LIB
- [#261](https://github.com/dasch-swiss/dsp-js-lib/pull/261) DSP-915 - Missing lastModificationDate property 
- [#246](https://github.com/dasch-swiss/dsp-js-lib/pull/246) DSP-743 Support the api route /health
- [#243](https://github.com/dasch-swiss/dsp-js-lib/pull/243) DSP-676 Add Support for Additional Methods in Admin Permission Endpoint 
- [#235](https://github.com/dasch-swiss/dsp-js-lib/pull/235) DSP-428 Create res properties
- [#232](https://github.com/dasch-swiss/dsp-js-lib/pull/232) Add missing declarations
- [#229](https://github.com/dasch-swiss/dsp-js-lib/pull/229) Mock minimal ontology
- [#227](https://github.com/dasch-swiss/dsp-js-lib/pull/227) Export BaseValue
- [#225](https://github.com/dasch-swiss/dsp-js-lib/pull/225) Export IPermissions, IFulltextSearchParams, ILabelSearchParams interfaces
- [#218](https://github.com/dasch-swiss/dsp-js-lib/pull/218) Create and delete resource class
- [#204](https://github.com/dasch-swiss/dsp-js-lib/pull/204) Get ontologies by project iri
- [#208](https://github.com/dasch-swiss/dsp-js-lib/pull/208) Create and delete ontology
- [#215](https://github.com/dasch-swiss/dsp-js-lib/pull/215) Mock resources
- [#209](https://github.com/dasch-swiss/dsp-js-lib/pull/209) fix: Replace DateDate by Date
- [#200](https://github.com/dasch-swiss/dsp-js-lib/pull/200) Readme and workflow fix
- [#187](https://github.com/dasch-swiss/dsp-js-lib/pull/187) Explain how to build a local dev version
- [#185](https://github.com/dasch-swiss/dsp-js-lib/pull/185) Return property defs by type
- [#171](https://github.com/dasch-swiss/dsp-js-lib/pull/171) Test Framework: Do Not Check for Exact Number of Search Results in E2E Tests
- [#151](https://github.com/dasch-swiss/dsp-js-lib/pull/151) feature (value): add uuid to write / update value response
- [#142](https://github.com/dasch-swiss/dsp-js-lib/pull/142) Util for permission handling
- [#59](https://github.com/dasch-swiss/dsp-js-lib/pull/59) Add support for time value
- [#144](https://github.com/dasch-swiss/dsp-js-lib/pull/144) Add util for handling of cardinalities
- [#163](https://github.com/dasch-swiss/dsp-js-lib/pull/163) Determine link prop Iri form link value prop…
- [#169](https://github.com/dasch-swiss/dsp-js-lib/pull/169) Paging: Make ReadResource[] a ReadResourceSequence
- [#244](https://github.com/dasch-swiss/dsp-js-lib/pull/244) Add missing exports for ResourcePropertyDefinitionWit…
- [#240](https://github.com/dasch-swiss/dsp-js-lib/pull/240) Revert change for tsconfig

#### Bug Fixes

- [#266](https://github.com/dasch-swiss/dsp-js-lib/pull/266) DSP-1138 Add missing guiOrder to serialize IHasProperty
- [#250](https://github.com/dasch-swiss/dsp-js-lib/pull/250) Handle Empty Response when Requesting Ontologies for a Project
- [#198](https://github.com/dasch-swiss/dsp-js-lib/pull/198) Bug fix in npm publishing process
- [#196](https://github.com/dasch-swiss/dsp-js-lib/pull/196) ontology IRI: ignore port if not running on localhost
- [#194](https://github.com/dasch-swiss/dsp-js-lib/pull/194) Fix bug ApiResonseError
- [#183](https://github.com/dasch-swiss/dsp-js-lib/pull/183) Ontology Cache: Ignore third-party properties consistently
- [#175](https://github.com/dasch-swiss/dsp-js-lib/pull/175) Fix Import from RxJS
- [#160](https://github.com/dasch-swiss/dsp-js-lib/pull/160) Updated json2typescript to 1.4.1
- [#173](https://github.com/dasch-swiss/dsp-js-lib/pull/173) Add missing decorator
- [#168](https://github.com/dasch-swiss/dsp-js-lib/pull/168) Fix return type of link prop method
- [#166](https://github.com/dasch-swiss/dsp-js-lib/pull/166) fix (index.ts): export PropertyDefinition
- [#164](https://github.com/dasch-swiss/dsp-js-lib/pull/164) Fix import from index.ts
- [#158](https://github.com/dasch-swiss/dsp-js-lib/pull/158) fix (index.ts): add geoname values to public api
- [#150](https://github.com/dasch-swiss/dsp-js-lib/pull/150) fix (index.ts): add time values to public api
- [#179](https://github.com/dasch-swiss/dsp-js-lib/pull/179) Add missing exports
- [#178](https://github.com/dasch-swiss/dsp-js-lib/pull/178) Export missing member
- [#176](https://github.com/dasch-swiss/dsp-js-lib/pull/176) Make RxJS a Peer Dep
- [#174](https://github.com/dasch-swiss/dsp-js-lib/pull/174) Add Missing Exports to Index.ts

#### Dependencies

- [#262](https://github.com/dasch-swiss/dsp-js-lib/pull/262) Update Knora to v13.0.0-rc.24
- [#263](https://github.com/dasch-swiss/dsp-js-lib/pull/263) Chore(deps): Bump highlight.js from 9.18.1 to 9.18.5
- [#222](https://github.com/dasch-swiss/dsp-js-lib/pull/222) Bump elliptic from 6.5.2 to 6.5.3
- [#219](https://github.com/dasch-swiss/dsp-js-lib/pull/219) Bump lodash from 4.17.15 to 4.17.19
- [#172](https://github.com/dasch-swiss/dsp-js-lib/pull/172) Test Framework: Update from Angular 7 to Angular 9

#### Documentation

- [#264](https://github.com/dasch-swiss/dsp-js-lib/pull/264) Improve Docs
- [#252](https://github.com/dasch-swiss/dsp-js-lib/pull/252) DSP-920 Renaming default github branch to "main"
- [#249](https://github.com/dasch-swiss/dsp-js-lib/pull/249) Explain integration with knora-api

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