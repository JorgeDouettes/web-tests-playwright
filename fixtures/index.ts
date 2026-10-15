import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';

type Fixtures = {
  loginpage: LoginPage;
  accountpage: AccountPage;
  homepage: HomePage;
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

  homepage: async ({ page }, use) => {
    const homepage = new HomePage(page);
    await homepage.goto();
    await use(homepage);
  },
});
export { expect } from '@playwright/test';
