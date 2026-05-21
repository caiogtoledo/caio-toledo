# Portfolio - Caio Toledo

Bem-vindo ao meu portfólio pessoal! Este projeto foi desenvolvido para apresentar minha trajetória profissional, habilidades técnicas e projetos de forma moderna e interativa.

## 🎯 Sobre o Projeto

Este é um portfólio pessoal completo, desenvolvido com **Astro** e **React**, featuring:

- **Página Home** - Apresentação com Hero section, habilidades, projetos em destaque e experiência profissional
- **Sobre** - Informações detalhadas sobre minha trajetória e experiência
- **Projetos** - Showcase de projetos pessoais e profissionais
- **Links** - Página dedicada com links para redes sociais e recursos externos
- **Contato** - Formulário e informações para entrar em contato
- **Blog/Posts** - Artigos sobre desenvolvimento e tecnologia

## 🚀 Tecnologias Utilizadas

- **[Astro** - Framework web moderno para sites estáticos e SSR
- **[React](https://react.dev/)** - Biblioteca para interfaces interativas
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápida
- **[Netlify](https://www.netlify.com/)** - Plataforma de deploy e hospedagem

## ▶️ Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento:

### 1. Clone o repositório

```bash
git clone https://github.com/caiogtoledo/portfolio.git
cd portfolio
```

### 2. Instale as dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18+) instalado. Em seguida:

```bash
npm install
```

### 3. Execute a aplicação

O comando abaixo iniciará o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:4321` (padrão do Astro).

## 📂 Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
portfolio/
├── public/              # Arquivos estáticos (imagens, ícones, fonts)
├── src/
│   ├── components/      # Componentes Astro e React
│   │   ├── portfolio/   # Componentes do portfólio (Hero, Skills, etc.)
│   │   └── header/      # Header, Footer, Navigation
│   ├── data/            # Dados estruturados (about, projects, skills, experience)
│   ├── pages/           # Páginas da aplicação
│   │   ├── index.astro  # Home page
│   │   ├── sobre/       # Página sobre
│   │   ├── projetos/    # Página de projetos
│   │   ├── links/       # Página de links
│   │   ├── contato/     # Página de contato
│   │   └── posts/       # Blog posts
│   └── styles/          # Estilos globais
├── package.json         # Dependências e scripts
└── astro.config.mjs     # Configuração do Astro
```

## ⚡ Otimização e Performance

O projeto foi desenvolvido com foco em performance e boas práticas:

| Métrica | Descrição |
|---------|-----------|
| **Imagens** | Lazy loading implementado em todas as imagens |
| **SEO** | Meta tags, Open Graph, schema.org markup |
| **Acessibilidade** | Alt text em imagens, navegação por teclado, contraste adequado |
| **Performance** | Build otimizado com Astro, code splitting automático |
| **Sitemap** | Gerado automaticamente no build |
| **Lighthouse** | Pontuação alvo: 90+ em todas as categorias |

## 🔧 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (http://localhost:4321) |
| `npm run build` | Gera build otimizado para produção |
| `npm run preview` | Preview do build localmente |

## 🌐 Implantação

O projeto está configurado para implantação na **Netlify** com suporte a SSR.

### Deploy Automático

O deploy é acionado automaticamente ao fazer push para a branch `main`.

### Deploy Manual

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar conforme necessário.

---

**Desenvolvido por [Caio Toledo](https://caiotoledo.dev) 🚀**