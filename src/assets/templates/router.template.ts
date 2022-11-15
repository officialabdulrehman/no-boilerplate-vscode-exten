import { templateI, templateInputI } from "./templateI";

export const routerTemplate = ({ varSmall, varCapital }: templateInputI): templateI => {
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
`.trim()

  return {
    folderPath,
    filePath,
    fileContent
  }
};