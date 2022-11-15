import { templateI, templateInputI } from "./templateI";

export const datamodelTemplate = ({ varSmall, varCapital }: templateInputI): templateI => {
  const folderPath = `src/datamodels/${varSmall}`;
  const filePath = `src/datamodels/${varSmall}/${varCapital}.dto.ts`;
  const fileContent = `
import { DTO } from "../dto";

export class ${varCapital}DTO extends DTO {

}

`.trim()

  return {
    folderPath,
    filePath,
    fileContent
  }

};