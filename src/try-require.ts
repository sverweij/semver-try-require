// (yarn 1 pnp can't handle the node: protocol)
// eslint-disable-next-line unicorn/prefer-node-protocol
import path from "path";
import satisfies from "semver/functions/satisfies";
import coerce from "semver/functions/coerce";
import extractRootModuleName from "./extract-root-module-name";

/**
 * @throws {Error}
 */
function getVersion(pModuleName: string): string {
  // @ts-expect-error TS2345 extractRootModuleName can return either a string or
  // undefined. If undefined this function will throw. Which is _fine_, even
  // _expected_ in the context it's currently used
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

// for backwards compatibility. Otherwise our consumers in commonjs would need
// to pick the '.default' property of this module, instead of just the module
// itself
module.exports = tryRequire;
