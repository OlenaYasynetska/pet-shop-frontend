import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../shared/context/CartContext';
import './Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/" onClick={closeMenu}>
          <img src="/Logo.svg" alt="Logo" height={48} width={48} />
        </NavLink>
      </div>
      
      {/* Бургер-меню */}
      <button className="header__burger" onClick={toggleMenu}>
        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
      </button>

      {/* Мобильное меню */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="header__nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'} onClick={closeMenu}>Main Page</NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'} onClick={closeMenu}>Categories</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'} onClick={closeMenu}>All products</NavLink>
          <NavLink to="/sales" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'} onClick={closeMenu}>All sales</NavLink>
        </nav>
      </div>

      {/* Десктопное меню */}
      <nav className="header__nav header__nav--desktop">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>Main Page</NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>Categories</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>All products</NavLink>
        <NavLink to="/sales" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>All sales</NavLink>
      </nav>
      
      <div className="header__cart">
        <NavLink to="/cart" onClick={closeMenu}>
          <img src="/basket.svg" alt="Cart" height={48} width={48} />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default Header; 