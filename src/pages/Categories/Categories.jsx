import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../../shared/components/Container/Container';
import Categories from '../../modules/Categories/Categories';
import './Categories.css';

const CategoriesPage = () => (
  <Container>
    <div className="categories-page">
      {/* Навигация */}
      <div className="categories-navigation">
        <NavLink to="/" className="categories-nav-btn">Main page</NavLink>
        <div className="categories-nav-separator"></div>
        <button className="categories-nav-btn active" disabled>Categories</button>
      </div>

      {/* Заголовок */}
      <h1 className="categories-title">Categories</h1>

      {/* Модуль категорий */}
      <Categories showAll={true} />
    </div>
  </Container>
);

export default CategoriesPage; 