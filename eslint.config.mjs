import {defineConfig} from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([{
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },
        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": ["warn", {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],
        "arrow-parens": ["error", "as-needed"],
        "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
        "@typescript-eslint/member-ordering": ["error", {
            default: [
                "public-static-field",
                "protected-static-field",
                "private-static-field",
                "public-instance-field",
                "protected-instance-field",
                "private-instance-field",
                "public-constructor",
                "protected-constructor",
                "private-constructor",
                "public-static-method",
                "protected-static-method",
                "private-static-method",
                "public-instance-method",
                "protected-instance-method",
                "private-instance-method"
            ]
        }],
        "no-console": "off",
        "no-trailing-spaces": "off",
        "curly": ["error", "multi-or-nest"],
        "sort-keys": "off",
        "object-shorthand": "off",
        "quotes": ["error", "double"],
        "comma-dangle": "off",
        "max-len": "off",
        "camelcase": "off",
        "no-empty": "off",
        "@typescript-eslint/no-namespace": "off",
        "dot-notation": "off"
    },
}]);