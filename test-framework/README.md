# Purpose of this project

This Angular application is supposed to test development builds of the `@knora/api` NPM package. 
Thus, it does not directly install the package through NPM.
Instead, it links a local version using the NPM package `yalc`.

# Setup application

## Install yalc

Install the NPM package `yalc` by running `npm install yalc -g`.

## Setup development of Knora API package

Check out https://github.com/dhlab-basel/knora-api-js-lib to the folder of your choice on your computer.

Then, open the root directory of the library in the terminal and run

```
npm install && npm run yalc-publish
```

This command will first install other NPM packages (dependencies), make a local build of the package and then publish the package to the local `yalc` store.

## Setup development of this test application

Open the root directory of this application the terminal and run:

```
yalc add @knora/api
npm install
```

# Run application

Now you may proceed using the Angular CLI. To see the result in the browser, run `ng serve` in the terminal.
