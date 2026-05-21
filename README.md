# Portfolio - Caio Toledo

Este é um projeto de portfólio pessoal completo, desenvolvido com Astro e React, incluindo página de links pessoais, projetos, sobre, posts e contato.

## 🚀 Tecnologias Utilizadas

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)

## ▶️ Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório (se aplicável):**
    ```bash
    git clone <url-do-repositorio>
    cd my-links
    ```

2.  **Instale as dependências:**
    Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Em seguida, instale as dependências do projeto.
    ```bash
    npm install
    ```

3.  **Execute a aplicação:**
    O comando abaixo iniciará o servidor de desenvolvimento.
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## 📂 Estrutura de Pastas

O projeto está organizado da seguinte forma:

-   **/public**: Contém arquivos estáticos como imagens e ícones que são servidos diretamente pelo servidor.
-   **/src**: Contém todo o código-fonte da aplicação.
    -   **assets**: Recursos como imagens e fontes que são processados pelo Vite.
    -   **components**: Componentes React reutilizáveis que formam a interface do usuário (cabeçalho, rodapé, cartões de link, etc.).
    -   **external**: Arquivos que contêm dados externos, como a lista de links.
    -   **main.jsx**: O ponto de entrada da aplicação React.
    -   **App.jsx**: O componente principal que organiza a estrutura da página.
-   **index.html**: O template HTML principal da aplicação.
- **vite.config.js**: Arquivo de configuração do Vite.
- **package.json**: Define os scripts e as dependências do projeto.

## ⚡ Otimização e Performance

O projeto inclui diversas otimizações:

- **Imagens**: Lazy loading implementado em todas as imagens
- **SEO**: Meta tags, Open Graph, e schema.org markup
- **Acessibilidade**: Alt text em imagens, aria-labels em links, navegação por teclado
- **Sitemap**: Gerado automaticamente
- **Performance**: Build otimizado com Astro

## 🔧 Scripts

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

## 🌐 Implantação

O projeto está configurado para implantação na Netlify com SSR.