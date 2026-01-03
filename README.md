# Matrix Theme 🕶️

> Enter the Matrix with animated rain effects, customizable green terminals, and an immersive cyberpunk coding experience.

[![Version](https://img.shields.io/vscode-marketplace/v/your-publisher.matrix-theme.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher.matrix-theme)
[![Downloads](https://img.shields.io/vscode-marketplace/d/your-publisher.matrix-theme.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher.matrix-theme)
[![Rating](https://img.shields.io/vscode-marketplace/r/your-publisher.matrix-theme.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher.matrix-theme)

## ✨ Features

### 🌧️ Matrix Rain Effect
- Animated falling characters in a separate webview panel
- Customizable speed, density, and character sets
- Toggle on/off with keyboard shortcut (`Ctrl+Shift+M`)
- Real-time configuration updates

### 🖥️ Matrix Terminal
- Custom Matrix-themed terminal with green color scheme
- Pre-loaded with Matrix-inspired commands (`neo`, `redpill`, `bluepill`, etc.)
- Immersive welcome message with ASCII art
- Custom prompt styling

### ⚡ Glitch Effects
- Random text glitching effects in the editor
- Configurable intensity and frequency
- Subtle visual distortions for that authentic Matrix feel

### 🎨 Dual Themes
- **Matrix Dark**: Classic black and green Matrix aesthetic
- **Matrix Green**: Brighter green variant for better readability
- Comprehensive syntax highlighting for all major languages

### 🎮 Matrix Mode
- One-click activation of all effects simultaneously
- Status bar integration with real-time indicators
- Seamless theme switching

## 🚀 Getting Started

### Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Matrix Theme"
4. Click Install

### Quick Start

1. **Enter the Matrix**: Press `Ctrl+Alt+M` or use Command Palette → "Matrix: Enter the Matrix"
2. **Toggle Rain Effect**: Press `Ctrl+Shift+M` or use Command Palette → "Matrix: Toggle Rain Effect"
3. **Open Matrix Terminal**: Use Command Palette → "Matrix: Open Matrix Terminal"

## ⚙️ Configuration

Customize your Matrix experience through VS Code settings:

```json
{
  "matrixTheme.rainEffect.enabled": true,
  "matrixTheme.rainEffect.speed": 50,
  "matrixTheme.rainEffect.density": 0.8,
  "matrixTheme.rainEffect.characters": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?",
  "matrixTheme.terminal.greenMode": true,
  "matrixTheme.glitch.enabled": false,
  "matrixTheme.glitch.intensity": 0.3
}
```

### Settings Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `matrixTheme.rainEffect.enabled` | boolean | `true` | Enable the matrix rain effect |
| `matrixTheme.rainEffect.speed` | number | `50` | Speed of the rain effect (10-200ms) |
| `matrixTheme.rainEffect.density` | number | `0.8` | Density of falling characters (0.1-2.0) |
| `matrixTheme.rainEffect.characters` | string | Mixed chars | Characters used in the rain effect |
| `matrixTheme.terminal.greenMode` | boolean | `true` | Use green Matrix terminal colors |
| `matrixTheme.glitch.enabled` | boolean | `false` | Enable glitch effects |
| `matrixTheme.glitch.intensity` | number | `0.3` | Intensity of glitch effects (0.1-1.0) |

## 🎮 Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Matrix: Enter the Matrix | `Ctrl+Alt+M` | Activate full Matrix mode |
| Matrix: Exit the Matrix | - | Deactivate Matrix mode |
| Matrix: Toggle Rain Effect | `Ctrl+Shift+M` | Toggle the rain animation |
| Matrix: Open Matrix Terminal | - | Create a new Matrix terminal |
| Matrix: Toggle Glitch Effect | - | Toggle glitch effects |

## 🖥️ Matrix Terminal Commands

When you open a Matrix terminal, you get access to special commands:

- `neo` - Show the chosen one message
- `redpill` - Take the red pill
- `bluepill` - Take the blue pill
- `agents` - List system agents (processes)
- `zion` - Connect to Zion mainframe
- `oracle` - Consult the Oracle

## 🎨 Theme Variants

### Matrix Dark
The classic Matrix look with pure black background and bright green text. Perfect for that authentic "hacker" aesthetic.

### Matrix Green
A slightly brighter variant with better contrast for extended coding sessions while maintaining the Matrix feel.

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/your-publisher/matrix-theme.git
cd matrix-theme

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Package the extension
npm run package
```

### Testing

1. Open the project in VS Code
2. Press `F5` to open a new Extension Development Host window
3. Test the extension features

## 🐛 Known Issues

- Rain effect may impact performance on older machines
- Glitch effects might interfere with some syntax highlighting themes
- Terminal customization requires VS Code restart in some cases

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the iconic Matrix movie trilogy
- Thanks to the VS Code team for the excellent extension API
- Special thanks to all contributors and users

## 📞 Support

If you encounter any issues or have questions:

- 🐛 [Report a bug](https://github.com/your-publisher/matrix-theme/issues)
- 💡 [Request a feature](https://github.com/your-publisher/matrix-theme/issues)
- 💬 [Join the discussion](https://github.com/your-publisher/matrix-theme/discussions)

---

**Remember**: There is no spoon. 🥄

*"Welcome to the real world."* - Morpheus