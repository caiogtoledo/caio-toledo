import { motion } from "framer-motion"
import skills from "../../data/skills.js"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { fadeInUp, staggerContainer } from "../../lib/animations"

export default function Skills({ lang = "en" }) {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
      <motion.h2
        className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        Skills
      </motion.h2>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skills.map((skillGroup) => (
          <motion.div key={skillGroup.category[lang]} variants={fadeInUp}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-medium text-foreground">
                  {skillGroup.category[lang]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/20 hover:text-brand"
                    >
                      {skill}
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
