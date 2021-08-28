/* eslint-disable max-lines-per-function */
const semver = require("semver");
const tryRequire = require("../src");
const rcFixture = require("../test/rc-fixture");
const betaFixture = require("../test/rc-fixture");

describe("tryRequire", () => {
  it("returns false for unresolvable modules", () => {
    expect(tryRequire("thispackage-is-not-there")).toBe(false);
  });

  it("returns the module if it is resolvable", () => {
    expect(tryRequire("semver")).toStrictEqual(semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", () => {
    expect(tryRequire("semver", ">=5.0.0 <8.0.0")).toStrictEqual(semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", () => {
    expect(tryRequire("../test/rc-fixture", ">=2.0.0 <4.0.0")).toStrictEqual(
      rcFixture
    );
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", () => {
    expect(tryRequire("../test/rc-fixture", ">=2.0.0 <3.0.0")).toBe(false);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", () => {
    expect(tryRequire("../test/beta-fixture", ">=2.0.0 <4.0.0")).toStrictEqual(
      betaFixture
    );
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", () => {
    expect(tryRequire("../test/beta-fixture", ">=2.0.0 <3.0.0")).toBe(false);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", () => {
    expect(tryRequire("semver", "<5.0.0")).toBe(false);
  });
});
