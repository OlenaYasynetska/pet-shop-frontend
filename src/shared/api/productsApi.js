import { createApiUrl, getHeaders } from './config.js';

// API для работы с товарами
export const productsApi = {
  // Получить все товары
  async getAllProducts() {
    try {
      const response = await fetch(createApiUrl('/products/all'), {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Получить товары с фильтрацией
  async getProductsWithFilters(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priceFrom) queryParams.append('priceFrom', filters.priceFrom);
      if (filters.priceTo) queryParams.append('priceTo', filters.priceTo);
      if (filters.discounted) queryParams.append('discounted', filters.discounted);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.category) queryParams.append('category', filters.category);
      
      const url = createApiUrl(`/products/all?${queryParams.toString()}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  },

  // Получить категории
  async getCategories() {
    try {
      const response = await fetch(createApiUrl('/categories'), {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Получить товары по категории
  async getProductsByCategory(categoryId) {
    try {
      const response = await fetch(createApiUrl(`/categories/${categoryId}`), {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Получить товары со скидками
  async getDiscountedProducts() {
    try {
      const response = await fetch(createApiUrl('/sale'), {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching discounted products:', error);
      throw error;
    }
  },

  // Получить товар по ID
  async getProductById(productId) {
    try {
      const response = await fetch(createApiUrl(`/products/${productId}`), {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
};

// Экспорт отдельных функций для удобства
export const getAllProducts = () => productsApi.getAllProducts();
export const getProductsWithFilters = (filters) => productsApi.getProductsWithFilters(filters);
export const getCategories = () => productsApi.getCategories();
export const getProductsByCategory = (categoryId) => productsApi.getProductsByCategory(categoryId);
export const getDiscountedProducts = () => productsApi.getDiscountedProducts();
export const getProductById = (productId) => productsApi.getProductById(productId); 