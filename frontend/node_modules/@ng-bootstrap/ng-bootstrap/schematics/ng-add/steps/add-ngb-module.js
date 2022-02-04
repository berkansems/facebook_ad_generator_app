"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNgbModuleToAppModule = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const ts = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const workspace_1 = require("@schematics/angular/utility/workspace");
const messages = require("../messages");
const project_1 = require("../../utils/project");
const NG_BOOTSTRAP_MODULE_NAME = 'NgbModule';
const NG_BOOTSTRAP_PACKAGE_NAME = '@ng-bootstrap/ng-bootstrap';
/**
 * Patches main application module by adding 'NgbModule' import.
 *
 * Relevant 'angular.json' structure is:
 *
 * {
 *   "projects" : {
 *     "projectName": {
 *       "architect": {
 *         "build": {
 *           "options": {
 *            "main": "src/main.ts"
 *           }
 *         }
 *       }
 *     }
 *   },
 *   "defaultProject": "projectName"
 * }
 *
 */
function addNgbModuleToAppModule(options) {
    return async (host) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const projectName = options.project || workspace.extensions.defaultProject;
        // 1. getting project by name
        const project = workspace.projects.get(projectName);
        if (!project) {
            throw new schematics_1.SchematicsException(messages.noProject(projectName));
        }
        // 2. getting main file for project
        const projectBuildOptions = (0, project_1.getProjectTargetOptions)(project, 'build');
        const mainFilePath = projectBuildOptions.main;
        if (!mainFilePath || !host.read(mainFilePath)) {
            throw new schematics_1.SchematicsException(messages.noMainFile(projectName));
        }
        // 3. getting main app module file
        const appModuleFilePath = (0, ng_ast_utils_1.getAppModulePath)(host, mainFilePath);
        const appModuleFileText = host.read(appModuleFilePath);
        if (appModuleFileText === null) {
            throw new schematics_1.SchematicsException(messages.noModuleFile(appModuleFilePath));
        }
        // 4. adding `NgbModule` to the app module
        const appModuleSource = ts.createSourceFile(appModuleFilePath, appModuleFileText.toString('utf-8'), ts.ScriptTarget.Latest, true);
        const changes = (0, ast_utils_1.addImportToModule)(appModuleSource, appModuleFilePath, NG_BOOTSTRAP_MODULE_NAME, NG_BOOTSTRAP_PACKAGE_NAME);
        const recorder = host.beginUpdate(appModuleFilePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
    };
}
exports.addNgbModuleToAppModule = addNgbModuleToAppModule;
//# sourceMappingURL=add-ngb-module.js.map