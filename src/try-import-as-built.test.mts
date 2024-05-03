import { equal, deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import semver from "semver";
import tryImport from "semver-try-require";

describe("tryImport - from the dist folder", () => {
  it("returns false for unresolvable modules", async () => {
    equal(await tryImport("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", async () => {
    deepEqual(await tryImport("semver"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", async () => {
    deepEqual(await tryImport("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", async () => {
    equal(await tryImport("semver", "<5.0.0"), false);
  });
});
