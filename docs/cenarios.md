# Mapa de Cenários de Teste — Practice Software Testing (Toolshop)

Sistema alvo: <https://practicesoftwaretesting.com>
API: <https://api.practicesoftwaretesting.com>

## Critérios de priorização

| Prioridade | Quando usar                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| **Alta**   | Fluxo que gera receita ou bloqueia o usuário (login, carrinho, checkout). Se quebrar, o negócio para. |
| **Média**  | Funcionalidade importante, mas com contorno (filtros, ordenação, favoritos, contato).                 |
| **Baixa**  | Impacto cosmético ou de baixa frequência de uso (textos, idioma, rodapé).                             |

**Automatizar?** considera: valor de regressão, estabilidade do comportamento, custo de manutenção e se a validação depende de julgamento humano.

## Cenários

### Autenticação (AUTH)

| ID      | Cenário                                                                                                  | Tipo     | Prioridade | Automatizar?                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------------ |
| AUTH-01 | Login com credenciais válidas de cliente redireciona para "My account" e exibe o nome do usuário no menu | Positivo | Alta       | Sim                                                                            |
| AUTH-02 | Login com senha incorreta exibe mensagem de erro e o usuário permanece na tela de login                  | Negativo | Alta       | Sim                                                                            |
| AUTH-03 | Login com e-mail em formato inválido exibe validação no campo de e-mail                                  | Negativo | Média      | Sim                                                                            |
| AUTH-04 | Submeter login com campos vazios exibe mensagens de campo obrigatório                                    | Negativo | Média      | Sim                                                                            |
| AUTH-05 | Várias tentativas seguidas com senha errada bloqueiam a conta                                            | Borda    | Média      | Talvez — altera o estado do usuário; só com usuário descartável criado via API |
| AUTH-06 | Logout encerra a sessão e páginas da conta deixam de ser acessíveis                                      | Positivo | Alta       | Sim                                                                            |
| AUTH-07 | Acessar `/account` sem estar logado redireciona para o login                                             | Negativo | Alta       | Sim                                                                            |

### Cadastro (REG)

| ID     | Cenário                                                                                                | Tipo     | Prioridade | Automatizar?                      |
| ------ | ------------------------------------------------------------------------------------------------------ | -------- | ---------- | --------------------------------- |
| REG-01 | Cadastro com todos os campos válidos (e-mail único) cria a conta e redireciona para o login            | Positivo | Alta       | Sim                               |
| REG-02 | Cadastro com e-mail já existente exibe erro de e-mail duplicado                                        | Negativo | Alta       | Sim                               |
| REG-03 | Senha que não atende às regras (tamanho, maiúscula, número, símbolo) exibe os requisitos não cumpridos | Negativo | Média      | Sim — bom candidato a data-driven |
| REG-04 | Data de nascimento que torna o usuário menor de idade / data futura é rejeitada                        | Borda    | Média      | Sim                               |
| REG-05 | Campos obrigatórios vazios exibem mensagem em cada campo                                               | Negativo | Média      | Sim                               |

### Catálogo, busca e filtros (CAT)

| ID     | Cenário                                                                                       | Tipo     | Prioridade | Automatizar?                                              |
| ------ | --------------------------------------------------------------------------------------------- | -------- | ---------- | --------------------------------------------------------- |
| CAT-01 | Buscar por termo existente (ex.: "pliers") retorna apenas produtos que contêm o termo no nome | Positivo | Alta       | Sim                                                       |
| CAT-02 | Buscar por termo inexistente exibe mensagem de "nenhum produto encontrado"                    | Negativo | Média      | Sim                                                       |
| CAT-03 | Limpar a busca (reset) volta a listar todos os produtos                                       | Positivo | Baixa      | Sim                                                       |
| CAT-04 | Filtrar por uma categoria exibe apenas produtos daquela categoria                             | Positivo | Média      | Sim — data-driven por categoria                           |
| CAT-05 | Filtrar por marca exibe apenas produtos daquela marca                                         | Positivo | Média      | Sim                                                       |
| CAT-06 | Combinar filtro de categoria + marca retorna a interseção correta                             | Borda    | Média      | Sim                                                       |
| CAT-07 | Ordenar por preço (crescente/decrescente) exibe os preços na ordem correta                    | Positivo | Média      | Sim                                                       |
| CAT-08 | Ordenar por nome (A-Z / Z-A) exibe os nomes na ordem correta                                  | Positivo | Média      | Sim                                                       |
| CAT-09 | Ajustar a faixa de preço (slider) exibe apenas produtos dentro do intervalo                   | Borda    | Média      | Talvez — slider é chato de manipular; avaliar via URL/API |
| CAT-10 | Paginação: ir para a página 2 exibe produtos diferentes da página 1                           | Positivo | Baixa      | Sim                                                       |

### Detalhe do produto (PROD)

| ID      | Cenário                                                                                        | Tipo     | Prioridade | Automatizar?                                                       |
| ------- | ---------------------------------------------------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------ |
| PROD-01 | Clicar num produto abre a página de detalhe com nome, preço e descrição iguais aos da listagem | Positivo | Alta       | Sim                                                                |
| PROD-02 | Aumentar/diminuir quantidade atualiza o campo; não permite valor menor que 1                   | Borda    | Média      | Sim                                                                |
| PROD-03 | Produto fora de estoque não permite adicionar ao carrinho                                      | Negativo | Alta       | Sim                                                                |
| PROD-04 | Adicionar aos favoritos sem estar logado exibe aviso de que é preciso login                    | Negativo | Baixa      | Sim                                                                |
| PROD-05 | Seção de produtos relacionados exibe itens da mesma categoria                                  | Positivo | Baixa      | Não — regra de "relacionado" pouco clara, baixo valor de regressão |

### Carrinho (CART)

| ID      | Cenário                                                                           | Tipo     | Prioridade | Automatizar? |
| ------- | --------------------------------------------------------------------------------- | -------- | ---------- | ------------ |
| CART-01 | Adicionar produto ao carrinho exibe confirmação e incrementa o contador do ícone  | Positivo | Alta       | Sim          |
| CART-02 | Adicionar o mesmo produto duas vezes soma a quantidade em vez de duplicar a linha | Borda    | Alta       | Sim          |
| CART-03 | Alterar a quantidade no carrinho recalcula o subtotal da linha e o total          | Positivo | Alta       | Sim          |
| CART-04 | Remover item do carrinho atualiza o total; removendo todos, exibe carrinho vazio  | Positivo | Alta       | Sim          |
| CART-05 | Carrinho persiste após recarregar a página                                        | Borda    | Média      | Sim          |

### Checkout (CHK)

| ID     | Cenário                                                                                                                                                              | Tipo     | Prioridade | Automatizar?               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | -------------------------- |
| CHK-01 | **E2E:** buscar produto → adicionar ao carrinho → login no checkout → preencher endereço → pagar com "Cash on Delivery" → confirmação de pedido com número de fatura | Positivo | Alta       | Sim — @smoke               |
| CHK-02 | Checkout com cartão de crédito válido conclui o pedido                                                                                                               | Positivo | Alta       | Sim                        |
| CHK-03 | Cartão com número / validade / CVV em formato inválido exibe erro e não conclui                                                                                      | Negativo | Alta       | Sim — data-driven          |
| CHK-04 | Avançar do passo de endereço com campos obrigatórios vazios é bloqueado                                                                                              | Negativo | Alta       | Sim                        |
| CHK-05 | Pagamento por cada método disponível (Bank Transfer, Cash on Delivery, Credit Card, Buy Now Pay Later, Gift Card) exibe os campos específicos do método              | Positivo | Média      | Sim — data-driven          |
| CHK-06 | Pedido concluído aparece em "My invoices" com o valor correto                                                                                                        | Positivo | Alta       | Sim — validar via API + UI |

### Conta do cliente (ACC)

| ID     | Cenário                                                                         | Tipo     | Prioridade | Automatizar?                                                |
| ------ | ------------------------------------------------------------------------------- | -------- | ---------- | ----------------------------------------------------------- |
| ACC-01 | Editar dados do perfil e salvar exibe sucesso e mantém os dados após recarregar | Positivo | Média      | Sim                                                         |
| ACC-02 | Produto favoritado aparece em "My favorites" e pode ser removido                | Positivo | Média      | Sim                                                         |
| ACC-03 | Alterar senha com senha atual incorreta é rejeitado                             | Negativo | Média      | Talvez — altera estado do usuário; usar usuário descartável |

### Contato (CONT)

| ID      | Cenário                                                       | Tipo     | Prioridade | Automatizar? |
| ------- | ------------------------------------------------------------- | -------- | ---------- | ------------ |
| CONT-01 | Enviar formulário de contato válido exibe mensagem de sucesso | Positivo | Média      | Sim          |
| CONT-02 | Mensagem abaixo do tamanho mínimo exibe erro de validação     | Borda    | Média      | Sim          |
| CONT-03 | Anexo com tipo de arquivo não permitido é rejeitado           | Negativo | Baixa      | Sim          |

### Geral / Não funcional (GEN)

| ID     | Cenário                                                                                | Tipo     | Prioridade | Automatizar?                                                                                            |
| ------ | -------------------------------------------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| GEN-01 | Trocar o idioma altera os textos do menu e dos botões                                  | Positivo | Baixa      | Talvez — só um idioma como amostra                                                                      |
| GEN-02 | Revisão visual geral do layout (alinhamento, cores, imagens) em telas comuns           | Positivo | Baixa      | Não — validação depende de julgamento humano; na Fase 4 cobrir só telas-chave com screenshot comparison |
| GEN-03 | Página inicial sem violações graves de acessibilidade (axe)                            | Borda    | Média      | Sim — Fase 4                                                                                            |
| GEN-04 | Layout responsivo em viewport mobile (menu colapsado funciona)                         | Borda    | Baixa      | Talvez — projeto mobile no config                                                                       |
| GEN-05 | Teste exploratório de usabilidade do checkout (clareza das mensagens, fluxo intuitivo) | Positivo | Média      | Não — é avaliação subjetiva, papel do teste manual exploratório                                         |

## Resumo

- **Total:** 49 cenários em 9 áreas
- **Negativos/borda:** 24 (~49%)
- **Fluxo E2E completo:** CHK-01
- **Não automatizar:** PROD-05, GEN-02, GEN-05

## Observações (a confirmar durante a exploração)

> Os itens abaixo são **hipóteses a verificar** manualmente — não são bugs confirmados. Ao confirmar um comportamento, atualize o cenário correspondente; ao encontrar um bug, registre como issue (Fase 6).

- **AUTH-05:** confirmar quantas tentativas disparam o bloqueio e se existe forma de desbloquear (afeta se o teste é viável).
- **REG-03:** levantar as regras exatas de senha exibidas na tela de cadastro.
- **CONT-02 / CONT-03:** confirmar o tamanho mínimo da mensagem e quais tipos/tamanhos de anexo são aceitos.
- **CHK-01:** verificar se existe checkout como convidado (guest) além do login — se sim, criar cenário próprio.
- **PROD-03:** identificar um produto fora de estoque estável para usar como dado de teste.
- **Dados de teste:** o ambiente público é compartilhado e resetado periodicamente — cenários que dependem de estado (favoritos, faturas) devem criar seus próprios dados, de preferência via API.
- **Versões com bug:** o Toolshop tem versões com bugs propositais; comparar o comportamento dos cenários de prioridade alta entre a versão normal e a com bugs.
