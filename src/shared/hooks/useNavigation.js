import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToProduct = useCallback((product) => {
    navigate(`/product/${product?.id || 1}`);
  }, [navigate]);

  const navigateToCategory = useCallback((categoryId) => {
    navigate(`/categories/${categoryId}`);
  }, [navigate]);

  const navigateToCart = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const navigateToSales = useCallback(() => {
    navigate('/sales');
  }, [navigate]);

  const navigateToAllProducts = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    navigateToProduct,
    navigateToCategory,
    navigateToCart,
    navigateToSales,
    navigateToAllProducts,
    navigateToHome
  };
}; 