import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterMap from '../../modules/Footer/FooterMap/FooterMap';
import Container from '../../shared/components/Container/Container';
import pet404 from '../../assets/images/pet_404.png';
import './PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="notfound-wrapper">
        <div className="notfound-main">
          <div className="notfound-404">
            <span className="notfound-4">4</span>
            <img className="notfound-pet" src={pet404} alt="pet" />
            <span className="notfound-4">4</span>
          </div>
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-desc">We're sorry, the page you requested could not be found.<br/>Please go back to the homepage.</p>
          <button className="notfound-btn" onClick={() => navigate('/')}>Go Home</button>
        </div>
        {/* <div className="notfound-contact">
          <h2>Contact</h2>
          <div className="notfound-contact-grid">
            <div className="notfound-contact-block">
              <div className="notfound-contact-label">Phone</div>
              <div className="notfound-contact-value">+49 30 915-88492</div>
            </div>
            <div className="notfound-contact-block">
              <div className="notfound-contact-label">Socials</div>
              <div className="notfound-contact-value"> <span>📷</span> <span>🟢</span> </div>
            </div>
            <div className="notfound-contact-block">
              <div className="notfound-contact-label">Address</div>
              <div className="notfound-contact-value">Wallstraße 9-13, 10179 Berlin, Deutschland</div>
            </div>
            <div className="notfound-contact-block">
              <div className="notfound-contact-label">Working Hours</div>
              <div className="notfound-contact-value">24 hours a day</div>
            </div>
          </div>
          <div className="notfound-map">
            <FooterMap />
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default PageNotFound;
