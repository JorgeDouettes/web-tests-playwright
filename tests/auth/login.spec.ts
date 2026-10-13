import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('AUTH-01 login válido redireciona para a conta', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL(/account/);
    await expect(accountPage.pageTitle).toHaveText('My account');
  });

  test('AUTH-02 login inválido mantem na página', async ({ page }) => {
    await loginPage.login('teste@teste.com', 'teste123');
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
    await expect(page).toHaveURL(/login/);
  });

  test('AUTH-03 login com email no formato inválido', async () => {
    await loginPage.login('testeteste123', 'test123');
    await expect(loginPage.emailError).toHaveText('Email format is invalid');
  });

  test('AUTH-04 campos vazios exibem mensagens de obrigatório', async () => {
    await loginPage.login('', '');
    await expect(loginPage.emailError).toHaveText('Email is required');
    await expect(loginPage.passwordError).toHaveText('Password is required');
  });
});
