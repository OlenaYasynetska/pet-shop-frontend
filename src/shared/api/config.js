// Конфигурация API
// export const API_BASE_URL = 'http://localhost:3333';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);

// Функция для создания полного URL
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Базовые заголовки для запросов
export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
}; 