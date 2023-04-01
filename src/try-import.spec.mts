import { strictEqual, deepStrictEqual } from "node:assert";
import semver from "semver";
import tryImport from "./try-import.mjs";

import betaMock from "beta";
import rcMock from "rc";

describe("tryImport", () => {
  it("returns false for unresolvable modules", async () => {
    strictEqual(await tryImport("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", async () => {
    deepStrictEqual(await tryImport("semver"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver", async () => {
    deepStrictEqual(await tryImport("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", async () => {
    deepStrictEqual(await tryImport("rc", ">=2.0.0 <4.0.0"), rcMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", async () => {
    strictEqual(await tryImport("rc", ">=2.0.0 <3.0.0"), false);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", async () => {
    deepStrictEqual(await tryImport("beta", ">=2.0.0 <4.0.0"), betaMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", async () => {
    strictEqual(await tryImport("beta", ">=2.0.0 <3.0.0"), false);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", async () => {
    strictEqual(await tryImport("semver", "<5.0.0"), false);
  });
});
