/* eslint-disable no-magic-numbers */
module.exports = {
  root: true,
  extends: ["moving-meadow"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ["src/**/*.spec.js"],
      env: {
        mocha: true,
      },
    },
    {
      files: ["src/__mocks__/**"],
      rules: {
        "unicorn/no-empty-file": "off",
      },
    },
  ],
  rules: {
    complexity: ["warn", 6],
    "security/detect-non-literal-require": "off",
    "node/global-require": "off",
    "import/no-dynamic-require": "off",
  },
};
