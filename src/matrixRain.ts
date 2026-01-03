import * as vscode from 'vscode';
import { Constants } from './constants';

/**
 * Manages the Matrix rain effect in the editor
 */
export class MatrixRainManager {
    private webviewPanel: vscode.WebviewPanel | undefined;
    private rainInterval: NodeJS.Timeout | undefined;
    private isActive: boolean = false;

    constructor(private context: vscode.ExtensionContext) {}

    /**
     * Start the matrix rain effect
     */
    public async start(): Promise<void> {
        if (this.isActive) {
            return;
        }

        try {
            this.isActive = true;
            await this.createRainWebview();
        } catch (error) {
            this.isActive = false;
            throw new Error(`Failed to start rain effect: ${error}`);
        }
    }

    /**
     * Stop the matrix rain effect
     */
    public async stop(): Promise<void> {
        this.isActive = false;
        
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
            this.rainInterval = undefined;
        }
        
        if (this.webviewPanel) {
            this.webviewPanel.dispose();
            this.webviewPanel = undefined;
        }
    }

    /**
     * Check if rain effect is running
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
     * Create the webview panel for rain effect
     */
    private async createRainWebview(): Promise<void> {
        this.webviewPanel = vscode.window.createWebviewPanel(
            'matrixRain',
            'Matrix Rain',
            {
                viewColumn: vscode.ViewColumn.Beside,
                preserveFocus: true
            },
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        // Set webview content
        this.webviewPanel.webview.html = this.getWebviewContent();

        // Handle webview disposal
        this.webviewPanel.onDidDispose(() => {
            this.webviewPanel = undefined;
            this.isActive = false;
        });

        // Handle messages from webview
        this.webviewPanel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'rainStopped':
                        this.isActive = false;
                        break;
                }
            },
            undefined,
            this.context.subscriptions
        );
    }

    /**
     * Generate HTML content for the rain webview
     */
    private getWebviewContent(): string {
        const config = vscode.workspace.getConfiguration('matrixTheme');
        const speed = config.get<number>('rainEffect.speed', 50);
        const density = config.get<number>('rainEffect.density', 0.8);
        const characters = config.get<string>('rainEffect.characters', Constants.DEFAULT_MATRIX_CHARS);

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrix Rain</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            overflow: hidden;
            font-family: 'Courier New', monospace;
        }
        
        canvas {
            display: block;
            background: #000;
        }
        
        .controls {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1000;
        }
        
        .control-btn {
            background: ${Constants.COLORS.MATRIX_GREEN};
            color: ${Constants.COLORS.MATRIX_BLACK};
            border: none;
            padding: 5px 10px;
            margin: 2px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            border-radius: 3px;
        }
        
        .control-btn:hover {
            background: ${Constants.COLORS.MATRIX_LIGHT_GREEN};
        }
    </style>
</head>
<body>
    <div class="controls">
        <button class="control-btn" onclick="toggleRain()">Toggle</button>
        <button class="control-btn" onclick="changeSpeed()">Speed</button>
    </div>
    <canvas id="canvas"></canvas>
    
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        let animationId;
        let isRunning = true;
        let speed = ${speed};
        let density = ${density};
        const characters = '${characters}'.split('');
        
        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Matrix rain variables
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(0);
        
        // Matrix rain animation
        function draw() {
            if (!isRunning) return;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '${Constants.COLORS.MATRIX_GREEN}';
            ctx.font = fontSize + 'px Courier New';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                ctx.fillText(text, x, y);
                
                if (y > canvas.height && Math.random() > 1 - density) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
            
            setTimeout(() => {
                animationId = requestAnimationFrame(draw);
            }, speed);
        }
        
        function toggleRain() {
            isRunning = !isRunning;
            if (isRunning) {
                draw();
            } else {
                cancelAnimationFrame(animationId);
            }
        }
        
        function changeSpeed() {
            speed = speed === 50 ? 25 : speed === 25 ? 100 : 50;
        }
        
        // Start the animation
        draw();
        
        // Handle window messages
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'updateConfig':
                    speed = message.speed || speed;
                    density = message.density || density;
                    break;
            }
        });
    </script>
</body>
</html>`;
    }

    /**
     * Dispose of resources
     */
    public dispose(): void {
        this.stop();
    }
}