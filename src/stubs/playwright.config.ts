import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test'

// docs: https://playwright.dev/docs/test-configuration
export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests/e2e',
  use: {
    baseURL: process.env.APP_URL,
    testIdAttribute: 'data-pw',
    trace: 'on-first-retry',
  },
  workers: process.env.CI ? 1 : undefined,

  // configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // test against branded browsers.
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
})