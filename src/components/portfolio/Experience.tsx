import { motion } from "framer-motion"
import experience from "../../data/experience.js"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Briefcase } from "lucide-react"
import { slideIn, staggerContainer } from "../../lib/animations"

export default function Experience({ lang = "en" }) {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <motion.h2
        className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Experiencia
      </motion.h2>
      <motion.div
        className="relative border-l-2 border-border pl-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {experience.map((exp) => (
          <motion.div key={exp.id} className="relative mb-12 last:mb-0" variants={slideIn}>
            <div className="absolute -left-[calc(2rem+5px)] top-0 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background bg-brand shadow-[0_0_10px_hsl(190_80%_50%/0.3)]">
              <Briefcase className="h-2.5 w-2.5 text-background" />
            </div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-md transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
              <CardContent className="p-6">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-medium text-foreground">
                    {exp.role}
                  </h3>
                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <h4 className="mb-3 text-sm font-medium text-brand drop-shadow-[0_0_8px_hsl(190_80%_50%/0.3)]">
                  {exp.company}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
