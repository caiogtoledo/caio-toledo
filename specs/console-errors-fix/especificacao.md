# Console Errors Fix - Especificação

## Visão Geral
Corrigir todos os erros de console identificados no site: 4 erros 404 de imagens e 2 erros de hidratação React (`createRoot` export missing).

---

## Erros Identificados

| # | Erro | Tipo | Arquivo Origem |
|---|------|------|----------------|
| 1 | `GET /avatar.png 404` | Imagem faltante | `src/data/about.js` → `/avatar.png` |
| 2 | `GET /projects/taskflow.png 404` | Imagem faltante | `src/data/projects.js` → `/projects/taskflow.png` |
| 3 | `GET /projects/ecommerce-api.png 404` | Imagem faltante | `src/data/projects.js` → `/projects/ecommerce-api.png` |
| 4 | `GET /projects/portfolio.png 404` | Imagem faltante | `src/data/projects.js` → `/projects/portfolio.png` |
| 5 | `createRoot` export error (scroll-navigation-menu.tsx) | Hidratação React | `src/components/ui/GlobalNav.astro:6` |
| 6 | `createRoot` export error (animated-hero.tsx) | Hidratação React | `src/pages/index.astro:58` |

---

## Fase 1 - Corrigir Imagens 404

### 1.1. Criar diretório e arquivos de imagem
- [x] Criar diretório `public/projects/`
- [x] Adicionar `public/avatar.png` (imagem de avatar do perfil)
- [x] Adicionar `public/projects/taskflow.png` (screenshot do projeto TaskFlow)
- [x] Adicionar `public/projects/ecommerce-api.png` (screenshot do projeto E-Commerce API)
- [x] Adicionar `public/projects/portfolio.png` (screenshot do projeto Portfolio)

### 1.2. Verificar referências
- [x] Confirmar que `src/data/about.js` referencia `"/avatar.png"` (caminho correto)
- [x] Confirmar que `src/data/projects.js` referencia `"/projects/*.png"` (caminhos corretos)
- [x] Confirmar que `animated-hero.tsx:39` usa `about.avatar` que resolve para `"/avatar.png"`

**Notas:**
- As imagens precisam ser fornecidas (screenshots reais ou placeholders temporários)
- Os camhos em `src/data/` estão corretos - o problema é apenas a ausência dos arquivos

---

## Fase 2 - Corrigir Erro de Hidratação `createRoot`

### Causa Raiz
O `react-dom@19.2.6` não fornece um módulo ESM (`client.mjs`) para `react-dom/client` - possui apenas `client.js` (CJS). O Vite 7.3.3 falha ao resolver `import { createRoot } from "react-dom/client"` como ESM, retornando um módulo sem os named exports necessários. O `@astrojs/react/dist/client.js:2` faz `import { createRoot, hydrateRoot } from "react-dom/client"` e esse import falha no browser.

### Stack Afetada
- Astro v6.3.6
- Vite v7.3.3
- React v19.2.6 / React-DOM v19.2.6
- @astrojs/react v4.4.2

### 2.1. Configurar otimização de dependência no Vite
- [x] Editar `astro.config.mjs` para adicionar:
  ```js
  vite: {
    optimizeDeps: {
      include: ['react-dom/client']
    },
    ssr: {
      noExternal: ['react-dom']
    }
  }
  ```
  - `optimizeDeps.include`: força o Vite a pré-bundler `react-dom/client`, convertendo os exports CJS para ESM nomeados
  - `ssr.noExternal`: garante que `react-dom` não seja externalizado no SSR, mantendo consistência entre server e client

### 2.2. Mudar diretiva client do AnimatedHero
- [x] Em `src/pages/index.astro:58`, mudar `client:load` → `client:only="react"`
  - **Motivo**: `animated-hero.tsx` usa `framer-motion` e acessa `window.location.href` (linha 12), causando mismatch SSR/client. `client:only` evita SSR e hidratação problemática
  - **Trade-off**: componente não será renderizado no server (flash de conteúdo vazio no load inicial), mas evita o erro de hidratação

### 2.3. Limpar cache do Vite
- [x] Executar `rm -rf node_modules/.vite` para limpar cache de dependências pré-bundled
- [x] Reiniciar o dev server

---

## Fase 3 - Melhorias Opcionais (Low Priority)

### 3.1. Remover "use client" do scroll-navigation-menu.tsx
- [x] Remover `"use client"` da linha 1 de `src/components/ui/scroll-navigation-menu.tsx`
  - **Motivo**: `"use client"` é convenção do Next.js e é ignorada pelo Astro. A diretiva que importa é `client:only="react"` no template `.astro`. Remover evita confusão.

### 3.2. Corrigir mismatch de idioma no animated-hero.tsx
- [x] Em `animated-hero.tsx:12-14`, remover acesso a `window.location.href` para detectar idioma
- [x] Em vez disso, receber `lang` como prop do componente pai (`index.astro` já calcula `lang` na linha 15)
- [x] Atualizar `index.astro:58` para: `<AnimatedHero client:only="react" lang={lang} />`
  - **Motivo**: elimina a dependência de `window` e garante consistência de idioma

---

## Resumo

| Fase | Tasks | Prioridade |
|------|-------|------------|
| Fase 1 - Imagens | 7 | Alta |
| Fase 2 - Hidratação | 5 | Alta |
| Fase 3 - Melhorias | 2 | Baixa |
| **Total** | **14** | |

### Dependências
- Fase 1 requer imagens reais ou placeholders fornecidos pelo dev
- Fase 2.1 e 2.2 podem ser feitas independentemente
- Fase 2.3 depende de 2.1
- Fase 3 é opcional e não bloqueia as correções principais
