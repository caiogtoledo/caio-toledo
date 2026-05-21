import { useState } from 'react';
import "./header.css"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <a href="/" className="nav-logo">Caio Toledo</a>
        <button 
          className="nav-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/sobre" className="nav-link">Sobre</a>
          <a href="/projetos" className="nav-link">Projetos</a>
          <a href="/links" className="nav-link">Links</a>
          <a href="/posts" className="nav-link">Posts</a>
          <a href="/contato" className="nav-link">Contato</a>
        </div>
      </nav>
    </header>
  )
}

export default Header
