# Testes web com Playwright + TypeScript

Suíte de testes automatizados de UI para o [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com), uma loja de demonstração criada para treino de QA. O projeto é meu portfólio como **analista de automação de testes** e **está em construção**: a seção [Roadmap](#roadmap) mostra o que já foi feito e o que vem a seguir.

## Stack

- [Playwright](https://playwright.dev) `^1.64` com TypeScript (`strict`), rodando em **Chromium, Firefox e WebKit**
- Page Object Model + custom fixtures
- `@faker-js/faker` para dados de teste e `dotenv` para configuração por ambiente
- ESLint (com `eslint-plugin-playwright`), Prettier e `tsc --noEmit` como verificações de qualidade

## O que já está automatizado

O mapa completo com **49 cenários** priorizados está em [docs/cenarios.md](docs/cenarios.md). Hoje estão automatizados:

| ID      | Cenário                                                          | Arquivo                                        |
| ------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| AUTH-01 | Login válido redireciona para "My account"                       | [login.spec.ts](tests/auth/login.spec.ts)      |
| AUTH-02 | Login com senha incorreta exibe erro e permanece no login        | [login.spec.ts](tests/auth/login.spec.ts)      |
| AUTH-03 | E-mail em formato inválido exibe validação                       | [login.spec.ts](tests/auth/login.spec.ts)      |
| AUTH-04 | Campos vazios exibem mensagens de obrigatório                    | [login.spec.ts](tests/auth/login.spec.ts)      |
| CAT-01  | Busca por termo existente retorna os produtos esperados          | [search.spec.ts](tests/catalog/search.spec.ts) |
| CAT-02  | Busca por termo inexistente exibe "There are no products found." | [search.spec.ts](tests/catalog/search.spec.ts) |

## Decisões técnicas

- **Page Objects sem asserções.** As classes em [pages/](pages) descrevem ações do usuário (`login`, `search`). Quem decide o resultado esperado é o teste, então o mesmo método serve a cenários positivos e negativos.
- **Locators por prioridade:** `getByRole` → `getByLabel` → `getByTestId` (`data-test`). Sem CSS, XPath ou `waitForTimeout`.
- **Custom fixtures** ([fixtures/index.ts](fixtures/index.ts)) entregam `loginpage`, `accountpage` e `homepage` já prontos, sem `beforeEach` repetido nos specs.
- **Sincronização por evento de rede.** O `search()` espera a resposta da API de busca em vez de pausar por tempo fixo. Sem isso, o teste lia a lista antiga e ficava instável (flaky).
- **Configuração por variáveis de ambiente.** A URL base e as credenciais vêm do `.env` (fora do Git). [config/env.ts](config/env.ts) falha cedo, dizendo qual variável está faltando.
- **Dados aleatórios só onde o valor não é a regra do cenário.** Em [utils/testData.ts](utils/testData.ts) o faker gera e-mails e senhas; já os campos vazios do AUTH-04 e o termo `pliers` do CAT-01 ficam fixos, porque o dado é parte do cenário.

## Estrutura

```
├── config/         leitura e validação das variáveis de ambiente
├── docs/           mapa de cenários de teste
├── fixtures/       custom fixtures do Playwright
├── pages/          Page Objects
├── tests/
│   ├── auth/       login
│   └── catalog/    busca
├── utils/          geração de dados de teste
└── playwright.config.ts
```

## Como rodar

Pré-requisito: Node.js (versão LTS recente).

```bash
npm install
npx playwright install
cp .env.example .env
```

O login (AUTH-01) precisa de uma conta real no site de demonstração:

1. Cadastre uma conta descartável em <https://practicesoftwaretesting.com/auth/register> (use uma senha que você **não** usa em outro lugar).
2. Preencha `CUSTOMER_EMAIL` e `CUSTOMER_PASSWORD` no `.env`. O `BASE_URL` já vem com o site público.

```bash
npm test                  # todos os testes, nos 3 navegadores
npm run test:chromium     # só Chromium (mais rápido)
npm run report            # abre o último relatório HTML
```

Verificações de qualidade:

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Limitações conhecidas

- **O AUTH-01 depende de uma conta no site público.** O Toolshop de demonstração é compartilhado: contas podem ser bloqueadas por outros usuários ("Account locked") ou apagadas. Um AUTH-01 vermelho costuma indicar o ambiente, não um defeito do código. Os demais cenários não usam conta e não são afetados.
- **Ainda não há CI.** A suíte roda localmente por enquanto.
- O site público às vezes é lento, o que pode causar timeout no carregamento da página.

## Roadmap

- [x] Mapa de cenários
- [x] Setup: Playwright, TypeScript, ESLint, Prettier
- [x] Page Object Model, custom fixtures, `.env`, faker
- [x] Login (AUTH-01 a AUTH-04) e busca no catálogo (CAT-01, CAT-02)
- [ ] Filtros do catálogo, detalhe de produto, carrinho e checkout (testes data-driven e tags `@smoke` / `@regression`)
- [ ] Criar o usuário de teste por API a cada execução (fim da dependência de conta fixa), `storageState`, mock de rede, testes visuais e acessibilidade (axe)
- [ ] CI com GitHub Actions, Toolshop em Docker e relatório publicado
- [ ] Bugs encontrados registrados como issues

## Autor

Jorge Douettes — [GitHub](https://github.com/JorgeDouettes)
