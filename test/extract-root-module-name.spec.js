const extractRootModuleName = require("../src/extract-root-module-name");

describe("extract-root-module-name", () => {
  it("returns the local module name when passed that (same folder)", () => {
    expect(extractRootModuleName("./hoi-pippeloi")).toBe("./hoi-pippeloi");
    expect(extractRootModuleName("./hoi/pippeloi")).toBe("./hoi/pippeloi");
  });
  it("returns the local module name when passed that (one ore more folders up)", () => {
    expect(extractRootModuleName("../hoi-pippeloi")).toBe("../hoi-pippeloi");
    expect(extractRootModuleName("../hoi/pippeloi")).toBe("../hoi/pippeloi");
    expect(extractRootModuleName("../../hoi/pippeloi")).toBe(
      "../../hoi/pippeloi"
    );
  });
  it("returns . when passed current folder", () => {
    expect(extractRootModuleName(".")).toBe(".");
    expect(extractRootModuleName("./")).toBe("./");
  });
  it("returns .. when passed one folder up", () => {
    expect(extractRootModuleName("..")).toBe("..");
    expect(extractRootModuleName("../")).toBe("../");
  });
  it("returns the module name when passed an absolute module name", () => {
    expect(extractRootModuleName("/")).toBe("/");
    expect(extractRootModuleName("/Users/root/hello")).toBe(
      "/Users/root/hello"
    );
  });
  it("returns undefined when passed an empty string", () => {
    expect(extractRootModuleName("")).toBeUndefined();
  });
  it("returns the module name when there's no special shizzle", () => {
    expect(extractRootModuleName("yodash")).toBe("yodash");
  });
  it("returns the root module when passed a submodule", () => {
    expect(extractRootModuleName("yodash/ship-ahoi")).toBe("yodash");
  });
  it("returns the scope + module when passed scoped module", () => {
    expect(extractRootModuleName("@yodash/yodash")).toBe("@yodash/yodash");
  });
  it("returns the scope + module when passed submodule of a scoped module", () => {
    expect(extractRootModuleName("@yodash/yodash/alaaf")).toBe(
      "@yodash/yodash"
    );
  });
});
