const { strictEqual } = require("node:assert");
const extractRootModuleName = require("./extract-root-module-name");

describe("extract-root-module-name", () => {
  it("returns the local module name when passed that (same folder)", () => {
    strictEqual(extractRootModuleName("./hoi-pippeloi"), "./hoi-pippeloi");
    strictEqual(extractRootModuleName("./hoi/pippeloi"), "./hoi/pippeloi");
  });
  it("returns the local module name when passed that (one ore more folders up)", () => {
    strictEqual(extractRootModuleName("../hoi-pippeloi"), "../hoi-pippeloi");
    strictEqual(extractRootModuleName("../hoi/pippeloi"), "../hoi/pippeloi");
    strictEqual(
      extractRootModuleName("../../hoi/pippeloi"),
      "../../hoi/pippeloi"
    );
  });
  it("returns . when passed current folder", () => {
    strictEqual(extractRootModuleName("."), ".");
    strictEqual(extractRootModuleName("./"), "./");
  });
  it("returns .. when passed one folder up", () => {
    strictEqual(extractRootModuleName(".."), "..");
    strictEqual(extractRootModuleName("../"), "../");
  });
  it("returns the module name when passed an absolute module name", () => {
    strictEqual(extractRootModuleName("/"), "/");
    strictEqual(
      extractRootModuleName("/Users/root/hello"),
      "/Users/root/hello"
    );
  });
  it("returns undefined when passed an empty string", () => {
    // eslint-disable-next-line no-undefined
    strictEqual(extractRootModuleName(""), undefined);
  });
  it("returns the module name when there's no special shizzle", () => {
    strictEqual(extractRootModuleName("yodash"), "yodash");
  });
  it("returns the root module when passed a submodule", () => {
    strictEqual(extractRootModuleName("yodash/ship-ahoi"), "yodash");
  });
  it("returns the scope + module when passed scoped module", () => {
    strictEqual(extractRootModuleName("@yodash/yodash"), "@yodash/yodash");
  });
  it("returns the scope + module when passed submodule of a scoped module", () => {
    strictEqual(
      extractRootModuleName("@yodash/yodash/alaaf"),
      "@yodash/yodash"
    );
  });
});
