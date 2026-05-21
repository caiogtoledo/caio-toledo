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
- [ ] Criar `src/pages/index.astro`
- [ ] Importar componentes: Hero, Skills, ProjectsShowcase, Experience
- [ ] Estruturar seções em ordem lógica
- [ ] Adicionar scroll suave entre seções
- [ ] Otimizar para SEO (título, meta description)

### 4.2. Página Sobre
- [ ] Criar `src/pages/sobre/index.astro`
- [ ] Bio detalhada
- [ ] Foto principal
- [ ] Informações pessoais e profissionais
- [ ] Timeline de carreira (opcional)

### 4.3. Página Projetos
- [ ] Criar `src/pages/projetos/index.astro`
- [ ] Grid com todos os projetos
- [ ] Filtros por tecnologia (opcional)
- [ ] Modal ou página para detalhes do projeto

### 4.4. Página Contato
- [ ] Criar `src/pages/contato/index.astro`
- [ ] Formulário de contato (opcional)
- [ ] Links para redes sociais
- [ ] Email e outras formas de contato

### 4.5. Atualizar página de Posts
- [ ] Verificar `src/pages/posts/index.astro`
- [ ] Garantir que navegação esteja consistente
- [ ] Adicionar link para voltar ao home

---

## ✅ Fase 5 - Estilização e Design

### 5.1. Definir sistema de design
- [ ] Escolher paleta de cores (manter tema escuro?)
- [ ] Definir tipografia (fontes)
- [ ] Criar variáveis CSS ou tokens de design
- [ ] Documentar decisões em `design-system.md` (opcional)

### 5.2. CSS Global
- [ ] Atualizar `src/styles/global.css` (ou criar novo)
- [ ] Reset CSS básico
- [ ] Variáveis de cores e fonts
- [ ] Estilos base para body, h1-h6, links

### 5.3. Navbar e Header
- [ ] Estilizar navbar fixa
- [ ] Adicionar logo/nome
- [ ] Links de navegação com hover states
- [ ] Menu mobile (hambúrguer) se necessário

### 5.4. Responsividade
- [ ] Testar em mobile (320px+)
- [ ] Testar em tablet (768px)
- [ ] Testar em desktop (1024px+)
- [ ] Ajustar grids e layouts

### 5.5. Animações e Transições
- [ ] Adicionar fade-in nas seções (scroll reveal)
- [ ] Hover effects em cards e botões
- [ ] Transições suaves entre páginas
- [ ] Animação de loading (opcional)

### 5.6. Rodapé (Footer)
- [ ] Atualizar Footer com links de navegação
- [ ] Adicionar copyright
- [ ] Links para redes sociais
- [ ] Manter consistência com design

---

## ✅ Fase 6 - Ajustes Finais e Otimização

### 6.1. SEO
- [ ] Atualizar títulos de todas as páginas
- [ ] Adicionar meta descriptions
- [ ] Configurar Open Graph tags
- [ ] Adicionar schema.org markup
- [ ] Criar sitemap.xml

### 6.2. Performance
- [ ] Otimizar imagens (formato WebP, tamanhos adequados)
- [ ] Implementar lazy loading para imagens
- [ ] Minimizar JavaScript no client-side
- [ ] Testar no Lighthouse (meta: 90+)

### 6.3. Acessibilidade
- [ ] Adicionar alt text em todas as imagens
- [ ] Garantir contraste de cores adequado
- [ ] Navegação por teclado
- [ ] Testar com leitores de tela

### 6.4. Testes
- [ ] Testar todos os links internos
- [ ] Testar links externos
- [ ] Verificar formulários (se houver)
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Testar em diferentes dispositivos

### 6.5. Deploy
- [ ] Atualizar README com nova estrutura
- [ ] Testar build localmente (`npm run build`)
- [ ] Fazer deploy de teste
- [ ] Validar URLs e redirecionamentos

---

## ✅ Fase 7 - Conteúdo e Lançamento

### 7.1. Preencher conteúdo
- [ ] Escrever bio completa
- [ ] Selecionar fotos/imagens
- [ ] Descrever projetos em detalhes
- [ ] Revisar ortografia e gramática

### 7.2. Validação final
- [ ] Revisar todas as páginas
- [ ] Conferir links e navegação
- [ ] Validar informações de contato
- [ ] Testar fluxo completo do usuário

### 7.3. Lançamento
- [ ] Fazer deploy em produção
- [ ] Testar URL de produção
- [ ] Divulgar nas redes sociais
- [ ] Coletar feedback

---

## Resumo do Progresso

**Total de Tasks:** ~85 tasks

**Fase 1:** 7/7 ✅
**Fase 2:** 16/16 ✅
**Fase 3:** 24/24 ✅
**Fase 4:** 0/20 
**Fase 5:** 0/12 
**Fase 6:** 0/18 
**Fase 7:** 0/6 

**Concluído:** 47/85 (55%)

---

## Notas

- Priorizar fases 1-4 para MVP funcional
- Fases 5-6 podem ser iterativas
- Fase 7 é essencial antes do lançamento
- Manter backup do código antes de mudanças drásticas
