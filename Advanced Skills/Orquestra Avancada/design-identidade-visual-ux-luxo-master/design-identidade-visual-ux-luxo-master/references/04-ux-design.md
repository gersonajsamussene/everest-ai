# 04 — UX Design — Experiência do Usuário

---

## O QUE É UX (Don Norman — The Design of Everyday Things)

> "User experience encompasses all aspects of the end-user's interaction with the company, its services, and its products."

UX não é só usabilidade. É a totalidade da experiência — antes, durante e depois do uso.

**Os 6 princípios de design de Norman:**
1. **Visibilidade** — o estado do sistema deve ser sempre visível
2. **Feedback** — cada ação deve ter uma resposta perceptível
3. **Affordances** — o design sugere como ser usado (botão convida a apertar)
4. **Constraints** — limitações guiam o uso correto e previnem erros
5. **Mapeamento** — relação lógica entre controles e resultados (fogão → botões)
6. **Consistência** — padrões similares produzem resultados similares

---

## DON'T MAKE ME THINK (Steve Krug) — Usabilidade

**A regra de ouro:** Cada página deve ser autoexplicativa. O usuário não deve precisar pensar para usar.

**3 fatos sobre como usuários realmente se comportam:**
1. **Não leem — escaneiam** → Hierarquia visual é mais importante que texto
2. **Não otimizam — satisfazem** → Usam a primeira opção "boa o suficiente"
3. **Não descobrem — adivinham** → E erram. E culpam a si mesmos (não deveriam)

**Testes de usabilidade — a regra dos 5:**
Testar com 5 usuários encontra 85% dos problemas de usabilidade. Mais que 5 = retornos decrescentes.

**O teste do tronco (Trunk Test):**
Abra qualquer página interna do site. Sem contexto, o usuário consegue responder:
- Que site é esse?
- Em que seção estou?
- Que opções tenho aqui?
- Onde posso ir?
- Como voltar ao início?

---

## PERSONAS — ALAN COOPER (About Face)

Persona é um arquétipo de usuário baseado em pesquisa real — não em suposições.

### Como criar personas válidas:
```
1. PESQUISA
   → Entrevistas com 6–12 usuários reais por segmento
   → Observação contextual (onde e como usam o produto)
   → Não usar pesquisa quantitativa para criar personas

2. PADRÕES
   → Identificar padrões de comportamento, não demográficos
   → Comportamentos: objetivos, frustrações, fluxos, contexto de uso

3. CONSTRUÇÃO
   → Nome e foto (para tornar real e humanizado)
   → Objetivo primário (o que tenta realizar)
   → Objetivo de vida (motivação mais profunda)
   → Frustrações com a solução atual
   → Contexto de uso (quando, onde, com que dispositivo)

4. VALIDAÇÃO
   → Checar com stakeholders e time de produto
   → Atualizar com novos dados de pesquisa
```

**Erro crítico:** Criar personas em reunião de brainstorming sem pesquisa real = ficção científica.

---

## GOAL-DIRECTED DESIGN — FRAMEWORK COOPER

**Princípio:** Design deve servir os objetivos do usuário, não as funcionalidades do sistema.

```
Objetivo do usuário ≠ Tarefa
  → Tarefa: "Clicar em adicionar ao carrinho"
  → Objetivo: "Conseguir o produto rapidamente sem frustração"
  → Objetivo de vida: "Me sentir uma pessoa organizada e eficiente"
```

**Hierarquia de objetivos:**
1. **Goal de vida** (identidade, autoimagem)
2. **Goal de experiência** (como quer se sentir usando)
3. **Goal final** (o que quer realizar)
4. **Goal imediato** (a próxima ação específica)

---

## LEAN UX — UX EM TIMES ÁGEIS (Gothelf & Seiden)

**Manifesto Lean UX:**
- Entregáveis menos, conversas mais
- Hipóteses antes de requisitos
- Validação contínua antes de implementação completa
- Colaboração interdisciplinar (não silos de design → dev → QA)

### O Ciclo Lean UX

```
PENSAR
  → Formular hipótese: "Acreditamos que [usuário] consegue [objetivo]
    com [feature]. Saberemos que estamos certos quando [métrica]"

FAZER
  → Criar o menor experimento possível para testar a hipótese
  → Protótipo de papel, wireframe, mockup clickável, smoke test

CHECAR
  → Testar com usuários reais (5 usuários, 1 hora cada)
  → Medir resultado contra métrica definida

APRENDER
  → A hipótese foi confirmada ou refutada?
  → Perseverar, pivotar ou abandonar?
```

---

## EMOTIONAL DESIGN — OS 3 NÍVEIS (Don Norman)

```
VISCERAL (automático, pré-consciente)
  → Primeira impressão — "é bonito ou feio?"
  → Resposta imediata a cor, forma, proporção
  → Design que atrai ou repele antes de qualquer interação

COMPORTAMENTAL (durante o uso)
  → Prazer funcional — "funciona bem?"
  → Facilidade, eficiência, controle, feedback
  → O nível mais importante para usabilidade

REFLEXIVO (pós-uso, memória)
  → Significado — "o que diz sobre mim usar isso?"
  → Identidade, nostalgia, satisfação, orgulho
  → O nível que cria lealdade e advocacy
```

**Implicação de design:** Um produto pode falhar no nível visceral mas ter sucesso reflexivo (Instagram antigo era feio mas criava identidade). Um produto pode ser belíssimo mas falhar no comportamental (muitos apps de luxo são bonitos e frustrantes).

---

## JORNADA DO USUÁRIO — FRAMEWORK

```
FASE           AÇÃO DO USUÁRIO         EMOÇÃO          OPORTUNIDADE
─────────────────────────────────────────────────────────────────────
Descoberta   → Encontra o produto      Curiosidade     Hook claro
Consideração → Avalia alternativas     Dúvida          Prova, diferenciação
Onboarding   → Primeiro uso            Ansiedade       Simplificar, guiar
Ativação     → Vê o valor pela 1ª vez  Satisfação      Reforçar, celebrar
Retenção     → Usa regularmente        Hábito          Loops, notificações
Advocacia    → Recomenda               Orgulho         Facilitar o share
```

---

## CHECKLIST — AUDITORIA DE UX

```
[ ] Existe research com usuários reais? (não suposições)
[ ] As personas são baseadas em comportamento observado?
[ ] O fluxo principal tem menos de 5 etapas?
[ ] Erros têm mensagens claras e recuperáveis?
[ ] O sistema dá feedback para cada ação?
[ ] Testado em dispositivos e tamanhos de tela reais?
[ ] Acessibilidade: funciona com leitor de tela? Contraste WCAG?
[ ] Testado com 5 usuários reais antes do lançamento?
```
