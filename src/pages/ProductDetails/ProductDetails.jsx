import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import Container from '../../shared/components/Container/Container';
import { getProductById } from '../../shared/api/productsApi';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';
import { useCart } from '../../shared/context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Пытаемся загрузить данные из backend
        const productData = await getProductById(productId);
        console.log('API response for product:', productData);
        
        if (productData) {
          // API может возвращать массив или объект
          let product = productData;
          if (Array.isArray(productData) && productData.length > 0) {
            product = productData[0]; // Берем первый элемент если это массив
          }
          setProduct(product);
        } else {
          // Fallback данные если API не вернул данные
          const fallbackProducts = {
            1: { title: 'BELCANDO Mini Dog Food', name: 'BELCANDO Mini Dog Food', price: 35, discont_price: 23, category: 'Dry & Wet Food' },
            2: { title: 'GranataPet Mini Royal', name: 'GranataPet Mini Royal', price: 26, discont_price: 15, category: 'Dry & Wet Food' },
            3: { title: 'animonda CARNY ADULT', name: 'animonda CARNY ADULT', price: 14, category: 'Dry & Wet Food' },
            4: { title: 'WILD NATURE', name: 'WILD NATURE', price: 20, category: 'Dry & Wet Food' },
            5: { title: 'PERFECT FIT', name: 'PERFECT FIT', price: 30, category: 'Dry & Wet Food' },
            6: { title: 'pure sensitive adult', name: 'pure sensitive adult', price: 25, category: 'Dry & Wet Food' },
            7: { title: 'edgard Cooper HUNDE', name: 'edgard Cooper HUNDE', price: 18, category: 'Dry & Wet Food' },
            8: { title: 'ROYAL CANIN RENAL', name: 'ROYAL CANIN RENAL', price: 40, category: 'Dry & Wet Food' }
          };
          
          const fallbackData = {
            id: parseInt(productId),
            title: fallbackProducts[parseInt(productId)]?.title || 'BELCANDO Mini Dog Food',
            name: fallbackProducts[parseInt(productId)]?.name || 'BELCANDO Mini Dog Food',
            price: fallbackProducts[parseInt(productId)]?.price || 35,
            discont_price: fallbackProducts[parseInt(productId)]?.discont_price || 23,
            category: fallbackProducts[parseInt(productId)]?.category || 'Dry & Wet Food',
            image: `/product_img/${productId}.jpeg`,
            images: [
              `/product_img/${productId}.jpeg`,
              `/product_img/${productId}_2.jpeg`, 
              `/product_img/${productId}_3.jpeg`,
              `/product_img/${productId}_4.jpeg`,
              `/product_img/${productId}_5.jpeg`
            ],
            description: `Versatile selection: discover the culinary world for your little four-legged friend with 2 types of dry food and 6 types of wet food. So there is something for every taste. High acceptance: our balanced formula is rich in essential nutrients, vitamins and minerals and is tailored to the needs of small dog breeds. An all-round supply that leaves nothing to be desired. Dry food: Finest GF Lamb - easily digestible and a croquette coated with instant sauce for extra taste. Finest Croc - rich in meat and with grape seed flour. Wet food: you will receive a selection of different types of wet food from our range: single protein chicken, single protein buffalo, duck with rice and cr... Made in Germany under strict quality standards, without artificial additives and using food-safe animal products.`
          };
          setProduct(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback данные в случае ошибки
        const fallbackProducts = {
          1: { title: 'BELCANDO Mini Dog Food', name: 'BELCANDO Mini Dog Food', price: 35, discont_price: 23, category: 'Dry & Wet Food' },
          2: { title: 'GranataPet Mini Royal', name: 'GranataPet Mini Royal', price: 26, discont_price: 15, category: 'Dry & Wet Food' },
          3: { title: 'animonda CARNY ADULT', name: 'animonda CARNY ADULT', price: 14, category: 'Dry & Wet Food' },
          4: { title: 'WILD NATURE', name: 'WILD NATURE', price: 20, category: 'Dry & Wet Food' },
          5: { title: 'PERFECT FIT', name: 'PERFECT FIT', price: 30, category: 'Dry & Wet Food' },
          6: { title: 'pure sensitive adult', name: 'pure sensitive adult', price: 25, category: 'Dry & Wet Food' },
          7: { title: 'edgard Cooper HUNDE', name: 'edgard Cooper HUNDE', price: 18, category: 'Dry & Wet Food' },
          8: { title: 'ROYAL CANIN RENAL', name: 'ROYAL CANIN RENAL', price: 40, category: 'Dry & Wet Food' }
        };
        
        const fallbackData = {
          id: parseInt(productId),
          title: fallbackProducts[parseInt(productId)]?.title || 'BELCANDO Mini Dog Food',
          name: fallbackProducts[parseInt(productId)]?.name || 'BELCANDO Mini Dog Food',
          price: fallbackProducts[parseInt(productId)]?.price || 35,
          discont_price: fallbackProducts[parseInt(productId)]?.discont_price || 23,
          category: fallbackProducts[parseInt(productId)]?.category || 'Dry & Wet Food',
          image: `/product_img/${productId}.jpeg`,
          images: [
            `/product_img/${productId}.jpeg`,
            `/product_img/${productId}_2.jpeg`, 
            `/product_img/${productId}_3.jpeg`,
            `/product_img/${productId}_4.jpeg`,
            `/product_img/${productId}_5.jpeg`
          ],
          description: `Versatile selection: discover the culinary world for your little four-legged friend with 2 types of dry food and 6 types of wet food. So there is something for every taste. High acceptance: our balanced formula is rich in essential nutrients, vitamins and minerals and is tailored to the needs of small dog breeds. An all-round supply that leaves nothing to be desired. Dry food: Finest GF Lamb - easily digestible and a croquette coated with instant sauce for extra taste. Finest Croc - rich in meat and with grape seed flour. Wet food: you will receive a selection of different types of wet food from our range: single protein chicken, single protein buffalo, duck with rice and cr... Made in Germany under strict quality standards, without artificial additives and using food-safe animal products.`
        };
        setProduct(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      console.log(`Added ${quantity} of ${product?.title || product?.name || 'Product'} to cart`);
      
      // Переходим в корзину
      navigate('/cart');
    }
  };

  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Функция для обрезки текста
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Container>
        <div className="product-details-page">
          <div className="loading-message">Loading product...</div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="product-details-page">
          <div className="error-message">Product not found</div>
        </div>
      </Container>
    );
  }

  const discount = product.discont_price ? Math.round(((product.price - product.discont_price) / product.price) * 100) : 0;

  return (
    <Container>
      <div className="product-details-page">
        {/* Навигация */}
        <div className="product-nav">
          <NavLink to="/" className="product-nav-btn">Main page</NavLink>
          <div className="nav-separator"></div>
          <NavLink to="/categories" className="product-nav-btn">Categories</NavLink>
          <div className="nav-separator"></div>
          <NavLink to="/categories/1" className="product-nav-btn">Dry & Wet Food</NavLink>
          <div className="nav-separator"></div>
          <span className="product-nav-btn active">{product.title || product.name || 'Product'}</span>
        </div>

        <div className="product-content">
          {/* Левая колонка - изображения */}
          <div className="product-images">
            <div className="thumbnail-images">
              {product.images && Array.isArray(product.images) && product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={getImageUrl(image) || getDefaultImage()}
                    alt={`${product.title || product.name || 'Product'} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = getDefaultImage();
                    }}
                  />
                </div>
              ))}
              {/* Fallback миниатюры если images не определены */}
              {(!product.images || !Array.isArray(product.images) || product.images.length === 0) && (
                <>
                  <div className={`thumbnail ${selectedImage === 0 ? 'active' : ''}`} onClick={() => setSelectedImage(0)}>
                    <img
                      src={getImageUrl(product.image) || getDefaultImage()}
                      alt={`${product.title || product.name || 'Product'} 1`}
                      onError={(e) => { e.target.src = getDefaultImage(); }}
                    />
                  </div>
                  <div className={`thumbnail ${selectedImage === 1 ? 'active' : ''}`} onClick={() => setSelectedImage(1)}>
                    <img
                      src={getImageUrl(`/product_img/${product.id}_2.jpeg`) || getDefaultImage()}
                      alt={`${product.title || product.name || 'Product'} 2`}
                      onError={(e) => { e.target.src = getDefaultImage(); }}
                    />
                  </div>
                  <div className={`thumbnail ${selectedImage === 2 ? 'active' : ''}`} onClick={() => setSelectedImage(2)}>
                    <img
                      src={getImageUrl(`/product_img/${product.id}_3.jpeg`) || getDefaultImage()}
                      alt={`${product.title || product.name || 'Product'} 3`}
                      onError={(e) => { e.target.src = getDefaultImage(); }}
                    />
                  </div>
                  <div className={`thumbnail ${selectedImage === 3 ? 'active' : ''}`} onClick={() => setSelectedImage(3)}>
                    <img
                      src={getImageUrl(`/product_img/${product.id}_4.jpeg`) || getDefaultImage()}
                      alt={`${product.title || product.name || 'Product'} 4`}
                      onError={(e) => { e.target.src = getDefaultImage(); }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="main-image">
              <img
                src={getImageUrl(
                  product.images && Array.isArray(product.images) && product.images[selectedImage] 
                    ? product.images[selectedImage] 
                    : selectedImage === 0 
                      ? product.image 
                      : `/product_img/${product.id}_${selectedImage + 1}.jpeg`
                ) || getDefaultImage()}
                alt={product.title || product.name || 'Product'}
                onError={(e) => {
                  e.target.src = getDefaultImage();
                }}
              />
            </div>
          </div>

          {/* Правая колонка - информация о товаре */}
          <div className="product-info">
            <h1 className="product-title">{product.title || product.name || 'Product'}</h1>
            
            <div className="product-pricing">
              <span className="current-price">${product.discont_price || product.price || 0}</span>
              {product.discont_price && product.price > product.discont_price && (
                <span className="old-price">
                  ${product.price}
                  {discount > 0 && (
                    <div className="discount-badge">-{discount}%</div>
                  )}
                </span>
              )}
            </div>

            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>
                {showFullDescription 
                  ? (product.description || 'No description available')
                  : truncateText(product.description || 'No description available', 150)
                }
              </p>
              {(product.description && product.description.length > 150) && (
                <button className="read-more-btn" onClick={handleReadMore}>
                  {showFullDescription ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails; 