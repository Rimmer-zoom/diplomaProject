import { test, expect } from '@playwright/test';

test('registration', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/,');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Ilya');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('Rimmer202@mail.ru');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Toshka5454');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Ilya')).toBeVisible();
});