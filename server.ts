import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'gemini-2.5-flash';

// Configuração segura do Helmet:
// Desabilita COOP e CORP para permitir comunicação com o popup do Google Sign-In e avatares externos
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// Rate Limiting para proteção contra abuso de requisições e esgotamento de quota
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de requisições excedido. Tente novamente em alguns minutos.' },
});

const engineLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de processamento de IA por minuto atingido. Aguarde alguns instantes.' },
});

app.use('/api/', generalLimiter);
app.use('/api/engine', engineLimiter);
app.use('/api/writer', engineLimiter);

app.use(express.json({ limit: '10mb' }));

// Lazy initialization for Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// System instructions adhering directly to user specifications and US 11,354,342 B2
const SYSTEM_PROMPT = `Você é o motor de inteligência analítica do "Atomic Fact & Information Gain Analyzer", fundamentado nos princípios de estimativa contextual de ganho de informação por elementos informacionais (patente US 11,354,342 B2).

Sua função é decompor documentos em proposições atômicas no formato de tripletos Sujeito-Predicado-Objeto (S-P-O), compará-los com uma base canônica de fatos conhecidos e mensurar o ganho marginal de informação de novos conteúdos.

### Regras de decomposição factual
1. Um fato atômico deve ser uma unidade mínima, verificável e indivisível de conhecimento.
2. Cada fato deve ser formalizado como um tripleto estruturado: [Sujeito] [Predicado] [Objeto].
3. Não infira fatos implícitos ou opiniões; extraia estritamente o que estiver afirmado na fonte.
4. ATENÇÃO DE TERMINOLOGIA: Em todo o ecossistema, NUNCA utilize o vocábulo "palavra-chave" ou variações. Utilize exclusivamente "termo", "termos", "termos de pesquisa" ou "entidades".

### Critérios estritos de classificação e pontuação
Ao comparar um fato extraído do novo texto contra a lista de fatos conhecidos:
- NOVO (score: 0.85 a 1.0): Proposição inédita que introduz entidades, relações ou dados sem equivalência na base histórica.
- INCREMENTAL (score: 0.40 a 0.75): Proposição que expande, detalha, quantifica ou adiciona nuance específica a um fato já existente na base.
- REDUNDANTE (score: 0.0 a 0.15): Proposição que apenas repete, parafraseia ou expressa a mesma relação semântica já registrada, independentemente da variação vocabular.

Responda rigorosamente aderindo ao schema JSON solicitado, sem texto introdutório ou markdown externo ao JSON.`;

// Endpoint: Unified engine handling both "extrair_baseline" and "analisar_ganho"
app.post('/api/engine', async (req, res) => {
  try {
    const { acao, documento, fatos_conhecidos, novo_documento } = req.body;

    if (!acao) {
      return res.status(400).json({ error: 'Parâmetro "acao" é obrigatório ("extrair_baseline" ou "analisar_ganho").' });
    }

    const ai = getGenAI();

    // Mode 1: extrair_baseline
    if (acao === 'extrair_baseline') {
      const docText = documento || '';
      if (!docText.trim()) {
        return res.status(400).json({ error: 'Documento base vazio.' });
      }

      if (ai) {
        const prompt = `Modo de operação: extrair_baseline.
Documento para extração:
"""
${docText}
"""

Extraia todos os fatos atômicos verificáveis e indivisíveis no formato S-P-O.
Retorne um JSON estrito no seguinte formato:
{
  "acao": "extrair_baseline",
  "total_fatos": <numero_total>,
  "fatos": [
    {
      "id": "FACT-001",
      "sujeito": "...",
      "predicado": "...",
      "objeto": "...",
      "confianca": 0.98,
      "trecho_origem": "..."
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: DEFAULT_MODEL,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);
        return res.json(parsed);
      } else {
        // Heurística local determinística se IA não estiver configurada
        const lines = docText.split(/[.\n]+/).map(s => s.trim()).filter(s => s.length > 20);
        const fatos = lines.map((line, idx) => {
          const parts = line.split(/\s+(?:define|utilizam|consistem em|calcula|emerge de|estruturam|mapeiam|possuem|armazena|representam|são|é|permite|estabelece|atribui)\s+/i);
          return {
            id: `FACT-${String(idx + 1).padStart(3, '0')}`,
            sujeito: parts[0] ? parts[0].slice(0, 40) : 'Entidade',
            predicado: 'formaliza relação em',
            objeto: parts[1] ? parts[1].slice(0, 60) : 'Proposição atômica',
            confianca: Number((0.95 + (idx % 5) * 0.01).toFixed(3)),
            trecho_origem: line
          };
        });

        return res.json({
          acao: 'extrair_baseline',
          total_fatos: fatos.length,
          fatos
        });
      }
    }

    // Mode 2: analisar_ganho
    if (acao === 'analisar_ganho') {
      const candidateDoc = novo_documento || '';
      const knownFacts = Array.isArray(fatos_conhecidos) ? fatos_conhecidos : [];

      if (!candidateDoc.trim()) {
        return res.status(400).json({ error: 'Novo documento para análise está vazio.' });
      }

      if (ai) {
        const prompt = `Modo de operação: analisar_ganho.
Base de fatos conhecidos (${knownFacts.length} fatos):
${JSON.stringify(knownFacts.slice(0, 40), null, 2)}

Novo documento para análise:
"""
${candidateDoc}
"""

Extraia os fatos atômicos do novo documento, compare cada um com a base de fatos conhecidos e classifique estritamente:
- NOVO (score: 0.85 a 1.0): Proposição inédita que introduz entidades, relações ou dados sem equivalência na base histórica.
- INCREMENTAL (score: 0.40 a 0.75): Proposição que expande, detalha, quantifica ou adiciona nuance específica a um fato já existente na base.
- REDUNDANTE (score: 0.0 a 0.15): Proposição que apenas repete, parafraseia ou expressa a mesma relação semântica já registrada.

Calcule as métricas consolidadas:
- score_geral (média ponderada de 0.0 a 1.0)
- classificacao_geral ("ALTO GANHO" se score >= 0.70, "MÉDIO GANHO" se 0.40 <= score < 0.70, "BAIXO GANHO" se < 0.40)
- fatos_novos_count e fatos_novos_pct
- fatos_incrementais_count e fatos_incrementais_pct
- fatos_redundantes_count e fatos_redundantes_pct
- sintese_analitica (parágrafo aprofundado contextualizando divergência semântica e ganho informacional nos moldes da patente US 11,354,342 B2)
- html_anotado: O texto do novo documento com spans anotados:
  * Fatos novos: <span class="fact-new px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-950 border-b-2 border-emerald-500 cursor-pointer font-medium" data-fact-id="ID" title="Fato Novo: [descrição] | Score: [score]">[trecho original]</span>
  * Fatos incrementais: <span class="fact-incremental px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 border-b-2 border-amber-500 cursor-pointer font-medium" data-fact-id="ID" title="Fato Incremental: [descrição] | Score: [score]">[trecho original]</span>
  * Fatos redundantes: <span class="fact-redundant px-1 py-0.5 rounded bg-slate-200/70 text-slate-500 line-through decoration-slate-400 cursor-pointer text-xs" data-fact-id="ID" title="Fato Redundante: [motivo]">[trecho original]</span>
- fatos_analisados: Lista detalhada com id, sujeito, predicado, objeto, classificacao, similaridade_cosseno (ex: "0.22 (Baixa)" ou "0.95 (Alta)"), score_marginal (numero de 0 a 1.0), justificativa e trecho_origem.

Retorne estritamente um JSON válido conforme o schema.`;

        const response = await ai.models.generateContent({
          model: DEFAULT_MODEL,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);
        parsed.acao = 'analisar_ganho';
        return res.json(parsed);
      } else {
        return res.json({
          error_note: 'Gemini API Key não configurada. Ative sua chave em Settings > Secrets para análises com IA em tempo real.',
        });
      }
    }

    return res.status(400).json({ error: `Ação desconhecida: ${acao}` });
  } catch (error: any) {
    console.error('API Engine Error:', error);
    return res.status(500).json({
      error: error?.message || 'Erro ao processar requisição no motor de análise.',
    });
  }
});

// -----------------------------------------------------------------------------
// Endpoints Especializados para o Estúdio do Redator (Writer Studio)
// -----------------------------------------------------------------------------

// 1. Identificador de Lacunas de Informação (Information Gaps)
app.post('/api/writer/gaps', async (req, res) => {
  try {
    const { candidateDoc, baselineFacts, termo } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(400).json({ error: 'Gemini API Key não disponível.' });
    }

    const prompt = `Analise o rascunho do redator contra a base canônica de fatos conhecidos no contexto do termo: "${termo || 'Tema Geral'}".
Identifique lacunas de informação cruciais que os concorrentes ou a literatura abordam e que o rascunho NÃO cobriu, além de ângulos inéditos com alto potencial de ganho de informação (dados quantitativos, exceções técnicas, casos de uso reais).

Base Canônica (${(baselineFacts || []).length} fatos):
${JSON.stringify((baselineFacts || []).slice(0, 30), null, 2)}

Rascunho do Redator:
"""
${(candidateDoc || '').slice(0, 3000)}
"""

Retorne um JSON com o seguinte formato:
{
  "gaps": [
    {
      "id": "GAP-001",
      "termo_relacionado": "Nome do termo ou entidade",
      "angulo_sugerido": "O que abordar para gerar ineditismo",
      "tipo": "LACUNA_CONCORRENTE | ANGULO_INEDITO | DADOS_QUANTITATIVOS",
      "explicacao": "Por que esta adição agregará ganho marginal de informação",
      "exemplo_proposicao": "Exemplo de frase atômica pronta para inclusão"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{"gaps":[]}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error /api/writer/gaps:', err);
    return res.status(500).json({ error: err.message || 'Falha ao buscar lacunas de informação.' });
  }
});

// 2. Transformador de Redundância em Fato Incremental / Novo (Elevação)
app.post('/api/writer/elevate', async (req, res) => {
  try {
    const { fact } = req.body;
    if (!fact) return res.status(400).json({ error: 'Fato não fornecido.' });

    const ai = getGenAI();
    if (!ai) return res.status(400).json({ error: 'Gemini API Key não disponível.' });

    const prompt = `O seguinte fato foi classificado como REDUNDANTE (apenas parafraseia o que a web já sabe):
Sujeito: "${fact.sujeito}"
Predicado: "${fact.predicado}"
Objeto: "${fact.objeto}"
Trecho original: "${fact.trecho_origem || ''}"

Gere uma sugestão de elevação editorial para o redator transformar esta frase em um fato INCREMENTAL ou NOVO.
Adicione especificidade técnica, dados mensuráveis, contexto de implementação ou uma condicional que torne a afirmação única e rica em ganho informacional.

Retorne um JSON estrito:
{
  "factId": "${fact.id}",
  "trecho_original": "${fact.trecho_origem || ''}",
  "sugestao_reescrita": "Texto reescrito pronto para o artigo...",
  "novo_predicado": "...",
  "novo_objeto": "...",
  "classificacao_esperada": "INCREMENTAL | NOVO",
  "score_estimado": 0.85,
  "estrategia": "Explicação da tática empregada (ex: adição de dado empírico e caso de uso real)"
}`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error /api/writer/elevate:', err);
    return res.status(500).json({ error: err.message || 'Falha ao elevar fato redundante.' });
  }
});

// 3. Sintetizador de Encheção de Linguiça (Fluff Cutter)
app.post('/api/writer/synthesize-fluff', async (req, res) => {
  try {
    const { trecho, fato } = req.body;
    const ai = getGenAI();
    if (!ai) return res.status(400).json({ error: 'Gemini API Key não disponível.' });

    const prompt = `O trecho a seguir é prolixo e repetitivo (consome muitos termos para expressar pouca informação):
Trecho: "${trecho}"
Fato atômico subjacente: "${fato?.sujeito || ''} ${fato?.predicado || ''} ${fato?.objeto || ''}"

Reescreva este trecho de forma ultradensa e direta, eliminando palavras de preenchimento ("fluff") e preservando a precisão conceitual.

Retorne JSON:
{
  "versao_sintetizada": "...",
  "motivo_corte": "...",
  "economia_termos_pct": 50
}`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error /api/writer/synthesize-fluff:', err);
    return res.status(500).json({ error: err.message || 'Falha ao sintetizar trecho.' });
  }
});

// 4. Gerador Automático de Base Canônica a partir de Termo de Pesquisa
app.post('/api/writer/benchmark-terms', async (req, res) => {
  try {
    const { termo, textosConcorrentes } = req.body;
    if (!termo && !textosConcorrentes) {
      return res.status(400).json({ error: 'Informe um termo ou textos de concorrentes.' });
    }

    const ai = getGenAI();
    if (!ai) return res.status(400).json({ error: 'Gemini API Key não disponível.' });

    const prompt = `Você deve atuar como o índice canônico de conhecimento de um buscador para o termo: "${termo || 'Assunto Principal'}".
${textosConcorrentes ? `Textos dos concorrentes fornecidos:\n"""\n${textosConcorrentes.slice(0, 3000)}\n"""` : ''}

Extraia e sintetize a base canônica de 8 a 15 fatos atômicos consensuais que qualquer página nos primeiros resultados do Google já aborda rotineiramente sobre este termo.

Retorne um JSON no formato:
{
  "termo": "${termo || ''}",
  "resumo_consenso": "Síntese em 1 parágrafo do que o mercado já sabe amplamente sobre este termo...",
  "fatos": [
    {
      "id": "FACT-001",
      "sujeito": "...",
      "predicado": "...",
      "objeto": "...",
      "confianca": 0.98,
      "trecho_origem": "..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{"fatos":[]}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error /api/writer/benchmark-terms:', err);
    return res.status(500).json({ error: err.message || 'Falha ao gerar baseline canônica a partir do termo.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'FTS-v4',
    patent: 'US 11,354,342 B2',
    model: DEFAULT_MODEL,
    aiAvailable: !!getGenAI(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atomic Fact Analyzer Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
