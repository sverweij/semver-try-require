## What's this then?
A micro module that helps you to require modules that might not be there.

(Although this module actually works, is thoroughly tested and is
useful in some situations the primary reason I publish it is to 
do some practice with npm things).


## Example
So you're in a situation where you might want to do stuff with the 
typescript compiler. But you're not sure it, or the version of the
compiler you'd need is there.

Do this:

```javascript
const tryRequire = require("@verweij/tryRequire");
const typescript = tryRequire(
    "typescript",
    ">2"
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

## signature
### pModulename
the name of the module to resolve

### pSemVer
(optional) a semantic version (range)

### return value
returns the (resolved) module identified by pModuleName:
- if it is available, and
- it satisfies the semantic version range specified by pSemVer

returns false in all other cases
