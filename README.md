<p align="center">
  <a href="https://abimaelgomez.github.io/seupolitico/"><img src="docs/capa.png" alt="Seu Político" width="520"></a>
</p>

<h1 align="center">Seu Político</h1>

<p align="center">
  Canal gratuito de transparência sobre o Congresso Nacional.<br>
  Quem é o seu parlamentar, quanto gastou, como votou e o que foi aprovado.
</p>

<p align="center">
  <a href="https://abimaelgomez.github.io/seupolitico/"><b>Acessar o site</b></a> ·
  <a href="docs/apresentacao.mp4">Ver vídeo de apresentação</a>
</p>

---

## O que é

O **Seu Político** reúne em um só lugar informações oficiais sobre os **513 deputados federais** e os **81 senadores**, em linguagem simples, para qualquer pessoa entender:

- **Quem é:** partido, estado, mandatos e página oficial.
- **Quanto gastou:** cota parlamentar mês a mês, por categoria e por fornecedor, com link para cada nota fiscal. Também mostra os gastos por partido e por estado.
- **Como votou:** o voto de cada parlamentar nas votações nominais do plenário e como cada partido votou.
- **O que foi aprovado:** leis recentes, com as siglas explicadas e o tema de cada uma.

## Por que é um canal de transparência

- **Só dados oficiais:** tudo vem das APIs de Dados Abertos da Câmara e do Senado, sempre com o link da origem.
- **Sem opinião:** o site não dá nota, não faz ranking e não classifica ninguém como "bom" ou "ruim". Ele apresenta os fatos, e a interpretação é de quem lê.
- **Sempre atualizado:** as consultas são feitas em tempo real, e os totais de gastos são recalculados automaticamente todos os dias.
- **Código aberto:** qualquer pessoa pode conferir como os números são calculados.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML, CSS e JavaScript puro, com layout pensado para celular |
| Dados | APIs de Dados Abertos da Câmara dos Deputados e do Senado Federal, e RSS da Agência Câmara |
| Automação | Node.js e GitHub Actions, que todo dia às 06:00 soma os gastos de todos os parlamentares |
| Hospedagem | GitHub Pages (gratuito, com HTTPS) |
| Métricas | GoatCounter: contagem de visitas anônima e sem cookies |

## Privacidade e LGPD

- Não há cadastro, login nem cookies de rastreamento.
- Não são coletados dados pessoais de quem visita. As visitas são contadas de forma anônima e agregada.
- Os dados exibidos são públicos (Lei de Acesso à Informação) e tratam do exercício de cargos públicos. O site não exibe CPF, endereço ou contatos pessoais.

## Como funciona

```text
GitHub Actions (todo dia, 06:00)
   └─ scripts/gastos.mjs → consulta Câmara e Senado → grava dados/*.json
GitHub Pages
   └─ index.html → lê os arquivos prontos + consulta as APIs oficiais em tempo real
```

Para rodar localmente:

```bash
python -m http.server 8765
```

Depois abra http://127.0.0.1:8765.

## Aviso

Projeto independente, sem vínculo com a Câmara, o Senado ou qualquer partido. **Não é um site oficial.** Encontrou um erro? [Abra uma issue](https://github.com/abimaelgomez/seupolitico/issues/new).
