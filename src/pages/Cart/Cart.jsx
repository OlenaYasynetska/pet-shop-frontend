import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../../shared/components/Container/Container';
import { useCart } from '../../shared/context/CartContext';
import { getImageUrl, getDefaultImage } from '../../shared/utils/imageUtils';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleInputChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    clearCart();
  };

  // Если корзина пустая
  if (cartItems.length === 0 && !showSuccessModal) {
    return (
      <Container>
        <div className="cart-page">
          <h1 className="cart-title">Shopping cart</h1>
          <div className="empty-cart">
            <p className="empty-cart-message">
              Looks like you have no items in your basket currently.
            </p>
            <NavLink to="/" className="continue-shopping-btn">
              Continue Shopping
            </NavLink>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="cart-page">
        <div className="cart-header">
          <h1 className="cart-title">Shopping cart</h1>
          <NavLink to="/" className="back-to-store">Back to the store</NavLink>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={getImageUrl(item.image) || getDefaultImage()} 
                  alt={item.name} 
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = getDefaultImage();
                  }}
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-price">
                    <span className="current-price">${item.price}</span>
                    {item.originalPrice && (
                      <span className="original-price">${item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${item.price * item.quantity}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="order-details">
            <h2 className="order-details-title">Order details</h2>
            <div className="order-summary">
              <p className="items-count">{getTotalItems()} items</p>
              <p className="total-price">Total ${getTotalPrice()}</p>
            </div>
            
            <form onSubmit={handleOrderSubmit} className="order-form">
              <input
                type="text"
                placeholder="Name"
                value={orderForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="order-input"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={orderForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="order-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={orderForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="order-input"
              />
              <button type="submit" className="order-btn">
                Order
              </button>
            </form>
          </div>
        </div>

        {/* Модальное окно успешного заказа */}
        {showSuccessModal && (
          <div className="success-modal-overlay">
            <div className="success-modal">
              <button onClick={closeModal} className="close-modal-btn">×</button>
              <h3 className="success-title">Congratulations!</h3>
              <div className="success-message">
                <p>Your order has been successfully placed on the website.</p>
                <p>A manager will contact you shortly to confirm your order.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart; 