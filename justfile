# Set shell for all commands
set shell := ["bash", "-cue"]

# Default recipe to list all available commands
default:
    @just --list

# Install dependencies
install:
    pnpm install

# Start development server
serve:
    pnpm dev

# Build for production
build:
    pnpm build

# Preview production build
preview:
    pnpm preview

# Run type checking
typecheck:
    pnpm check

# Run linting
lint:
    pnpm lint

# Format code
format:
    pnpm format

# Clean build artifacts
clean:
    rm -rf .svelte-kit
    rm -rf build
    rm -rf dist
