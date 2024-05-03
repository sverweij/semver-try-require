/* eslint-disable no-magic-numbers */
module.exports = {
  root: true,
  ignorePatterns: ["coverage", "dist", "node_modules"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: ["moving-meadow", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ["src/**/*.ts"],
      rules: {
        "node/file-extension-in-import": "off",
      },
    },
    {
      files: ["src/**/*.test.ts", "src/**/*.test.mts"],
      rules: {
        "node/no-extraneous-import": "off",
      },
    },
    {
      files: ["src/**/*.test.ts"],
      rules: {
        "node/file-extension-in-import": "off",
      },
    },
  ],

  rules: {
    complexity: ["warn", 6],
    "@typescript-eslint/no-var-requires": "off",
    "import/no-dynamic-require": "off",
    "import/no-unresolved": "off",
    "node/global-require": "off",
    "node/no-missing-import": "off",
    "node/no-missing-require": "off",
    "security/detect-non-literal-require": "off",
    // still needs to support yarn 1 pnp, which borks on node protocol
    "unicorn/prefer-node-protocol": "off",
  },
};
