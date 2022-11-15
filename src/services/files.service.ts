import assert = require("assert")
import { appendFileSync, mkdirSync } from "node:fs"
import { daoTemplate } from "../assets/templates/dao.template"
import { datamodelTemplate } from "../assets/templates/dto.template"
import { modelTemplate } from "../assets/templates/model.template"
import { routerTemplate } from "../assets/templates/router.template"
import { serviceTemplate } from "../assets/templates/service.template"
import { templateI } from "../assets/templates/templateI"
import { capitallizeFirstLetter, decapitallizeFirstLetter } from "../utils/common"
import { StaticFileServiceI } from "./file.serviceI"
import path = require("path")

export class StaticFileService implements StaticFileServiceI {


  private _titleSmall: string = null
  private _titleCapital: string = null
  private _dto: templateI = null
  private _model: templateI = null
  private _dao: templateI = null
  private _service: templateI = null
  private _router: templateI = null


  constructor(title: string, autoCreate: boolean = true) {

    this.throwIfInvalidTitle(title)

    this.setTitleSmall(title)
    this.setTitleCapital(title)

    this.loadTemplates()

    if (autoCreate) {
      this.init()
    }

  }

  private init(): void {
    this.createDTO()
    this.createModel()
    this.createDAO()
    this.createService()
    this.createRouter()
  }

  public createDAO(): void {

    this.create(this._dao)
  }

  public createDTO(): void {
    this.create(this._dto)
  }

  public createModel(): void {
    this.create(this._model)
  }

  public createService(): void {
    this.create(this._service)
  }

  public createRouter(): void {
    this.create(this._router)
  }

  //   Internal Methods below

  private throwIfInvalidTitle(title: string) {
    assert(title.trim(), new Error("Invalid input"))
  }

  private setTitleSmall(title: string): void {
    this._titleSmall = decapitallizeFirstLetter(title)
  }

  private setTitleCapital(title: string): void {
    this._titleCapital = capitallizeFirstLetter(title)
  }

  private create({ folderPath, filePath, fileContent, fileIPath, fileIContent }: templateI): void {
    mkdirSync(path.join(__dirname, folderPath), { recursive: true });
    appendFileSync(path.join(__dirname, filePath), fileContent);
    if (fileIPath && fileIContent) {
      appendFileSync(path.join(__dirname, fileIPath), fileIContent);
    }
  }

  private loadTemplates(): void {
    this.setDTO()
    this.setModel()
    this.setDAO()
    this.setService()
    this.setRouter()
  }

  private setDTO(): void {
    this._dto = datamodelTemplate({
      varSmall: this._titleSmall,
      varCapital: this._titleCapital
    })
  }

  private setModel(): void {
    this._model = modelTemplate({
      varSmall: this._titleSmall,
      varCapital: this._titleCapital
    })
  }

  private setDAO(): void {
    this._dao = daoTemplate({
      varSmall: this._titleSmall,
      varCapital: this._titleCapital
    })
  }

  private setService(): void {
    this._service = serviceTemplate({
      varSmall: this._titleSmall,
      varCapital: this._titleCapital
    })
  }

  private setRouter(): void {
    this._router = routerTemplate({
      varSmall: this._titleSmall,
      varCapital: this._titleCapital
    })
  }

}