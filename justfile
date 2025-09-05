# List available commands
default:
    @just --list

# Build the project for production
build:
    pnpm build

# Start development server
develop:
    pnpm dev

# Run type checking
check:
    pnpm check

# Format code
format:
    pnpm format

# Check formatting
format-check:
    pnpm format:check

# Run all checks (format check and type check)
check-all: format-check check