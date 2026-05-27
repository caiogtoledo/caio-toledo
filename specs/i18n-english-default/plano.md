# i18n & English Default - Plano de Execucao

## Objetivo

Tornar o ingles o idioma padrao de todo o conteudo da Home e das secoes do portfolio, com suporte a traduzir os textos para PT-BR via seletor de idioma no topo do site.

---

## Estado Atual - Problemas

| # | Problema | Severidade |
|---|----------|-----------|
| 1 | **Conteudo da Home mistura PT-BR e EN** — Hero tem textos hardcoded em PT ("Fale comigo", "Ver Projetos", "Leia meu artigo de lancamento") enquanto `about.title` em `about.js` esta em PT-BR ("Desenvolvedor de Software Full Stack") | Alta |
| 2 | **adjectives do Hero so em ingles** — Array `["amazing", "innovative", "scalable", "efficient", "smart"]` nao tem traducao para PT-BR | Alta |
| 3 | **Section titles hardcoded em PT-BR** — "Experiencia", "Contato", "Projetos" nos componentes React nao usam translations | Alta |
| 4 | **Textos do Contact hardcoded em PT-BR** — "Estou sempre aberto a novas oportunidades e colaboracoes. Entre em contato se tiver algum projeto interessante!" | Alta |
| 5 | **Button texts hardcoded em PT-BR** — "Repositorio" no ProjectsShowcase, "Fale comigo" no Hero | Alta |
| 6 | **translations.js incompleto** — So tem `about.title`, `about.bio`, `projectsDescription`, `contactDescription`. Faltam: section titles, button labels, hero texts, adjectives, footer texts | Alta |
| 7 | **about.js tem titulo em PT-BR** — `title: "Desenvolvedor de Software Full Stack"` deveria ser EN por default | Media |
| 8 | **experience.js descriptions em PT-BR** — Todos os `description` estao em portugues, sem traducao | Alta |
| 9 | **projects.js descriptions em PT-BR** — Todos os `description` e `name` estao em portugues, sem traducao | Alta |
| 10 | **Sem seletor de idioma na UI** — O lang so muda via `?lang=pt` na URL, sem botao visivel | Alta |
| 11 | **Navbar sem seletor de idioma** — `scroll-navigation-menu.tsx` nao tem language toggle | Alta |
| 12 | **Paginas secundarias (sobre, projetos, contato) com textos hardcoded em PT-BR** — Sem usar translations.js | Media |
| 13 | **Footer.jsx com textos hardcoded em PT-BR** — "Desenvolvedor de Software apaixonado...", "Navegacao", "Redes Sociais", "Todos os direitos reservados" | Media |
| 14 | **`about.js` data duplicado com translations** — `about.title` e `about.bio` existem em `about.js` (PT) e `translations.js` (EN+PT) | Media |
| 15 | **lang default via URL query param** — `?lang=en`/`?lang=pt` nao e ideal para SEO; deveria ser cookie ou path-based | Baixa |

---

## Decisoes Tecnicas

### Estrategia de i18n

1. **Arquivo unico de traducoes** — Expandir `src/data/translations.js` para cobrir TODOS os textos traduziveis do site
2. **Dados biligue em arquivos de dados** — `about.js`, `experience.js`, `projects.js` recebem campos `{en, pt}` para conteudo que varia por idioma (descriptions, names)
3. **English como default** — Quando `lang=en` ou sem parametro, tudo em ingles
4. **Persistencia via cookie + URL param** — Cookie `preferred-lang` com fallback para `?lang=pt`. Componente React le o cookie na primeira visita
5. **Seletor no navbar** — Toggle EN/PT no `scroll-navigation-menu.tsx`, posicionado no canto direito

### Por que nao usar Astro i18n nativo?

O projeto usa `output: 'server'` + React islands. O roteamento baseado em diretorio (`/en/`, `/pt/`) do Astro i18n exigiria refatorar todas as rotas e os React islands nao suportam `Astro.locale` diretamente. A abordagem de translations data file + prop drilling e mais simples e compativel com a arquitetura atual.

---

## Fases de Execucao

### Fase 1: Expandir Sistema de Traducoes (Dados)

**Objetivo**: Tornar todos os textos traduziveis

- [x] 1.1 Expandir `src/data/translations.js` com todas as chaves necessarias:

```js
const translations = {
  en: {
    about: { title: "Full Stack Developer", bio: "..." },
    hero: {
      badge: "Read my launch article",
      heading: "I build",
      headingSuffix: "things",
      adjectives: ["amazing", "innovative", "scalable", "efficient", "smart"],
      ctaContact: "Talk to me",
      ctaProjects: "View Projects",
    },
    nav: {
      home: "Home",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    sections: {
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    projects: {
      description: "Check out my software development projects",
      repo: "Repository",
      demo: "Demo",
    },
    contact: {
      description: "I'm always open to new opportunities and collaborations. Get in touch if you have an interesting project!",
      socialTitle: "Social Media",
    },
    footer: {
      bio: "Software Developer passionate about creating innovative solutions.",
      navigation: "Navigation",
      social: "Social Media",
      rights: "All rights reserved.",
    },
  },
  pt: {
    about: { title: "Desenvolvedor Full Stack", bio: "..." },
    hero: {
      badge: "Leia meu artigo de lancamento",
      heading: "Eu construo",
      headingSuffix: "coisas",
      adjectives: ["incriveis", "inovadores", "escalaveis", "eficientes", "inteligentes"],
      ctaContact: "Fale comigo",
      ctaProjects: "Ver Projetos",
    },
    nav: {
      home: "Inicio",
      skills: "Habilidades",
      projects: "Projetos",
      experience: "Experiencia",
      contact: "Contato",
    },
    sections: {
      skills: "Habilidades",
      projects: "Projetos",
      experience: "Experiencia",
      contact: "Contato",
    },
    projects: {
      description: "Confira meus projetos de desenvolvimento de software",
      repo: "Repositorio",
      demo: "Demo",
    },
    contact: {
      description: "Estou sempre aberto a novas oportunidades e colaboracoes. Entre em contato se tiver algum projeto interessante!",
      socialTitle: "Redes Sociais",
    },
    footer: {
      bio: "Desenvolvedor de Software apaixonado por criar solucoes inovadoras.",
      navigation: "Navegacao",
      social: "Redes Sociais",
      rights: "Todos os direitos reservados.",
    },
  },
};
```

- [x] 1.2 Atualizar `src/data/about.js` — tornar `title` em ingles por default, mover titulo PT para translations:

```js
const about = {
  name: "Caio Toledo",
  title: "Full Stack Developer",
  email: "contato@caiotoledo.dev",
  location: "Sao Paulo, Brazil",
  avatar: "/avatar.png",
}
```

- [x] 1.3 Atualizar `src/data/experience.js` — adicionar campos biligues:

```js
const experience = [
  {
    id: 1,
    company: "Mercado Livre S.A.",
    role: "Software Developer",
    period: "Mar 2025 - Present",
    description: {
      en: "Building high-availability back-end services with Java, Kotlin, and Go, plus front-end and mobile with React JS, Swift, and Kotlin. Actively managing infrastructure provisioning, CI/CD pipelines, and deployment processes.",
      pt: "Desenvolvimento back-end de alta disponibilidade usando Java, Kotlin e Go, alem de front-end e mobile com React JS, Swift e Kotlin. Gerenciamento ativo de provisionamento de infraestrutura, pipelines CI/CD e processos de deployment.",
    },
    technologies: ["Java", "Kotlin", "Go", "React JS", "Swift", "CI/CD", "Docker", "AWS"],
  },
  // ... demais experiences
]
```

- [x] 1.4 Atualizar `src/data/projects.js` — adicionar campos biligues para `name` e `description`:

```js
const projects = [
  {
    id: 1,
    name: {
      en: "Personal Portfolio",
      pt: "Portfolio Pessoal",
    },
    description: {
      en: "Personal portfolio site built with Astro, featuring responsive design, optimized SEO, and high performance. Includes projects, experience, skills, and contact sections.",
      pt: "Site de portfolio pessoal desenvolvido com Astro, featuring design responsivo, SEO otimizado e performance de alta qualidade. Inclui secoes de projetos, experiencia, habilidades e contato.",
    },
    // ... demais campos
  },
  // ... demais projects
]
```

- [x] 1.5 Atualizar `src/data/skills.js` — categorias com chaves biligues:

```js
const skills = [
  {
    category: { en: "Programming Languages", pt: "Linguagens de Programacao" },
    items: ["Java", "JavaScript", "Python", "Dart"],
  },
  // ... demais skills
]
```

---

### Fase 2: Atualizar Componentes React (Consumir Traducoes)

**Objetivo**: Todos os componentes React leem textos do translations em vez de hardcoded

- [ ] 2.1 Atualizar `src/components/ui/animated-hero.tsx`:
  - Receber `lang` prop (ja recebe)
  - Usar `t.hero.badge`, `t.hero.heading`, `t.hero.headingSuffix`, `t.hero.adjectives`, `t.hero.ctaContact`, `t.hero.ctaProjects`
  - Remover array `adjectives` hardcoded
  - Remover textos hardcoded em PT-BR

- [ ] 2.2 Atualizar `src/components/portfolio/Skills.tsx`:
  - Receber `lang` prop
  - Usar `t.sections.skills` para o titulo da secao
  - Usar `skillGroup.category[lang]` ou `skillGroup.category` (compatibilidade)

- [ ] 2.3 Atualizar `src/components/portfolio/ProjectsShowcase.tsx`:
  - Receber `lang` prop
  - Usar `t.sections.projects` para o titulo
  - Usar `t.projects.repo`, `t.projects.demo` para botoes
  - Usar `project.name[lang]`, `project.description[lang]`

- [ ] 2.4 Atualizar `src/components/portfolio/Experience.tsx`:
  - Receber `lang` prop
  - Usar `t.sections.experience` para o titulo
  - Usar `exp.description[lang]`

- [ ] 2.5 Atualizar `src/components/portfolio/Contact.tsx`:
  - Receber `lang` prop
  - Usar `t.sections.contact` para o titulo
  - Usar `t.contact.description` para o texto

- [ ] 2.6 Atualizar `src/components/Footer.jsx`:
  - Receber `lang` prop
  - Usar `t.footer.bio`, `t.footer.navigation`, `t.footer.social`, `t.footer.rights`

---

### Fase 3: Seletor de Idioma no Navbar

**Objetivo**: Adicionar toggle EN/PT visivel no topo do site

- [ ] 3.1 Criar `src/components/ui/LanguageToggle.tsx`:
  - Botao compacto com label "EN" / "PT"
  - Usa icone `Globe` do lucide-react + texto
  - Alterna entre "en" e "pt"
  - Salva preferencia em cookie `preferred-lang` (expira 1 ano)
  - Atualiza URL com `?lang=en` ou `?lang=pt` via `window.location`
  - Estilo: `text-sm text-muted-foreground hover:text-brand transition-colors`

- [ ] 3.2 Atualizar `src/components/ui/scroll-navigation-menu.tsx`:
  - Adicionar `LanguageToggle` no lado direito do navbar (desktop)
  - Adicionar `LanguageToggle` no menu flutuante (mobile)
  - Receber `lang` prop para estado inicial
  - Atualizar `defaultMenuItems` para usar titulos traduzidos (receber via props)

- [ ] 3.3 Atualizar `src/components/ui/GlobalNav.astro`:
  - Passar `lang` como prop para `ScrollNavigationMenu`
  - Ler lang da URL query param ou cookie

- [ ] 3.4 Criar utilitario `src/lib/i18n.ts`:
  - `getLangFromRequest(request: Request): string` — le cookie `preferred-lang`, fallback para URL param `?lang=`, fallback para `"en"`
  - `setLangCookie(lang: string): void` — seta cookie `preferred-lang`
  - Tipagem para `translations` (TypeScript interface)

---

### Fase 4: Atualizar Paginas e Layout

**Objetivo**: Propagar `lang` para todos os componentes e paginas

- [ ] 4.1 Atualizar `src/pages/index.astro`:
  - Usar `getLangFromRequest()` em vez de leitura manual do URL param
  - Passar `lang` para todos os componentes: `AnimatedHero`, `Skills`, `ProjectsShowcase`, `Experience`, `Contact`, `Footer`
  - SEO: `<html lang={lang}>`, meta tags com textos traduzidos

- [ ] 4.2 Atualizar `src/layouts/Layout.astro`:
  - Usar `getLangFromRequest()` para lang detection
  - Passar `lang` para `GlobalNav`
  - `<html lang={lang}>` dinamico

- [ ] 4.3 Atualizar `src/pages/sobre/index.astro`:
  - Usar sistema de traducoes
  - Passar `lang` para componentes

- [ ] 4.4 Atualizar `src/pages/projetos/index.astro`:
  - Usar sistema de traducoes
  - Passar `lang` para componentes

- [ ] 4.5 Atualizar `src/pages/contato/index.astro`:
  - Usar sistema de traducoes
  - Passar `lang` para componentes

---

### Fase 5: Dados em Ingles por Default

**Objetivo**: Garantir que o conteudo default (sem lang) seja 100% em ingles

- [ ] 5.1 Verificar `about.js` — `title` e `location` em ingles
- [ ] 5.2 Verificar `experience.js` — `role` e `company` em ingles (ja estao), `description.en` como default
- [ ] 5.3 Verificar `projects.js` — `name.en` e `description.en` como default
- [ ] 5.4 Verificar `skills.js` — `category.en` como default
- [ ] 5.5 Verificar hero — "I build" e adjetivos em ingles por default
- [ ] 5.6 Verificar todos os textos estaticos — nenhum PT-BR quando `lang=en`

---

### Fase 6: Testes e Verificacao

**Objetivo**: Garantir que tudo funciona nos dois idiomas

- [ ] 6.1 Testar Home com `?lang=en` — todo conteudo em ingles
- [ ] 6.2 Testar Home com `?lang=pt` — todo conteudo em PT-BR
- [ ] 6.3 Testar seletor de idioma — toggle altera idioma e persiste cookie
- [ ] 6.4 Testar cookie — ao recarregar a pagina, idioma persiste
- [ ] 6.5 Testar paginas secundarias com ambos idiomas
- [ ] 6.6 Verificar SEO — `<html lang>` correto, meta tags traduzidas
- [ ] 6.7 Verificar responsividade — language toggle funciona em mobile
- [ ] 6.8 Verificar `npm run build` — sem erros

---

## Arquivos a Criar

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `src/components/ui/LanguageToggle.tsx` | React | Botao toggle EN/PT com icone Globe |
| `src/lib/i18n.ts` | TS | Utilitarios: getLangFromRequest, setLangCookie, tipos |

## Arquivos a Modificar

| Arquivo | Mudanca |
|---------|---------|
| `src/data/translations.js` | Expandir com todas as chaves (hero, nav, sections, projects, contact, footer) |
| `src/data/about.js` | Title/location em ingles, remover bio (mover para translations) |
| `src/data/experience.js` | Adicionar `description: { en, pt }` em cada item |
| `src/data/projects.js` | Adicionar `name: { en, pt }` e `description: { en, pt }` em cada item |
| `src/data/skills.js` | Adicionar `category: { en, pt }` em cada grupo |
| `src/components/ui/animated-hero.tsx` | Usar `t.hero.*` em vez de textos hardcoded |
| `src/components/portfolio/Skills.tsx` | Receber `lang`, usar translations e category biligue |
| `src/components/portfolio/ProjectsShowcase.tsx` | Receber `lang`, usar translations e dados biligues |
| `src/components/portfolio/Experience.tsx` | Receber `lang`, usar translations e description biligue |
| `src/components/portfolio/Contact.tsx` | Receber `lang`, usar translations |
| `src/components/Footer.jsx` | Receber `lang`, usar translations |
| `src/components/ui/scroll-navigation-menu.tsx` | Adicionar LanguageToggle, receber `lang` prop, nav items traduzidos |
| `src/components/ui/GlobalNav.astro` | Passar `lang` para ScrollNavigationMenu |
| `src/pages/index.astro` | Usar getLangFromRequest, passar `lang` para todos componentes |
| `src/layouts/Layout.astro` | Usar getLangFromRequest, passar `lang` para GlobalNav |
| `src/pages/sobre/index.astro` | Usar sistema de traducoes |
| `src/pages/projetos/index.astro` | Usar sistema de traducoes |
| `src/pages/contato/index.astro` | Usar sistema de traducoes |

---

## Estrutura do LanguageToggle

### Desktop
```
[Logo] [Home] [Skills] [Projects] [Experience] [Contact]    [Globe EN|PT]
```

### Mobile
Menu flutuante com item adicional no final:
```
[Home]
[Skills]
[Projects]
[Experience]
[Contact]
─────────
[Globe] EN | PT
```

### Comportamento
1. Clique no toggle → alterna entre "en" e "pt"
2. Salva cookie `preferred-lang` com validade de 365 dias
3. Atualiza a URL com `?lang=en` ou `?lang=pt` (para SSR compatibility)
4. Destaque visual no idioma ativo: `text-brand` no ativo, `text-muted-foreground` no inativo

---

## Estimativa de Esforco

| Fase | Tarefas | Complexidade |
|------|---------|-------------|
| Fase 1: Dados de Traducao | 5 | Media |
| Fase 2: Componentes React | 6 | Media |
| Fase 3: Language Toggle | 4 | Media-Alta |
| Fase 4: Paginas e Layout | 5 | Media |
| Fase 5: Default EN | 6 | Baixa |
| Fase 6: Testes | 8 | Baixa-Media |
| **Total** | **34** | — |

---

## Nota Tecnica

- Componentes React com `client:visible` ou `client:only="react"` recebem `lang` como prop do Astro
- O cookie e lido no server-side (Astro frontmatter) via `Astro.request.headers` e no client-side via `document.cookie`
- A atualizacao de idioma faz `window.location.href = currentPath + ?lang=X` para garantir que o Astro SSR re-renderize com o idioma correto
- Dados que nao variam por idioma (technologies, period, company, repoUrl, demoUrl, email, avatar) permanecem com campo unico
- A bio ja existe em `translations.js` e deve ser a fonte unica (remover de `about.js` para evitar duplicacao)
