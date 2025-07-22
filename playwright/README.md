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

## More Info

- [Playwright Docs](https://playwright.dev/)
