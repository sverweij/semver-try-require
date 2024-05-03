import { equal, deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import semver from "semver";
// @ts-expect-error TS7016
import * as noDefaultExportMock from "no-default-export";
import tryImport from "./try-import.mjs";

// @ts-expect-error TS7016
import betaMock from "beta";
// @ts-expect-error TS7016
import rcMock from "rc";

describe("tryImport", () => {
  it("returns false for unresolvable modules", async () => {
    equal(await tryImport("thispackage-is-not-there"), false);
  });

  it("returns the module if it is resolvable", async () => {
    deepEqual(await tryImport("semver"), semver);
  });

  it("returns the module if it is resolvable and doesn't have a default export", async () => {
    equal(await tryImport("no-default-export"), noDefaultExportMock);
  });

  it("returns the module if it is resolvable and satisfies specified semver", async () => {
    deepEqual(await tryImport("semver", ">=5.0.0 <8.0.0"), semver);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", async () => {
    deepEqual(await tryImport("rc", ">=2.0.0 <4.0.0"), rcMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", async () => {
    equal(await tryImport("rc", ">=2.0.0 <3.0.0"), false);
  });

  it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", async () => {
    deepEqual(await tryImport("beta", ">=2.0.0 <4.0.0"), betaMock);
  });

  it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", async () => {
    equal(await tryImport("beta", ">=2.0.0 <3.0.0"), false);
  });

  it("returns false if it is resolvable but doesn't satisfy the specified semver", async () => {
    equal(await tryImport("semver", "<5.0.0"), false);
  });
});
