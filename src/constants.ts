/**
 * Constants used throughout the Matrix Theme extension
 */
export class Constants {
    /**
     * Command identifiers
     */
    public static readonly COMMANDS = {
        TOGGLE_RAIN: 'matrix-theme.toggleRain',
        ENTER_MATRIX: 'matrix-theme.enterMatrix',
        EXIT_MATRIX: 'matrix-theme.exitMatrix',
        SHOW_TERMINAL: 'matrix-theme.showMatrixTerminal',
        TOGGLE_GLITCH: 'matrix-theme.toggleGlitch'
    } as const;

    /**
     * Configuration keys
     */
    public static readonly CONFIG = {
        RAIN_ENABLED: 'matrixTheme.rainEffect.enabled',
        RAIN_SPEED: 'matrixTheme.rainEffect.speed',
        RAIN_DENSITY: 'matrixTheme.rainEffect.density',
        RAIN_CHARACTERS: 'matrixTheme.rainEffect.characters',
        TERMINAL_GREEN_MODE: 'matrixTheme.terminal.greenMode',
        GLITCH_ENABLED: 'matrixTheme.glitch.enabled',
        GLITCH_INTENSITY: 'matrixTheme.glitch.intensity'
    } as const;

    /**
     * Default matrix characters
     */
    public static readonly DEFAULT_MATRIX_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    /**
     * Matrix green color palette
     */
    public static readonly COLORS = {
        MATRIX_GREEN: '#00ff41',
        MATRIX_DARK_GREEN: '#008f11',
        MATRIX_LIGHT_GREEN: '#65ff00',
        MATRIX_BLACK: '#000000',
        MATRIX_DARK_GRAY: '#001100'
    } as const;

    /**
     * Status bar item priorities
     */
    public static readonly STATUS_BAR_PRIORITY = 100;
}