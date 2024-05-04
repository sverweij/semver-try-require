import { equal, deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import semver from "semver";
import betaMock from "beta";
import rcMock from "rc";

const tryRequire = require("../dist/try-require.js");

describe("tryRequire - from the dist folder", () => {
  it("returns false for unresolvable modules", () => {
    equal(tryRequire("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", () => {
    deepEqual(tryRequire("semver"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", () => {
    deepEqual(tryRequire("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", () => {
    deepEqual(tryRequire("../src/node_modules/rc", ">=2.0.0 <4.0.0"), rcMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", () => {
    equal(tryRequire("../src/node_modules/rc", ">=2.0.0 <3.0.0"), false);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", () => {
    deepEqual(
      tryRequire("../src/node_modules/beta", ">=2.0.0 <4.0.0"),
      betaMock,
    );
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", () => {
    equal(tryRequire("../src/node_modules/beta", ">=2.0.0 <3.0.0"), false);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", () => {
    equal(tryRequire("semver", "<5.0.0"), false);
  });
});
