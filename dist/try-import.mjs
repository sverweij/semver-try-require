import path from "path/posix";
import { coerce, satisfies } from "semver";
const LOCAL_MODULE_RE = /^[.]{1,2}($|\/.*)/g;
const ABSOLUTE_MODULE_RE = /^\/.*/g;
const PACKAGE_RE = "[^/]+";
const SCOPED_PACKAGE_RE = "@[^/]+(/[^/]+)";
const ROOT_MODULE_RE = new RegExp(`^(${SCOPED_PACKAGE_RE}|${PACKAGE_RE})`, "g");
function extractRootModuleName(pModuleName) {
    if (pModuleName.match(LOCAL_MODULE_RE) ||
        pModuleName.match(ABSOLUTE_MODULE_RE)) {
        return pModuleName;
    }
    else {
        return (pModuleName.match(ROOT_MODULE_RE) || []).shift();
    }
}
async function getVersion(pModuleName) {
    const lManifest = await import(path.join(extractRootModuleName(pModuleName), "package.json"), { assert: { type: "json" } });
    return lManifest.default.version;
}
export default async function tryImport(pModuleName, pSemanticVersion) {
    let lReturnValue = false;
    try {
        const lModule = await import(pModuleName);
        lReturnValue = lModule.default;
        if (pSemanticVersion) {
            const lVersion = await getVersion(pModuleName);
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
