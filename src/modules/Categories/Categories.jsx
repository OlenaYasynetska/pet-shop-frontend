import React, { useState, useEffect } from 'react';
import './Categories.css';
import '../../shared/styles/productCard.css';
import { NavLink } from 'react-router-dom';
import { productsApi } from '../../shared/api/productsApi';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';



// Функция для получения изображения по умолчанию
const getDefaultImageWithIndex = (index) => {
  const images = [
    '/product_img/1.jpeg',
    '/product_img/2.jpeg',
    '/product_img/3.jpeg',
    '/product_img/4.jpeg',
    '/product_img/5.jpeg',
    '/product_img/6.jpeg',
    '/product_img/7.jpeg',
    '/product_img/8.jpeg'
  ];
  return images[index % images.length];
};

const Categories = ({ showAll = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    loadCategories();
  }, []);

  // Загрузка категорий
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productsApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setError('Failed to load categories. Please try again later.');
      
      // Показываем заглушки при ошибке
      const fallbackCategories = [
        { id: 1, title: 'Dry & Wet Food', image: '/product_img/1.jpeg' },
        { id: 2, title: 'Litter Boxes & Litter Trays', image: '/product_img/10.jpeg' },
        { id: 3, title: 'Baskets & Beds', image: '/product_img/13.jpeg' },
        { id: 4, title: 'Toys', image: '/product_img/16.jpeg' },
      ];
      
      if (showAll) {
        // Добавляем больше категорий для полной страницы
        fallbackCategories.push(
          { id: 5, title: 'Care & Grooming', image: '/product_img/18.jpeg' },
          { id: 6, title: 'Snacks & Supplements', image: '/product_img/20.jpeg' },
          { id: 7, title: 'Runs & Fencing', image: '/product_img/22.jpeg' },
          { id: 8, title: 'Trees & Scratching', image: '/product_img/24.jpeg' },
        );
      }
      
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  // Ограничиваем количество категорий для главной страницы
  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <section className="categories-section">
      {!showAll && (
        <div className="categories-header">
          <h2>Categories</h2>
          <div className="categories-header__line" />
          <NavLink to="/categories" className="categories-all-btn">All categories</NavLink>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Индикатор загрузки */}
      {loading && (
        <div className="loading-message">
          Loading categories...
        </div>
      )}

      {/* Сетка категорий */}
      <div className="product-grid">
        {displayedCategories.map((category, index) => (
          <NavLink 
            to={`/categories/${category.id}`} 
            className="product-card category-card" 
            key={category.id || index}
          >
                          <img 
                className="product-img" 
                src={getImageUrl(category.image) || getDefaultImageWithIndex(index)} 
                alt={category.title} 
                onError={(e) => {
                  e.target.src = getImageUrl(getDefaultImageWithIndex(index));
                }}
              />
            <div className="product-title">{category.title}</div>
          </NavLink>
        ))}
      </div>

      {/* Сообщение, если категорий нет */}
      {!loading && !error && displayedCategories.length === 0 && (
        <div className="no-categories-message">
          No categories found.
        </div>
      )}
    </section>
  );
};

export default Categories; 