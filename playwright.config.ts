import { defineConfig, devices } from "@playwright/test";

// End-to-end checks against the production build (`next build` first).
//   npm run build && npm run test:e2e
// CI runs the same thing on every push (.github/workflows/ci.yml).
const PORT = 3100;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // A machine with its own browser (no `playwright install`) can point at
    // it: PW_CHROMIUM_PATH=/path/to/headless_shell npm run test:e2e. Use the
    // headless shell, like CI: it renders slightly differently from full
    // Chrome (a 2px overflow once showed up in one and not the other).
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
