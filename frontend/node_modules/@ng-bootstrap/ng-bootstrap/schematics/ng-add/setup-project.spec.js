"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const workspace_1 = require("@schematics/angular/utility/workspace");
const messages = require("./messages");
const testing_2 = require("../utils/testing");
['app', 'second-app'].forEach(projectName => {
    describe(`ng-add-project-setup, 'project=${projectName}'`, () => {
        let runner;
        let log = [];
        async function createAppWithOptions(appOptions = {}) {
            // 'app' is the default application, so we're not passing '--project' option
            const options = { project: projectName };
            let tree = await (0, testing_2.createTestApp)(runner, appOptions);
            tree = await runner.runSchematicAsync('ng-add-setup-project', options, tree).toPromise();
            const workspace = await (0, workspace_1.getWorkspace)(tree);
            const project = workspace.projects.get(projectName);
            return { tree, project };
        }
        beforeEach(() => {
            log = [];
            runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../collection.json'));
            runner.logger.subscribe(({ message }) => log.push(message));
        });
        it(`should add '@angular/localize' polyfill`, async () => {
            let tree = await (0, testing_2.createTestApp)(runner);
            const polyfillFilePath = `projects/${projectName}/src/polyfills.ts`;
            expect(tree.read(polyfillFilePath).toString()).not.toContain('@angular/localize');
            tree = await runner.runSchematicAsync('ng-add-setup-project', projectName ? { project: projectName } : {}, tree)
                .toPromise();
            expect(tree.read(polyfillFilePath).toString()).toContain('@angular/localize');
        });
        it(`should add 'bootstrap.min.css' to 'angular.json' by default`, async () => {
            const { project } = await createAppWithOptions();
            const targetOptions = project.targets.get('build').options;
            expect(targetOptions.styles).toContain('node_modules/bootstrap/dist/css/bootstrap.min.css');
        });
        it(`should patch 'style.sass' when using SASS styles`, async () => {
            const { tree } = await createAppWithOptions({ style: 'sass' });
            const expectedStylesPath = `projects/${projectName}/src/styles.sass`;
            const stylesFile = tree.read(expectedStylesPath).toString();
            expect(stylesFile).toContain(`@import '~bootstrap/scss/bootstrap'`);
            expect(stylesFile).not.toContain(`@import '~bootstrap/scss/bootstrap;'`);
        });
        it(`should patch 'style.scss' when using SCSS styles`, async () => {
            const { tree } = await createAppWithOptions({ style: 'scss' });
            const expectedStylesPath = `projects/${projectName}/src/styles.scss`;
            const stylesFile = tree.read(expectedStylesPath).toString();
            expect(stylesFile).toContain(`@import '~bootstrap/scss/bootstrap';`);
        });
        it(`should add 'bootstrap.min.css' to 'angular.json' if style system is unsupported`, async () => {
            const { project } = await createAppWithOptions({ style: 'less' });
            const targetOptions = project.targets.get('build').options;
            expect(targetOptions.styles).toContain('node_modules/bootstrap/dist/css/bootstrap.min.css');
            expect(log).toEqual([messages.unsupportedStyles(`projects/${projectName}/src/styles.less`)]);
        });
    });
});
//# sourceMappingURL=setup-project.spec.js.map