import { motion } from "framer-motion"
import { Mail, ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import about from "../../data/about.js"
import translations from "../../data/translations.js"
import links from "../../data/links.js"
import { fadeInUp, staggerContainer } from "../../lib/animations"

export default function Contact({ lang = "en" }) {
  const t = translations[lang] || translations.en;
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8 lg:py-24">
      <motion.h2
        className="font-heading mb-12 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {t.sections.contact}
      </motion.h2>
      <motion.div
        className="flex flex-col gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p
          className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground"
          variants={fadeInUp}
        >
          {t.contact.description}
        </motion.p>

        <motion.div className="flex flex-col items-center gap-3" variants={fadeInUp}>
          <a
            href={`mailto:${about.email}`}
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-6 py-3 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/10 hover:text-brand"
          >
            <Mail className="h-5 w-5" />
            {about.email}
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={fadeInUp}
        >
          {links.map((link) => (
            <Button
              key={link.linkName}
              variant="outline"
              size="lg"
              className="gap-2"
              asChild
            >
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {link.linkName}
              </a>
            </Button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
