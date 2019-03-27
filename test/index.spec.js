'use strict'

const semver = require('semver')
const tryRequire = require('../src')
const rcFixture = require('../test/rc-fixture')
const betaFixture = require('../test/rc-fixture')

describe('tryRequire', () => {
  test('returns false for unresolvable modules', () => {
    expect(
      tryRequire('thispackage-is-not-there')
    ).toBe(false)
  })

  test('returns the module if it is resolvable', () => {
    expect(
      tryRequire('semver')
    ).toEqual(semver)
  })

  test(
    'returns the module if it is resolvable and satisfies specified semver',
    () => {
      expect(
        tryRequire('semver', '>=5.0.0 <7.0.0')
      ).toEqual(semver)
    }
  )

  test(
    'returns the module if it is resolvable and satisfies specified semver (with rc postfix)',
    () => {
      expect(
        tryRequire('../test/rc-fixture', '>=2.0.0 <4.0.0')
      ).toEqual(rcFixture)
    }
  )

  test(
    'returns false if it is resolvable but does not satisfy specified semver (with rc postfix)',
    () => {
      expect(
        tryRequire('../test/rc-fixture', '>=2.0.0 <3.0.0')
      ).toEqual(false)
    }
  )

  test(
    'returns the module if it is resolvable and satisfies specified semver (with beta postfix)',
    () => {
      expect(
        tryRequire('../test/beta-fixture', '>=2.0.0 <4.0.0')
      ).toEqual(betaFixture)
    }
  )

  test(
    'returns false if it is resolvable but does not satisfy specified semver (with beta postfix)',
    () => {
      expect(
        tryRequire('../test/beta-fixture', '>=2.0.0 <3.0.0')
      ).toEqual(false)
    }
  )

  test(
    "returns false if it is resolvable but doesn't satisfy the specified semver",
    () => {
      expect(
        tryRequire('semver', '<5.0.0')
      ).toEqual(false)
    }
  )
})
