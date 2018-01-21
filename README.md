## What's this then?
A micro module that helps you to require (versions of) modules
that might not be there. Useful to test for the availability of
_optional_ and _peer_ dependencies before working with them.

> **The reason this module exists is to try a few non-standard**
> **things with the npm registry (deprecating, publishing betas,**
> **...).**
> Feel free to use it, though - `semver-try-require` works
> as advertised and is thoroughly tested.


## Example
So you made the typescript compiler (v2) an optional dependency.
But you just want to keep running if it ain't there.

Do this:

```javascript
const tryRequire = require('semver-try-require');

// import typescript if there's a version >= 2 available
const typescript = tryRequire('typescript', '>=2');

// now you can test if typescript is actually there
const lProgram = 'const cube = x => x*x*x; console.log(cube(42))';

if (typescript !== false) {
    console.log(
        typescript.transpileModule(lProgram, {}).outputText
    );
    // Result:
    //   var cube = function (x) { return x * x * x; };
    //   console.log(cube(42));
} else {
    // typescript >=2 not found - use fallback
    console.log(
        lProgram
    );
    // Result:
    //    const cube = x => x*x*x; console.log(cube(42))
}
```

## Signature
### `pModulename`
The name of the module to resolve.

### `pSemVer`
A semantic version (range). Optional.

### return value
The (resolved) module identified by pModuleName if:
- it is available, and
- it satisfies the semantic version range specified by pSemVer

returns false in all other cases


## License
[MIT](LICENSE)

## Badge & flare section
[![Build Status](https://travis-ci.org/sverweij/semver-try-require.svg?branch=master)](https://travis-ci.org/sverweij/semver-try-require)
[![npm stable version](https://img.shields.io/npm/v/semver-try-require.svg)](https://npmjs.com/package/semver-try-require)

Made with :metal: in Holland
