/**
 * returns the (resolved) module identified by pModuleName:
 * - if it is available, and
 * - it satisfies the semantic version range specified by pSemVer
 *
 * returns false in all other cases
 *
 * @param pModuleName the name of the module to resolve
 * @param pSemanticVersion     (optional) a semantic version (range)
 * @param pOptions             (optional) options
 * @param pOptions.path        (optional) filename to be used to construct the require function
 * @return            the (resolved) module identified by pModuleName
 *                    or false
 */
export function tryRequire(
  pModuleName: string,
  pSemanticVersion?: string,
  pOptions?: { path?: string | URL }
): false | NodeModule;
