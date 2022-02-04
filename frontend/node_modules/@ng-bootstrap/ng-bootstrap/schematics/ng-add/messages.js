"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noModuleFile = exports.noMainFile = exports.unsupportedStyles = exports.noProject = void 0;
function noProject(project) {
    return `Unable to find project '${project}' in the workspace`;
}
exports.noProject = noProject;
function unsupportedStyles(styleFilePath) {
    return `Project style file found has unsupported extension: '${styleFilePath}'\nAdding 'bootstrap.min.css' to 'angular.json'`;
}
exports.unsupportedStyles = unsupportedStyles;
function noMainFile(projectName) {
    return `Unable to find 'build.options.main' file path for project "${projectName}"`;
}
exports.noMainFile = noMainFile;
function noModuleFile(moduleFilePath) {
    return `File '${moduleFilePath}' does not exist.`;
}
exports.noModuleFile = noModuleFile;
//# sourceMappingURL=messages.js.map