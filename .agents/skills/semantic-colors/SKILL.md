---
name: Sistema de Cores Semântico Impulse
description: Define as diretrizes e nomenclatura para o uso de cores semânticas e distribuição (40/30/20/10) no projeto Impulse, garantindo consistência visual premium.
---

# Sistema de Cores Semântico Impulse

Este skill garante que o agente utilize consistentemente a paleta de cores semânticas e a regra de distribuição visual definidas a partir da identidade visual da logo oficial do projeto.

## Diretrizes de Cores Semânticas

Sempre utilize as classes de cores do Tailwind v4 configuradas no tema, evitando o uso de valores hexadecimais inline ou cores genéricas.

### Paleta de Cores Mapeada

- **Cor Primária (`--color-primary` / `bg-primary` / `text-primary`):** `#090d29`
  - *Finalidade:* Identidade institucional profunda. Usado para fundos de destaque escuros ou textos de marca importantes.
- **Cor Secundária (`--color-secondary` / `bg-secondary` / `text-secondary`):** `#29368f`
  - *Finalidade:* Marcação visual secundária, realces médios e hovers relacionados à marca.
- **Cor Terciária/Destaque (`--color-tertiary` / `bg-tertiary` / `text-tertiary`):** `#0071e3`
  - *Finalidade:* Cor de ação/foco (estilo Apple). Padrão para botões de call-to-action principais, links de conversão e elementos interativos ativos.
- **Títulos (`--color-title` / `text-title`):** `#090d29`
  - *Finalidade:* Títulos principais (`h1`, `h2`, `h3`) devem usar o azul institucional escuro para maior refinamento visual.
- **Texto Principal (`--color-text-main` / `text-text-main`):** `#1d1d1f`
  - *Finalidade:* Texto corrido de parágrafos. Cinza escuro para excelente contraste e ergonomia de leitura.
- **Texto Muted (`--color-text-muted` / `text-text-muted`):** `#86868b`
  - *Finalidade:* Informações secundárias, legendas, descrições secundárias e rodapé.
- **Background Base (`--color-bg-base` / `bg-bg-base`):** `#f5f5f7`
  - *Finalidade:* Fundo de página suave e premium.
- **Feedback Sucesso (`--color-success` / `text-success` / `bg-success`):** `#10b981`
- **Feedback Erro (`--color-error` / `text-error` / `bg-error`):** `#ef4444`

---

## Regra de Distribuição Visual (40%, 30%, 20%, 10%)

Ao projetar novas telas, seções ou componentes, utilize as cores nas seguintes proporções recomendadas:

1. **40% — Superfícies e Fundo (`bg-bg-base` ou `bg-white`):**
   - Espaços negativos e grandes áreas de base que proporcionam respiro visual ao layout.
2. **30% — Estrutura e Texto Principal (`text-text-main` ou títulos com `text-title`):**
   - Elementos informativos que lideram a leitura do usuário e dão a forma estrutural dos blocos.
3. **20% — Apoio e Elementos Secundários (`text-text-muted`, divisores, fundos secundários):**
   - Cards secundários, bordas discretas, rodapés e metadados. Reduz a saturação visual da página.
4. **10% — Call to Action e Interação (`bg-tertiary`, `text-tertiary`, `hover:bg-tertiary-hover`):**
   - Pontos específicos de foco (botões principais, links ativos, badges e ícones dinâmicos) para direcionar a atenção do usuário de forma eficaz.

---

## Exemplos Práticos no Código

### Exemplo de Botão CTA Principal (10% Destaque)
```jsx
<a 
  href="#solicitar" 
  className="bg-tertiary hover:bg-tertiary-hover text-white text-sm font-medium px-6 py-3 rounded-full transition-all"
>
  Solicitar Orçamento
</a>
```

### Exemplo de Estrutura de Card (40% / 30% / 20% Distribuição)
```jsx
<div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm">
  <span className="text-text-muted text-xs font-bold uppercase">Categoria</span>
  <h3 className="text-title text-2xl font-extrabold mt-2 mb-3">Título do Card</h3>
  <p className="text-text-muted text-sm leading-relaxed mb-6">
    Descrição do card contendo informações de apoio.
  </p>
</div>
```
