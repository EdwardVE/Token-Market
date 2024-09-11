import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
  return (
    <header>
      <h1>Stock Marketplace</h1>
      <nav>
        
        <Link to="/" className={location.pathname === "/" ? "active" : ""} >
            Home
        </Link>
        <Link to="/sell" className={location.pathname === "/sell" ? "active" : ""} >
            Sell Stock
        </Link>
        <Link to="/pera" className={location.pathname === "/pera" ? "active" : ""} >
            Connet with Pera Wallet
        </Link>
        <Link to="/Elections" className={location.pathname === "/pera" ? "active" : ""} >
            Elections
        </Link>
      </nav>
    </header>
  );
};

export default Header;
