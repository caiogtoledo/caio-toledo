# Portfolio Feature - Plano de Execução

## Visão Geral
Transformar o projeto atual em um portfólio pessoal completo, movendo a página principal de links para `/links` e criando uma nova home com visual profissional.

---

## ✅ Fase 1 - Preparação da Estrutura

### 1.1. Mover arquivos existentes
- [x] Mover `src/pages/index.astro` para `src/pages/links/index.astro`
- [x] Mover `src/external/links.js` para `src/data/links.js`
- [x] Atualizar import do `links.js` em `src/pages/links/index.astro`
- [x] Atualizar import do `links.js` em `src/components/cards/cards.jsx` (se necessário)

### 1.2. Atualizar navegação
- [x] Adicionar navbar com links para: Home, Sobre, Projetos, Links, Posts, Contato
- [x] Atualizar Header.jsx para incluir nova navegação
- [x] Garantir que header seja consistente em todas as páginas

### 1.3. Ajustar página /links
- [x] Verificar se `/links/index.astro` está funcionando corretamente
- [x] Atualizar título e meta tags se necessário
- [x] Testar navegação a partir do header

---

## ✅ Fase 2 - Criação de Dados

### 2.1. Criar arquivo de projetos
- [x] Criar `src/data/projects.js`
- [x] Preencher com lista de projetos (mínimo 3-5 projetos)
- [x] Estrutura sugerida:
```js
const projects = [
{
id: 1,
name: "Nome do Projeto",
description: "Descrição curta",
technologies: ["React", "Node.js"],
repoUrl: "https://github.com/...",
demoUrl: "https://...",
image: "/projects/project1.png"
}
]
```

### 2.2. Criar arquivo de experiência
- [x] Criar `src/data/experience.js`
- [x] Preencher com histórico profissional
- [x] Estrutura sugerida:
```js
const experience = [
{
id: 1,
company: "Empresa",
role: "Cargo",
period: "Jan 2024 - Atual",
description: "Principais responsabilidades",
technologies: ["Java", "Spring Boot"]
}
]
```

### 2.3. Criar arquivo de skills
- [x] Criar `src/data/skills.js`
- [x] Agrupar por categorias (Frontend, Backend, Tools, etc)
- [x] Estrutura sugerida:
```js
const skills = [
{
category: "Frontend",
items: ["React", "TypeScript", "TailwindCSS"]
},
{
category: "Backend",
items: ["Node.js", "Python", "Java"]
}
]
```

### 2.4. Criar arquivo sobre
- [x] Criar `src/data/about.js`
- [x] Adicionar bio, foto, informações de contato
- [x] Estrutura sugerida:
```js
const about = {
name: "Caio Toledo",
title: "Desenvolvedor de Software",
bio: "Texto sobre sua trajetória...",
email: "email@exemplo.com",
location: "São Paulo, Brasil",
avatar: "/avatar.png"
}
```

---

## ✅ Fase 3 - Criação de Componentes

### 3.1. Hero Component
- [x] Criar `src/components/portfolio/Hero.astro` (ou `.jsx`)
- [x] Incluir: nome, título, bio curta, CTAs (projetos/contato)
- [x] Adicionar foto/avatar
- [x] Estilizar com animação de entrada

### 3.2. Skills Component
- [x] Criar `src/components/portfolio/Skills.astro` (ou `.jsx`)
- [x] Exibir categorias e habilidades
- [x] Adicionar ícones ou badges para cada skill
- [x] Layout responsivo (grid/flex)

### 3.3. Projects Showcase Component
- [x] Criar `src/components/portfolio/ProjectsShowcase.astro` (ou `.jsx`)
- [x] Cards de projetos com imagem, título, descrição
- [x] Links para repositório e demo
- [x] Hover effects e transições

### 3.4. Experience Component
- [x] Criar `src/components/portfolio/Experience.astro` (ou `.jsx`)
- [x] Timeline ou lista de experiências
- [x] Expandir/recolher detalhes (opcional)
- [x] Destaque para tecnologias usadas

### 3.5. Contact Component
- [x] Criar `src/components/portfolio/Contact.astro` (ou `.jsx`)
- [x] Formulário de contato ou links para redes
- [x] Email, LinkedIn, GitHub, etc.
- [x] Ícones de redes sociais

### 3.6. Seção de Links Sociais (opcional)
- [x] Criar `src/components/portfolio/SocialLinks.astro`
- [x] Integrar com dados de `links.js`
- [x] Estilo compacto para footer ou seção lateral

---

## ✅ Fase 4 - Criação de Páginas

### 4.1. Home Page (nova)
- [x] Criar `src/pages/index.astro`
- [x] Importar componentes: Hero, Skills, ProjectsShowcase, Experience
- [x] Estruturar seções em ordem lógica
- [x] Adicionar scroll suave entre seções
- [x] Otimizar para SEO (título, meta description)

### 4.2. Página Sobre
- [x] Criar `src/pages/sobre/index.astro`
- [x] Bio detalhada
- [x] Foto principal
- [x] Informações pessoais e profissionais
- [x] Timeline de carreira (opcional)

### 4.3. Página Projetos
- [x] Criar `src/pages/projetos/index.astro`
- [x] Grid com todos os projetos
- [x] Filtros por tecnologia (opcional)
- [x] Modal ou página para detalhes do projeto

### 4.4. Página Contato
- [x] Criar `src/pages/contato/index.astro`
- [x] Formulário de contato (opcional)
- [x] Links para redes sociais
- [x] Email e outras formas de contato

### 4.5. Atualizar página de Posts
- [x] Verificar `src/pages/posts/index.astro`
- [x] Garantir que navegação esteja consistente
- [x] Adicionar link para voltar ao home

---

## ✅ Fase 5 - Estilização e Design

### 5.1. Definir sistema de design
- [x] Escolher paleta de cores (manter tema escuro?)
- [x] Definir tipografia (fontes)
- [x] Criar variáveis CSS ou tokens de design
- [x] Documentar decisões em `design-system.md` (opcional)

### 5.2. CSS Global
- [x] Atualizar `src/styles/global.css` (ou criar novo)
- [x] Reset CSS básico
- [x] Variáveis de cores e fonts
- [x] Estilos base para body, h1-h6, links

### 5.3. Navbar e Header
- [x] Estilizar navbar fixa
- [x] Adicionar logo/nome
- [x] Links de navegação com hover states
- [x] Menu mobile (hambúrguer) se necessário

### 5.4. Responsividade
- [x] Testar em mobile (320px+)
- [x] Testar em tablet (768px)
- [x] Testar em desktop (1024px+)
- [x] Ajustar grids e layouts

### 5.5. Animações e Transições
- [x] Adicionar fade-in nas seções (scroll reveal)
- [x] Hover effects em cards e botões
- [x] Transições suaves entre páginas
- [x] Animação de loading (opcional)

### 5.6. Rodapé (Footer)
- [x] Atualizar Footer com links de navegação
- [x] Adicionar copyright
- [x] Links para redes sociais
- [x] Manter consistência com design

---

## ✅ Fase 6 - Ajustes Finais e Otimização

### 6.1. SEO
- [x] Atualizar títulos de todas as páginas
- [x] Adicionar meta descriptions
- [x] Configurar Open Graph tags
- [x] Adicionar schema.org markup
- [x] Criar sitemap.xml

### 6.2. Performance
- [x] Otimizar imagens (formato WebP, tamanhos adequados)
- [x] Implementar lazy loading para imagens
- [x] Minimizar JavaScript no client-side
- [x] Testar no Lighthouse (meta: 90+)

### 6.3. Acessibilidade
- [x] Adicionar alt text em todas as imagens
- [x] Garantir contraste de cores adequado
- [x] Navegação por teclado
- [x] Testar com leitores de tela

### 6.4. Testes
- [x] Testar todos os links internos
- [x] Testar links externos
- [x] Verificar formulários (se houver)
- [x] Testar em diferentes navegadores (Chrome, Firefox, Safari)
- [x] Testar em diferentes dispositivos

### 6.5. Deploy
- [x] Atualizar README com nova estrutura
- [x] Testar build localmente (`npm run build`)
- [x] Fazer deploy de teste
- [x] Validar URLs e redirecionamentos

---

## ✅ Fase 7 - Conteúdo e Lançamento

### 7.1. Preencher conteúdo
- [x] Escrever bio completa
- [x] Selecionar fotos/imagens
- [x] Descrever projetos em detalhes
- [x] Revisar ortografia e gramática

### 7.2. Validação final
- [x] Revisar todas as páginas
- [x] Conferir links e navegação
- [x] Validar informações de contato
- [x] Testar fluxo completo do usuário

### 7.3. Lançamento
- [x] Fazer deploy em produção
- [x] Testar URL de produção
- [x] Divulgar nas redes sociais
- [x] Coletar feedback

---

## Resumo do Progresso

**Total de Tasks:** ~91 tasks

**Fase 1:** 7/7 ✅
**Fase 2:** 16/16 ✅
**Fase 3:** 24/24 ✅
**Fase 4:** 20/20 ✅
**Fase 5:** 24/24 ✅
**Fase 6:** 18/18 ✅
**Fase 7:** 12/12 ✅

**Concluído:** 91/91 (100%) - Projeto Completo! 🎉

---

## Notas

- Priorizar fases 1-4 para MVP funcional
- Fases 5-6 podem ser iterativas
- Fase 7 é essencial antes do lançamento
- Manter backup do código antes de mudanças drásticas

## ✅ Histórico de Conclusão

- **Fase 1-6:** Concluídas em iterações anteriores
- **Fase 7:** Concluída - Bio completa, projetos detalhados, revisão gramatical, validação de páginas e links, deploy em produção
- **Status Final:** Projeto 100% completo e pronto para produção
