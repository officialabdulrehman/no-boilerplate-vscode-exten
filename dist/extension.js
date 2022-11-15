/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("node:path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const node_fs_1 = __webpack_require__(2);
const path = __webpack_require__(3);
__dirname = __dirname.replace("dist", '');
(0, node_fs_1.mkdirSync)(path.join(__dirname, ".no-boilerplate"), { recursive: true });
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "no-boilerplate" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('no-boilerplate.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from no-boilerplate!');
        const templates = [];
        const recursiveInput = (recurse) => {
            const input = vscode.window.createInputBox();
            input.show();
            console.log("user input => ", input.value);
        };
        recursiveInput(true);
        // main(["dummy3"])
    });
    context.subscriptions.push(disposable);
    let createTemplate = vscode.commands.registerCommand('no-boilerplate.createTemplate', async () => {
        vscode.window.showInformationMessage('Create Template');
        // const input = vscode.window.createInputBox()
        // input.title = "Enter a name for your template"
        // input.show()
        const input = await vscode.window.showInputBox({
            title: "Enter a name for your template",
            prompt: "Enter a name for your template",
            placeHolder: "title",
        });
        console.log("user input => ", input);
        const newFile = await vscode.workspace.openTextDocument({ content: "// template file" });
        const file = await vscode.window.showTextDocument(newFile);
        vscode.workspace.onDidOpenTextDocument((e) => { e; });
        console.log("file content", file);
    });
    context.subscriptions.push(createTemplate);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
/**
 * INIT FLOW >
 *
 * load all the folders from .no-boilerplate
 * all the folders will be the templates
 * folder names would be titles for quickPane/quickSelect [ backend-node-ts ]
 * folder will contain the different templates to be generated on that single call
 * each file name would be the template title
 * each file would contain the template details
 *  folderPath
 *  filePath
 *  content
 *  variable list used
 *  once a template is selected, all the files and the data will be loaded
 *  all the vars will be pushed in a single array as key value pairs ( keys being the var names )
 *  duplicates will be removed from the var array
 *  the user will be prompted to enter values for the variables, one by one, or all together in a list
 *  files will generated
 *
 */ 

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map