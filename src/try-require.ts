/* eslint-disable import/no-import-module-exports */
import path from "path";
import { createRequire } from "module";
import satisfies from "semver/functions/satisfies";
import coerce from "semver/functions/coerce";
import extractRootModuleName from "./extract-root-module-name";

/**
 * @throws {Error}
 */
function getVersion(
  pModuleName: string,
  pOptions?: { path?: string | URL }
): string {
  const lRequire = pOptions?.path ? createRequire(pOptions.path) : require;

  // @ts-expect-error TS2345 extractRootModuleName can return either a string or
  // undefined. If undefined this function will throw. Which is _fine_, even
  // _expected_ in the context it's currently used
  return lRequire(path.join(extractRootModuleName(pModuleName), "package.json"))
    .version;
}

/**
 * @throws {Error}
 */
function checkVersion(pModuleName: string, pSemanticVersion: string): boolean {
  const lVersion = getVersion(pModuleName);
  const lCoerced = coerce(lVersion);
  return lVersion && lCoerced
    ? satisfies(lCoerced.version, pSemanticVersion)
    : false;
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
 * @param pOptions         (optional) options
 * @param pOptions.path    (optional) filename to be used to construct the require function
 * @return the (resolved) module identified by pModuleName or false
 */
function tryRequire(
  pModuleName: string,
  pSemanticVersion?: string,
  pOptions?: { path?: string | URL }
): NodeModule | false {
  let lReturnValue: NodeModule | false = false;
  const lRequire = pOptions?.path ? createRequire(pOptions.path) : require;

  try {
    lReturnValue = lRequire(pModuleName);

    if (pSemanticVersion && !checkVersion(pModuleName, pSemanticVersion)) {
      lReturnValue = false;
    }
  } catch (pError) {
    lReturnValue = false;
  }
  return lReturnValue;
}
// eslint-disable-next-line import/exports-last
export default tryRequire;

// for backwards compatibility. Otherwise our consumers in commonjs would need
// to pick the '.default' property of this module, instead of just the module
// itself
module.exports = tryRequire;
