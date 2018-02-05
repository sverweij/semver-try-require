
declare const tryRequire:
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
(pModuleName: string, pSemVer?: string) => boolean | any;
export = tryRequire;
