import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBanner.css';
import heroImg from '../../assets/images/Hero.png';

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate('/sales');
  };

  return (
    <section className="hero-banner">
      <img src={heroImg} alt="Pets" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Amazing Discounts<br />on Pets Products!</h1>
        <button className="hero-btn" onClick={handleCheckOut}>Check out</button>
      </div>
    </section>
  );
};

export default HeroBanner; 