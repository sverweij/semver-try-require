"use strict";

const expect      = require("chai").expect;
const semver      = require('semver');
const tryRequire  = require("../src");
const rcFixture   = require("../test/rc-fixture");
const betaFixture = require("../test/rc-fixture");

describe("tryRequire", () => {
    it("returns false for unresolvable modules", () => {
        expect(
            tryRequire('thispackage-is-not-there')
        ).to.equal(false);
    });

    it("returns the module if it is resolvable", () => {
        expect(
            tryRequire('semver')
        ).to.deep.equal(semver);
    });

    it("returns the module if it is resolvable and satisfies specified semver", () => {
        expect(
            tryRequire('semver', '>=5.0.0 <6.0.0')
        ).to.deep.equal(semver);
    });

    it("returns the module if it is resolvable and satisfies specified semver (with rc postfix)", () => {
        expect(
            tryRequire('../test/rc-fixture', '>=2.0.0 <4.0.0')
        ).to.deep.equal(rcFixture);
    });

    it("returns false if it is resolvable but does not satisfy specified semver (with rc postfix)", () => {
        expect(
            tryRequire('../test/rc-fixture', '>=2.0.0 <3.0.0')
        ).to.deep.equal(false);
    });

    it("returns the module if it is resolvable and satisfies specified semver (with beta postfix)", () => {
        expect(
            tryRequire('../test/beta-fixture', '>=2.0.0 <4.0.0')
        ).to.deep.equal(betaFixture);
    });

    it("returns false if it is resolvable but does not satisfy specified semver (with beta postfix)", () => {
        expect(
            tryRequire('../test/beta-fixture', '>=2.0.0 <3.0.0')
        ).to.deep.equal(false);
    });

    it("returns false if it is resolvable but doesn't satisfy the specified semver", () => {
        expect(
            tryRequire('semver', '<5.0.0')
        ).to.deep.equal(false);
    });
});
