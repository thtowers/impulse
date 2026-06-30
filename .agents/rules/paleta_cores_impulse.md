# Paleta de Cores e Identidade Visual: Impulse

Este documento apresenta a análise cromática detalhada e as especificações técnicas da paleta de cores para a marca **Impulse**, desenvolvida diretamente a partir da extração e quantização dos pigmentos presentes no arquivo [logo.svg](file:///home/thiago/Documentos/impulse/logo.svg).

---

## 1. Propriedades Cromáticas da Logo

A identidade visual da **Impulse** baseia-se em uma transição suave (gradiente) entre duas cores principais: um **Ciano Claro/Turquesa** vibrante e um **Azul Escuro** corporativo.

### Cores Principais
*   **Ciano Claro (Light Cyan/Turquoise):** `#93DEE3`
*   **Azul Escuro (Deep Blue):** `#265BAB`

### Análise Fisiológica (Matiz, Saturação e Brilho)
*   **Matiz (Hue):** Toda a identidade visual está concentrada em uma faixa estreita no círculo cromático, entre **180° e 220°** (família dos Cianos, Teals e Azuis). Não há presença de outras matizes quentes ou verdes puros na assinatura principal.
*   **Saturação (Saturation):**
    *   O **Ciano Claro** (`#93DEE3`) possui uma saturação moderada-alta (cerca de 35%), o que o torna luminoso e moderno sem ser excessivamente agressivo aos olhos.
    *   O **Azul Escuro** (`#265BAB`) possui uma saturação de 78%, conferindo-lhe uma presença profunda, rica e de alta estabilidade visual.
*   **Brilho (Brightness/Value):**
    *   O **Ciano Claro** tem brilho elevado (89%), funcionando perfeitamente como ponto de iluminação, destaque ou contraste contra fundos escuros.
    *   O **Azul Escuro** possui brilho médio-baixo (67%), garantindo excelente contraste para textos e elementos estruturais.

---

## 2. Harmonia e Esquemas de Cores

A partir das cores da logo, estabelecemos os seguintes esquemas de harmonia para utilização em interfaces de usuário (UI):

### A. Esquema Análogo (Identidade da Logo)
A combinação original da logo é **Análoga**, pois utiliza o Ciano e o Azul, que são vizinhos no círculo cromático.
> [!NOTE]
> Transmite sentimentos de **fluidez, harmonia e calma**, simulando um fluxo de energia contínuo (o "impulso" dinâmico).

### B. Esquema Complementar (Para Destaques e Conversões)
Para criar pontos de alto contraste e energia (como botões de *Call-to-Action* ou alertas), utilizamos as cores opostas no círculo cromático (mudança de 180° no matiz):
*   **Complementar do Azul:** Coral/Ouro Escuro (`#AB7626`)
*   **Complementar do Ciano:** Rose/Salmon Soft (`#E39793`)

### C. Esquema Monocromático
Derivado exclusivamente da variação de brilho e saturação da cor principal Azul:
*   `#265BAB` (Azul Base) $\rightarrow$ `#1C4480` (Sombra) $\rightarrow$ `#92ADD5` (Tonalidade)

---

## 3. Psicologia das Cores Aplicada à Impulse

A escolha cromática da **Impulse** reflete com precisão os objetivos estratégicos de uma marca moderna de tecnologia ou serviços financeiros:

*   **Azul Escuro (`#265BAB`):** Evoca sentimentos de **confiança, segurança, credibilidade, integridade e profissionalismo**. É a base sólida da marca, que ancora a confiança do usuário.
*   **Ciano Claro (`#93DEE3`):** Inspira **inovação, clareza mental, tecnologia futurista, frescor e criatividade**. É o elemento que representa a agilidade, o movimento, a velocidade e o "impulso" tecnológico.
*   **Contraste de Apoio:** A combinação das duas cores cria um contraste tecnológico e elegante (remetendo a telas retroiluminadas e conceitos digitais premium).

---

## 4. Especificações Técnicas e Formatos

Para garantir a reprodução idêntica das cores em qualquer mídia (telas ou materiais impressos), utilize a tabela de conversão abaixo:

| Nome da Cor | Hexadecimal | RGB | CMYK | Aplicação Recomendada |
| :--- | :--- | :--- | :--- | :--- |
| **Ciano Logo** | `#93DEE3` | `(147, 222, 227)` | `C:35% M:2% Y:0% K:10%` | Destaques, Links, Bordas, Gradientes |
| **Azul Logo** | `#265BAB` | `(38, 91, 171)` | `C:77% M:46% Y:0% K:32%` | Cor Primária, Cabeçalhos, Botões Principais |
| **Apoio Escuro** | `#09162A` | `(9, 22, 42)` | `C:78% M:48% Y:0% K:84%` | Fundos (Dark Mode), Textos Escuros |
| **Apoio Claro** | `#F4F9FA` | `(244, 249, 250)` | `C:2% M:0% Y:0% K:2%` | Fundos (Light Mode), Cards e Containers |

---

## 5. Matrizes de Variação (Tonalidade, Sombra e Tom)

Abaixo estão as tabelas de derivação das cores principais para uso em estados interativos (como *hover*, *focus* ou elementos secundários):

### A. Variações do Ciano (`#93DEE3`)

| Tipo | Mistura (25%) | Mistura (50%) | Mistura (75%) |
| :--- | :--- | :--- | :--- |
| **Tonalidade (Tint)** *+ Branco* | `#AEE6EA` | `#C9EEF1` | `#E4F6F8` |
| **Sombra (Shade)** *+ Preto* | `#6EA6AA` | `#496F71` | `#243738` |
| **Tom (Tone)** *+ Cinza* | `#8EC6CA` | `#89AFB1` | `#849798` |

### B. Variações do Azul (`#265BAB`)

| Tipo | Mistura (25%) | Mistura (50%) | Mistura (75%) |
| :--- | :--- | :--- | :--- |
| **Tonalidade (Tint)** *+ Branco* | `#5C84C0` | `#92ADD5` | `#C8D6EA` |
| **Sombra (Shade)** *+ Preto* | `#1C4480` | `#132D55` | `#09162A` |
| **Tom (Tone)** *+ Cinza* | `#3C64A0` | `#536D95` | `#69768A` |

---

## 6. Diretrizes de Aplicação na Interface Web

Para criar interfaces premium, aplique as cores da seguinte forma:

```css
/* Exemplo de Folha de Estilos CSS aplicando a Paleta */
:root {
  --primary-blue: #265bab;
  --primary-blue-hover: #1c4480; /* Shade 25% */
  
  --accent-cyan: #93dee3;
  --accent-cyan-glow: rgba(147, 222, 227, 0.4);
  
  --bg-dark: #09162a; /* Shade 75% do Azul */
  --bg-card-dark: #132d55; /* Shade 50% do Azul */
  
  --bg-light: #f4f9fa; /* Tint ultra-suave */
  --text-dark: #09162a;
  --text-light: #ffffff;
}

/* Exemplo de botão premium com gradiente e transição */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-cyan));
  color: var(--text-light);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--accent-cyan-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(147, 222, 227, 0.6);
}
```

> [!TIP]
> **Dica de Design:** Em interfaces de tecnologia moderna, use a técnica de *Glassmorphism* (fundo desfocado translúcido) sobre o gradiente da logo para passar sofisticação, combinando fundos escuros com bordas finas de 1px usando o Ciano (`#93DEE3`) com opacidade de 20%.
