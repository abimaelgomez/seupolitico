# Seu Político

Quem é o seu deputado, quanto gastou, como votou e quais leis foram aprovadas — com dados oficiais da Câmara dos Deputados, explicados para qualquer pessoa.

**Projeto independente. Não é um site oficial.** O site não dá nota, não faz ranking e não emite julgamento: mostra registros oficiais, sempre com link para a fonte.

## Como funciona

- `index.html` — o site inteiro. Consulta em tempo real a API de [Dados Abertos da Câmara](https://dadosabertos.camara.leg.br) e o RSS da Agência Câmara de Notícias.
- `scripts/gastos.mjs` — soma as notas da cota parlamentar de todos os deputados (mês atual e anterior) e grava em `dados/`.
- `.github/workflows/atualizar.yml` — roda o script todo dia às 06:00 (Brasília) e publica o site no GitHub Pages.

## Rodar localmente

```bash
python -m http.server 8765
```

Depois abra http://127.0.0.1:8765.
