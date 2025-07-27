import React from 'react';
import './DiscountBanner.css';
import saleImg from '../../assets/images/sale.png';

const DiscountBanner = () => (
  <section className="discount-banner">
    <span className="discount-title-center">5% off on the first order</span>
    <img src={saleImg} alt="Sale" className="discount-img" />
    <div className="discount-content">
      <h2>5% off on the first order</h2>
      <form className="discount-form">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone number" />
        <input type="email" placeholder="Email" />
        <button type="submit">Get a discount</button>
      </form>
    </div>
  </section>
);

export default DiscountBanner; 