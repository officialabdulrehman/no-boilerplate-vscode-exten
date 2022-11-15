import { templateI, templateInputI } from "./templateI";

export const modelTemplate = ({ varSmall, varCapital }: templateInputI): templateI => {
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

`.trim()

  return {
    folderPath,
    filePath,
    fileContent
  }

};