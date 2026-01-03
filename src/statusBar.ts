import * as vscode from 'vscode';
import { Constants } from './constants';

/**
 * Manages the Matrix theme status bar item
 */
export class MatrixStatusBar {
    private statusBarItem: vscode.StatusBarItem;
    private isMatrixMode: boolean = false;
    private isRainActive: boolean = false;

    constructor(private context: vscode.ExtensionContext) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            Constants.STATUS_BAR_PRIORITY
        );
        
        this.statusBarItem.command = Constants.COMMANDS.ENTER_MATRIX;
        this.context.subscriptions.push(this.statusBarItem);
        
        this.updateDisplay();
    }

    /**
     * Show the status bar item
     */
    public show(): void {
        this.statusBarItem.show();
    }

    /**
     * Hide the status bar item
     */
    public hide(): void {
        this.statusBarItem.hide();
    }

    /**
     * Update Matrix mode status
     */
    public updateMatrixMode(isActive: boolean): void {
        this.isMatrixMode = isActive;
        this.statusBarItem.command = isActive 
            ? Constants.COMMANDS.EXIT_MATRIX 
            : Constants.COMMANDS.ENTER_MATRIX;
        this.updateDisplay();
    }

    /**
     * Update rain effect status
     */
    public updateRainStatus(isActive: boolean): void {
        this.isRainActive = isActive;
        this.updateDisplay();
    }

    /**
     * Update the status bar display
     */
    private updateDisplay(): void {
        let text = '🕶️';
        let tooltip = 'Matrix Theme';
        
        if (this.isMatrixMode) {
            text += ' MATRIX';
            tooltip = 'Click to exit the Matrix';
        } else {
            text += ' Matrix';
            tooltip = 'Click to enter the Matrix';
        }
        
        if (this.isRainActive) {
            text += ' 🌧️';
            tooltip += ' (Rain active)';
        }
        
        this.statusBarItem.text = text;
        this.statusBarItem.tooltip = tooltip;
    }

    /**
     * Set status bar color
     */
    public setColor(color: string): void {
        this.statusBarItem.color = color;
    }

    /**
     * Dispose of resources
     */
    public dispose(): void {
        this.statusBarItem.dispose();
    }
}