import path from "path/posix";
import { coerce, satisfies } from "semver";
// import extractRootModuleName from "./extract-root-module-name.js";

const LOCAL_MODULE_RE = /^[.]{1,2}($|\/.*)/g;
const ABSOLUTE_MODULE_RE = /^\/.*/g;

const PACKAGE_RE = "[^/]+";
const SCOPED_PACKAGE_RE = "@[^/]+(/[^/]+)";
const ROOT_MODULE_RE = new RegExp(`^(${SCOPED_PACKAGE_RE}|${PACKAGE_RE})`, "g");

/**
 * returns the module name that likely contains the package.json
 *
 * @param pModuleName module name string as you'd require it
 */
function extractRootModuleName(pModuleName: string): string | undefined {
  if (
    pModuleName.match(LOCAL_MODULE_RE) ||
    pModuleName.match(ABSOLUTE_MODULE_RE)
  ) {
    return pModuleName;
  } else {
    return (pModuleName.match(ROOT_MODULE_RE) || []).shift();
  }
}

async function getVersion(pModuleName: string): Promise<string> {
  const lManifest = await import(
    // @ts-expect-error TS2345 extractRootModuleName can return either a string or
    // undefined. If undefined this function will throw. Which is _fine_, even
    // _expected_ in the context it's currently used
    path.join(extractRootModuleName(pModuleName), "package.json"),
    { assert: { type: "json" } }
  );
  return lManifest.default.version;
}

export default async function tryImport(
  pModuleName: string,
  pSemanticVersion?: string
): Promise<NodeModule | false> {
  let lReturnValue: NodeModule | false = false;

  try {
    const lModule = await import(pModuleName);
    lReturnValue = lModule.default;

    if (pSemanticVersion) {
      const lVersion = await getVersion(pModuleName);
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
