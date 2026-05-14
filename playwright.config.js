const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3001',
    headless: true,
  },
  webServer: {
    command: 'npx serve . -p 3001 -s',
    port: 3001,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
