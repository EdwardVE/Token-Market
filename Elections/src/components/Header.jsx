import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
  return (
    <header>
      <h1>Elections</h1>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""} >
            Elections
        </Link>
        <Link to="/RegisterCandidate" className={location.pathname === "/RegisterCandidate" ? "active" : ""} >
        Register Candidate
        </Link>
      </nav>
    </header>
  );
};

export default Header;
