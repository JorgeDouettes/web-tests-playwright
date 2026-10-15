import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchCaption: Locator;
  readonly countResult: Locator;
  readonly resultShearch: Locator;
  readonly productNames: Locator;
  readonly noResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
    this.countResult = page.getByTestId('search-result-count');
    this.resultShearch = page.getByTestId('search_completed');
    this.productNames = page.getByTestId('product-name');
    this.noResults = page.getByTestId('no-results');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(search: string) {
    await this.searchInput.fill(search);
    const searchResponse = this.page.waitForResponse(
      (r) => r.url().includes('/products/search') && r.ok(),
    );
    await this.searchButton.click();
    await searchResponse;
  }
}
