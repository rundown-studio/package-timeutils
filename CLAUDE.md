# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@rundown-studio/timeutils** is a timezone-aware date/time utility library for the Rundown Studio broadcast production management system. It provides robust handling of timezone operations, DST transitions, and time formatting for scheduling and coordination across different regions.

Published to GitHub Packages: `@rundown-studio/timeutils`

## Essential Commands

### Testing
```bash
# Run all tests (sequential across 4 timezones)
npm test

# Run tests in specific timezone
npm run test:UTC          # UTC timezone
npm run test:LA           # America/Los_Angeles
npm run test:BER          # Europe/Berlin
npm run test:SYD          # Australia/Sydney

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with UI
npm run test:ui

# Run a specific test file
TZ='UTC' vitest run roundMsToSeconds
```

### Building & Linting
```bash
# Build TypeScript to dist/ (both ESM and CJS)
npm run build

# Lint and auto-fix code
npm run lint
```

## Architecture Overview

### Core Design Principles

**Timezone-First Architecture**: Almost every function accepts an optional `timezone` parameter (IANA timezone format like 'America/New_York', default: 'UTC'). All dates are stored/returned as UTC with timezone operations applied on-the-fly.

**DST Awareness**: The library accounts for Daylight Saving Time transitions using `Intl.DateTimeFormat` for offset calculations. This is why tests run in 4 different timezones to catch region-specific edge cases.

**Date Manipulation Pattern**: UTC → Convert to Timezone → Calculate → Convert back to UTC

### Key Technical Patterns

1. **Module System Duality**: Uses tsup to generate both CommonJS (`.cjs`) and ES Module (`.js`) outputs with corresponding TypeScript definitions

2. **Test Strategy**: Tests are written in TypeScript and import directly from source files. Vitest handles TypeScript natively. All tests run in 4 timezones sequentially via npm scripts

3. **Small Single-Responsibility Functions**: Each utility does one thing well. Functions compose on each other (e.g., `moveAfter` uses `applyDate` and `addDays`)

4. **Type Safety**: Depends on `@rundown-studio/types` for shared types. Strict TypeScript mode enabled

### Function Categories

- **Formatting** (4): `format`, `formatTimeOfDay`, `formatTimezone`, `formatCalendarDate`
- **Parsing & Conversion** (3): `parse`, `hmsToMilliseconds`, `millisecondsToHms`
- **Timezone Operations** (3): `getTimezoneOffset`, `getStartOfDay`, `isSameDay`
- **Date Manipulation** (4): `addDays`, `applyDate`, `moveAfter`, `moveAfterWithTolerance`
- **Time Rounding** (1): `roundMsToSeconds`

All functions are exported from `src/index.ts`.

## Code Quality Requirements

### ESLint Rules (Auto-fixed via `npm run lint`)

- **No semicolons** at end of statements
- **Single quotes** for strings (not double quotes)
- **Trailing commas** always required in multi-line arrays/objects
- **Spaces before function parentheses** required
- **2-space indentation** with SwitchCase: 1
- **1tbs brace style** (one true brace style)
- **Object curly spacing** required

**IMPORTANT**: Always run `npm run lint` after making code changes to ensure compliance with ESLint rules.

## Development Workflow

### Adding New Utilities

1. Create the utility function in `src/`
2. Add comprehensive JSDoc comments with:
   - Parameter descriptions with types
   - Return value documentation
   - Usage examples
   - Special notes about DST/timezone handling
3. Export from `src/index.ts`
4. Create test file in `tests/` as TypeScript (`.test.ts`)
5. Test: `npm test` (verifies all 4 timezones)
6. Lint: `npm run lint`

### Testing Gotchas

- Tests are written in **TypeScript** (`.test.ts` files)
- Tests use **Vitest** assertions (`expect(...).toBe()`, `expect(...).toEqual()`)
- Tests import directly from `src/` (no build required)
- Vitest handles TypeScript natively, no transpilation needed
- Math.round() edge case: `Math.round(-0.5)` returns `-0`, not `-1` (JavaScript behavior)
- `.toBe()` uses `Object.is()` which distinguishes between `0` and `-0`

### Build System

**tsup** (for production builds):
- Entry point: `src/index.ts`
- Output: `dist/index.js` (ESM), `dist/index.cjs` (CommonJS)
- TypeScript definitions: `dist/index.d.ts`, `dist/index.d.cts`
- Clean builds enabled (removes dist/ before building)

**Vitest** (for testing):
- Native TypeScript support (no build required for tests)
- Test files: `tests/**/*.test.ts`
- Config: `vitest.config.ts`
- Built-in assertions and mocking
- Watch mode and UI available

## Key Dependencies

- **date-fns** (v4.1.0): Core date manipulation
- **@date-fns/tz** (v1.1.2): Timezone support
- **@rundown-studio/types** (v0.7.1): Shared type definitions (external package)

## Publishing

Publishing is automated via GitHub Actions on version tags:
1. Push a git tag (e.g., `v0.6.2`)
2. GitHub Action runs: build → test (4 timezones) → publish to GitHub Packages
3. Package published to `npm.pkg.github.com`

## Special Considerations

- **Timezone Database**: Uses IANA timezone names (not abbreviations like 'PST')
- **Timezone Abbreviations**: Mappings available in `src/consts/timezoneAbbreviations.ts` (400+ entries)
- **DST Transitions**: Use `addDays()` for DST-aware date arithmetic (not simple ms addition)
- **Browser Compatibility**: Uses `Intl.DateTimeFormat` for timezone offset detection
- **CI Testing**: GitHub Actions run tests in parallel across 4 timezones to catch edge cases
