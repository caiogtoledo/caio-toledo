import { motion } from "framer-motion"
import projects from "../../data/projects.js"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ExternalLink, GitFork } from "lucide-react"
import { fadeInUp, staggerContainer } from "../../lib/animations"

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
      <motion.h2
        className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        Projetos
      </motion.h2>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeInUp}>
            <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
              <div className="h-48 overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={`Projeto ${project.name}`}
                  loading="lazy"
                  width="400"
                  height="200"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl font-medium text-foreground">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <GitFork className="h-4 w-4" />
                      Repositorio
                    </a>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
