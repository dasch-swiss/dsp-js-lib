module.exports = function (config) {
    config.set({
        logLevel: config.LOG_ERROR,
        plugins: [
            "karma-jasmine",
            "karma-mocha-reporter",
            "karma-chrome-launcher",
            "karma-typescript",
            "karma-jasmine-ajax"
        ],
        frameworks: ["jasmine-ajax", "jasmine", "karma-typescript"],
        files: [
            "test/**/*.ts",
            "src/**/*.ts"
        ],
        exclude: [
            "./**/*.d.ts"
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"],
            "test/**/*.ts": ["karma-typescript"]
        },
        reporters: ["mocha", "karma-typescript"],
        browsers: ["ChromeHeadless"],
        singleRun: true,
        colors: true,
        karmaTypescriptConfig: {
            coverageOptions: {
                exclude: /test\/.*/
            },
            /*reports: {
                "text": "",
                "html": ""
            },*/
            compilerOptions: {
                "declaration": true,
                "emitDecoratorMetadata": true,
                "esModuleInterop": true,
                "experimentalDecorators": true,
                "lib": [
                    "es6",
                    "dom"
                ],
                "module": "commonjs",
                "removeComments": false,
                "target": "es5",
                "resolveJsonModule": true,
                "sourceMap": true,
                "strictNullChecks": true,
                "noImplicitAny": true
            }
        },
        browserConsoleLogOptions: {
            terminal: true,
            level: ""
        }
    })
};
