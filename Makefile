# Matrix Theme Extension Makefile
# Provides convenient commands for development, building, and publishing

.PHONY: help install clean build watch test lint package publish dev setup

# Default target
help:
	@echo "Matrix Theme Extension - Available commands:"
	@echo ""
	@echo "  setup     - Initial project setup (install dependencies)"
	@echo "  install   - Install dependencies"
	@echo "  build     - Compile TypeScript"
	@echo "  watch     - Watch for changes and compile"
	@echo "  clean     - Clean build artifacts"
	@echo "  lint      - Run ESLint"
	@echo "  test      - Run tests"
	@echo "  package   - Create VSIX package"
	@echo "  publish   - Publish to marketplace"
	@echo "  dev       - Start development mode (watch + debug)"
	@echo "  help      - Show this help message"
	@echo ""
	@echo "Quick start: make setup && make dev"

# Initial project setup
setup: install
	@echo "✅ Matrix Theme setup complete!"
	@echo "Run 'make dev' to start development mode"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf out/
	rm -rf dist/
	rm -rf *.vsix
	@echo "✅ Clean complete"

# Compile TypeScript
build: clean
	@echo "🔨 Building Matrix Theme..."
	npm run compile
	@echo "✅ Build complete"

# Watch for changes
watch:
	@echo "👀 Watching for changes..."
	@echo "Press Ctrl+C to stop"
	npm run watch

# Run linter
lint:
	@echo "🔍 Running ESLint..."
	npm run lint

# Run tests
test: build
	@echo "🧪 Running tests..."
	@echo "Tests not implemented yet"

# Create VSIX package
package: build lint
	@echo "📦 Creating VSIX package..."
	npm run package
	@echo "✅ Package created successfully"
	@ls -la *.vsix 2>/dev/null || echo "No VSIX files found"

# Publish to marketplace
publish: package
	@echo "🚀 Publishing to VS Code Marketplace..."
	@echo "⚠️  Make sure you're logged in with 'vsce login'"
	@read -p "Continue with publish? [y/N] " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo ""; \
		vsce publish; \
	else \
		echo ""; \
		echo "❌ Publish cancelled"; \
	fi

# Development mode
dev: install
	@echo "🚀 Starting Matrix Theme development mode..."
	@echo "This will:"
	@echo "  1. Compile TypeScript"
	@echo "  2. Start watch mode"
	@echo "  3. Open VS Code for debugging"
	@echo ""
	@echo "Press F5 in VS Code to launch Extension Development Host"
	@echo "Press Ctrl+C to stop watch mode"
	@echo ""
	npm run compile && code . && npm run watch

# Install extension locally for testing
install-local: package
	@echo "📥 Installing extension locally..."
	@VSIX_FILE=$$(ls -t *.vsix 2>/dev/null | head -1); \
	if [ -n "$$VSIX_FILE" ]; then \
		echo "Installing $$VSIX_FILE..."; \
		code --install-extension "$$VSIX_FILE"; \
		echo "✅ Extension installed locally"; \
	else \
		echo "❌ No VSIX file found. Run 'make package' first."; \
		exit 1; \
	fi

# Uninstall local extension
uninstall-local:
	@echo "🗑️  Uninstalling local extension..."
	code --uninstall-extension your-publisher.matrix-theme
	@echo "✅ Extension uninstalled"

# Show extension info
info:
	@echo "🕶️  Matrix Theme Extension Information"
	@echo "====================================="
	@echo "Name: Matrix Theme"
	@echo "ID: your-publisher.matrix-theme"
	@echo "Version: $$(node -p "require('./package.json').version")"
	@echo "Description: $$(node -p "require('./package.json').description")"
	@echo ""
	@echo "📁 Project Structure:"
	@find . -name "*.ts" -o -name "*.json" -o -name "*.md" | grep -E "\.(ts|json|md)$$" | head -20
	@echo ""
	@echo "📊 Project Stats:"
	@echo "TypeScript files: $$(find src -name "*.ts" | wc -l)"
	@echo "Total lines of code: $$(find src -name "*.ts" -exec cat {} \; | wc -l)"

# Validate package.json and other configs
validate:
	@echo "✅ Validating configuration files..."
	@echo "Checking package.json..."
	@node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('✅ package.json is valid');"
	@echo "Checking tsconfig.json..."
	@node -e "JSON.parse(require('fs').readFileSync('tsconfig.json', 'utf8')); console.log('✅ tsconfig.json is valid');"
	@echo "Checking themes..."
	@node -e "JSON.parse(require('fs').readFileSync('themes/matrix-dark.json', 'utf8')); console.log('✅ matrix-dark.json is valid');"
	@node -e "JSON.parse(require('fs').readFileSync('themes/matrix-green.json', 'utf8')); console.log('✅ matrix-green.json is valid');"
	@echo "✅ All configuration files are valid"

# Quick development cycle
quick: clean build install-local
	@echo "⚡ Quick development cycle complete!"
	@echo "Extension built, packaged, and installed locally."

# Show logs (if any)
logs:
	@echo "📋 Recent logs:"
	@echo "VS Code Extension Host logs:"
	@echo "(Check VS Code Developer Tools Console for runtime logs)"

# Check dependencies
deps:
	@echo "📦 Checking dependencies..."
	npm outdated || true
	@echo ""
	@echo "🔍 Security audit:"
	npm audit || true

# Update dependencies
update:
	@echo "⬆️  Updating dependencies..."
	npm update
	@echo "✅ Dependencies updated"

# Create a new release
release:
	@echo "🎉 Creating new release..."
	@echo "Current version: $$(node -p "require('./package.json').version")"
	@read -p "Enter new version (e.g., 0.1.0): " version; \
	npm version $$version; \
	make package; \
	echo "✅ Release $$version created"

# Emergency cleanup
emergency-clean:
	@echo "🚨 Emergency cleanup..."
	rm -rf node_modules/
	rm -rf out/
	rm -rf dist/
	rm -rf *.vsix
	rm -f package-lock.json
	@echo "✅ Emergency cleanup complete"
	@echo "Run 'make setup' to reinstall everything"