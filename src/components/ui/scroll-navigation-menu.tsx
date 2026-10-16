import * as React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Home, Code2, FolderGit2, Briefcase, Mail, Newspaper } from "lucide-react";
import translations from "../../data/translations.js";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[];
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, title: "Home", url: "/", icon: <Home className="w-5 h-5" /> },
  {
    id: 2,
    title: "Skills",
    url: "/#skills",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Projects",
    url: "/#projects",
    icon: <FolderGit2 className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Experience",
    url: "/#experience",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Contact",
    url: "/#contact",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Blog",
    url: "/posts",
    icon: <Newspaper className="w-5 h-5" />,
  },
];

export const Component: React.FC<ScrollNavbarProps & { lang?: keyof typeof translations }> = ({
  menuItems = defaultMenuItems,
  lang = "en",
  className = "",
}) => {
  const t = translations[lang] || translations.en;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const hamburgerVariants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 },
  };

  return (
    <>
      {/* Full Navbar - visible when not scrolled */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/" className="flex items-center" aria-label="Caio Toledo">
                <img
                  src="/glasses.png"
                  alt="Caio Toledo"
                  className="h-9 w-auto"
                />
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={item.url}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.icon}
                      <span>{t.nav[item.title.toLowerCase()] || item.title}</span>
                    </a>
                    {hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-muted rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Hamburger - visible when scrolled */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Menu Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -24 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto relative w-full max-w-[340px] bg-background border border-border rounded-3xl p-8 shadow-2xl sm:w-auto sm:min-w-[320px]"
              >
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-foreground hover:text-primary rounded-full hover:bg-muted"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Menu Items */}
                <div className="space-y-4 mt-8">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.1 + index * 0.06,
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={item.url}
                        onClick={toggleMenu}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <motion.div
                          className="text-primary"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-lg font-medium text-foreground group-hover:text-primary">
                          {t.nav[item.title.toLowerCase()] || item.title}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-secondary rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Component;
