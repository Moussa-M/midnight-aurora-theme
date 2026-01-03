# Changelog

All notable changes to the Matrix Theme extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-01-XX

### Added
- 🎉 Initial release of Matrix Theme extension
- 🌧️ Matrix rain effect with animated falling characters
- 🖥️ Custom Matrix-themed terminals with pre-loaded commands
- ⚡ Optional glitch effects for editor text
- 🎨 Two theme variants: Matrix Dark and Matrix Green
- 🎮 Full Matrix mode with one-click activation
- ⚙️ Comprehensive configuration options
- 📊 Status bar integration with real-time indicators
- ⌨️ Keyboard shortcuts for quick access
- 🎯 Command palette integration

### Features
- **Rain Effect**:
  - Customizable speed (10-200ms)
  - Adjustable density (0.1-2.0)
  - Custom character sets
  - Real-time configuration updates
  - Toggle with `Ctrl+Shift+M`

- **Matrix Terminal**:
  - Green color scheme
  - Custom Matrix commands (`neo`, `redpill`, `bluepill`, etc.)
  - ASCII art welcome message
  - Custom prompt styling

- **Glitch Effects**:
  - Random text distortions
  - Configurable intensity
  - Non-intrusive visual effects

- **Themes**:
  - Matrix Dark: Classic black and green
  - Matrix Green: Enhanced readability variant
  - Comprehensive syntax highlighting
  - Support for all major programming languages

- **Matrix Mode**:
  - One-click activation with `Ctrl+Alt+M`
  - Enables all effects simultaneously
  - Automatic theme switching
  - Status bar indicators

### Commands Added
- `matrix-theme.toggleRain` - Toggle rain effect
- `matrix-theme.enterMatrix` - Enter full Matrix mode
- `matrix-theme.exitMatrix` - Exit Matrix mode
- `matrix-theme.showMatrixTerminal` - Open Matrix terminal
- `matrix-theme.toggleGlitch` - Toggle glitch effects

### Configuration Options
- `matrixTheme.rainEffect.enabled` - Enable/disable rain effect
- `matrixTheme.rainEffect.speed` - Rain animation speed
- `matrixTheme.rainEffect.density` - Character density
- `matrixTheme.rainEffect.characters` - Custom character set
- `matrixTheme.terminal.greenMode` - Terminal color mode
- `matrixTheme.glitch.enabled` - Enable/disable glitch effects
- `matrixTheme.glitch.intensity` - Glitch effect intensity

### Technical Details
- Built with TypeScript and modern ES2022+ features
- Comprehensive error handling and user feedback
- Modular architecture with separate managers for each feature
- Proper resource disposal and memory management
- Extensive JSDoc documentation
- VS Code Extension API best practices

### Known Issues
- Rain effect may impact performance on older machines
- Glitch effects might interfere with some syntax highlighting
- Terminal customization requires restart in some cases

---

**Note**: This is the initial release. Future versions will include bug fixes, performance improvements, and new features based on user feedback.

*"This is your last chance. After this, there is no going back."* - Morpheus