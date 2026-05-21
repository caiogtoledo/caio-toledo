import "./header.css"

function Header() {
return (
<header className="header">
<nav className="nav">
<a href="/" className="nav-logo">Caio Toledo</a>
<div className="nav-links">
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