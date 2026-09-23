# Michelle Milan Eventos & Cerimonial | Arquitetura Web & SEO Técnico

Uma aplicação web institucional de alto padrão desenvolvida em **HTML5 Semântico**, **CSS3 Modular Vanilla** e **JavaScript Vanilla**, projetada com foco em **design de luxo (Dark & Gold)**, **performance extrema (Core Web Vitals)** e uma **infraestrutura avançada de SEO Local e Territorial para Brasília / Distrito Federal e Entorno (RIDE)**.

---

## 🎯 Visão Geral do Projeto

A plataforma da **Michelle Milan Eventos** combina estética visual refinada (Glassmorphism, tipografia com serifas editoriais, acentos caligráficos e paleta ouro/champanhe sobre fundo negro) com uma engenharia técnica sem frameworks pesados, garantindo carregamento instantâneo, pontuações elevadas no Google Lighthouse e indexação semântica completa nos motores de busca.

---

## 🏛️ Nova Arquitetura Técnica Implementada

### 1. 📍 SEO Local Territorial de Alta Densidade (Brasília & Entorno)
- **Domínio Canônico Padronizado:** Host único `https://michellemilaneventos.com.br/` (sem prefixo `www`) em todos os metadados, links canônicos, OpenGraph, Twitter Cards e Schemas.
- **Grafo Semântico Schema.org (`@graph` JSON-LD):**
  - **`LocalBusiness` / `ProfessionalService`:** Identificação formal da empresa, faixa de preço (`$$$$`), coordenadas geográficas do DF (`-15.793889`, `-47.882778`) e canais oficiais.
  - **Mapeamento de 42 Regiões em `areaServed`:** Cobertura de todas as 35 Regiões Administrativas do DF (Plano Piloto - Asa Sul e Asa Norte, Lago Sul, Lago Norte, Park Way, Jardim Botânico, Sudoeste, Noroeste, Águas Claras, Taguatinga, etc.) e municípios estratégicos do Entorno/RIDE (Valparaíso, Luziânia, Novo Gama, Águas Lindas, Formosa).
  - **`hasOfferCatalog`:** Detalhamento estruturado dos 4 serviços principais (Assessoria Completa para Casamentos, Cerimonial do Dia / Day Of, Festas de 15 Anos/Debutantes e Eventos Corporativos).
  - **`FAQPage` Integrada:** Marcação estruturada para exibição de *Rich Snippets* de perguntas e respostas no Google.
- **Seção Visual de Cobertura (`#cobertura`):** Seção responsiva no DOM estruturada em 4 eixos territoriais com design de cartões dourados translúcidos.
- **Calibragem Semântica de Headings (H1 a H3):**
  - **H1:** `Cerimonial de Luxo em Brasília & Momentos Inesquecíveis`
  - **H2 (Sobre):** `Michelle Milan | Cerimonialista de Luxo no DF`
  - **H2 (Serviços):** `Assessoria & Cerimonial sob medida em Brasília`
  - **H2 (Portfólio):** `Casamentos & Eventos realizados em Brasília`
  - **H2 (FAQ):** `Perguntas Frequentes sobre Cerimonial no DF`
  - **H2 (Cobertura):** `Atendimento em todo o Distrito Federal & Entorno`

### 2. ⚡ Performance de Assets & Core Web Vitals
- **Pipeline WebP:** Todas as imagens foram convertidas de JPEG para **WebP** com compressão balanceada (qualidade 82, interpolação Lanczos para resoluções > 1600px).
  - **Redução de Payload:** Redução de ~2.79 MB para ~1.33 MB (**economia global de ~52.3%**).
- **Estratégia Híbrida de Carregamento:**
  - Imagens críticas (Hero): `fetchpriority="high"` e `loading="eager"`.
  - Imagens abaixo da dobra (Portfólio e Sobre): `loading="lazy"` e `decoding="async"`.
- **Resource Hints:** Injeção de tags `<link rel="preconnect">` para `fonts.googleapis.com` e `fonts.gstatic.com` (crossorigin) para acelerar a entrega de fontes e First Contentful Paint (FCP).

### 3. 🖼️ Otimização para Google Imagens & Alt Tags Locais
- Textos alternativos (`alt`) descritivos e contextualizados com locais de eventos de alto padrão em Brasília:
  - *Mesa de doces finos para casamento clássico no Lago Sul, Brasília*
  - *Arranjo floral requintado para evento social no Park Way DF*
  - *Decoração de cerimônia de casamento ao ar livre no Setor de Clubes Sul, Brasília*
  - *Ambientação luxuosa e iluminação cênica para recepção de casamento em Brasília DF*
  - *Mesa posta de banquete para festa de 15 anos de luxo em Taguatinga e Águas Claras*
  - *Detalhes de decoração floral suspensa para casamento no Lago Norte, Brasília*
  - *Cenário completo de altar para cerimônia de casamento intimista no Jardim Botânico DF*

### 4. 📱 PWA & Experiência Mobile
- **`site.webmanifest`:** Configurado para exibição `standalone`, paleta de tema (`#0d0c0a` e `#c9a84c`) e ícones em formato WebP.
- **Metatags iOS / Safari:** `apple-mobile-web-app-capable`, `black-translucent` status bar e título para salvar na tela inicial.

### 5. 🛡️ Infraestrutura e Edge Cache na Vercel (`vercel.json`)
- **Cache-Control Imutável:** Assets em `/assets/(.*)` configurados com `public, max-age=31536000, immutable`.
- **Cabeçalhos de Segurança HTTP (AppSec):**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
- **URLs Limpas & Redirecionamentos 301:** `cleanUrls: true`, remoção de barra final (`trailingSlash: false`) e redirecionamentos canônicos automáticos de rotas antigas (`/portfolio`, `/sobre`, `/servicos`, `/faq`) para suas respectivas âncoras.

### 6. 💬 Rastreamento de Conversão & Acessibilidade
- **Parâmetros de Origem no WhatsApp:** Link configurado para registrar a origem do lead (`text=Olá Michelle, encontrei seu site e gostaria de um orçamento para evento em Brasília`).
- **Acessibilidade (a11y / WCAG):** Rótulos `aria-label` explícitos em todos os pontos de interação (menu mobile, lightbox, botões de ação e botão flutuante).

---

## 📁 Estrutura de Arquivos

```text
michellemilaneventos/
│
├── vercel.json          # Headers de segurança, cache imutável e redirects 301
├── robots.txt           # Diretivas de rastreamento para buscadores e link do sitemap
├── sitemap.xml          # Mapa do site com prioridade 1.0 e dados da imagem canônica
├── site.webmanifest     # Manifesto PWA para experiência mobile/app
├── index.html           # Aplicação única completa, semântica e estruturada
│
├── css/                 # Arquitetura modular de estilos CSS Vanilla
│   ├── global.css       # Variáveis de design system, reset e tipografia
│   ├── header.css       # Navegação com efeito Glassmorphism e drawer mobile
│   ├── hero.css         # Seção principal com overlays e scroll indicator
│   ├── sections.css     # Seções Sobre, Serviços e Bloco de Cobertura Territorial (#cobertura)
│   ├── gallery.css      # Grid responsivo de portfólio e modal Lightbox
│   ├── faq.css          # Acordeão interativo estilizado
│   ├── footer.css       # Rodapé institucional, links e dados de contato
│   └── floating-wpp.css # Botão flutuante do WhatsApp com tooltip e micro-interação
│
├── js/                  # Scripts Vanilla sem dependências
│   ├── gallery.js       # Controle do modal lightbox (teclado, navegação e zoom)
│   └── main.js          # Scroll spy, menu mobile, animações via IntersectionObserver
│
└── assets/              # Mídias otimizadas de alta resolução
    ├── michele.webp     # Foto principal da cerimonialista (Hero/Sobre/OG/Favicon)
    ├── decoracao-1.webp # Acervo de portfólio (Lago Sul)
    ├── decoracao-2.webp # Acervo de portfólio (Park Way)
    ├── decoracao-3.webp # Acervo de portfólio (Setor de Clubes Sul)
    ├── decoracao-4.webp # Acervo de portfólio (Brasília)
    ├── decoracao-5.webp # Acervo de portfólio (Águas Claras / Taguatinga)
    ├── decoracao-6.webp # Acervo de portfólio (Lago Norte)
    └── decoracao-7.webp # Acervo de portfólio (Jardim Botânico)
```

---

## 🎨 Tipografia e Paleta de Cores

- **Cormorant Garamond:** Títulos serifados editoriais, transmitindo elegância e tradição de alta costura.
- **Montserrat:** Corpo de texto limpo, geométrico e altamente legível em todas as resoluções.
- **Great Vibes:** Acentos caligráficos para assinatura visual de luxo.
- **Paleta Cromática:**
  - Dourado Principal: `#c9a84c`
  - Dourado Claro: `#dfc776`
  - Fundo Dark Profundo: `#0d0c0a`
  - Superfícies Elevadas: `#14120e` / `#1b1813`
  - Borda Translúcida: `rgba(201, 168, 76, 0.2)`

---

## 🚀 Como Executar Localmente ou Fazer Deploy

### Execução Local
Por ser uma aplicação pura (HTML, CSS e JS estáticos), não há necessidade de compiladores ou bundlers:
```bash
# Com Python 3
python -m http.server 8000

# Ou com extensões como Live Server no VS Code
```
Acesse `http://localhost:8000` no seu navegador.

### Deploy na Vercel (Recomendado)
O projeto está 100% calibrado para a Vercel com o [`vercel.json`](vercel.json) já pronto:
1. Conecte o repositório à Vercel.
2. Mantenha os campos de *Build Command* e *Output Directory* vazios (Default / Other).
3. A Vercel aplicará automaticamente os cabeçalhos de segurança, cache imutável de 1 ano para os assets e as regras de redirecionamento 301.
