import { useMemo } from 'react';

export const useSaleStyles = () => {
  const saleStyles = useMemo(() => ({
    // Стили для названия продукта
    productTitle: {
      margin: '20px 32px 0 32px',
      textAlign: 'left',
      fontSize: '20px',
      fontWeight: 500,
      color: '#282828',
      width: 'auto',
      maxWidth: 'none',
      lineHeight: 1.2,
      fontFamily: 'Montserrat, sans-serif'
    },
    
    // Стили для контейнера цен
    pricesContainer: {
      margin: '16px 32px 32px 32px',
      justifyContent: 'flex-start',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    
    // Стили для текущей цены (со скидкой)
    currentPrice: {
      fontSize: '40px',
      color: '#282828',
      fontWeight: 700,
      fontFamily: 'Montserrat, sans-serif'
    },
    
    // Стили для старой цены (до скидки)
    oldPrice: {
      fontSize: '20px',
      color: 'var(--primary-text-color)',
      textDecoration: 'line-through',
      fontFamily: 'Montserrat, sans-serif'
    },
    
    // Стили для карточки товара
    productCard: {
      alignItems: 'flex-start',
      position: 'relative'
    },
    
    // Стили для бейджа скидки
    discountBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: '#0D50FF',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 700,
      borderRadius: '8px',
      padding: '4px 12px',
      zIndex: 2,
      boxShadow: '0 2px 8px rgba(13,80,255,0.10)',
      fontFamily: 'Montserrat, sans-serif'
    }
  }), []);

  return saleStyles;
};