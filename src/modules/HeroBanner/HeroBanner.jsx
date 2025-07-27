import React from 'react';
import './HeroBanner.css';
import heroImg from '../../assets/images/Hero.png';

const HeroBanner = () => (
  <section className="hero-banner">
    <img src={heroImg} alt="Pets" className="hero-bg" />
    <div className="hero-overlay" />
    <div className="hero-content">
      <h1 className="hero-title">Amazing Discounts<br />on Pets Products!</h1>
      <button className="hero-btn">Check out</button>
    </div>
  </section>
);

export default HeroBanner; 