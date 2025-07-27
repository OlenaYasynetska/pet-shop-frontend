import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import Container from '../../shared/components/Container/Container';
import { getProductsByCategory, getCategories } from '../../shared/api/productsApi';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';
import PaginationButton from '../../shared/components/PaginationButton/PaginationButton';
import { useCart } from '../../shared/context/CartContext';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    discountedOnly: false,
    sortBy: 'default'
  });

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fallback названия категорий
        const categoryNames = {
          1: 'Dry & Wet Food',
          2: 'Litter Boxes & Litter Trays', 
          3: 'Baskets & Beds',
          4: 'Toys',
          5: 'Care & Grooming',
          6: 'Snacks & Supplements',
          7: 'Runs & Fencing',
          8: 'Trees & Scratching'
        };

        // Получаем информацию о категории
        const categoriesData = await getCategories();
        console.log('Categories data:', categoriesData);
        console.log('Category ID:', categoryId);
        
        let currentCategory = Array.isArray(categoriesData) ? 
          categoriesData.find(cat => cat.id === parseInt(categoryId)) : null;
        
        console.log('Found category:', currentCategory);
        
        // Если категория не найдена, используем fallback
        if (!currentCategory) {
          console.log('Using fallback category');
          currentCategory = {
            id: parseInt(categoryId),
            title: categoryNames[parseInt(categoryId)] || 'Category'
          };
        }
        
        console.log('Final category:', currentCategory);
        
        // Устанавливаем категорию сразу
        setCategory(currentCategory);
        
        // Получаем товары категории
        const allProducts = await getProductsByCategory(categoryId);
        
        // Обрабатываем ответ от API
        let productsArray = [];
        if (allProducts && typeof allProducts === 'object') {
          if (allProducts.data && Array.isArray(allProducts.data)) {
            productsArray = allProducts.data;
          } else if (Array.isArray(allProducts)) {
            productsArray = allProducts;
          }
        }
        
        // Если API вернул пустой массив, показываем fallback товары
        if (productsArray.length === 0) {
          const fallbackProducts = {
            1: [ // Dry & Wet Food
              { id: 1, title: 'BELCANDO Mini Dog Food', name: 'BELCANDO Mini Dog Food', price: 35, discont_price: 23, image: '/product_img/1.jpeg' },
              { id: 2, title: 'GranataPet Mini Royal', name: 'GranataPet Mini Royal', price: 26, discont_price: 15, image: '/product_img/2.jpeg' },
              { id: 3, title: 'animonda CARNY ADULT', name: 'animonda CARNY ADULT', price: 14, image: '/product_img/3.jpeg' },
              { id: 4, title: 'WILD NATURE', name: 'WILD NATURE', price: 20, image: '/product_img/4.jpeg' },
              { id: 5, title: 'PERFECT FIT', name: 'PERFECT FIT', price: 30, image: '/product_img/5.jpeg' },
              { id: 6, title: 'pure sensitive adult', name: 'pure sensitive adult', price: 25, image: '/product_img/6.jpeg' },
              { id: 7, title: 'edgard Cooper HUNDE', name: 'edgard Cooper HUNDE', price: 18, image: '/product_img/7.jpeg' },
              { id: 8, title: 'ROYAL CANIN RENAL', name: 'ROYAL CANIN RENAL', price: 40, image: '/product_img/8.jpeg' }
            ]
          };
          
          const categoryFallbackProducts = fallbackProducts[parseInt(categoryId)] || [];
          setProducts(categoryFallbackProducts);
        } else {
          setProducts(productsArray);
        }
        
      } catch (err) {
        console.error('Error fetching category products:', err);
        setError('Failed to load products. Please try again later.');
        
        console.log('Setting fallback category in catch block');
        const fallbackCategory = {
          id: parseInt(categoryId),
          title: categoryNames[parseInt(categoryId)] || 'Category'
        };
        setCategory(fallbackCategory);
        
        // В случае ошибки показываем fallback товары
        const fallbackProducts = {
          1: [ // Dry & Wet Food
            { id: 1, title: 'BELCANDO Mini Dog Food', name: 'BELCANDO Mini Dog Food', price: 35, discont_price: 23, image: '/product_img/1.jpeg' },
            { id: 2, title: 'GranataPet Mini Royal', name: 'GranataPet Mini Royal', price: 26, discont_price: 15, image: '/product_img/2.jpeg' },
            { id: 3, title: 'animonda CARNY ADULT', name: 'animonda CARNY ADULT', price: 14, image: '/product_img/3.jpeg' },
            { id: 4, title: 'WILD NATURE', name: 'WILD NATURE', price: 20, image: '/product_img/4.jpeg' },
            { id: 5, title: 'PERFECT FIT', name: 'PERFECT FIT', price: 30, image: '/product_img/5.jpeg' },
            { id: 6, title: 'pure sensitive adult', name: 'pure sensitive adult', price: 25, image: '/product_img/6.jpeg' },
            { id: 7, title: 'edgard Cooper HUNDE', name: 'edgard Cooper HUNDE', price: 18, image: '/product_img/7.jpeg' },
            { id: 8, title: 'ROYAL CANIN RENAL', name: 'ROYAL CANIN RENAL', price: 40, image: '/product_img/8.jpeg' }
          ]
        };
        
        const categoryFallbackProducts = fallbackProducts[parseInt(categoryId)] || [];
        setProducts(categoryFallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // Фильтрация и сортировка товаров
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(product => 
        (product?.price || 0) >= parseFloat(filters.priceFrom)
      );
    }
    if (filters.priceTo) {
      filtered = filtered.filter(product => 
        (product?.price || 0) <= parseFloat(filters.priceTo)
      );
    }

    // Фильтр по скидкам
    if (filters.discountedOnly) {
      filtered = filtered.filter(product => 
        product?.discont_price && product.discont_price < (product?.price || 0)
      );
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => (a?.title || a?.name || '').localeCompare(b?.title || b?.name || ''));
        break;
      case 'name-desc':
        filtered.sort((a, b) => (b?.title || b?.name || '').localeCompare(a?.title || a?.name || ''));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Заполнители для выравнивания сетки
  const placeholderCount = Math.max(0, itemsPerPage - currentProducts.length);
  const placeholderElements = Array.from({ length: placeholderCount }).map((_, idx) => (
    <div className="product-card" key={`placeholder-${idx}`} style={{ visibility: 'hidden' }} />
  ));

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    // НЕ добавляем товар в корзину, только переходим на страницу товара
    console.log(`Navigating to product: ${product?.title || product?.name || 'Product'}`);
    
    // Переходим на страницу товара
    navigate(`/product/${product?.id || 1}`);
  };

  if (loading) {
    return (
      <Container>
        <div className="category-products-page">
          <div className="loading-message">Loading products...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="category-products-page">
          <div className="error-message">{error}</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="category-products-page">
        {/* Навигация */}
        <div className="category-nav">
          <NavLink to="/" className="category-nav-btn">Main page</NavLink>
          <span className="nav-separator">&gt;</span>
          <NavLink to="/categories" className="category-nav-btn">Categories</NavLink>
          <span className="nav-separator">&gt;</span>
          <span className="category-nav-btn active">{category?.title || category?.name || 'Category'}</span>
        </div>

        {/* Заголовок */}
        <h1 className="category-title">{category?.title || category?.name || 'Category'}</h1>

        {/* Фильтры */}
        <div className="category-filters">
          <div className="price-filters">
            <label>Price:</label>
            <input
              type="number"
              placeholder="from"
              value={filters.priceFrom}
              onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
            />
            <input
              type="number"
              placeholder="to"
              value={filters.priceTo}
              onChange={(e) => handleFilterChange('priceTo', e.target.value)}
            />
          </div>
          
          <div className="discount-filter">
            <label>
              <input
                type="checkbox"
                checked={filters.discountedOnly}
                onChange={(e) => handleFilterChange('discountedOnly', e.target.checked)}
              />
              Discounted items
            </label>
          </div>
          
          <div className="sort-filter">
            <label>Sorted:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="default">by default</option>
              <option value="price-asc">price: low to high</option>
              <option value="price-desc">price: high to low</option>
              <option value="name-asc">name: A to Z</option>
              <option value="name-desc">name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="products-grid">
          {currentProducts.map((product, index) => (
            <div key={product?.id || index} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={getImageUrl(product?.image) || getDefaultImage()}
                  alt={product?.title || product?.name || 'Product'}
                  onError={(e) => { e.target.src = getDefaultImage(); }}
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
              <NavLink to={`/product/${product?.id || 1}`} className="product-link">
                <h3 className="product-title">{product?.title || product?.name || 'Product'}</h3>
                <div className="product-prices">
                  <span className="current-price">${product?.discont_price || product?.price || 0}</span>
                  {product?.discont_price && product.discont_price < (product?.price || 0) && (
                    <span className="old-price">${product?.price || 0}</span>
                  )}
                </div>
              </NavLink>
            </div>
          ))}
          {placeholderElements}
        </div>

        {/* Сообщение, если товаров нет */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="no-products-message">
            No products found in this category.
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="pagination">
            <PaginationButton
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              &lt;=
            </PaginationButton>
            
            <div className="pagination-info">
              {currentPage} of {totalPages}
            </div>
            
            <PaginationButton
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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

export default CategoryProducts; 