import path from "path/posix";
import { createRequire } from "module";
import { coerce, satisfies } from "semver";

const LOCAL_MODULE_RE = /^[.]{1,2}($|\/.*)/g;
const ABSOLUTE_MODULE_RE = /^\/.*/g;

const PACKAGE_RE = "[^/]+";
const SCOPED_PACKAGE_RE = "@[^/]+(/[^/]+)";
const ROOT_MODULE_RE = new RegExp(`^(${SCOPED_PACKAGE_RE}|${PACKAGE_RE})`, "g");
const require = createRequire(import.meta.url);

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

function getVersion(pModuleName: string): string {
  // // The 'proper' way to do this would be with a dynamic import with an
  // // import assertion. Because it's 'experimental' since node 16 and prints
  // // an ugly warning on stderr since node 19 we'll be using the require
  // // hack below in stead.
  // const lManifest = await import(
  //   // @ts-expect-error TS2345 extractRootModuleName can return either a string or
  //   // undefined. If undefined this function will throw. Which is _fine_, even
  //   // _expected_ in the context it's currently used
  //   path.join(extractRootModuleName(pModuleName), "package.json"),
  //   { assert: { type: "json" } }
  // );
  // // changes the return type to Promise<string>
  // return lManifest.default.version;
  const lManifest = require(
    path.join(
      // @ts-expect-error TS2345 extractRootModuleName can return either a string or
      // undefined. If undefined this function will throw. Which is _fine_, even
      // _expected_ in the context it's currently used
      extractRootModuleName(pModuleName),
      "package.json",
    ),
  );
  return lManifest.version;
}

// eslint-disable-next-line complexity
export default async function tryImport(
  pModuleName: string,
  pSemanticVersion?: string,
): Promise<NodeModule | false> {
  try {
    if (pSemanticVersion) {
      const lVersion = getVersion(pModuleName);
      const lCoerced = coerce(lVersion);
      if (
        lVersion &&
        lCoerced &&
        !satisfies(lCoerced.version, pSemanticVersion)
      ) {
        return false;
      }
    }
    const lModule = await import(pModuleName);
    return lModule.default ? lModule.default : lModule;
  } catch (pError) {
    return false;
  }
}
