import React, { useState } from 'react';
import './DiscountBanner.css';
import saleImg from '../../assets/images/sale.png';

const DiscountBanner = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <>
      <section className="discount-banner">
        <img src={saleImg} alt="Sale" className="discount-img" />
        <div className="discount-content">
          <h2 className="discount-title-center">5% off on the first order</h2>
          <form className="discount-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="Phone number" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <button type="submit">Get a discount</button>
          </form>
        </div>
      </section>

      {/* Модальное окно */}
      {showModal && (
        <div className="discount-modal-overlay" onClick={closeModal}>
          <div className="discount-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h3 className="modal-title">Congratulations!</h3>
            <p className="modal-message">
              Your discount request has been successfully submitted. A manager will contact you shortly to confirm your discount.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountBanner; 