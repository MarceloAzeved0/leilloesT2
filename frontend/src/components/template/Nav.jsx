import React from 'react';
import { Link } from 'react-router-dom';

export default props =>
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/">Início</Link>
      <Link to="/leilao">Leilões</Link>
    </nav>
  </aside>
