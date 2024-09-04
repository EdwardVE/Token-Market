import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Token Marketplace</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/sell">Sell Token</Link>
      </nav>
    </header>
  );
};

export default Header;
