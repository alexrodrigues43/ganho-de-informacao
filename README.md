# 🧠 Analisador de Ganho de Informação & Fatos Atômicos (S-P-O)

> **Simulador de Ganho Marginal de Informação baseado na decomposição de fatos atômicos (Sujeito-Predicado-Objeto) e na patente Google US 11,354,342 B2.**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Google%20GenAI-Gemini%20Flash-orange.svg)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-ffca28.svg)](https://firebase.google.com/)

---

## 📌 Visão Geral

O **Analisador de Ganho de Informação** é uma plataforma analítica para auditoria semântica de conteúdo técnico, acadêmico e de SEO. 

Inspirado nos mecanismos de pontuação de novidade informacional desenvolvidos pelo Google na patente **US 11,354,342 B2** (*"Contextual estimation of information gain and atomic informational elements"*), o sistema decompõe documentos em **proposições atômicas mínimas** (estruturadas em tripletos `[Sujeito] [Predicado] [Objeto]`), compara-as com uma **Base Canônica de Conhecimento Prévia** e calcula o **Ganho Marginal Líquido de Informação**.

Com isso, identifica com precisão cirúrgica:
1. **O que é genuinamente novo e inovador** (alto ganho informacional).
2. **O que expande detalhes e nuances** (ganho incremental).
3. **O que é mera paráfrase ou redundância estocástica** (conteúdo repetido ou reciclado).

---

## 🔬 Fundamentação Conceitual & Patente US 11,354,342 B2

Buscadores e modelos de recuperação de informação modernos avaliam se a leitura de um novo documento realmente agrega conhecimento ao usuário após ele já ter consumido documentos anteriores sobre o mesmo tema:

$$\text{Information Gain} = f\Big(\Delta\text{Conhecimento}(\text{Documento Candidato} \mid \text{Base Canônica})\Big)$$

### Critérios Estritos de Classificação Factual:

| Classificação | Faixa de Score | Descrição e Critério |
| :--- | :---: | :--- |
| **NOVO (Inédito)** | `0.85` a `1.00` | Proposição que introduz entidades inéditas, novas relações semânticas ou dados empíricos sem equivalência na base histórica. |
| **INCREMENTAL (Nuance)** | `0.40` a `0.75` | Proposição que expande, quantifica, detalha ou contextualiza um fato já conhecido na ontologia. |
| **REDUNDANTE (Repetição)** | `0.00` a `0.15` | Proposição que apenas repete, parafraseia ou expressa a mesma relação conceitual já registrada, sem valor agregado. |

---

## ✨ Funcionalidades Principais

### 1. Balanço Comparativo de Information Gain
- **Base Canônica (Régua Prévia)**: Exibe a contagem de proposições S-P-O conhecidas antes da análise.
- **Documento Candidato (Corpus Auditado)**: Métricas em tempo real de contagem de palavras, caracteres e total de proposições extraídas.
- **Saldo de Ganho Líquido**: Distribuição precisa entre fatos Novos, Incrementais e Redundantes com cálculo do ganho real estimado.
- **Banner de Conclusão Acessível**: Síntese executiva formatada em contraste visual em conformidade com WCAG AAA em temas Claro e Escuro.

### 2. Mapeamento Visual no Graph Studio Semântico
- Grafo visual e interativo de nós (Entidades) e arestas direcionadas (Relações/Predicados).
- Agrupamento em clusters por classificação: *Todos*, *Novos* (esmeralda), *Incrementais* (âmbar) e *Redundantes* (ardósia).
- Inspeção por clique em nós e arestas com modal de detalhes atômicos.

### 3. Visualizador de Texto Anotado & Highlighting
- Visualização do documento original com marcações interativas coloridas correspondentes a cada fato identificado.
- Lista completa e paginada de fatos com similaridade de cosseno estimada, score marginal, justificativa e trecho de origem.

### 4. Expansão Ontológica & Exportação de Dados
- **Incorporar à Base (Commit)**: Adiciona com 1 clique os novos fatos validados à base canônica ativa para simular o aprendizado contínuo do buscador.
- **Exportação Multi-formato**: Exportação direta dos relatórios e matrizes de auditoria em **JSON estruturado** e **Markdown editorial**.

### 5. Arquitetura Dual de Inteligência (IA + Modo Local)
- **Motor Gemini 3.6 Flash / 2.5**: Extração e classificação em linguagem natural de alta fidelidade via endpoint seguro `/api/engine`.
- **Motor Heurístico Local Offline**: Algoritmo determinístico baseado em processamento léxico, tokenização em português e índice Jaccard ajustado para garantir disponibilidade instantânea mesmo sem conexão ou chaves ativas.

### 6. Autenticação e Controle de Acesso (RBAC)
- Integração completa com **Firebase Authentication** e **Google Cloud Firestore**.
- Papéis de usuário: `admin` e `client`.
- Gestão de status de conta: `active`, `pending`, `blocked` e `expired`.
- **Painel Administrativo Embutido**: Gestão visual de planos (Trial, Mensal, Anual, Vitalício) e controle de aprovação de novos cadastros.

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 19** & **TypeScript**
- **Vite 6** (Build tool e HMR otimizado)
- **Tailwind CSS v4** (Design tokens modernos e suporte nativo a temas Claro/Escuro)
- **Lucide React** (Iconografia semântica)
- **Motion** (Transições e animações de interface)

### Backend
- **Node.js** com **Express**
- **@google/genai SDK** (Cliente oficial do Gemini)
- **TSX** & **esbuild** (Execução TypeScript nativa e bundle de produção)

### Persistência & Segurança
- **Google Cloud Firestore** (Banco NoSQL para perfis de usuários e logs de auditoria)
- **Firebase Authentication** (Autenticação por e-mail/senha)
- **firestore.rules** (Políticas de segurança com isolamento por UID e validação de privilégios de Admin)

---

## 📁 Estrutura do Projeto

```text
├── .env.example              # Modelo de variáveis de ambiente
├── firebase-applet-config.json # Configurações do SDK do Firebase
├── firebase-blueprint.json   # Esquema canônico das entidades do Firestore
├── firestore.rules           # Regras de segurança do Firestore (RBAC)
├── metadata.json             # Metadados e permissões da aplicação AI Studio
├── package.json              # Dependências e scripts de automação
├── server.ts                 # Servidor Express, proxy do Gemini e middlewares Vite
├── src/
│   ├── App.tsx               # Componente raiz, controle de estado global e modais
│   ├── main.tsx              # Ponto de entrada do React
│   ├── index.css             # Estilos globais e custom variants do Tailwind v4
│   ├── types.ts              # Tipos TypeScript (AtomicFact, UserProfile, etc.)
│   ├── components/
│   │   ├── AccessRestrictedModal.tsx # Bloqueio de acesso para contas pendentes
│   │   ├── ActionBar.tsx             # Botões de commit de fatos e exportações
│   │   ├── AdminPanelModal.tsx       # Gestão de usuários, status e planos
│   │   ├── AuthModal.tsx             # Diálogo de Login e Registro
│   │   ├── BaselineCard.tsx          # Card da Base Canônica de Fatos
│   │   ├── CandidateCard.tsx         # Card do Novo Documento Avaliado
│   │   ├── ComparisonBalance.tsx     # Painel de Balanço e Conclusão de Ganho
│   │   ├── EditorialSections.tsx     # Seções conceituais explicativas da patente
│   │   ├── FactDetailModal.tsx       # Detalhes do tripleto Sujeito-Predicado-Objeto
│   │   ├── GraphCanvas.tsx           # Grafo interativo de entidades e fatos
│   │   ├── Header.tsx                # Cabeçalho com status, tema e menu de usuário
│   │   ├── HeroSection.tsx           # Chamada inicial e benchmark de demonstração
│   │   ├── MetricsCards.tsx          # Indicadores consolidados de score
│   │   ├── ResultsViewer.tsx         # Texto com highlight e tabela detalhada
│   │   ├── SemanticoIcon.tsx         # Identidade visual da aplicação
│   │   └── SynthesisCard.tsx         # Síntese analítica textual
│   ├── data/
│   │   └── defaultBenchmark.ts       # Corpus padrão sobre Knowledge Graphs e SEO
│   └── lib/
│       ├── firebase.ts               # Inicialização e chamadas seguras ao Firebase
│       └── localAnalysis.ts          # Motor de análise determinística e stopwords PT
└── tsconfig.json             # Configurações do compilador TypeScript
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **NPM** ou gerenciador de pacotes equivalente

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_REPOSITORIO>
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Crie um arquivo `.env` a partir do exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env` para inserir suas configurações:
```env
# Chave da API do Google Gemini (obtenha em https://aistudio.google.com/)
GEMINI_API_KEY="sua_chave_gemini_aqui"

# Porta e URL da aplicação (opcional em ambiente local)
PORT=3000
APP_URL="http://localhost:3000"
```

> **Nota:** Se a variável `GEMINI_API_KEY` não for informada, o sistema alternará automaticamente para o **motor local heurístico**, permitindo testar e utilizar a ferramenta sem interrupções.

### 4. Iniciar em modo de desenvolvimento
```bash
npm run dev
```
Acesse a aplicação no seu navegador em: `http://localhost:3000`.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor full-stack Express com Vite em modo de desenvolvimento. |
| `npm run build` | Compila o bundle do cliente Vite e compila o `server.ts` para Node.js com esbuild. |
| `npm run start` | Inicia o servidor compilado de produção (`dist/server.cjs`). |
| `npm run lint` | Executa o verificador estático do TypeScript (`tsc --noEmit`). |
| `npm run clean` | Remove as pastas de compilação `dist`. |

---

## 📡 Endpoints da API Interna

### `POST /api/engine`
Endpoint unificado para extração e análise.

#### 1. Extração de Baseline (`acao: "extrair_baseline"`)
```json
{
  "acao": "extrair_baseline",
  "documento": "Texto de referência para extração dos fatos canônicos..."
}
```

#### 2. Análise de Ganho Informacional (`acao: "analisar_ganho"`)
```json
{
  "acao": "analisar_ganho",
  "fatos_conhecidos": [
    {
      "id": "FACT-001",
      "sujeito": "Knowledge Graph",
      "predicado": "estrutura",
      "objeto": "entidades em nós e arestas semânticas"
    }
  ],
  "novo_documento": "Texto do artigo novo a ser auditado contra a base..."
}
```

### `GET /api/health`
Verificação de integridade do servidor. Retorna status `ok`, versão da engine e referência à patente.

---

## 🔒 Regras de Segurança do Firestore

O projeto inclui o arquivo `firestore.rules` pré-configurado:
- Usuários autenticados podem ler seus próprios dados cadastrais em `/users/{userId}`.
- O primeiro usuário cadastrado ou qualquer usuário com `role: "admin"` possui permissões de leitura e alteração sobre a coleção de usuários para gerenciar status e planos.
- Usuários não-admin não podem elevar seus próprios privilégios nem alterar suas datas de expiração.

---

## 🌍 Internacionalização Profunda (i18n) & Padrão de Duplo Controle

O Analisador de Ganho de Informação possui suporte trilíngue nativo (**Português `pt`, Inglês `en` e Espanhol `es`**):

1. **Duplo Controle de Idioma:**
   - **`uiLang` (Interface):** Seletor acessível WCAG 2.2 AA no cabeçalho. Traduz botões, menus, modais, tabela de fatos atômicos S-P-O, badges e síntese executiva.
   - **`contentLang` (Conteúdo/Análise):** Define a base de stopwords, tokenização e prompts analíticos do Gemini para extração de proposições no idioma correto.
2. **Navegação Institucional Dinâmica (`NAV_URLS`):**
   - Links institucionais no cabeçalho e rodapé direcionam para as versões correspondentes no portal `semantico.com.br`.
3. **Vocabulário Ontológico Estrito:**
   - Proibição absoluta de "palavra-chave" / "keyword". Emprego exclusivo de *Entidades*, *Conceitos* e *Termos*.

---

## 📄 Licença & Reconhecimentos

- Desenvolvido para fins analíticos, educacionais e auditoria semântica.
- Fundamentação metodológica baseada na patente **US 11,354,342 B2** do Google LLC.
