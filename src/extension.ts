import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "Midnight Aurora Theme" is now active!');

  const disposable = vscode.commands.registerCommand('midnight-aurora-theme.helloWorld', () => {
    vscode.window.showInformationMessage('Hello from Midnight Aurora Theme!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
