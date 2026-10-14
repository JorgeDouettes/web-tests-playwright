import { test, expect } from '../../fixtures';
import { env } from '../../config/env';
import { validEmail, randomPassword, invalidEmail } from '../../utils/testData';

test.describe('Login', () => {
  test('AUTH-01 login válido redireciona para a conta', async ({
    page,
    loginpage,
    accountpage,
  }) => {
    await loginpage.login(env.email, env.password);
    await expect(page).toHaveURL(/account/);
    await expect(accountpage.pageTitle).toHaveText('My account');
  });

  test('AUTH-02 login inválido mantem na página', async ({ page, loginpage }) => {
    const email = validEmail();
    const password = randomPassword();
    await loginpage.login(email, password);
    await expect(loginpage.errorMessage).toHaveText('Invalid email or password');
    await expect(page).toHaveURL(/login/);
  });

  test('AUTH-03 login com email no formato inválido', async ({ loginpage }) => {
    const email = invalidEmail();
    const password = randomPassword();
    await loginpage.login(email, password);
    await expect(loginpage.emailError).toHaveText('Email format is invalid');
  });

  test('AUTH-04 campos vazios exibem mensagens de obrigatório', async ({ loginpage }) => {
    await loginpage.login('', '');
    await expect(loginpage.emailError).toHaveText('Email is required');
    await expect(loginpage.passwordError).toHaveText('Password is required');
  });
});
