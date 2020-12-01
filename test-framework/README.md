# Purpose of the Test Environment

This Angular application allows testing local builds of the `@dasch-swiss/dsp-js` npm package.
Instead, it links a local version using the NPM package `yalc`.

## Using the Test Environment

### Prerequisites

If not installed yet, install `yalc` globally by running `npm install yalc -g`.

### Build and Integrate DSP-JS-LIB

From the project root, build and publish DSP-JS-LIB locally using `yalc`.
Follow the instructions given in section "Build and Publish a Local Version" of `contribution.md`.

Then switch to the directory `./test-framework`. 
From this directory, run the follwoing scripts:
- `npm run yalc-add`
- `npm install`

### Run Test Angular Application

Once you have included the local build with `yalc`,
you can run the test Angular application with `npm run ng s`.

Note that this requires a running DSP-API instance.
Use the DSP-API release which is specified in `vars.mk`. 

### Run E2E Tests

To run the E2E tests, you need to build and integrate a local version of DSP-JS-LIB,
see section "Build and Integrate DSP-JS-LIB". 
If the Angular test app is running, stop it before running the E2E test.

Make sure that DSP-API-JS's database is in its initial state. Reload the data if necessary.

Then, execute the following steps:
- `npm run webdriver-update` to install the required version of Chrome webdriver
- `npm e2e`

Alternatively, run `npm run e2e-local` which combines the steps mentioned above.
