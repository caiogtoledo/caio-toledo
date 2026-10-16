# Plano de Reestruturação - Portfolio Caio Toledo

## Visão Geral

Transformar o projeto atual "Meus Links" em um **portfolio pessoal completo**, mantendo a funcionalidade de links (agora em `/links`) e os posts do blog.

---

## 1. Estrutura de Rotas

### Atual
```
/ (página principal com links)
/posts (lista de posts)
/posts/[slug] (post individual)
```

### Nova Estrutura
```
/ (home do portfolio - nova identidade visual)
/sobre (sobre mim)
/projetos (projetos em destaque)
/links (antiga página principal com cards de links)
/posts (mantém existente)
/posts/[slug] (mantém existente)
/contato (opcional)
```

---

## 2. Mudanças de Estrutura de Arquivos

### Mover arquivos existentes
```
src/pages/index.astro → src/pages/links/index.astro
src/external/links.js → src/data/links.js
```

### Novos arquivos a criar
```
src/pages/index.astro (nova home do portfolio)
src/pages/sobre/index.astro
src/pages/projetos/index.astro
src/pages/contato/index.astro (opcional)

src/components/portfolio/
  - Hero.astro
  - Skills.astro
  - Projects Showcase.astro
  - Experience.astro
  - Contact.astro

src/data/
  - projects.js (nova lista de projetos)
  - experience.js (experiência profissional)
  - skills.js (habilidades técnicas)
```

---

## 3. Componentes Existentes (manter)

- ✅ `Profile.jsx` - Pode ser reutilizado na nova home
- ✅ `Cards.jsx` / `linkCard.jsx` - Manter para página `/links`
- ✅ `PostCard.jsx` - Manter para listagem de posts
- ✅ `Header.jsx` - Atualizar navegação
- ✅ `Footer.jsx` - Manter
- ✅ `Layout.astro` - Manter estrutura base

---

## 4. Nova Identidade Visual

### Mudanças Principais
- **Layout**: Abandonar estilo "link tree" atual
- **Navegação**: Adicionar navbar fixa com links para todas as seções
- **Hero Section**: Nova seção de destaque na home com:
  - Foto/Avatar
  - Nome e título
  - Breve descrição
  - CTAs (links para projetos/contato)
- **Seções do Portfolio**:
  - Sobre (bio resumida)
  - Skills/Tecnologias
  - Projetos em destaque
  - Experiência profissional
  - Links sociais (integração com página /links)

### Estilo
- Manter tema escuro atual (se for preferência)
- Adicionar mais dinamismo (animações, hover effects)
- Tipografia mais moderna
- Layout mais "profissional" e menos "link tree"

---

## 5. Plano de Implementação

### Fase 1 - Preparação
- [ ] Mover `src/pages/index.astro` para `src/pages/links/index.astro`
- [ ] Mover `src/external/links.js` para `src/data/links.js`
- [ ] Atualizar imports nos arquivos afetados
- [ ] Criar nova estrutura de navegação no Header

### Fase 2 - Dados
- [ ] Criar `src/data/projects.js` com lista de projetos
- [ ] Criar `src/data/experience.js` com histórico profissional
- [ ] Criar `src/data/skills.js` com habilidades técnicas
- [ ] Criar `src/data/about.js` com informações pessoais

### Fase 3 - Componentes
- [ ] Criar `Hero.astro` ou `Hero.jsx`
- [ ] Criar `Skills.astro` ou `Skills.jsx`
- [ ] Criar `ProjectsShowcase.astro` ou `ProjectsShowcase.jsx`
- [ ] Criar `Experience.astro` ou `Experience.jsx`
- [ ] Criar `Contact.astro` ou `Contact.jsx`

### Fase 4 - Páginas
- [ ] Criar nova `index.astro` (home do portfolio)
- [ ] Criar `sobre/index.astro`
- [ ] Criar `projetos/index.astro`
- [ ] Criar `contato/index.astro` (opcional)
- [ ] Atualizar `/links/index.astro` se necessário

### Fase 5 - Estilização
- [ ] Definir nova paleta de cores
- [ ] Criar CSS global ou usar CSS Modules
- [ ] Adicionar animações e transições
- [ ] Garantir responsividade
- [ ] Testar em diferentes dispositivos

### Fase 6 - Ajustes Finais
- [ ] Atualizar SEO (títulos, meta descriptions)
- [ ] Otimizar imagens
- [ ] Testar navegação entre páginas
- [ ] Validar links externos
- [ ] Testar performance (Lighthouse)

---

## 6. Dependências Adicionais (Sugeridas)

```json
{
  "devDependencies": {
    "@tailwindcss/astro": "^4.0.0",  // Se for usar Tailwind
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^4.0.0"
  }
}
```

Ou manter CSS puro/Modules como já existe.

---

## 7. Conteúdo a Definir

### Projetos
- Nome do projeto
- Descrição curta
- Tecnologias usadas
- Link para repositório
- Link para demo (se houver)
- Imagem/thumbnail

### Experiência
- Empresa
- Cargo
- Período
- Principais responsabilidades/conquistas
- Tecnologias utilizadas

### Skills
- Linguagens
- Frameworks
- Ferramentas
- Nível de proficiência (opcional)

---

## 8. Considerações Técnicas

### Astro
- Manter Astro como framework principal
- Aproveitar Astro Islands se necessário interatividade
- Usar Astro Image para otimização de imagens

### React
- Manter componentes React existentes
- Usar React apenas onde for necessário (interatividade)
- Preferir Astro components para conteúdo estático

### SEO
- Manter meta tags
- Adicionar Open Graph tags
- Criar sitemap.xml
- Adicionar schema.org markup

### Performance
- Lazy loading para imagens
- Code splitting automático (Astro já faz)
- Otimizar fonts (usar font-display: swap)
- Minimizar JavaScript no client-side

---

## 9. Cronograma Sugerido

| Fase | Duração Estimada | Prioridade |
|------|------------------|------------|
| 1. Preparação | 1-2 horas | Alta |
| 2. Dados | 2-3 horas | Alta |
| 3. Componentes | 4-6 horas | Alta |
| 4. Páginas | 3-4 horas | Alta |
| 5. Estilização | 6-8 horas | Média |
| 6. Ajustes Finais | 2-3 horas | Média |

**Total estimado**: 18-26 horas de trabalho

---

## 10. Próximos Passos Imediatos

1. **Definir escopo**: Quais seções são essenciais?
2. **Coletar conteúdo**: Reunir textos, imagens, projetos
3. **Escolher estilo**: Definir direção artística (minimalista, moderno, etc)
4. **Iniciar Fase 1**: Começar pela reestruturação de arquivos

---

## Notas Adicionais

- Manter compatibilidade com deploy (Netlify)
- Manter histórico do git para rastreabilidade
- Documentar mudanças quebras (se houver)
- Considerar versão mobile-first
