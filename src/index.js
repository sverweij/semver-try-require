// eslint-disable-next-line unicorn/prefer-node-protocol
const path = require("path");
const satisfies = require("semver/functions/satisfies");
const coerce = require("semver/functions/coerce");
const extractRootModuleName = require("./extract-root-module-name");

function getVersion(pModuleName) {
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
 * @param  {string} pSemanticVersion (optional) a semantic version (range)
 * @return {any}                     the (resolved) module identified by pModuleName
 *                                   or false
 */
module.exports = (pModuleName, pSemanticVersion) => {
  let lReturnValue = false;

  try {
    lReturnValue = require(pModuleName);

    if (
      Boolean(pSemanticVersion) &&
      !satisfies(coerce(getVersion(pModuleName)).version, pSemanticVersion)
    ) {
      lReturnValue = false;
    }
  } catch (pError) {
    lReturnValue = false;
  }
  return lReturnValue;
};
