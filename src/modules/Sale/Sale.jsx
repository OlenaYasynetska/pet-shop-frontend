import React, { useState, useEffect } from 'react';
import './Sale.css';
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
    '/product_img/4.jpeg'
  ];
  return images[index % images.length];
};

const Sale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка товаров со скидками при монтировании компонента
  useEffect(() => {
    loadDiscountedProducts();
  }, []);

  // Загрузка товаров со скидками
  const loadDiscountedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Получаем все товары и фильтруем те, у которых есть discont_price
      const allProducts = await productsApi.getAllProducts();
      
      // Фильтруем товары со скидками (у которых есть discont_price)
      const discountedProducts = allProducts
        .filter(product => product?.discont_price && product.discont_price < (product?.price || 0))
        .slice(0, 4) // Берем только первые 4
        .map(product => ({
          id: product?.id,
          title: product?.title || product?.name || 'Product',
          price: product?.discont_price || 0,
          oldPrice: product?.price || 0,
          discount: Math.round(((product?.price || 0) - (product?.discont_price || 0)) / (product?.price || 1) * 100),
          image: product?.image
        }));
      
      setProducts(discountedProducts);
    } catch (err) {
      console.error('Failed to load discounted products:', err);
      setError('Failed to load discounted products. Please try again later.');
      
      // Показываем заглушки при ошибке
      const fallbackProducts = [
        {
          id: 1,
          title: 'BELCANDO Mini Dog Food',
          price: 23,
          oldPrice: 35,
          discount: 34,
          image: '/product_img/1.jpeg'
        },
        {
          id: 2,
          title: 'GranataPet Mini Royal Poultry, Dry Food for Dogs',
          price: 15,
          oldPrice: 26,
          discount: 42,
          image: '/product_img/2.jpeg'
        },
        {
          id: 3,
          title: 'animonda Carny Dry Cat Food for Adult Cats',
          price: 9,
          oldPrice: 14,
          discount: 36,
          image: '/product_img/3.jpeg'
        },
        {
          id: 4,
          title: 'Royal Canin Veterinary Renal',
          price: 35,
          oldPrice: 40,
          discount: 13,
          image: '/product_img/8.jpeg'
        }
      ];
      
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className="sale-section">
      <div className="sale-header">
        <h2>Sale</h2>
        <div className="sale-header__line" />
        <NavLink to="/sales" className="sale-all-btn">All sales</NavLink>
      </div>

      {/* Сообщение об ошибке */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Индикатор загрузки */}
      {loading && (
        <div className="loading-message">
          Loading sale products...
        </div>
      )}

      {/* Сетка товаров */}
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={product.id || index}>
            <img 
              className="product-img" 
              src={getImageUrl(product.image) || getDefaultImageWithIndex(index)} 
              alt={product?.title || product?.name || 'Product'} 
                                onError={(e) => {
                    e.target.src = getImageUrl(getDefaultImageWithIndex(index));
                  }}
            />
            {product.discount && (
              <div className="discount-badge">-{product.discount}%</div>
            )}
            <div className="product-title">{product?.title || product?.name || 'Product'}</div>
            <div className="sale-prices">
              <span className="sale-price">${product.price}</span>
              {product.oldPrice && (
                <span className="sale-old-price">${product.oldPrice}</span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Сообщение, если товаров нет */}
      {!loading && !error && products.length === 0 && (
        <div className="no-products-message">
          No sale products found.
        </div>
      )}
    </section>
  );
};

export default Sale; 