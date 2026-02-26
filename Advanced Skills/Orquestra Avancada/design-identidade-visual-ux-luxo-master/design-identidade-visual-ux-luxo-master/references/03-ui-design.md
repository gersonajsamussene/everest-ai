# 03 — UI Design — Interface Visual

---

## FUNDAMENTOS DE UI (User Interface Design)

UI é a camada visual da interação — o que o usuário vê e toca. UX é a experiência completa. Um não existe bem sem o outro.

**Distinção crítica:**
- **UI sem UX** = bonito mas confuso e frustrante
- **UX sem UI** = funcional mas sem prazer ou confiança
- **UI + UX** = experiência eficiente E emocionalmente satisfatória

---

## LEIS DE UX APLICADAS AO UI (Jon Yablonski — Laws of UX)

As leis de psicologia mais relevantes para design de interface:

| Lei | Princípio | Aplicação UI |
|-----|-----------|-------------|
| **Lei de Hick** | Mais opções = mais tempo de decisão | Reduzir opções nos menus, etapas de checkout |
| **Lei de Fitts** | Alvos maiores e mais próximos são mais fáceis de clicar | Botões CTA grandes, targets touch de 44px mínimo |
| **Lei de Jakob** | Usuários passam mais tempo em outros sites — esperam padrões conhecidos | Usar padrões convencionais antes de inovar |
| **Lei de Miller** | Memória de trabalho: 7 ± 2 itens | Agrupar itens em chunks de 5–9 |
| **Efeito de Posição Serial** | Primeiros e últimos itens são mais lembrados | CTAs principais no início e no final |
| **Efeito Estética-Usabilidade** | Interfaces mais bonitas são percebidas como mais fáceis de usar | Investir em qualidade visual afeta percepção de usabilidade |
| **Lei de Tesler** | Toda aplicação tem complexidade irredutível — designer ou usuário paga | Absorver complexidade no design, não expor ao usuário |

---

## HIERARQUIA VISUAL — COMO GUIAR O OLHAR

O objetivo do layout é criar um caminho de leitura intencional.

### Ferramentas de Hierarquia

```
TAMANHO         → Maior = mais importante (regra mais poderosa)
PESO TIPOGRÁFICO → Bold chama mais atenção que regular
COR             → Cor de destaque direciona o olhar
CONTRASTE       → Alto contraste = primeiro a ser visto
POSIÇÃO         → Topo-esquerda (leitura ocidental) = prioridade
ESPAÇO NEGATIVO → Isolamento cria importância
MOVIMENTO       → Animação captura atenção involuntariamente
```

### Padrões de Leitura Visual

**Padrão F (texto denso):**
```
████████████████
████████
████
████████
████
```
Usuários leem a primeira linha completa, depois escaneiam à esquerda.

**Padrão Z (layout visual):**
```
→ → → → → → →
              ↘
← ← ← ← ← ←
↘
→ → → → → → →
```
Para layouts com poucos elementos — logo, headline, CTA.

---

## REFACTORING UI — DECISÕES VISUAIS (Wathan & Schoger)

Os erros mais comuns de UI e como corrigir:

### Cor e Contraste
- Nunca usar cinza puro em fundo colorido — use cinza com matiz da cor de fundo
- Ratio de contraste mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande
- Criar hierarquia com saturação, não só com tamanho

### Espaçamento
- Usar escala de espaçamento consistente (4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96...)
- Mais espaço entre grupos, menos espaço dentro do grupo (Gestalt — proximidade)
- Padding generoso faz interfaces parecerem mais premium

### Tipografia
- Escala tipográfica: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px
- Line-height para corpo: 1.5–1.7
- Line-height para títulos: 1.1–1.3
- Limite de largura de linha (measure): 60–75 caracteres por linha

### Sombras e Elevação
```
Nível 0: Sem sombra (base, flat)
Nível 1: box-shadow 0 1px 3px rgba(0,0,0,0.12) — card sutil
Nível 2: box-shadow 0 4px 6px rgba(0,0,0,0.1) — card interativo
Nível 3: box-shadow 0 10px 15px rgba(0,0,0,0.1) — modal/dropdown
Nível 4: box-shadow 0 20px 25px rgba(0,0,0,0.15) — overlay
```

---

## DESIGN SYSTEM — COMPONENTES UI

### Atomic Design (Brad Frost)

```
ÁTOMOS          → Elementos básicos: botão, input, ícone, cor, fonte
    ↓
MOLÉCULAS       → Combinação de átomos: campo de busca = input + botão + ícone
    ↓
ORGANISMOS      → Componentes complexos: header = logo + navegação + busca
    ↓
TEMPLATES       → Estrutura de página sem conteúdo real
    ↓
PÁGINAS         → Templates com conteúdo real
```

### Componentes Essenciais de um Design System

```
FUNDAÇÃO
  → Cores (tokens: --color-primary-500, --color-neutral-200...)
  → Tipografia (escala, pesos, famílias)
  → Espaçamento (escala de 4px)
  → Sombras e elevação
  → Border radius
  → Ícones

COMPONENTES BASE
  → Button (variantes: primary, secondary, ghost, danger)
  → Input / Textarea / Select
  → Checkbox / Radio / Toggle
  → Badge / Tag / Chip
  → Avatar / Image

COMPONENTES COMPOSTOS
  → Card
  → Modal / Drawer
  → Toast / Alert / Banner
  → Dropdown / Menu
  → Table / Data Grid
  → Navigation (tabs, breadcrumb, sidebar)

LAYOUTS
  → Grid system
  → Container
  → Stack / Cluster / Sidebar layout
```

---

## MATERIAL DESIGN vs. HUMAN INTERFACE GUIDELINES

| Dimensão | Material Design (Google) | HIG (Apple) |
|---------|--------------------------|-------------|
| **Filosofia** | Papel e tinta digital | Clareza, deferência, profundidade |
| **Elevação** | Sombras físicas, z-axis explícito | Translucência, blur, camadas |
| **Movimento** | Inspirado em física real | Resposta imediata, natural |
| **Cor** | Sistema de cor vibrante e expressivo | Sistêmico, adaptativo (dark/light) |
| **Ícones** | Outlined, filled, rounded | SF Symbols — integração sistêmica |
| **Tipografia** | Roboto / Google Fonts | SF Pro (iOS/macOS) |
| **Padrão de uso** | Android, web apps | iOS, macOS, tvOS |

**Regra:** Siga o sistema da plataforma nativa primeiro. Subverta apenas quando houver razão estratégica clara.
