import './footer.css'

import translations from "../data/translations.js";

function Footer({ lang = "en" }) {
  const t = translations[lang] || translations.en;
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Caio Toledo</h3>
          <p className="footer-text">
            {t.footer.bio}
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">{t.footer.navigation}</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/projetos">Projetos</a></li>
            <li><a href="/links">Links</a></li>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/contato">Contato</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">{t.footer.social}</h4>
          <div className="footer-social">
            <a href="https://github.com/caiogtoledo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              GitHub
            </a>
            <a href="https://linkedin.com/in/caio-toledo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="https://instagram.com/caiotoledo.dev" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://x.com/caiogtoledo" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              X
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Caio Toledo. {t.footer.rights}</p>
      </div>
    </footer>
  )
}

export default Footer
