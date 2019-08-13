module.exports = function (config) {
    config.set({
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
            reports: {
                "text": "",
                "html": "coverage"
            },
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
                "resolveJsonModule": true,
                "target": "es5",
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
