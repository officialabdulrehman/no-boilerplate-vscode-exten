// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { mkdirSync } from "node:fs";
import path = require('node:path');

__dirname = __dirname.replace("dist", '')

mkdirSync(path.join(__dirname, ".no-boilerplate"), { recursive: true });

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
    const templates = []

    const recursiveInput = (recurse: boolean) => {
      const input = vscode.window.createInputBox()
      input.show()
      console.log("user input => ", input.value)
    }

    recursiveInput(true)

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
    console.log("user input => ", input)

    const newFile = await vscode.workspace.openTextDocument({ content: "// template file" })
    const file = await vscode.window.showTextDocument(newFile)
    vscode.workspace.onDidOpenTextDocument((e) => { e })
    console.log("file content", file)



  });

  context.subscriptions.push(createTemplate);

  let selectTemplate = vscode.commands.registerCommand('no-boilerplate.selectTemplate', async () => {

  });
  context.subscriptions.push(selectTemplate);
}

// This method is called when your extension is deactivated
export function deactivate() { }


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