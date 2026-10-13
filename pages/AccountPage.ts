import type { Page, Locator } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
  }
}
