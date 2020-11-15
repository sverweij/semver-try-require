const path = require("path");
const semver = require("semver");
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
 * @param  {string} pModuleName the name of the module to resolve
 * @param  {string} pSemVer     (optional) a semantic version (range)
 * @return {object}             the (resolved) module identified by pModuleName
 *                              or false
 */
module.exports = (pModuleName, pSemVer) => {
  let lReturnValue = false;

  try {
    lReturnValue = require(pModuleName);

    if (
      Boolean(pSemVer) &&
      !semver.satisfies(semver.coerce(getVersion(pModuleName)).version, pSemVer)
    ) {
      lReturnValue = false;
    }
  } catch (pError) {
    lReturnValue = false;
  }
  return lReturnValue;
};
