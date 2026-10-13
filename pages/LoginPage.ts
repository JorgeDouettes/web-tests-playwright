import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly login: Locator;
  readonly password: Locator;
  readonly buttonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.login = page.getByLabel('Email address');
    this.password = page.getByLabel('Password *');
    this.buttonLogin = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('auth/login');
  }

  async fluxologin(email: string, password: string) {
    await this.login.fill(email);
    await this.password.fill(password);
    await this.buttonLogin.click();
  }
}
