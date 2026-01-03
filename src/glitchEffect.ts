import * as vscode from 'vscode';
import { Constants } from './constants';

/**
 * Manages glitch effects for the Matrix theme
 */
export class GlitchEffectManager {
    private glitchInterval: NodeJS.Timeout | undefined;
    private isActive: boolean = false;
    private decorationType: vscode.TextEditorDecorationType | undefined;

    constructor(private context: vscode.ExtensionContext) {}

    /**
     * Start the glitch effect
     */
    public async start(): Promise<void> {
        if (this.isActive) {
            return;
        }

        try {
            this.isActive = true;
            this.createDecorationType();
            this.startGlitchLoop();
        } catch (error) {
            this.isActive = false;
            throw new Error(`Failed to start glitch effect: ${error}`);
        }
    }

    /**
     * Stop the glitch effect
     */
    public async stop(): Promise<void> {
        this.isActive = false;
        
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
            this.glitchInterval = undefined;
        }
        
        if (this.decorationType) {
            this.decorationType.dispose();
            this.decorationType = undefined;
        }
        
        // Clear all decorations
        vscode.window.visibleTextEditors.forEach(editor => {
            editor.setDecorations(this.decorationType!, []);
        });
    }

    /**
     * Check if glitch effect is running
     */
    public isRunning(): boolean {
        return this.isActive;
    }

    /**
     * Update configuration and restart if needed
     */
    public async updateConfiguration(): Promise<void> {
        if (this.isActive) {
            await this.stop();
            await this.start();
        }
    }

    /**
     * Create decoration type for glitch effect
     */
    private createDecorationType(): void {
        const config = vscode.workspace.getConfiguration('matrixTheme');
        const intensity = config.get<number>('glitch.intensity', 0.3);
        
        this.decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: `rgba(0, 255, 65, ${intensity * 0.1})`,
            color: Constants.COLORS.MATRIX_GREEN,
            textDecoration: `none; text-shadow: 2px 0 ${Constants.COLORS.MATRIX_GREEN}, -2px 0 ${Constants.COLORS.MATRIX_LIGHT_GREEN}`,
            border: `1px solid rgba(0, 255, 65, ${intensity})`,
            borderRadius: '2px'
        });
    }

    /**
     * Start the glitch loop
     */
    private startGlitchLoop(): void {
        const config = vscode.workspace.getConfiguration('matrixTheme');
        const intensity = config.get<number>('glitch.intensity', 0.3);
        const interval = Math.max(100, 1000 - (intensity * 800)); // More intensity = faster glitches
        
        this.glitchInterval = setInterval(() => {
            if (!this.isActive) {
                return;
            }
            this.applyGlitchEffect();
        }, interval);
    }

    /**
     * Apply glitch effect to random parts of visible editors
     */
    private applyGlitchEffect(): void {
        if (!this.decorationType) {
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const lineCount = document.lineCount;
        
        if (lineCount === 0) {
            return;
        }

        // Clear previous decorations
        editor.setDecorations(this.decorationType, []);

        // Apply new glitch decorations
        const config = vscode.workspace.getConfiguration('matrixTheme');
        const intensity = config.get<number>('glitch.intensity', 0.3);
        const glitchCount = Math.floor(intensity * 10) + 1;
        
        const decorations: vscode.DecorationOptions[] = [];
        
        for (let i = 0; i < glitchCount; i++) {
            const randomLine = Math.floor(Math.random() * lineCount);
            const line = document.lineAt(randomLine);
            
            if (line.text.length === 0) {
                continue;
            }
            
            const startChar = Math.floor(Math.random() * line.text.length);
            const endChar = Math.min(
                startChar + Math.floor(Math.random() * 10) + 1,
                line.text.length
            );
            
            const range = new vscode.Range(
                randomLine,
                startChar,
                randomLine,
                endChar
            );
            
            decorations.push({
                range,
                hoverMessage: 'Matrix glitch detected'
            });
        }
        
        editor.setDecorations(this.decorationType, decorations);
        
        // Remove decorations after a short time
        setTimeout(() => {
            if (this.decorationType && this.isActive) {
                editor.setDecorations(this.decorationType, []);
            }
        }, 200 + Math.random() * 300);
    }

    /**
     * Dispose of resources
     */
    public dispose(): void {
        this.stop();
    }
}