const API_BASE_URL = 'http://localhost:3333';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Если путь уже полный URL, возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Если путь начинается с /, добавляем базовый URL
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // Иначе добавляем базовый URL и /
  return `${API_BASE_URL}/${imagePath}`;
};

export const getDefaultImage = () => {
  return 'https://via.placeholder.com/300x300?text=No+Image';
}; 