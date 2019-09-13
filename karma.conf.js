module.exports = function(config) {
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
            bundlerOptions: {
                acornOptions: {
                    ecmaVersion: 2017
                },
                transforms: [
                    require("karma-typescript-es6-transform")({
                        presets: [
                            ["env", {
                                targets: {
                                    browsers: ["last 2 Chrome versions"]
                                }
                            }]
                        ]
                    })
                ]
            },
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
                    "dom",
                    "es6"
                ],
                "module": "commonjs",
                "noImplicitAny": true,
                "removeComments": false,
                "resolveJsonModule": true,
                "sourceMap": true,
                "strictNullChecks": true,
                "target": "es5"
            }
        },
        browserConsoleLogOptions: {
            level: "",
            terminal: true,
        }
    })
};
