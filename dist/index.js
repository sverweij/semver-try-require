"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const satisfies = require("semver/functions/satisfies");
const coerce = require("semver/functions/coerce");
const extractRootModuleName = require("./extract-root-module-name").default;
function getVersion(pModuleName) {
    return require(path.join(extractRootModuleName(pModuleName), "package.json"))
        .version;
}
function tryRequire(pModuleName, pSemanticVersion) {
    let lReturnValue = false;
    try {
        lReturnValue = require(pModuleName);
        if (pSemanticVersion) {
            const lVersion = getVersion(pModuleName);
            const lCoerced = coerce(lVersion);
            if (lVersion &&
                lCoerced &&
                !satisfies(lCoerced.version, pSemanticVersion)) {
                lReturnValue = false;
            }
        }
    }
    catch (pError) {
        lReturnValue = false;
    }
    return lReturnValue;
}
exports.default = tryRequire;
module.exports = tryRequire;
