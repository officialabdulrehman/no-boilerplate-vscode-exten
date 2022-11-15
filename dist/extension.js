/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.main = void 0;
const files_service_1 = __webpack_require__(3);
const main = (args) => {
    args.forEach((title) => new files_service_1.StaticFileService(title, true));
};
exports.main = main;
/**
 * user types command Snippet create
 * input box opens
 * user types names with spaces
 * parse
 * create files
 */
/**
 * user types command Snippet create2
 * 1st input box opens
 * user types names with spaces
 * 2nd input box opens for derived service classes and routers ( input => profile, selfProfile )
 * parse
 * create files
 */ 


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StaticFileService = void 0;
const assert = __webpack_require__(4);
const node_fs_1 = __webpack_require__(5);
const dao_template_1 = __webpack_require__(6);
const dto_template_1 = __webpack_require__(7);
const model_template_1 = __webpack_require__(8);
const router_template_1 = __webpack_require__(9);
const service_template_1 = __webpack_require__(10);
const common_1 = __webpack_require__(11);
const path = __webpack_require__(12);
class StaticFileService {
    constructor(title, autoCreate = true) {
        this._titleSmall = null;
        this._titleCapital = null;
        this._dto = null;
        this._model = null;
        this._dao = null;
        this._service = null;
        this._router = null;
        this.throwIfInvalidTitle(title);
        this.setTitleSmall(title);
        this.setTitleCapital(title);
        this.loadTemplates();
        if (autoCreate) {
            this.init();
        }
    }
    init() {
        this.createDTO();
        this.createModel();
        this.createDAO();
        this.createService();
        this.createRouter();
    }
    createDAO() {
        this.create(this._dao);
    }
    createDTO() {
        this.create(this._dto);
    }
    createModel() {
        this.create(this._model);
    }
    createService() {
        this.create(this._service);
    }
    createRouter() {
        this.create(this._router);
    }
    //   Internal Methods below
    throwIfInvalidTitle(title) {
        assert(title.trim(), new Error("Invalid input"));
    }
    setTitleSmall(title) {
        this._titleSmall = (0, common_1.decapitallizeFirstLetter)(title);
    }
    setTitleCapital(title) {
        this._titleCapital = (0, common_1.capitallizeFirstLetter)(title);
    }
    create({ folderPath, filePath, fileContent, fileIPath, fileIContent }) {
        (0, node_fs_1.mkdirSync)(path.join(__dirname, folderPath), { recursive: true });
        (0, node_fs_1.appendFileSync)(path.join(__dirname, filePath), fileContent);
        if (fileIPath && fileIContent) {
            (0, node_fs_1.appendFileSync)(path.join(__dirname, fileIPath), fileIContent);
        }
    }
    loadTemplates() {
        this.setDTO();
        this.setModel();
        this.setDAO();
        this.setService();
        this.setRouter();
    }
    setDTO() {
        this._dto = (0, dto_template_1.datamodelTemplate)({
            varSmall: this._titleSmall,
            varCapital: this._titleCapital
        });
    }
    setModel() {
        this._model = (0, model_template_1.modelTemplate)({
            varSmall: this._titleSmall,
            varCapital: this._titleCapital
        });
    }
    setDAO() {
        this._dao = (0, dao_template_1.daoTemplate)({
            varSmall: this._titleSmall,
            varCapital: this._titleCapital
        });
    }
    setService() {
        this._service = (0, service_template_1.serviceTemplate)({
            varSmall: this._titleSmall,
            varCapital: this._titleCapital
        });
    }
    setRouter() {
        this._router = (0, router_template_1.routerTemplate)({
            varSmall: this._titleSmall,
            varCapital: this._titleCapital
        });
    }
}
exports.StaticFileService = StaticFileService;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("assert");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.daoTemplate = void 0;
const daoTemplate = ({ varSmall, varCapital }) => {
    const folderPath = `src/dao/${varSmall}`;
    const filePath = `src/dao/${varSmall}/${varSmall}.dao.ts`;
    const fileContent = `
import { MongoDAO } from "../MongoDAO";
import { ${varCapital}DTO } from "../../datamodels/${varSmall}/${varCapital}.dto";
import { ${varCapital}Model } from "../../models/${varSmall}/${varSmall}.model";

import { ${varCapital}DAOI } from "./${varSmall}.daoI";
import { query } from "express";
import { IPaginateResult } from "../pagination";

export class ${varCapital}DAO extends MongoDAO<${varCapital}DTO> implements ${varCapital}DAOI {

}

export const ${varSmall}DAO = new ${varCapital}DAO(${varCapital}Model, new ${varCapital}DTO());

`.trim();
    const fileIPath = `src/dao/${varSmall}/${varSmall}.daoI.ts`;
    const fileIContent = `
import {DAOI} from "../daoI";
import {${varCapital}DTO} from "../../datamodels/${varSmall}/${varCapital}.dto";

export type ${varCapital}DAOI = DAOI<${varCapital}DTO>

`.trim();
    return {
        folderPath,
        filePath,
        fileContent,
        fileIPath,
        fileIContent
    };
};
exports.daoTemplate = daoTemplate;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.datamodelTemplate = void 0;
const datamodelTemplate = ({ varSmall, varCapital }) => {
    const folderPath = `src/datamodels/${varSmall}`;
    const filePath = `src/datamodels/${varSmall}/${varCapital}.dto.ts`;
    const fileContent = `
import { DTO } from "../dto";

export class ${varCapital}DTO extends DTO {

}

`.trim();
    return {
        folderPath,
        filePath,
        fileContent
    };
};
exports.datamodelTemplate = datamodelTemplate;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.modelTemplate = void 0;
const modelTemplate = ({ varSmall, varCapital }) => {
    const folderPath = `src/models/${varSmall}`;
    const filePath = `src/models/${varSmall}/${varSmall}.model.ts`;
    const fileContent = `
import { model, Schema, Document, Types } from "mongoose";

import { DTOCreate } from "../../datamodels/dto";
import { ${varCapital}DTO } from "../../datamodels/${varSmall}/${varCapital}.dto";

type ID = Types.ObjectId


export interface I${varCapital}Doc extends DTOCreate<${varCapital}DTO>, Document { }


const schemaFields: Record<keyof DTOCreate<${varCapital}DTO>, any> = {

};


const schema = new Schema(schemaFields, { timestamps: true });

export const ${varCapital}Model = model<I${varCapital}Doc>("${varCapital}", schema);

`.trim();
    return {
        folderPath,
        filePath,
        fileContent
    };
};
exports.modelTemplate = modelTemplate;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routerTemplate = void 0;
const routerTemplate = ({ varSmall, varCapital }) => {
    const folderPath = `src/routers/${varSmall}`;
    const filePath = `src/routers/${varSmall}/${varSmall}.router.ts`;
    const fileContent = `
import { Request, Response, NextFunction } from "express";
import { check, sanitize, oneOf } from "express-valueidator";

import { apiError, catchAsync, apiValidation, apiOk, IQuery } from "../../util/apiHelpers";
import { GetIdentity } from "../../config/auth";

import { RouterClass } from "../resource/RouterClass";

import { ResourceRouter } from "../resource/ResourceRouter";

import { ${varSmall}Service } from "../../services/${varSmall}/${varSmall}.service";
import { ${varCapital}DTO } from "../../datamodels/${varSmall}/${varCapital}.dto";

import _ from "lodash";

class ${varCapital}Router extends ResourceRouter<${varCapital}DTO> {

}

export const ${varSmall}Router = new ${varCapital}Router(new ${varCapital}DTO(), ${varSmall}Service);
export default ${varSmall}Router;
`.trim();
    return {
        folderPath,
        filePath,
        fileContent
    };
};
exports.routerTemplate = routerTemplate;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serviceTemplate = void 0;
const serviceTemplate = ({ varSmall, varCapital }) => {
    const folderPath = `src/services/${varSmall}`;
    const filePath = `src/services/${varSmall}/${varSmall}.service.ts`;
    const fileContent = `import { ServiceCRUD } from "../service.crud";
import { ${varCapital}DAOI } from "../../dao/${varSmall}/${varSmall}.daoI";
import { ${varSmall}DAO } from "../../dao/${varSmall}/${varSmall}.dao";
import { ${varCapital}DTO } from "../../datamodels/${varSmall}/${varCapital}.dto";
import { IPaginateResult } from "../../dao/pagination";

class ${varCapital}Service extends ServiceCRUD<${varCapital}DTO, ${varCapital}DAOI> {



}


export const ${varSmall}Service = new ${varCapital}Service(${varSmall}DAO);
export default ${varSmall}Service;
`.trim();
    return {
        folderPath,
        filePath,
        fileContent
    };
};
exports.serviceTemplate = serviceTemplate;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decapitallizeFirstLetter = exports.capitallizeFirstLetter = void 0;
const capitallizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};
exports.capitallizeFirstLetter = capitallizeFirstLetter;
const decapitallizeFirstLetter = (str) => {
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
};
exports.decapitallizeFirstLetter = decapitallizeFirstLetter;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("path");

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
const main_1 = __webpack_require__(2);
__dirname = __dirname.replace("dist", '');
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
        vscode.workspace.fs;
        (0, main_1.main)(["dummy3"]);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map