import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../shared/context/CartContext';
import './Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img src="/Logo.svg" alt="Logo" height={48} width={48} />
        </NavLink>
      </div>
      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>Main Page</NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>Categories</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>All products</NavLink>
        <NavLink to="/sales" className={({ isActive }) => isActive ? 'nav__link active' : 'nav__link'}>All sales</NavLink>
      </nav>
      <div className="header__cart">
        <NavLink to="/cart">
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