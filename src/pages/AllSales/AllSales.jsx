import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from '../../shared/components/Container/Container';
import { productsApi } from '../../shared/api/productsApi';
import PaginationButton from '../../shared/components/PaginationButton';
import { useCart } from '../../shared/context/CartContext';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';
import './AllSales.css';

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

const AllSales = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    sortBy: 'default'
  });

  const PRODUCTS_PER_PAGE = 4;

  // Загрузка товаров при монтировании компонента
  useEffect(() => {
    loadProducts();
  }, []);

  // Фильтрация товаров при изменении фильтров
  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  // Загрузка всех товаров
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productsApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация и сортировка товаров
  const filterProducts = () => {
    let filtered = products.filter(product => 
      product?.discont_price && product.discont_price < (product?.price || 0)
    );

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(product => 
        (product?.discont_price || product?.price || 0) >= parseFloat(filters.priceFrom)
      );
    }
    
    if (filters.priceTo) {
      filtered = filtered.filter(product => 
        (product?.discont_price || product?.price || 0) <= parseFloat(filters.priceTo)
      );
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a?.discont_price || a?.price || 0) - (b?.discont_price || b?.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b?.discont_price || b?.price || 0) - (a?.discont_price || a?.price || 0));
        break;
      case 'discount-desc':
        filtered.sort((a, b) => {
          const discountA = ((a?.price || 0) - (a?.discont_price || 0)) / (a?.price || 1) * 100;
          const discountB = ((b?.price || 0) - (b?.discont_price || 0)) / (b?.price || 1) * 100;
          return discountB - discountA;
        });
        break;
      default:
        // По умолчанию без сортировки
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  };

  // Обработка изменения фильтров
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddToCart = (product) => {
    // НЕ добавляем товар в корзину, только переходим на страницу товара
    console.log(`Navigating to product: ${product?.title || product?.name || 'Product'}`);
    
    // Переходим на страницу товара
    navigate(`/product/${product?.id || 1}`);
  };

  return (
    <Container>
      <div className="all-sales-page">
        {/* Навигация */}
        <div className="sales-navigation">
          <NavLink to="/" className="sales-nav-btn">Main page</NavLink>
          <div className="sales-nav-separator"></div>
          <button className="sales-nav-btn active" disabled>All sales</button>
        </div>

        {/* Заголовок */}
        <h1 className="sales-title">Discounted items</h1>

        {/* Фильтры */}
        <div className="sales-filters">
          <div className="price-filters">
            <label>Price</label>
            <input
              type="number"
              value={filters.priceFrom}
              onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
              placeholder="from"
            />
            <input
              type="number"
              value={filters.priceTo}
              onChange={(e) => handleFilterChange('priceTo', e.target.value)}
              placeholder="to"
            />
          </div>
          
          <div className="sort-filter">
            <label>Sorted</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="default">by default</option>
              <option value="price-asc">price: low to high</option>
              <option value="price-desc">price: high to low</option>
              <option value="discount-desc">discount: high to low</option>
            </select>
          </div>
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
            Loading discounted products...
          </div>
        )}

        {/* Сетка товаров */}
        <div className="products-grid">
          {paginatedProducts.map((product, index) => (
            <div className="product-card" key={product.id || index}>
              <div className="product-image-wrapper">
                <img
                  className="product-img"
                  src={getImageUrl(product.image) || getDefaultImageWithIndex(index)}
                  alt={product?.title || product?.name || 'Product'}
                  onError={(e) => {
                    e.target.src = getImageUrl(getDefaultImageWithIndex(index));
                  }}
                />
                {product?.discont_price && product.discont_price < (product?.price || 0) && (
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
                <div className="product-title">{product?.title || product?.name || 'Product'}</div>
                <div className="product-prices">
                  <span className="current-price">${product?.discont_price || product?.price || 0}</span>
                  {product?.discont_price && product.discont_price < (product?.price || 0) && (
                    <span className="old-price">${product?.price || 0}</span>
                  )}
                </div>
              </NavLink>
            </div>
          ))}
          {/* Заполнители для выравнивания сетки */}
          {Array.from({ length: PRODUCTS_PER_PAGE - paginatedProducts.length }).map((_, idx) => (
            <div className="product-card" key={`empty-${idx}`} style={{ visibility: 'hidden' }} />
          ))}
        </div>

        {/* Сообщение, если товаров нет */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="no-products-message">
            No discounted products found.
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="pagination">
            <PaginationButton 
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              &lt;=
            </PaginationButton>
            
            <div className="pagination-info">
              {currentPage} of {totalPages}
            </div>
            
            <PaginationButton 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              =&gt;
            </PaginationButton>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllSales;
