import { test, expect } from '../../fixtures';
import { randomSerch } from '../../utils/testData';

test.describe('Catalog search', () => {
  test('CAT-01 Buscar por termo existente e valida retorno', async ({ homepage }) => {
    const search = 'pliers';
    await homepage.search(search);

    await expect(homepage.searchCaption).toContainText(search, { ignoreCase: true });
    await expect(homepage.productNames.first()).toBeVisible();
    await expect(homepage.productNames.filter({ hasNotText: new RegExp(search, 'i') })).toHaveCount(
      0,
    );
  });

  test('CAT-02 Busca por termo invalido e retorna uma lista vazia', async ({ homepage }) => {
    const search = randomSerch();
    await homepage.search(search);

    await expect(homepage.searchCaption).toContainText(search, { ignoreCase: true });
    await expect(homepage.noResults).toHaveText('There are no products found.');
  });
});
