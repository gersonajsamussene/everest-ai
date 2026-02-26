# 05 — Design Web

---

## RESPONSIVE DESIGN — FUNDAÇÃO (Ethan Marcotte)

**Os 3 pilares do design responsivo:**
1. **Fluid grids** — layouts em % ou fr, não pixels fixos
2. **Flexible images** — `max-width: 100%` como regra padrão
3. **Media queries** — adaptar layout para breakpoints do dispositivo

### Breakpoints Padrão (Mobile-First)

```css
/* Mobile base (default) */
/* 320px – 767px */

@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop pequeno */ }
@media (min-width: 1280px) { /* Desktop médio */ }
@media (min-width: 1536px) { /* Desktop grande */ }
```

**Mobile-First como filosofia:**
- Começar pelo menor viewport força priorização de conteúdo
- Adicionar complexidade progressivamente para telas maiores
- Melhor performance em mobile (CSS mais enxuto por padrão)

---

## TIPOGRAFIA WEB (Richard Rutter — Web Typography)

### Propriedades CSS Essenciais

```css
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;           /* base = 1rem */
  line-height: 1.6;          /* corpo de texto */
  font-weight: 400;
  color: #1a1a1a;
  max-width: 70ch;           /* medida ideal de linha */
}

h1 { font-size: clamp(2rem, 5vw, 4rem); line-height: 1.1; }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.2; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); line-height: 1.3; }
```

### Fluid Typography (CSS moderno)
```css
/* Escala automaticamente entre dois tamanhos */
font-size: clamp(min-size, preferred-size, max-size);

/* Exemplo: 16px em mobile, escala até 24px em desktop */
font-size: clamp(1rem, 2.5vw, 1.5rem);
```

### System Font Stack (Zero carregamento)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, Oxygen, Ubuntu, sans-serif;
```

---

## LAYOUT WEB MODERNO — CSS GRID & FLEXBOX

### Quando usar cada um

| Flexbox | CSS Grid |
|---------|----------|
| 1 dimensão (linha ou coluna) | 2 dimensões (linha e coluna) |
| Componentes internos | Layouts de página |
| Alinhamento de itens | Posicionamento preciso |
| Navegação, cards em linha | Page layouts, dashboards |

### Grid Layout Responsivo (sem media query)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
/* Automaticamente 1, 2, 3 ou 4 colunas dependendo do espaço */
```

### Container Query (CSS moderno — componente responsivo)
```css
@container (min-width: 400px) {
  .card { display: flex; }
}
/* O componente responde ao container, não à viewport */
```

---

## PERFORMANCE VISUAL — O QUE IMPACTA A PERCEPÇÃO

**Core Web Vitals (Google) — Métricas de UX web:**

| Métrica | O que mede | Meta |
|---------|-----------|------|
| **LCP** (Largest Contentful Paint) | Quanto tempo para o conteúdo principal aparecer | < 2.5s |
| **FID** (First Input Delay) / **INP** | Resposta ao primeiro clique | < 100ms |
| **CLS** (Cumulative Layout Shift) | Estabilidade visual (conteúdo que pula) | < 0.1 |

**Otimizações de design que impactam performance:**
- Imagens em WebP/AVIF (50–80% menor que JPEG)
- Lazy loading para imagens abaixo do fold
- Fontes: preload + `font-display: swap`
- Evitar layout shifts: reservar espaço para imagens (`aspect-ratio`)
- Critical CSS inline + resto assíncrono

---

## PADRÕES DE LAYOUT WEB — REFERÊNCIA

### Anatomia de Landing Page de Alta Conversão

```
HERO
  → Headline (proposta de valor clara em < 6 palavras)
  → Subheadline (detalhe do benefício principal)
  → CTA primário (1 ação acima do fold)
  → Imagem/vídeo (produto ou resultado)

PROVA SOCIAL
  → Logos de clientes / parceiros
  → Números (X clientes, Y% de resultado)

BENEFÍCIOS
  → 3–4 benefícios com ícone + título + descrição
  → Benefício > Feature (o que o usuário ganha, não o que o produto faz)

COMO FUNCIONA
  → 3 passos simples (reduzir percepção de complexidade)

DEPOIMENTOS
  → Foto real + nome + cargo + empresa
  → Resultado específico, não elogio genérico

CTA FINAL
  → Repetir a oferta + garantia + urgência
```

---

## ACESSIBILIDADE WEB (WCAG 2.1)

**4 princípios — POUR:**
- **P**erceptível: informação não pode depender de um único sentido
- **O**perável: toda funcionalidade operável por teclado
- **U**nderstandable: conteúdo e interface compreensíveis
- **R**obust: compatível com tecnologias assistivas

**Checklist mínimo:**
```
[ ] Contraste de texto: 4.5:1 (AA) ou 7:1 (AAA)
[ ] Alt text em todas as imagens significativas
[ ] Navegação por teclado funcional (Tab, Enter, Esc)
[ ] Foco visível em todos os elementos interativos
[ ] Rótulos em todos os campos de formulário
[ ] Estrutura de headings lógica (H1 → H2 → H3)
[ ] Não usar apenas cor para transmitir informação
```
