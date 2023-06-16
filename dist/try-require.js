"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const module_1 = require("module");
const satisfies_1 = __importDefault(require("semver/functions/satisfies"));
const coerce_1 = __importDefault(require("semver/functions/coerce"));
const extract_root_module_name_1 = __importDefault(require("./extract-root-module-name"));
function getVersion(pModuleName, pOptions) {
    const lRequire = pOptions?.path ? (0, module_1.createRequire)(pOptions.path) : require;
    return lRequire(path_1.default.join((0, extract_root_module_name_1.default)(pModuleName), "package.json"))
        .version;
}
function checkVersion(pModuleName, pSemanticVersion) {
    const lVersion = getVersion(pModuleName);
    const lCoerced = (0, coerce_1.default)(lVersion);
    return lVersion && lCoerced
        ? (0, satisfies_1.default)(lCoerced.version, pSemanticVersion)
        : false;
}
function tryRequire(pModuleName, pSemanticVersion, pOptions) {
    let lReturnValue = false;
    const lRequire = pOptions?.path ? (0, module_1.createRequire)(pOptions.path) : require;
    try {
        lReturnValue = lRequire(pModuleName);
        if (pSemanticVersion && !checkVersion(pModuleName, pSemanticVersion)) {
            lReturnValue = false;
        }
    }
    catch (pError) {
        lReturnValue = false;
    }
    return lReturnValue;
}
exports.default = tryRequire;
module.exports = tryRequire;
