import * as vscode from 'vscode';
import { MatrixRainManager } from './matrixRain';
import { MatrixTerminalManager } from './matrixTerminal';
import { GlitchEffectManager } from './glitchEffect';
import { MatrixStatusBar } from './statusBar';
import { Constants } from './constants';

/**
 * Matrix Theme Extension
 * Provides an immersive Matrix-like coding experience with rain effects,
 * custom terminals, and cyberpunk aesthetics.
 */
export class MatrixThemeExtension {
    private rainManager: MatrixRainManager;
    private terminalManager: MatrixTerminalManager;
    private glitchManager: GlitchEffectManager;
    private statusBar: MatrixStatusBar;
    private isMatrixMode: boolean = false;

    constructor(private context: vscode.ExtensionContext) {
        this.rainManager = new MatrixRainManager(context);
        this.terminalManager = new MatrixTerminalManager(context);
        this.glitchManager = new GlitchEffectManager(context);
        this.statusBar = new MatrixStatusBar(context);
    }

    /**
     * Initialize the extension and register all commands
     */
    public async initialize(): Promise<void> {
        this.registerCommands();
        this.registerConfigurationListener();
        await this.loadInitialState();
        this.statusBar.show();
        
        // Show welcome message
        const config = vscode.workspace.getConfiguration('matrixTheme');
        if (config.get('rainEffect.enabled')) {
            vscode.window.showInformationMessage(
                'Welcome to the Matrix 🕶️ Use Ctrl+Shift+M to toggle rain effect',
                'Enter Matrix'
            ).then(selection => {
                if (selection === 'Enter Matrix') {
                    vscode.commands.executeCommand(Constants.COMMANDS.ENTER_MATRIX);
                }
            });
        }
    }

    /**
     * Register all extension commands
     */
    private registerCommands(): void {
        const commands = [
            {
                command: Constants.COMMANDS.TOGGLE_RAIN,
                handler: () => this.toggleRainEffect()
            },
            {
                command: Constants.COMMANDS.ENTER_MATRIX,
                handler: () => this.enterMatrix()
            },
            {
                command: Constants.COMMANDS.EXIT_MATRIX,
                handler: () => this.exitMatrix()
            },
            {
                command: Constants.COMMANDS.SHOW_TERMINAL,
                handler: () => this.showMatrixTerminal()
            },
            {
                command: Constants.COMMANDS.TOGGLE_GLITCH,
                handler: () => this.toggleGlitchEffect()
            }
        ];

        commands.forEach(({ command, handler }) => {
            const disposable = vscode.commands.registerCommand(command, handler);
            this.context.subscriptions.push(disposable);
        });
    }

    /**
     * Register configuration change listener
     */
    private registerConfigurationListener(): void {
        const disposable = vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('matrixTheme')) {
                this.handleConfigurationChange(event);
            }
        });
        this.context.subscriptions.push(disposable);
    }

    /**
     * Handle configuration changes
     */
    private async handleConfigurationChange(event: vscode.ConfigurationChangeEvent): Promise<void> {
        if (event.affectsConfiguration('matrixTheme.rainEffect')) {
            await this.rainManager.updateConfiguration();
        }
        if (event.affectsConfiguration('matrixTheme.glitch')) {
            await this.glitchManager.updateConfiguration();
        }
        if (event.affectsConfiguration('matrixTheme.terminal')) {
            await this.terminalManager.updateConfiguration();
        }
    }

    /**
     * Load initial state from configuration
     */
    private async loadInitialState(): Promise<void> {
        const config = vscode.workspace.getConfiguration('matrixTheme');
        
        if (config.get('rainEffect.enabled')) {
            await this.rainManager.start();
        }
        
        if (config.get('glitch.enabled')) {
            await this.glitchManager.start();
        }
    }

    /**
     * Toggle the matrix rain effect
     */
    private async toggleRainEffect(): Promise<void> {
        try {
            const isRunning = this.rainManager.isRunning();
            if (isRunning) {
                await this.rainManager.stop();
                vscode.window.showInformationMessage('Matrix rain effect disabled');
            } else {
                await this.rainManager.start();
                vscode.window.showInformationMessage('Matrix rain effect enabled');
            }
            this.statusBar.updateRainStatus(!isRunning);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to toggle rain effect: ${error}`);
        }
    }

    /**
     * Enter full Matrix mode
     */
    private async enterMatrix(): Promise<void> {
        try {
            this.isMatrixMode = true;
            
            // Start all effects
            await Promise.all([
                this.rainManager.start(),
                this.glitchManager.start(),
                this.terminalManager.createMatrixTerminal()
            ]);
            
            // Apply Matrix theme
            await vscode.commands.executeCommand('workbench.action.selectTheme', 'Matrix Green');
            
            this.statusBar.updateMatrixMode(true);
            
            vscode.window.showInformationMessage(
                '🕶️ Welcome to the Matrix. Reality is an illusion.',
                'Show Matrix Terminal'
            ).then(selection => {
                if (selection === 'Show Matrix Terminal') {
                    this.showMatrixTerminal();
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to enter Matrix: ${error}`);
        }
    }

    /**
     * Exit Matrix mode
     */
    private async exitMatrix(): Promise<void> {
        try {
            this.isMatrixMode = false;
            
            // Stop all effects
            await Promise.all([
                this.rainManager.stop(),
                this.glitchManager.stop()
            ]);
            
            this.statusBar.updateMatrixMode(false);
            
            vscode.window.showInformationMessage('Exited the Matrix. Back to reality.');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to exit Matrix: ${error}`);
        }
    }

    /**
     * Show Matrix terminal
     */
    private async showMatrixTerminal(): Promise<void> {
        try {
            await this.terminalManager.createMatrixTerminal();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create Matrix terminal: ${error}`);
        }
    }

    /**
     * Toggle glitch effect
     */
    private async toggleGlitchEffect(): Promise<void> {
        try {
            const isRunning = this.glitchManager.isRunning();
            if (isRunning) {
                await this.glitchManager.stop();
                vscode.window.showInformationMessage('Glitch effect disabled');
            } else {
                await this.glitchManager.start();
                vscode.window.showInformationMessage('Glitch effect enabled');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to toggle glitch effect: ${error}`);
        }
    }

    /**
     * Dispose of all resources
     */
    public dispose(): void {
        this.rainManager.dispose();
        this.terminalManager.dispose();
        this.glitchManager.dispose();
        this.statusBar.dispose();
    }
}

let extension: MatrixThemeExtension | undefined;

/**
 * Activate the Matrix Theme extension
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    try {
        extension = new MatrixThemeExtension(context);
        await extension.initialize();
        
        console.log('Matrix Theme extension activated successfully');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to activate Matrix Theme: ${error}`);
        console.error('Matrix Theme activation error:', error);
    }
}

/**
 * Deactivate the extension
 */
export function deactivate(): void {
    if (extension) {
        extension.dispose();
        extension = undefined;
    }
    console.log('Matrix Theme extension deactivated');
}