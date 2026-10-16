# Plano de Upgrade de Design — Portfolio Caio Toledo

## Avaliação do Estado Atual

### Problemas Identificados

| # | Problema | Severidade |
|---|----------|-----------|
| 1 | **Hero genérico e sem impacto** — Avatar pequeno (150px), texto estático, animacoes CSS basicas (fadeIn/slideUp). Nao transmite personalidade nem presencia. | Alta |
| 2 | **Monocromatico sem cor de marca** — Tudo e branco no preto. `--color-accent: #ffffff`. Nenhuma cor de destaque para diferenciar ou guiar o olhar. | Alta |
| 3 | **Tipografia fraca para portfolio tech** — Fonte unica "Itim" (cursive) para tudo. Headings sem peso visual, sem hierarquia tipografica real. | Alta |
| 4 | **CSS raw em vez de Tailwind** — Tailwind configurado mas 90% dos componentes usam `<style is:global>` com CSS cru, gerando inconsistencia e bloat. | Media |
| 5 | **Animacoes CSS duplicadas** — `fadeInUp`, `slideUp`, `slideDown` redefinidos em cada componente. ScrollReveal (IntersectionObserver) copiado 4x. | Media |
| 6 | **shadcn/ui nao configurado** — Variaveis HSL existem mas sem `components.json`, sem primitivos (Button, Badge, Card). Botoes custom fragil. | Media |
| 7 | **Dependencia `next` problematica** — `import Link from "next/link"` no nav quebra em Astro. | Baixa |
| 8 | **Hero sem motion** — framer-motion instalado mas so usado no nav. Hero e secoes usam CSS keyframes limitados. | Alta |
| 9 | **Contato com emojis** — Icones de emoji (📧 📍) em vez de icones SVG/lucide. | Baixa |
| 10 | **Cards faceis de esquecer** — `rgba(255,255,255,0.05)` com `border: rgba(255,255,255,0.1)` — glassmorphism sem blur, sem profundidade real. | Media |

### Resumo Visual Atual
- **Estilo**: Dark minimalista generico — parece template de portfolio comum
- **Animacao**: CSS-only basico, sem spring physics, sem staggers interativos
- **Tipografia**: Uma fonte cursive para tudo, sem contraste
- **Cor**: Preto e branco puro, sem personalidade
- **Hero**: Avatar + nome + titulo + bio + 2 botoes — layout centrico estatico

---

## Direcao de Design: Animated Hero + Design System Moderno

### Referencia
Componente `animated-hero` do 21st.dev (tommyjepsen) — Hero com texto animado que cicla entre adjetivos usando framer-motion spring animations, tipografia grande ousada (5xl/7xl), CTAs com icones lucide, e layout vertical centrado com breathing room generoso.

### Principios de Design Alvo

1. **Motion-first** — framer-motion como sistema de animacao primario (spring physics, stagger, viewport triggers)
2. **Tipografia dramatica** — Hero com `text-5xl md:text-7xl`, font-weight contrastante (regular vs semibold), tracking-tighter
3. **Cor de marca** — Introduzir cyan como accent (hsl 190 80% 50%) inspirado no `text-spektr-cyan-50` da referencia, mantendo o dark theme
4. **Tailwind-first** — Migrar todos componentes para Tailwind utility classes, eliminar `<style is:global>`
5. **shadcn/ui primitives** — Configurar shadcn, usar Button, Badge, Card como base
6. **Animacao centralizada** — Um hook `useScrollReveal` + utilitarios de animacao compartilhados
7. **Profissionalismo tech** — Trocar "Itim" cursive por stack tipografica moderna (Inter/Sora para body, Sora/Geist para headings)

---

## Fases de Execucao

### Fase 1: Fundacao — Design System + shadcn + Tipografia
**Objetivo**: Atualizar a base para suportar o novo visual

- [x] 1.1 Configurar shadcn/ui (`npx shadcn@latest init`) — gerar `components.json`, primitivos Button, Card, Badge
- [x] 1.2 Atualizar `design-system.css` — adicionar variavel `--accent-brand: 190 80% 50%` (cyan), atualizar `--accent` para usar cyan em vez de branco
- [x] 1.3 Atualizar `tailwind.config.js` — adicionar `brand: "hsl(var(--accent-brand))"`, font-family Sora/Inter, estender animacoes
- [x] 1.4 Adicionar Google Fonts — Sora (headings) + Inter (body) no Layout.astro, remover "Itim"
- [x] 1.5 Atualizar `--font-family` e `--font-family-heading` em design-system.css
- [x] 1.6 Remover dependencia `next` do package.json e corrigir import no scroll-navigation-menu.tsx (trocar `Link from "next/link"` por `<a>`)
- [x] 1.7 Instalar dependencias necessarias: `@astrojs/tsconfig`, verificar se `class-variance-authoriance` e `clsx` estao disponiveis (shadcn deps)

### Fase 2: Hero Animado — Componente React com framer-motion
**Objetivo**: Criar o hero com impacto visual e motion, como referencia animated-hero

- [x] 2.1 Criar `src/components/ui/animated-hero.tsx` — componente React com `client:visible`
- [x] 2.2 Implementar logica de titulos ciclicos — `useState` + `useEffect` com timeout, array de adjetivos relevantes: ["amazing", "innovative", "scalable", "efficient", "smart"]
- [x] 2.3 Implementar animacao de texto com framer-motion `motion.span` — spring physics, y-axis slide (initial y: -100, animate baseado no index ativo), opacity transitions
- [x] 2.4 Layout do hero — container mx-auto, flex col, gap-8, py-20 lg:py-40, items-center justify-center
- [x] 2.5 Badge/topo — Button variant="secondary" size="sm" com "Leia meu artigo de lancamento" + icone MoveRight
- [x] 2.6 Heading principal — `text-5xl md:text-7xl max-w-2xl tracking-tighter`, texto estatico "I build" em `text-foreground` + texto animado em `text-brand` (cyan) com font-semibold
- [x] 2.7 Subtitulo — `text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center`
- [x] 2.8 CTAs — Dois botoes: "Fale comigo" (outline + PhoneCall) e "Ver Projetos" (primary + MoveRight), `size="lg"`, `gap-4`
- [x] 2.9 Integrar no `index.astro` — substituir `<Hero />` por `<AnimatedHero client:visible />`
- [x] 2.10 Garantir responsividade — mobile: headings menores, CTAs empilhados

### Fase 3: Migracao para Tailwind — Componentes Portfolio
**Objetivo**: Converter todos componentes Astro de CSS raw para Tailwind, usando shadcn primitivos

- [x] 3.1 Criar `src/components/portfolio/Skills.tsx` — React component, grid com shadcn Card, Badge para tags, Tailwind classes
- [x] 3.2 Criar `src/components/portfolio/ProjectsShowcase.tsx` — React component, cards com shadcn Card, image hover scale, Tailwind
- [x] 3.3 Criar `src/components/portfolio/Experience.tsx` — React component, timeline com Tailwind, border-l accent
- [x] 3.4 Criar `src/components/portfolio/Contact.tsx` — React component, lucide-react icons (Mail, MapPin) em vez de emojis, shadcn Button para links
- [x] 3.5 Atualizar `index.astro` — importar novos componentes React com `client:visible`
- [x] 3.6 Remover arquivos `.astro` antigos de portfolio (Hero.astro, Skills.astro, ProjectsShowcase.astro, Experience.astro, Contact.astro)
- [x] 3.7 Remover arquivos CSS legados (`footer.css`, `header.css`, `linkCard.css`, `profile.css`, `postCard.css`, `_Posts.css`) — NOTA: mantidos pois ainda sao usados por pages/posts e pages/links

### Fase 4: Motion System — Animacoes Coesas
**Objetivo**: Sistema de animacao unificado com framer-motion

- [x] 4.1 Criar `src/lib/animations.ts` — variantes reutilizaveis: `fadeInUp`, `staggerContainer`, `scaleIn`, `slideIn`
- [x] 4.2 Criar `src/hooks/useScrollReveal.ts` — hook com IntersectionObserver centralizado (substituir scripts duplicados)
- [x] 4.3 Aplicar `whileInView` do framer-motion em Skills cards — stagger 0.1s, fade-in + slide-up
- [x] 4.4 Aplicar `whileInView` em Projects cards — stagger com hover scale
- [x] 4.5 Aplicar `whileInView` em Experience timeline — slide-in da esquerda
- [x] 4.6 Aplicar `whileInView` em Contact section — fade-in sequencial
- [x] 4.7 Adicionar micro-interacoes — hover spring nos cards, tap scale nos botoes, hover lift nos skill tags
- [x] 4.8 Remover todos `<script>` de scrollReveal duplicados dos componentes antigos

### Fase 5: Refinamento Visual + Polish
**Objetivo**: Detalhes que elevam o design de "bom" para "excelente"

- [x] 5.1 Adicionar gradiente sutil de fundo — `bg-gradient-to-b from-background via-background to-muted` no body
- [x] 5.2 Refinar cards — `backdrop-blur-md` nos cards de vidro, `bg-card/50` com `border-border/50`
- [x] 5.3 Adicionar glow sutil no accent — `shadow-[0_0_20px_hsl(190_80%_50%/0.15)]` nos elementos brand
- [x] 5.4 Hero avatar com ring accent — `ring-2 ring-brand` ao redor do avatar no hero
- [x] 5.5 Smooth scroll com offset para nav fixa — `scroll-margin-top` nas secoes com id
- [x] 5.6 Transicoes de pagina — fade-in suave no body load
- [x] 5.7 Cursor spotlight / grid background sutil (opcional) — efeito de grid dots no hero
- [x] 5.8 Verificar acessibilidade — contrast ratio com nova cor brand, focus-visible rings

---

## Componente Hero — Design Detalhado

### Estrutura
```
<AnimatedHero client:visible />
  ├── Badge/Chip (Button variant="secondary" size="sm")
  │   └── "Leia meu artigo de lancamento →"
  ├── Heading (text-5xl md:text-7xl tracking-tighter)
  │   ├── "I build " (text-foreground, font-regular)
  │   └── <motion.span> cicla adjetivos (text-brand, font-semibold)
  │       ├── "amazing"
  │       ├── "innovative"
  │       ├── "scalable"
  │       ├── "efficient"
  │       └── "smart"
  ├── Subtitulo (text-lg md:text-xl text-muted-foreground)
  │   └── "Full Stack Developer at Mercado Livre..."
  └── CTAs (flex gap-3)
      ├── "Fale comigo" (Button outline lg + PhoneCall icon)
      └── "Ver Projetos" (Button primary lg + MoveRight icon)
```

### Animacao do Texto Ciclico
- **Intervalo**: 2000ms por adjetivo
- **Entrada**: `y: 0, opacity: 1` (spring, stiffness: 50)
- **Saida para cima** (indices anteriores): `y: -150, opacity: 0`
- **Saida para baixo** (indices posteriores): `y: 150, opacity: 0`
- **Posicionamento**: `absolute` dentro de container `relative flex overflow-hidden`

### Paleta de Cores Atualizada
| Token | HSL | Hex Aprox | Uso |
|-------|-----|-----------|-----|
| `--accent-brand` | `190 80% 50%` | `#1ac9d4` | Accent principal, texto animado do hero, hover states |
| `--background` | `0 0% 3.9%` | `#0a0a0a` | Fundo principal (mantido) |
| `--foreground` | `0 0% 98%` | `#fafafa` | Texto principal (mantido) |
| `--muted-foreground` | `0 0% 63.9%` | `#a3a3a3` | Texto secundario (mantido) |
| `--card` | `0 0% 5%` | `#0d0d0d` | Cards (levemente mais claro) |
| `--border` | `0 0% 14.9%` | `#262626` | Bordas (mantido) |

### Tipografia
| Uso | Font | Weight | Size |
|-----|------|--------|------|
| Hero heading | Sora | 400 (regular) | 5xl / 7xl |
| Hero adjetivo | Sora | 600 (semibold) | 5xl / 7xl |
| Body / subtitulo | Inter | 400 | lg / xl |
| Section titles | Sora | 600 | 3xl / 4xl |
| Card titles | Sora | 500 | xl |
| Tags / badges | Inter | 500 | sm |

---

## Dependencias a Adicionar/Remover

### Adicionar
- `shadcn/ui` via CLI (Button, Card, Badge primitivos)
- `@fontsource/sora` ou Google Fonts link para Sora
- `@fontsource/inter` ou Google Fonts link para Inter
- `clsx` + `tailwind-merge` (deps do shadcn)
- `class-variance-authority` (dep do shadcn)

### Remover
- `next` (^16.2.6) — nao e necessario, causa bugs em Astro
- Font "Itim" — substituida por Sora/Inter

---

## Arquivos a Criar

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `src/components/ui/animated-hero.tsx` | React | Hero com texto animado framer-motion |
| `src/components/ui/button.tsx` | React | shadcn Button primitivo |
| `src/components/ui/card.tsx` | React | shadcn Card primitivo |
| `src/components/ui/badge.tsx` | React | shadcn Badge primitivo |
| `src/components/portfolio/Skills.tsx` | React | Skills grid migrado para Tailwind |
| `src/components/portfolio/ProjectsShowcase.tsx` | React | Projects grid migrado para Tailwind |
| `src/components/portfolio/Experience.tsx` | React | Timeline migrado para Tailwind |
| `src/components/portfolio/Contact.tsx` | React | Contact migrado para Tailwind |
| `src/lib/animations.ts` | TS | Variantes de animacao compartilhadas |
| `src/lib/utils.ts` | TS | Utilitario `cn()` (clsx + tailwind-merge) |
| `components.json` | JSON | Configuracao shadcn/ui |

## Arquivos a Modificar

| Arquivo | Mudanca |
|---------|---------|
| `src/styles/design-system.css` | Adicionar `--accent-brand`, atualizar font vars |
| `tailwind.config.js` | Adicionar brand color, font families, animacoes |
| `src/layouts/Layout.astro` | Adicionar Google Fonts (Sora + Inter) |
| `src/pages/index.astro` | Importar novos componentes React |
| `src/components/ui/scroll-navigation-menu.tsx` | Remover `import Link from "next/link"`, usar `<a>` |
| `package.json` | Remover `next`, adicionar deps shadcn |

## Arquivos a Remover

| Arquivo | Motivo |
|---------|--------|
| `src/components/portfolio/Hero.astro` | Substituido por animated-hero.tsx |
| `src/components/portfolio/Skills.astro` | Migrado para React/Tailwind |
| `src/components/portfolio/ProjectsShowcase.astro` | Migrado para React/Tailwind |
| `src/components/portfolio/Experience.astro` | Migrado para React/Tailwind |
| `src/components/portfolio/Contact.astro` | Migrado para React/Tailwind |
| `src/components/footer/footer.css` | CSS legado |
| `src/components/header/header.css` | CSS legado |
| `src/components/cards/linkCard/linkCard.css` | CSS legado (tema claro) |
| `src/components/profile/profile.css` | CSS legado |

---

## Estimativa de Esforco

| Fase | Tarefas | Complexidade |
|------|---------|-------------|
| Fase 1: Fundacao | 7 | Media |
| Fase 2: Hero Animado | 10 | Alta |
| Fase 3: Migracao Tailwind | 7 | Media-Alta |
| Fase 4: Motion System | 8 | Media |
| Fase 5: Polish | 8 | Baixa-Media |
| **Total** | **40** | — |

---

## Nota Tecnica sobre Astro + React Islands

O projeto usa Astro com React islands (`client:visible`, `client:only="react"`). Os novos componentes React devem:
- Usar `client:visible` para secoes abaixo do fold (Skills, Projects, Experience, Contact) — carrega so quando visivel
- Usar `client:load` para o Hero (above the fold) — carrega imediatamente
- NAO depender de `next/link` — usar `<a>` tags nativas ou Astro `<Link>`
- Importar dados dos mesmos `src/data/*.js` existentes
