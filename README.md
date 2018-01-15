## What's this then?
A micro module that helps you to require (versions of) modules that might
not be there.

> Although this module actually works, is thoroughly tested and is
> useful in some situations the primary reason I publish it is to 
> do some practice with npm things.


## Example
So you're in a situation where you might want to do stuff with the 
typescript compiler. But you're not sure it, or the version of the
compiler you'd need is there.

Do this:

```javascript
const tryRequire = require("tigerclaws-try-require");
const typescript = tryRequire(
    "typescript",
    ">2"          // only interested in typescript version 2 and up
);

module.exports = {
    isAvailable: () => typescript !== false,

    transpile: pFile =>
        typescript.transpileModule(
            pFile,
            {
                compilerOptions: {
                    "target": "es2015",
                    "jsx": "react"
                }
            }
        ).outputText
};
```

## Signature
### pModulename
The name of the module to resolve.

### pSemVer
A semantic version (range). Optional.

### return value
The (resolved) module identified by pModuleName:
- if it is available, and
- it satisfies the semantic version range specified by pSemVer

returns false in all other cases


## License

[MIT](LICENSE)

## Badges'n flare section

[![Build Status](https://travis-ci.org/sverweij/try-require.svg?branch=master)](https://travis-ci.org/sverweij/try-require)
[![npm stable version](https://img.shields.io/npm/v/tigerclaws-try-require.svg)](https://npmjs.com/package/tigerclaws-try-require)

Made with :metal: in Holland
