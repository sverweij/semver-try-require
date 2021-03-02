## What's this then?

A micro module that helps you require (versions of) modules
that might not be there.

Useful to test for the availability of _optional_ and _peer_ dependencies
before working with them.

## Example

So you made the typescript compiler (v2) an optional dependency.
But you just want to keep running if it ain't there.

Do this:

```javascript
const tryRequire = require("semver-try-require");

// import typescript if there's a version >= 2 available
const typescript = tryRequire("typescript", ">=2");

// now you can test if typescript is actually there
const lProgram = "const cube = x => x*x*x; console.log(cube(42))";

if (typescript !== false) {
  console.log(typescript.transpileModule(lProgram, {}).outputText);
  // Result:
  //   var cube = function (x) { return x * x * x; };
  //   console.log(cube(42));
} else {
  // typescript >=2 not found - use fallback
  console.log(lProgram);
  // Result:
  //    const cube = x => x*x*x; console.log(cube(42))
}
```

## Signature

### `pModulename`

The name of the module to resolve.

### `pSemanticVersion`

A semantic version (range). Optional.

### return value

The (resolved) module identified by pModuleName if:

- it is available, and
- it satisfies the semantic version range specified by pSemVer

returns false in all other cases

## History

This module started to try a few non-run-of-the-mill things with the
npm registry (deprecate, beta publishing, renaming). The tryRequire
function in
[dependency-cruiser ](https://github.com/sverweij/dependency-cruiser)
seemed like a good candidate as it was not a thing that'd be unique
to dependency-cruiser, and would probably be easier to maintain on its
own anyway. I named it `tigerclaws-try-require` until I realized the
_semver_ check was what distinguished it from the other try-require
like npm modules out there.

[dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
now uses semver-try-require in the [transpiler wrappers](https://github.com/sverweij/dependency-cruiser/tree/develop/src/extract/transpile)
and it enables it to cruise typescript, coffeescript and livescript
code without having to ship the heavy duty compilers for these
languages.

## License

[MIT](LICENSE)

## Badge & flair section

[![Build Status](https://travis-ci.org/sverweij/semver-try-require.svg?branch=main)](https://travis-ci.org/sverweij/semver-try-require)
[![npm stable version](https://img.shields.io/npm/v/semver-try-require.svg)](https://npmjs.com/package/semver-try-require)
[![total downloads on npm](https://img.shields.io/npm/dt/semver-try-require.svg?maxAge=2591999)](https://npmjs.com/package/semver-try-require)

Made with :metal: in Holland
