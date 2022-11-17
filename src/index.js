// @ts-check
// eslint-disable-next-line unicorn/prefer-node-protocol
const path = require("path");
const satisfies = require("semver/functions/satisfies");
const coerce = require("semver/functions/coerce");
const extractRootModuleName = require("./extract-root-module-name");

/**
 * @param {string} pModuleName
 * @returns {string}
 * @throws {Error}
 */
function getVersion(pModuleName) {
  // @ts-expect-error extractRootModuleName can return undefined will make require
  // likely to throw. Not a problem - this will mean there's something seriously
  // awry and the tryRequire function's catch-all will ensure to return false
  // ('requiring failed') anyway.
  // There's bound to be a more elegant solution for this, which is welcome but
  // not prio1.
  return require(path.join(extractRootModuleName(pModuleName), "package.json"))
    .version;
}

/**
 * returns the (resolved) module identified by pModuleName:
 * - if it is available, and
 * - it satisfies the semantic version range specified by pSemVer
 *
 * returns false in all other cases
 *
 * @param  {string} pModuleName      the name of the module to resolve
 * @param  {string} [pSemanticVersion] (optional) a semantic version (range)
 * @return {false | any}         the (resolved) module identified by pModuleName
 *                                   or false
 */
module.exports = function tryRequire(pModuleName, pSemanticVersion) {
  /** @type {false | any} */
  let lReturnValue = false;

  try {
    lReturnValue = require(pModuleName);

    if (pSemanticVersion) {
      const lVersion = getVersion(pModuleName);
      const lCoerced = coerce(lVersion);
      if (
        lVersion &&
        lCoerced &&
        !satisfies(lCoerced.version, pSemanticVersion)
      ) {
        lReturnValue = false;
      }
    }
  } catch (pError) {
    lReturnValue = false;
  }
  return lReturnValue;
};
