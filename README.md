> [!NOTE]
>
> ## DEPRECATION NOTICE
>
> version 7 is the last version of semver-try-require.
>
> semver-try-require was created for dependency-cruiser, which now
> incorporates semver-try-require's functionality. Looking at download stats
> dependency-cruiser was the _only_ dependent of semver-try-require - this means
> semver-try-require is no longer needed and will go on a deprecation path.
>
> - As of 2024-06-28:
>   - it will no longer be possible to file issues
>   - pull requests on the repo will no longer be accepted
>   - the package will stop getting regular updates (functionality and bug fixes)
>   - as it is still used in older versions of dependency-cruiser, that still
>     have a significant number of downloads it _will_ still get security updates
>     on its 3rd party dependencies (as this only uses `semver` this shouldn't be
>     a big deal) or on itself.
> - As of 2024-12-28 (6 months later):
>   provided the number of downloads on the older versions of dependency-cruiser
>   that still use this package has dropped to an acceptable level:
>   - the repository will be archived
>   - the package will stop getting security updates
>   - this README will be updated to reflect the two facts above

## What was this then?

A micro module that helped you require or import (versions of) modules
that might not be there.

Useful to test for the availability of _optional_ and _peer_ dependencies
before working with them.

## Examples

> See [ESM](#esm) below if you're using this in an ESM only context.

### Commonjs

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

### ESM

In ESM it's _almost_ the same, except there dynamic imports are always
asynchronous, so you'll have to `await` it (or use promises):

```javascript
import tryImport from "semver-try-require";

// import typescript if there's a version >= 5 available.
const typescript = await tryImport("typescript", >=5);

// now you can test if typescript is actually there
const lProgram = "const cube = x => x*x*x; console.log(cube(42))";

if (typescript !== false) {
  console.log(typescript.transpileModule(lProgram, {}).outputText);
  // Result:
  //   var cube = function (x) { return x * x * x; };
  //   console.log(cube(42));
} else {
  // typescript >=5 not found - use fallback
  console.log(lProgram);
  // Result:
  //    const cube = x => x*x*x; console.log(cube(42))
}
```

## History

This module started to try a few non-run-of-the-mill things with the
npm registry (deprecate, beta publishing, renaming). The tryRequire
function in
[dependency-cruiser ](https://github.com/sverweij/dependency-cruiser)
seemed like a good candidate as it was not a thing that'd be unique
to dependency-cruiser, and would probably be easier to maintain on its
own anyway.

[dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
used to use semver-try-require in its [transpiler wrappers](https://github.com/sverweij/dependency-cruiser/tree/develop/src/extract/transpile)
and it enabled it to cruise typescript, coffeescript and livescript
code without having to ship the heavy duty compilers for these
languages.

These days dependency-cruiser has embedded this functionality in its
codebase to simplify maintenance.

## License

[MIT](LICENSE)

## Badge & flair section

[![install, lint and test](https://github.com/sverweij/semver-try-require/actions/workflows/ci.yml/badge.svg)](https://github.com/sverweij/semver-try-require/actions/workflows/ci.yml)
[![npm stable version](https://img.shields.io/npm/v/semver-try-require.svg)](https://npmjs.com/package/semver-try-require)
[![total downloads on npm](https://img.shields.io/npm/dt/semver-try-require.svg?maxAge=2591999)](https://npmjs.com/package/semver-try-require)

Made with :metal: in Holland
