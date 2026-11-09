import { analyzeDocumentGainLocally, extractBaselineLocally } from '../src/lib/localAnalysis.js';

console.log('🧪 Executando bateria de testes do motor de Ganho de Informação...');

// 1. Test baseline extraction
const textBaseline = 'Grafos de conhecimento estruturam entidades em nós e arestas semânticas. A ontologia define as classes e propriedades formais.';
const baselineFacts = extractBaselineLocally(textBaseline);
console.log(`✓ Baseline Facts extraídos com sucesso: ${baselineFacts.length} proposições.`);
if (baselineFacts.length !== 2) {
  throw new Error(`Falha na extração de baseline: esperava 2, obteve ${baselineFacts.length}`);
}

// 2. Test analysis with identical text (redundant)
const redundantAnalysis = analyzeDocumentGainLocally(textBaseline, baselineFacts);
console.log(`✓ Detecção de redundância: Score ${redundantAnalysis.score_geral} / Redundantes: ${redundantAnalysis.fatos_redundantes_count}`);
if (redundantAnalysis.fatos_redundantes_count === 0) {
  throw new Error('Falha na detecção de redundância léxica.');
}

// 3. Test analysis with novel text
const novelText = 'Algoritmos quânticos decompõem matrizes de superposição para criptografia pós-quântica.';
const novelAnalysis = analyzeDocumentGainLocally(novelText, baselineFacts);
console.log(`✓ Detecção de novidade: Score ${novelAnalysis.score_geral} / Novos: ${novelAnalysis.fatos_novos_count}`);
if (novelAnalysis.fatos_novos_count === 0) {
  throw new Error('Falha na detecção de fatos novos.');
}

console.log('🎉 100% dos testes unitários do motor analítico aprovados com sucesso!');
