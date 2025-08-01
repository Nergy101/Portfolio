import path from "node:path";

import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env"), quiet: true });

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: 2,
    workers: process.env['CI'] ? 1 : 2,
    reporter: [
        ["html"],
        ["json", { outputFile: "test-results.json" }],
        ["junit", { outputFile: "test-results.xml" }],
    ],
    timeout: 30000,
    expect: {
        timeout: 30000,
    },
    use: {
        baseURL: process.env['CI']
            ? "https://portfolio.nergy.space"
            : "http://localhost:4200",
        trace: "on-first-retry",
        navigationTimeout: 10000,
        actionTimeout: 10000,
        storageState: {
            cookies: [],
            origins: [
                {
                    origin: process.env['CI']
                        ? "https://portfolio.nergy.space"
                        : "http://localhost:4200",
                    localStorage: [
                        {
                            name: "umami.disabled",
                            value: "1",
                        },
                    ],
                },
            ],
        },
    },
    projects:
      process.env['CI'] ?
       [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
        },
        {
            name: "Safari",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"] },
        },
    ] : [
      {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
    },
    {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
    },
    {
        name: "Mobile Chrome",
        use: { ...devices["Pixel 5"] },
    },
    ],
    outputDir: "test-results",
    ...(process.env['CI'] ? {} : {
        webServer: {
            command: "npm run start",
            cwd: path.join(__dirname, ".."),
            url: "http://localhost:4200",
            reuseExistingServer: true,
        },
    }),
}); 
