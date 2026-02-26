# 06 — Design de Software & Produto Digital

---

## SHAPE UP — O MÉTODO BASECAMP (Ryan Singer)

O sistema de design e desenvolvimento que o Basecamp usa para construir produtos:

### Ciclos de 6 Semanas

```
COOLDOWN (2 sem)         → Projetos livres, bugs, experimentos
    ↓
SHAPING (paralelo)       → Líderes definem o problema e a solução em alto nível
    ↓
BETTING TABLE            → Decisão: quais projetos entram no próximo ciclo?
    ↓
CICLO DE 6 SEMANAS       → Time autônomo constrói do início ao fim
    ↓
ENTREGA                  → Sem extensão de prazo — o que não entrou fica de fora
```

### Shaping — O Coração do Método

**Um shape bem feito tem:**
1. **Problema** — a dor específica a resolver (não a feature)
2. **Apetite** — quanto tempo vale gastar? (2 semanas vs. 6 semanas)
3. **Solução** — esboço em nível de detalhe suficiente para guiar, não especificar
4. **Rabbit holes** — o que explicitamente NOT fazer
5. **No-gos** — o que está fora do escopo

---

## DESIGN SPRINT — GOOGLE VENTURES (Jake Knapp)

5 dias para responder perguntas críticas de produto:

```
SEGUNDA — ENTENDER & MAPEAR
  → Objetivo de longo prazo + perguntas de sprint
  → Mapa da jornada do usuário
  → Escolher o foco (o momento mais crítico do mapa)

TERÇA — SKETCHAR
  → Revisitar soluções existentes (Lightning Demos)
  → Sketching individual de soluções (4 estágios)
  → Sem julgamento — quantidade antes de qualidade

QUARTA — DECIDIR
  → Critique silenciosa (sticky dots no que funciona)
  → Votação e decisão do facilitador
  → Storyboard de 15 cenas do protótipo

QUINTA — PROTOTIPAR
  → Construir protótipo de alta fidelidade aparente (Figma, Keynote)
  → Não precisa ser real — precisa ser convincente o suficiente para testar
  → Regra: protótipo de 1 dia, não 1 mês

SEXTA — TESTAR
  → 5 usuários reais, entrevistas de 1h cada
  → Observação com time completo
  → Padrões emergem em 5 entrevistas
```

---

## CONTINUOUS DISCOVERY — TERESA TORRES

**A cadência ideal de discovery:**
- Entrevistar ao menos 1 usuário por semana, toda semana
- Não entrevistas grandes de 3 horas — conversas de 30 minutos
- Sempre conectar o que aprende a oportunidades e soluções

### Opportunity Solution Tree (OST)

```
RESULTADO DESEJADO (o objetivo do negócio)
    ↓
OPORTUNIDADES (necessidades, dores, desejos dos usuários)
    ├── Oportunidade A
    │       ├── Solução A1
    │       └── Solução A2
    └── Oportunidade B
            ├── Solução B1
            └── Solução B2
```

**Regra:** Nunca ir direto do resultado para a solução. Sempre mapear oportunidades intermediárias baseadas em pesquisa.

---

## INSPIRED — O QUE SEPARA TIMES DE PRODUTO MEDIOCRES DOS EXCELENTES (Marty Cagan)

**Produto mediocre vs. produto excelente:**

| Time de produto fraco | Time de produto forte |
|----------------------|----------------------|
| Roadmap = lista de features | Roadmap = lista de problemas a resolver |
| Discovery e delivery são separados | Discovery e delivery são contínuos e integrados |
| PM define, design cria, dev constrói | PM + Designer + Eng descobrem juntos |
| Sucesso = entregar no prazo | Sucesso = resolver o problema do cliente |
| Output-oriented | Outcome-oriented |

**Os 4 riscos de produto (todos devem ser endereçados antes de construir):**
1. **Risco de valor** — o cliente vai querer isso?
2. **Risco de usabilidade** — o cliente consegue usar?
3. **Risco de viabilidade** — conseguimos construir?
4. **Risco de negócio** — funciona para o negócio?

---

## DESIGNING INTERFACES — PADRÕES (Jenifer Tidwell)

Os padrões de interface mais usados:

### Navegação
- **Barra de abas** — quando há 3–7 seções principais de igual importância
- **Sidebar** — quando há hierarquia profunda ou muitos itens de menu
- **Breadcrumbs** — quando há hierarquia profunda de conteúdo
- **Mega Menu** — quando há múltiplas categorias com subcategorias

### Organização de Conteúdo
- **Card** — conteúdo modular de igual hierarquia
- **Tabela** — dados comparáveis com múltiplos atributos
- **Lista mestre-detalhe** — selecionar item para ver detalhes
- **Accordion** — conteúdo longo com seções colapsáveis

### Input e Formulário
- **Form progressivo** — um campo ou etapa por vez
- **Autocompletar** — reduzir input com sugestões
- **Validação inline** — feedback imediato, não só no submit
- **Wizard** — dividir formulário longo em etapas com progresso visível

---

## ATOMIC DESIGN NA PRÁTICA (Brad Frost)

### Estrutura de Arquivos para Design System

```
tokens/
  ├── colors.css
  ├── typography.css
  ├── spacing.css
  └── shadows.css

components/
  ├── atoms/
  │   ├── Button/
  │   │   ├── Button.jsx
  │   │   ├── Button.stories.jsx
  │   │   └── Button.test.jsx
  │   └── Input/
  ├── molecules/
  │   ├── SearchBar/
  │   └── FormField/
  └── organisms/
      ├── Header/
      └── ProductCard/
```

### Design Tokens — A Fundação

```css
:root {
  /* Cores */
  --color-primary-50:  #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* Tipografia */
  --font-size-sm:   0.875rem;  /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-xl:   1.25rem;   /* 20px */

  /* Espaçamento */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-8: 32px;
}
```
