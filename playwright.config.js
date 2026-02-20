import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration with Allure
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Allure Reporter + HTML reporter
  reporter: [
    ['html', { open: 'never' }], 
    ['allure-playwright', {
      outputFolder: 'allure-results',  // сюда будут складываться результаты последнего прогона
      detail: true,
      suiteTitle: true
    }]
  ],

  use: {
    trace: 'on-first-retry',            // трассировка при первой попытке
    screenshot: 'only-on-failure',      // скриншоты при падении
    video: 'retain-on-failure',         // видео при падении
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    // UI проект для Chromium
    {
      name: 'ui-chromium',
      
      use: { ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL || 'https://realworld.qa.guru/',
       },
    },

    // API проект
    {
      name: 'api',
      
      use: { 
        baseURL: 'https://petstore.swagger.io/v2',
        trace: 'off',            // API тесты не нуждаются в трейсе
        screenshot: 'off',
        video: 'off'
      }
    },

    // Дополнительно можно раскомментировать и добавить Firefox / Webkit
    // {
    //   name: 'ui-firefox',
    //   testDir: 'tests/ui',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'ui-webkit',
    //   testDir: 'tests/ui',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
