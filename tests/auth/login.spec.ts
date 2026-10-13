import { test, expect } from '../../fixtures';

test.describe('Login', () => {
  test('AUTH-01 login válido redireciona para a conta', async ({
    page,
    loginpage,
    accountpage,
  }) => {
    await loginpage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL(/account/);
    await expect(accountpage.pageTitle).toHaveText('My account');
  });

  test('AUTH-02 login inválido mantem na página', async ({ page, loginpage }) => {
    await loginpage.login('teste@teste.com', 'teste123');
    await expect(loginpage.errorMessage).toHaveText('Invalid email or password');
    await expect(page).toHaveURL(/login/);
  });

  test('AUTH-03 login com email no formato inválido', async ({ loginpage }) => {
    await loginpage.login('testeteste123', 'test123');
    await expect(loginpage.emailError).toHaveText('Email format is invalid');
  });

  test('AUTH-04 campos vazios exibem mensagens de obrigatório', async ({ loginpage }) => {
    await loginpage.login('', '');
    await expect(loginpage.emailError).toHaveText('Email is required');
    await expect(loginpage.passwordError).toHaveText('Password is required');
  });
});
