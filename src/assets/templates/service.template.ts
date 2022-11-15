import { templateI, templateInputI } from "./templateI";

export const serviceTemplate = ({ varSmall, varCapital }: templateInputI): templateI => {
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
`.trim()

  return {
    folderPath,
    filePath,
    fileContent
  }
};