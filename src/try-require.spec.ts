import { strictEqual, deepStrictEqual } from "node:assert";
import semver from "semver";
import tryRequire from "./try-require";
import betaMock from "beta";
import rcMock from "rc";

describe("tryRequire", () => {
  it("returns false for unresolvable modules", () => {
    strictEqual(tryRequire("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", () => {
    deepStrictEqual(tryRequire("semver"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", () => {
    deepStrictEqual(tryRequire("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", () => {
    deepStrictEqual(tryRequire("rc", ">=2.0.0 <4.0.0"), rcMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", () => {
    strictEqual(tryRequire("rc", ">=2.0.0 <3.0.0"), false);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", () => {
    deepStrictEqual(tryRequire("beta", ">=2.0.0 <4.0.0"), betaMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", () => {
    strictEqual(tryRequire("beta", ">=2.0.0 <3.0.0"), false);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", () => {
    strictEqual(tryRequire("semver", "<5.0.0"), false);
  });
});
