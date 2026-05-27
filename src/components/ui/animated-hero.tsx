import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MoveRight } from "lucide-react";
import { Button } from "./button";
import about from "../../data/about.js";
import translations from "../../data/translations.js";

const adjectives = ["amazing", "innovative", "scalable", "efficient", "smart"];

export default function AnimatedHero({
  lang = "en",
}: {
  lang?: keyof typeof translations;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % adjectives.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center gap-8 py-20 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container relative mx-auto flex max-w-2xl flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/63592244?s=400&u=4838eef867080d58bb9281573b66ee3fce7ab338&v=4"
            alt={about.name}
            width={180}
            height={180}
            className="rounded-full ring-2 ring-brand ring-offset-2 ring-offset-background shadow-[0_0_20px_hsl(190_80%_50%/0.15)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="secondary" size="sm" className="gap-2" asChild>
            <a href="#projects">
              Leia meu artigo de lancamento
              <MoveRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="text-center font-heading text-5xl font-normal leading-tight tracking-tighter md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-foreground">Caio</span>
          <span className="relative inline-flex h-[1.2em] w-fit items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                className="absolute inset-0 flex items-center justify-center text-brand font-semibold drop-shadow-[0_0_12px_hsl(190_80%_50%/0.3)]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
              >
                {adjectives[activeIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-foreground"> Toledo</span>
        </motion.div>

        <motion.p
          className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t.about.bio}
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href={`mailto:${about.email}`}>
                <PhoneCall className="h-4 w-4" />
                Fale comigo
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" className="gap-2" asChild>
              <a href="#projects">
                Ver Projetos
                <MoveRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
