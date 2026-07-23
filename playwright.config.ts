import { defineConfig, devices } from '@playwright/test';

/**
 * E2E test configuration. Runs against a production build served
 * locally so results reflect what actually ships, not the dev server.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Disable entrance animations so axe reads settled (full-opacity)
    // elements instead of mid-transition ones — otherwise color-contrast
    // checks flake. The app honors prefers-reduced-motion, so this also
    // mirrors a real accessibility setting.
    reducedMotion: 'reduce',
    // Dark is the site's primary theme; pin the OS preference to dark so
    // the default-theme assertions are deterministic. A dedicated test
    // covers the OS-light-preference path explicitly.
    colorScheme: 'dark',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
