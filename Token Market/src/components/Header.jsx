import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
  return (
    <header>
      <h1>Stock Marketplace</h1>
      <nav>
        <Link to="/" className={location.pathname === "/pera" ? "active" : ""} >
            Connet with Pera Wallet
        </Link>
      </nav>
    </header>
  );
};

export default Header;
