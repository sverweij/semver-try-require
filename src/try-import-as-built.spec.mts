import { strictEqual, deepStrictEqual } from "node:assert";
import semver from "semver";
import tryImport from "semver-try-require";

describe("tryImport - from the dist folder", () => {
  it("returns false for unresolvable modules", async () => {
    strictEqual(await tryImport("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", async () => {
    deepStrictEqual(await tryImport("semver"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", async () => {
    deepStrictEqual(await tryImport("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", async () => {
    strictEqual(await tryImport("semver", "<5.0.0"), false);
  });
});
