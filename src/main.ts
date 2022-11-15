import { StaticFileService } from "./services/files.service";

export const main = (args: string[]) => {
  args.forEach((title: string) => new StaticFileService(title, true))
}


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