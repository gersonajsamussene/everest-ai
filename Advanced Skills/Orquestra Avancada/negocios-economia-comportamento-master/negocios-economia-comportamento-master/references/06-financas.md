# 06 — Finanças

---

## VALUE INVESTING — FUNDAMENTOS (Graham + Damodaran)

### Margem de Segurança (Benjamin Graham)
```
Valor Intrínseco > Preço de Mercado → COMPRAR
Diferença = Margem de Segurança (protege contra erros de estimativa)

Regra de Graham: Comprar com margem de segurança ≥ 33%
```

### Mr. Market (metáfora de Graham)
- O mercado é um sócio maníaco-depressivo que oferece preços diferentes a cada dia
- Às vezes delirante (preços altos demais), às vezes desesperado (preços baixos demais)
- O investidor inteligente aproveita as oscilações em vez de ser controlado por elas
- Preço é o que você paga; valor é o que você recebe

### Investidor vs. Especulador
| | Investidor | Especulador |
|--|-----------|------------|
| Horizonte | Longo prazo (5–10 anos+) | Curto prazo |
| Base da decisão | Análise fundamental | Preço e momentum |
| Risco | Calculado com margem | Elevado, alavancado |
| Emocionalidade | Indiferente ao mercado diário | Reagente ao mercado |

---

## VALUATION — FRAMEWORKS (Damodaran)

### DCF — Discounted Cash Flow
```
Valor = Σ [FCF_t / (1 + WACC)^t] + [Valor Terminal / (1 + WACC)^n]

Onde:
FCF = Free Cash Flow (caixa livre após capex)
WACC = Custo médio ponderado de capital
Valor Terminal = FCF_n × (1 + g) / (WACC - g)
```

**Sensibilidades críticas:**
- Taxa de crescimento (g) nos anos terminais — pequenas mudanças = grande impacto
- WACC — depende de estrutura de capital e risco percebido
- Margem de longo prazo — onde o negócio converge

### Múltiplos de Mercado (Valuation Relativo)

| Múltiplo | Uso | Limitação |
|---------|-----|----------|
| P/L (Preço/Lucro) | Empresas maduras, lucro estável | Inutilizável com lucro negativo |
| EV/EBITDA | Comparação setor, aquisições | Ignora capex e dívida |
| EV/Receita | Startups sem lucro | Ignora estrutura de custo |
| P/B (Preço/Valor Patrimonial) | Bancos, seguradoras, commodities | Ignora intangíveis |
| EV/FCF | Melhor para geração de caixa real | Requer capex normalizado |

### Valuation de Startups
- DCF tem limitações (incerteza alta, crescimento não linear)
- Métodos práticos: Scorecard, VC Method, Berkus Method
- **VC Method:** Valor Terminal / (1 + ROI esperado)^anos → retrocede para valuation atual
- Diluição e múltiplas rodadas alteram dramatically o cap table

---

## FINANÇAS CORPORATIVAS — ESTRUTURA

### WACC — Custo de Capital
```
WACC = (E/V × Re) + (D/V × Rd × (1 - T))

E = Equity (capital próprio)
D = Dívida
V = E + D (valor total)
Re = Custo do equity (CAPM: Rf + β × (Rm - Rf))
Rd = Custo da dívida
T = Alíquota de imposto
```

### Trade-off de Estrutura de Capital (Modigliani-Miller + Impostos)
- Sem impostos: estrutura de capital é irrelevante (MM 1958)
- Com impostos: dívida gera benefício fiscal → alguma alavancagem é ótima
- Na prática: dívida demais = risco de falência + custo de agência

---

## THE PSYCHOLOGY OF MONEY (Morgan Housel)

**Insights comportamentais sobre finanças:**

1. **Riqueza é o que você não vê** — carros caros e casas grandes são o oposto de riqueza
2. **Tempo é o maior ativo** — juros compostos exigem não interrupção
3. **Razoável > Racional** — decisões que você consegue manter > decisões matematicamente ótimas
4. **Tail events dominam** — poucos eventos extremos determinam a maior parte dos retornos
5. **Independência financeira > riqueza** — controlar seu tempo é o dividendo mais valioso
6. **Humildade epistêmica** — ninguém sabe o futuro; construa sua vida financeira para sobreviver ao erro

---

## MERCADOS EFICIENTES VS. INEFICIENTES

### Hipótese dos Mercados Eficientes (Malkiel — Random Walk)
- Preços refletem toda informação disponível
- Bater o mercado consistentemente é impossível (em média)
- Implicação prática: fundos de índice superam gestão ativa no longo prazo

### Crítica Comportamental (Thaler, Kahneman, Shiller)
- Mercados são eficientes na média, não sempre
- Vieses cognitivos criam anomalias exploráveis
- Momentum, value premium, size premium — evidência de ineficiência parcial

---

## RISCO SISTÊMICO — LIÇÕES DO LTCM (When Genius Failed)

**O colapso do Long-Term Capital Management (1998):**
- Dois Nobel de Economia, modelos quantitativos sofisticados
- Alavancagem de 25:1 sobre ativos de ~$125 bilhões
- Correlações que "nunca aconteceriam" aconteceram simultaneamente

**Lições:**
1. Modelos assumem distribuições normais — eventos extremos são mais frequentes (fat tails)
2. Alavancagem amplifica erros de modelagem em colapso total
3. Correlações sobem para 1 em crises — diversificação falha quando mais precisa

---

## FINANÇAS COMPORTAMENTAIS — VIESES DO INVESTIDOR

| Viés | Como se manifesta | Solução |
|------|------------------|---------|
| **Excesso de confiança** | Girar portfólio demais, subestimar risco | Regras pré-definidas, regras de stop |
| **Aversão à perda** | Segurar ações perdedoras, vender vencedoras cedo | Critérios de venda definidos antes |
| **Ancoragem** | Esperar o preço de compra para vender | Avaliar valor atual, não preço pago |
| **Viés de disponibilidade** | Investir no que está na mídia | Análise independente, contrarian |
| **Efeito manada** | Comprar no topo, vender no fundo | Disciplina de valuation |
