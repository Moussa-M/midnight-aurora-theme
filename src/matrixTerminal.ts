import * as vscode from 'vscode';
import { Constants } from './constants';

/**
 * Manages Matrix-themed terminals
 */
export class MatrixTerminalManager {
    private matrixTerminals: vscode.Terminal[] = [];

    constructor(private context: vscode.ExtensionContext) {
        // Listen for terminal disposal
        vscode.window.onDidCloseTerminal(terminal => {
            const index = this.matrixTerminals.indexOf(terminal);
            if (index !== -1) {
                this.matrixTerminals.splice(index, 1);
            }
        });
    }

    /**
     * Create a new Matrix-themed terminal
     */
    public async createMatrixTerminal(): Promise<vscode.Terminal> {
        const config = vscode.workspace.getConfiguration('matrixTheme');
        const greenMode = config.get<boolean>('terminal.greenMode', true);

        const terminal = vscode.window.createTerminal({
            name: '🕶️ Matrix Terminal',
            env: {
                ...process.env,
                MATRIX_MODE: 'true',
                PS1: greenMode ? '\\[\\033[32m\\]matrix:\\w$ \\[\\033[0m\\]' : undefined
            },
            iconPath: new vscode.ThemeIcon('terminal')
        });

        this.matrixTerminals.push(terminal);

        // Show the terminal
        terminal.show();

        // Send welcome message
        setTimeout(() => {
            this.sendMatrixWelcome(terminal, greenMode);
        }, 500);

        return terminal;
    }

    /**
     * Send Matrix welcome message to terminal
     */
    private sendMatrixWelcome(terminal: vscode.Terminal, greenMode: boolean): void {
        const welcomeCommands = [
            'clear',
            greenMode ? 'echo "\\033[32m"' : '',
            'echo "█▄█ █▀█ ▀█▀ █▀█ █ ▀▄▀   ▀█▀ █▀▀ █▀█ █▀▄▀█ █ █▄░█ ▄▀█ █░░"',
            'echo "█░█ █▀█ ░█░ █▀▄ █ █░█   ░█░ ██▄ █▀▄ █░▀░█ █ █░▀█ █▀█ █▄▄"',
            'echo ""',
            'echo "Welcome to the Matrix Terminal"',
            'echo "Reality is an illusion. Code is the truth."',
            'echo ""',
            'echo "Available commands:"',
            'echo "  neo          - Show the chosen one"',
            'echo "  redpill      - Take the red pill"',
            'echo "  bluepill     - Take the blue pill"',
            'echo "  agents       - List system agents"',
            'echo "  zion         - Connect to Zion mainframe"',
            'echo "  oracle       - Consult the Oracle"',
            greenMode ? 'echo "\\033[0m"' : '',
            'echo ""'
        ];

        welcomeCommands.forEach((cmd, index) => {
            if (cmd) {
                setTimeout(() => {
                    terminal.sendText(cmd);
                }, index * 200);
            }
        });

        // Set up custom commands
        this.setupMatrixCommands(terminal);
    }

    /**
     * Set up custom Matrix commands in the terminal
     */
    private setupMatrixCommands(terminal: vscode.Terminal): void {
        const commands = [
            'alias neo="echo \'You are the One, Neo.\'"',
            'alias redpill="echo \'This is your last chance. After this, there is no going back.\'"',
            'alias bluepill="echo \'You take the blue pill, the story ends. You wake up in your bed and believe whatever you want to believe.\'"',
            'alias agents="ps aux | head -10"',
            'alias zion="echo \'Connecting to Zion mainframe...\'; sleep 2; echo \'Connection established.\'"',
            'alias oracle="echo \'Know thyself.\'; fortune 2>/dev/null || echo \'The Oracle is not available.\'"'
        ];

        commands.forEach((cmd, index) => {
            setTimeout(() => {
                terminal.sendText(cmd);
            }, (welcomeCommands.length + index) * 200);
        });
    }

    /**
     * Update configuration for all Matrix terminals
     */
    public async updateConfiguration(): Promise<void> {
        // Configuration updates would require recreating terminals
        // For now, just show a message
        if (this.matrixTerminals.length > 0) {
            vscode.window.showInformationMessage(
                'Terminal configuration updated. Create a new Matrix terminal to see changes.'
            );
        }
    }

    /**
     * Get all active Matrix terminals
     */
    public getActiveTerminals(): vscode.Terminal[] {
        return this.matrixTerminals.filter(terminal => terminal.exitStatus === undefined);
    }

    /**
     * Close all Matrix terminals
     */
    public closeAllTerminals(): void {
        this.matrixTerminals.forEach(terminal => {
            if (terminal.exitStatus === undefined) {
                terminal.dispose();
            }
        });
        this.matrixTerminals = [];
    }

    /**
     * Dispose of resources
     */
    public dispose(): void {
        this.closeAllTerminals();
    }
}