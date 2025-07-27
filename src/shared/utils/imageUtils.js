import { API_BASE_URL } from '../api/config';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Если путь уже полный URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Если путь начинается с /, убираем его
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${API_BASE_URL}/${cleanPath}`;
};

export const getDefaultImage = () => {
  return `${API_BASE_URL}/product_img/1.jpeg`;
}; 