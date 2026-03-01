import { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <nav className="navbar">
      <div className="logo">Rakusa</div>
      <ul className={`nav-links ${active ? 'active' : ''}`}>
        <li><a href="/#home" onClick={() => setActive(false)}>Home</a></li>
        <li><a href="/#about" onClick={() => setActive(false)}>About</a></li>
        <li><a href="/#projects" onClick={() => setActive(false)}>Projects</a></li>
        <li><a href="/blog" onClick={() => setActive(false)}>Blog</a></li>
        <li><a href="/#contact" onClick={() => setActive(false)}>Contact</a></li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
