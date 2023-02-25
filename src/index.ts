// (yarn 1 pnp can't handle the node: protocol)
// eslint-disable-next-line unicorn/prefer-node-protocol
const path = require("path");
const satisfies = require("semver/functions/satisfies");
const coerce = require("semver/functions/coerce");
const extractRootModuleName = require("./extract-root-module-name").default;

/**
 * @throws {Error}
 */
function getVersion(pModuleName: string): string {
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
 * @param pModuleName      the name of the module to resolve
 * @param pSemanticVersion (optional) a semantic version (range)
 * @return the (resolved) module identified by pModuleName or false
 */
function tryRequire(
  pModuleName: string,
  pSemanticVersion?: string
): NodeModule | false {
  let lReturnValue: NodeModule | false = false;

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
}
export default tryRequire;
module.exports = tryRequire;
