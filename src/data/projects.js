const projects = [
  {
    id: 1,
    name: "Portfolio Pessoal",
    description: "Site de portfólio pessoal desenvolvido com Astro, featuring design responsivo, SEO otimizado e performance de alta qualidade. Inclui seções de projetos, experiência, habilidades e contato.",
    technologies: ["Astro", "JavaScript", "CSS", "Netlify"],
    repoUrl: "https://github.com/caiogtoledo/portfolio",
    demoUrl: "https://caiotoledo.dev",
    image: "/projects/portfolio.png"
  },
  {
    id: 2,
    name: "TaskFlow - App de Tarefas",
    description: "Aplicativo de gerenciamento de tarefas com interface intuitiva e recursos de drag-and-drop. Permite organização por projetos, etiquetas e prioridades com sincronização em tempo real.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "TailwindCSS"],
    repoUrl: "https://github.com/caiogtoledo/taskflow",
    demoUrl: "https://taskflow-demo.vercel.app",
    image: "/projects/taskflow.png"
  },
  {
    id: 3,
    name: "E-commerce API",
    description: "API RESTful completa para plataforma de e-commerce com autenticação JWT, gerenciamento de produtos, carrinho de compras, pedidos e integração com gateway de pagamento.",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Stripe API"],
    repoUrl: "https://github.com/caiogtoledo/ecommerce-api",
    demoUrl: "https://ecommerce-api-docs.vercel.app",
    image: "/projects/ecommerce-api.png"
  },
  {
    id: 4,
    name: "Weather Dashboard",
    description: "Dashboard meteorológico que consome dados de múltiplas APIs para exibir previsções do tempo em tempo real com gráficos interativos e histórico de consultas.",
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
    repoUrl: "https://github.com/caiogtoledo/weather-dashboard",
    demoUrl: "https://weather-dash-demo.netlify.app",
    image: "/projects/weather.png"
  },
  {
    id: 5,
    name: "Blog Platform",
    description: "Plataforma de blog com editor markdown, sistema de comentários, autenticação de usuários e deploy automático via CI/CD. Suporta múltiplos autores e categorias.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Markdown", "GitHub Actions"],
    repoUrl: "https://github.com/caiogtoledo/blog-platform",
    demoUrl: "https://blog-platform-demo.vercel.app",
    image: "/projects/blog-platform.png"
  }
]

export default projects
