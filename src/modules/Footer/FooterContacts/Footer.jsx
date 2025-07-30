import React from 'react';
import FooterMap from '../FooterMap';
import Container from '../../../shared/components/Container/Container';
import '../../../pages/PageNotFound/PageNotFound.css';

const Footer = () => {
    return (
        <footer>
            <Container>
                <div className="notfound-contact">
                    <h2>Contact</h2>
                    <div className="notfound-contact-grid">
                        <div className="notfound-contact-block">
                            <div className="notfound-contact-label">Phone</div>
                            <div className="notfound-contact-value">
                                <a href="tel:+493091588492">+49 30 915-88492</a>
                            </div>
                        </div>
                        <div className="notfound-contact-block">
                            <div className="notfound-contact-label">Socials</div>
                            <div className="notfound-contact-value" style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src="/Colo.svg" alt="Colo" width={38} height={38} />
                                </a>
                                <a href="tel:+493091588492" target="_blank" rel="noopener noreferrer">
                                    <img src="/Tel.svg" alt="Phone" width={38} height={38} />
                                </a>
                            </div>
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
                </div>
            </Container>
        </footer>
    )
}

export default Footer;