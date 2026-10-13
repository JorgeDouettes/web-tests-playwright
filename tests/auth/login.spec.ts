import { LoginPage } from '../../pages/LoginPage';
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('deve fazer login com credenciais válidas', async ({ page }) => {
    await loginPage.fluxologin('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL(/account/);
  });
});
