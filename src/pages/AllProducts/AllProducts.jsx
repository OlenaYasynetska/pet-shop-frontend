import React, { useState, useEffect } from 'react';
import Container from '../../shared/components/Container/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import PaginationButton from '../../shared/components/PaginationButton';
import { useCart } from '../../shared/context/CartContext';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';
import './AllProducts.css';
import '../../shared/styles/productCard.css';
import { productsApi } from '../../shared/api/productsApi';



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

const AllProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    discounted: false,
    sortBy: 'by default'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 4;

  // Загрузка товаров при монтировании компонента
  useEffect(() => {
    loadProducts();
  }, []);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Загрузка товаров с фильтрами
  const loadProducts = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productsApi.getAllProducts();
      
      // Применяем фильтры на клиенте
      let filteredProducts = data;
      
      // Фильтр по цене
      if (appliedFilters.priceFrom) {
        filteredProducts = filteredProducts.filter(product => 
          (product?.price || 0) >= parseFloat(appliedFilters.priceFrom)
        );
      }
      if (appliedFilters.priceTo) {
        filteredProducts = filteredProducts.filter(product => 
          (product?.price || 0) <= parseFloat(appliedFilters.priceTo)
        );
      }
      
      // Фильтр по скидкам
      if (appliedFilters.discounted) {
        filteredProducts = filteredProducts.filter(product => 
          product?.discont_price && product.discont_price < (product?.price || 0)
        );
      }
      
      // Сортировка
      if (appliedFilters.sortBy) {
        switch (appliedFilters.sortBy) {
          case 'price_asc':
            filteredProducts.sort((a, b) => (a?.price || 0) - (b?.price || 0));
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => (b?.price || 0) - (a?.price || 0));
            break;
          case 'name_asc':
            filteredProducts.sort((a, b) => (a?.title || a?.name || '').localeCompare(b?.title || b?.name || ''));
            break;
          case 'name_desc':
            filteredProducts.sort((a, b) => (b?.title || b?.name || '').localeCompare(a?.title || a?.name || ''));
            break;
          default:
            // По умолчанию сортируем по ID
            filteredProducts.sort((a, b) => a.id - b.id);
        }
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
      
      // Показываем заглушки при ошибке
      setProducts([
        {
          id: 1,
          title: 'BELCANDO Mini Dog F...',
          price: 35,
          discont_price: 23,
          image: wetFootImg
        },
        {
          id: 2,
          title: 'GranataPet Mini Royal...',
          price: 26,
          discont_price: 15,
          image: catImg
        },
        // ... добавьте больше заглушек при необходимости
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Обработка изменения фильтров
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    
    // Применяем фильтры с небольшой задержкой
    setTimeout(() => {
      loadProducts(newFilters);
    }, 300);
  };

  // Обработка отправки формы фильтров
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadProducts(filters);
  };

  const handleAddToCart = (product) => {
    // НЕ добавляем товар в корзину, только переходим на страницу товара
    console.log(`Navigating to product: ${product?.title || product?.name || 'Product'}`);
    
    // Переходим на страницу товара
    navigate(`/product/${product?.id || 1}`);
  };

  // Пагинация
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <Container>
      <div className="all-products-page">
        {/* Навигация */}
        <div className="products-nav">
          <NavLink to="/" className="products-nav-btn">Main page</NavLink>
          <div className="nav-separator"></div>
          <button className="products-nav-btn active" disabled>All products</button>
        </div>

        {/* Заголовок */}
        <h1 className="products-title">All products</h1>

        {/* Фильтры */}
        <form onSubmit={handleFilterSubmit} className="products-filters">
          <div className="filter-group">
            <label>Price:</label>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="from" 
                className="price-input"
                value={filters.priceFrom}
                onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
              />
              <input 
                type="number" 
                placeholder="to" 
                className="price-input"
                value={filters.priceTo}
                onChange={(e) => handleFilterChange('priceTo', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label>
              <input 
                type="checkbox" 
                className="discount-checkbox"
                checked={filters.discounted}
                onChange={(e) => handleFilterChange('discounted', e.target.checked)}
              />
              Discounted items
            </label>
          </div>
          <div className="filter-group">
            <label>Sorted:</label>
            <select 
              className="sort-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="by default">by default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </form>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Индикатор загрузки */}
        {loading && (
          <div className="loading-message">
            Loading products...
          </div>
        )}

        {/* Сетка товаров */}
        <div className="products-grid">
          {paginatedProducts.map((product, index) => {
            // Проверяем, есть ли у товара скидка
            const hasDiscount = product?.discont_price && product.discont_price < (product?.price || 0);
            
            return (
              <div 
                className={`product-card ${hasDiscount ? 'discounted' : ''}`}
                key={product.id || index}
              >
                <div className="product-image-wrapper">
                  <img 
                    className="product-img" 
                    src={getImageUrl(product.image) || getDefaultImageWithIndex(index)} 
                    alt={product?.title || product?.name || 'Product'} 
                    onError={(e) => {
                      e.target.src = getImageUrl(getDefaultImageWithIndex(index));
                    }}
                  />
                  {hasDiscount && (
                    <div className="discount-badge">
                      -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                    </div>
                  )}
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
                <NavLink to={`/product/${product.id}`} className="product-link">
                  <div className="product-title">
                    {product?.title || product?.name || 'Product'}
                  </div>
                  <div className="product-prices">
                    <span className="current-price">
                      ${product?.discont_price || product?.price || 0}
                    </span>
                    {hasDiscount && (
                      <span className="old-price">
                        ${product?.price || 0}
                      </span>
                    )}
                  </div>
                </NavLink>
              </div>
            );
          })}
          {/* Заполнители для выравнивания сетки */}
          {Array.from({ length: PRODUCTS_PER_PAGE - paginatedProducts.length }).map((_, idx) => (
            <div className="product-card" key={`empty-${idx}`} style={{ visibility: 'hidden' }} />
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0', alignItems: 'center', gap: '16px' }}>
            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;=
            </PaginationButton>
            <span style={{ fontSize: '14px', color: '#333' }}>
              {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              =&gt;
            </PaginationButton>
          </div>
        )}

        {/* Сообщение, если товаров нет */}
        {!loading && !error && products.length === 0 && (
          <div className="no-products-message">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllProducts;
