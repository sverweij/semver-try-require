module.exports = {
  extensions: ["ts", "mts", "mjs"],
  reporter: "dot",
  spec: ["src/**/*.spec.ts", "src/**/*.spec.mts"],
  loader: "ts-node/esm",
};
