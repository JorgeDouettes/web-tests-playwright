import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

type Fixtures = {
  loginpage: LoginPage;
  accountpage: AccountPage;
};

export const test = base.extend<Fixtures>({
  loginpage: async ({ page }, use) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await use(loginpage);
  },

  accountpage: async ({ page }, use) => {
    const accountpage = new AccountPage(page);
    await use(accountpage);
  },
});
export { expect } from '@playwright/test';
