# Playwright End-to-End Tests for Portfolio

This directory contains Playwright tests for the Portfolio Angular application.

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   npm run install-browsers
   ```

2. Start your Angular app (in a separate terminal):

   ```sh
   cd ..
   npm start
   # or
   ng serve
   ```

3. Run tests:
   ```sh
   npm test
   ```

## Useful Commands

- `npm run test:headed` - Run tests in headed mode (see the browser)
- `npm run test:ui` - Use Playwright's UI test runner
- `npm run test:debug` - Debug tests interactively
- `npm run test:report` - Show the HTML report
- `npm run codegen` - Use Playwright's codegen tool for test scaffolding

## Test Structure

- All tests are in the `tests/` folder.
- Configuration is in `playwright.config.ts`.

## GitHub Actions Workflows

### 🧪 E2E Tests (`e2e-tests.yml`)

- **Triggers**: Pull requests, pushes to main, manual dispatch
- **Purpose**: Comprehensive testing on multiple browsers
- **Environments**:
  - Production (for main branch pushes)
  - Local staging server (for pull requests)
- **Browsers**: Chromium, Mobile Chrome

### 🌙 Nightly E2E Tests (`e2e-nightly.yml`)

- **Triggers**: Daily at 2:00 AM UTC, manual dispatch
- **Purpose**: Continuous monitoring of production environment
- **Environment**: Production (`https://portfolio.nergy.space`)
- **Features**:
  - Runs against live production site
  - Uploads test artifacts for 30 days
  - Automatic failure notifications
  - Comprehensive browser testing

## Test Configuration

The tests automatically adapt based on the environment:

- **Local Development**: Runs against `http://localhost:4200`
- **CI/Production**: Runs against `https://portfolio.nergy.space`
- **Staging**: Can be configured to run against local server in CI

## More Info

- [Playwright Docs](https://playwright.dev/)
- [GitHub Actions Workflows](../.github/workflows/)
