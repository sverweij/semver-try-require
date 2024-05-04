"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOCAL_MODULE_RE = /^[.]{1,2}($|\/.*)/g;
const ABSOLUTE_MODULE_RE = /^\/.*/g;
const PACKAGE_RE = "[^/]+";
const SCOPED_PACKAGE_RE = "@[^/]+(/[^/]+)";
const ROOT_MODULE_RE = new RegExp(`^(${SCOPED_PACKAGE_RE}|${PACKAGE_RE})`, "g");
function extractRootModuleName(pModuleName) {
	if (
		pModuleName.match(LOCAL_MODULE_RE) ||
		pModuleName.match(ABSOLUTE_MODULE_RE)
	) {
		return pModuleName;
	} else {
		return (pModuleName.match(ROOT_MODULE_RE) || []).shift();
	}
}
exports.default = extractRootModuleName;
