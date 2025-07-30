import { useMemo } from 'react';
import { getImageUrl, getDefaultImage } from '../utils/imageUtils';

export const useImageUtils = () => {
  const getDefaultImageWithIndex = useMemo(() => {
    return (index) => {
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
  }, []);

  const handleImageError = useMemo(() => {
    return (e, index) => {
      e.target.src = getImageUrl(getDefaultImageWithIndex(index));
    };
  }, [getDefaultImageWithIndex]);

  const getProductImageSrc = useMemo(() => {
    return (image, index) => {
      return getImageUrl(image) || getDefaultImageWithIndex(index);
    };
  }, [getDefaultImageWithIndex]);

  return {
    getDefaultImageWithIndex,
    handleImageError,
    getProductImageSrc,
    getImageUrl,
    getDefaultImage
  };
}; 