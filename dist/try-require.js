"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const satisfies_1 = __importDefault(require("semver/functions/satisfies"));
const coerce_1 = __importDefault(require("semver/functions/coerce"));
const extract_root_module_name_1 = __importDefault(
	require("./extract-root-module-name"),
);
function getVersion(pModuleName) {
	return require(
		node_path_1.default.join(
			(0, extract_root_module_name_1.default)(pModuleName),
			"package.json",
		),
	).version;
}
function tryRequire(pModuleName, pSemanticVersion) {
	try {
		if (pSemanticVersion) {
			const lVersion = getVersion(pModuleName);
			const lCoerced = (0, coerce_1.default)(lVersion);
			if (
				lVersion &&
				lCoerced &&
				!(0, satisfies_1.default)(lCoerced.version, pSemanticVersion)
			) {
				return false;
			}
		}
		return require(pModuleName);
	} catch (pError) {
		return false;
	}
}
exports.default = tryRequire;
module.exports = tryRequire;
