// Gera dados/gastos-AAAA-M.json com as notas da cota parlamentar de todos os
// deputados em exercício, para o mês atual e o anterior. Roda no GitHub Actions.
import { mkdir, writeFile } from 'node:fs/promises';

const API = 'https://dadosabertos.camara.leg.br/api/v2';

async function get(url, tentativas = 4) {
  for (let n = 0; ; n++) {
    try {
      const r = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return await r.json();
    } catch (e) {
      if (n >= tentativas) throw e;
      await new Promise(s => setTimeout(s, 1000 * (n + 1)));
    }
  }
}

async function mes(deps, ano, m) {
  const fila = [...deps], out = [];
  let falhas = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (fila.length) {
      const dep = fila.shift();
      try {
        for (let pag = 1; ; pag++) {
          const r = await get(`${API}/deputados/${dep.id}/despesas?idLegislatura=${dep.idLegislatura}&ano=${ano}&mes=${m}&itens=100&pagina=${pag}`);
          for (const d of r.dados) out.push({
            id: dep.id, nome: dep.nome, p: dep.siglaPartido, uf: dep.siglaUf,
            t: d.tipoDespesa, v: d.valorLiquido, dt: (d.dataDocumento || '').slice(0, 10),
            f: d.nomeFornecedor, u: d.urlDocumento,
          });
          if (!r.links.some(l => l.rel === 'next')) break;
        }
      } catch { falhas++; }
    }
  }));
  // Se muitas consultas falharem, não sobrescreve o arquivo bom do dia anterior.
  if (falhas > deps.length * 0.05) throw new Error(`${falhas} falhas em ${ano}-${m}`);
  return out;
}

// Senado: a CEAPS (cota dos senadores) vem num único arquivo por ano, sem CORS — por isso é salva aqui.
async function senado(ano) {
  const r = await get(`https://adm.senado.gov.br/adm-dadosabertos/api/v1/senadores/despesas_ceaps/${ano}`);
  const notas = r.map(d => ({
    id: d.codSenador, t: (d.tipoDespesa || '').trim(), v: d.valorReembolsado,
    m: d.mes, dt: (d.data || '').slice(0, 10), f: d.fornecedor,
  }));
  if (!notas.length) throw new Error(`CEAPS ${ano} vazia`);
  await writeFile(`dados/senado-gastos-${ano}.json`, JSON.stringify({ geradoEm: new Date().toISOString(), notas }));
  console.log(`senado-gastos-${ano}: ${notas.length} notas`);
}
await mkdir('dados', { recursive: true });
for (const ano of [new Date().getFullYear(), new Date().getFullYear() - 1]) {
  try { await senado(ano); } catch (e) { console.error('Senado', ano, e.message); }
}

const deps = (await get(`${API}/deputados?itens=1000`)).dados;
await mkdir('dados', { recursive: true });
const hoje = new Date();
for (const i of [0, 1]) {
  const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
  const ano = d.getFullYear(), m = d.getMonth() + 1;
  const notas = await mes(deps, ano, m);
  await writeFile(`dados/gastos-${ano}-${m}.json`, JSON.stringify({ geradoEm: new Date().toISOString(), deputados: deps.length, notas }));
  console.log(`gastos-${ano}-${m}: ${notas.length} notas`);
}
