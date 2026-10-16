const projects = [
  {
    id: 1,
    name: {
      en: "PierX Inovação",
      pt: "PierX Inovação",
    },
    description: {
      en: "Platform that simplifies access to tax incentives, funding and innovation grants. Includes a matchmaking tool that connects companies to public funding calls, Lei do Bem management and a radar of innovation opportunities.",
      pt: "Plataforma que desburocratiza o acesso a incentivos fiscais, financiamentos e bolsas de inovação. Inclui ferramenta de matchmaking que conecta empresas a editais de fomento, gestão da Lei do Bem e radar de oportunidades de inovação.",
    },
    technologies: ["Next.js", "Framer", "Vercel"],
    demoUrl: "https://www.pierxinovacao.com.br/",
    image: "/projects/pierx.png"
  },
  {
    id: 2,
    name: {
      en: "Diagnóstico Cultura Pieracciani",
      pt: "Diagnóstico Cultura Pieracciani",
    },
    description: {
      en: "Interactive culture diagnostic web app for Pieracciani consultancy. Assesses innovation-culture maturity through questionnaires and delivers structured results, with event tracking via Google Tag Manager.",
      pt: "Aplicativo web interativo de diagnóstico de cultura para a consultoria Pieracciani. Avalia a maturidade cultural para inovação por meio de questionários e entrega resultados estruturados, com tracking de eventos via Google Tag Manager.",
    },
    technologies: ["React", "Netlify", "Google Tag Manager"],
    demoUrl: "https://diagnostico-cultura-pieracciani.netlify.app/",
    image: "/projects/diagnostico-cultura.png"
  },
  {
    id: 3,
    name: {
      en: "Ponte Universitária",
      pt: "Ponte Universitária",
    },
    description: {
      en: "Platform connecting high school students with verified university students for 1:1 mentoring calls about courses, daily routine and entrance exams.",
      pt: "Plataforma que conecta estudantes do ensino médio a universitários verificados para mentorias 1:1 sobre o curso, a rotina e o vestibular.",
    },
    technologies: ["React", "Vercel"],
    demoUrl: "https://www.ponteuniversitaria.com.br/",
    image: "/projects/ponte.png"
  }
]

export default projects
