import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../api/productsApi';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const loadProducts = useCallback(async (appliedFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productsApi.getAllProducts();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }

      let filteredProducts = [...data];

      // Фильтрация по цене
      if (appliedFilters.priceFrom) {
        filteredProducts = filteredProducts.filter(product => 
          (product?.discont_price || product?.price || 0) >= parseFloat(appliedFilters.priceFrom)
        );
      }
      
      if (appliedFilters.priceTo) {
        filteredProducts = filteredProducts.filter(product => 
          (product?.discont_price || product?.price || 0) <= parseFloat(appliedFilters.priceTo)
        );
      }

      // Фильтрация по скидкам
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
            filteredProducts.sort((a, b) => a.id - b.id);
        }
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
      
      // Fallback data
      setProducts([
        {
          id: 1,
          title: 'BELCANDO Mini Dog F...',
          price: 35,
          discont_price: 23,
          image: '/product_img/1.jpeg'
        },
        {
          id: 2,
          title: 'GranataPet Mini Royal...',
          price: 26,
          discont_price: 15,
          image: '/product_img/2.jpeg'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    
    // Apply filters with delay
    setTimeout(() => {
      loadProducts(newFilters);
    }, 300);
  }, [filters, loadProducts]);

  const handleFilterSubmit = useCallback((e) => {
    e.preventDefault();
    loadProducts(filters);
  }, [filters, loadProducts]);

  const hasDiscount = useCallback((product) => {
    return product?.discont_price && product.discont_price < (product?.price || 0);
  }, []);

  const calculateDiscount = useCallback((product) => {
    if (!hasDiscount(product)) return 0;
    return Math.round(((product.price - product.discont_price) / product.price) * 100);
  }, [hasDiscount]);

  useEffect(() => {
    loadProducts(initialFilters);
  }, [loadProducts, initialFilters]);

  return {
    products,
    loading,
    error,
    filters,
    setFilters,
    loadProducts,
    handleFilterChange,
    handleFilterSubmit,
    hasDiscount,
    calculateDiscount
  };
}; 