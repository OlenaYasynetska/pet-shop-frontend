// Конфигурация API
export const API_BASE_URL = 'http://localhost:3333';

// Функция для создания полного URL эндпоинта
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Базовые заголовки для запросов
export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
}; 