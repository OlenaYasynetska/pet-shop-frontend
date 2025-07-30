import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../api/productsApi';

export const useCategories = (showAll = false) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productsApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setError('Failed to load categories. Please try again later.');
      
      // Fallback categories
      const fallbackCategories = [
        { id: 1, title: 'Dry & Wet Food', image: '/product_img/1.jpeg' },
        { id: 2, title: 'Litter Boxes & Litter Trays', image: '/product_img/10.jpeg' },
        { id: 3, title: 'Baskets & Beds', image: '/product_img/13.jpeg' },
        { id: 4, title: 'Toys', image: '/product_img/16.jpeg' },
      ];
      
      if (showAll) {
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
  }, [showAll]);

  const getCategoryById = useCallback((categoryId) => {
    return categories.find(cat => cat.id === parseInt(categoryId));
  }, [categories]);

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    displayedCategories,
    loading,
    error,
    loadCategories,
    getCategoryById
  };
}; 