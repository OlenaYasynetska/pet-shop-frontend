import React from 'react';
import Container from '../../shared/components/Container/Container';
import HeroBanner from '../../modules/HeroBanner/HeroBanner';
import Categories from '../../modules/Categories/Categories';
import DiscountBanner from '../../modules/DiscountBanner/DiscountBanner';
import Sale from '../../modules/Sale/Sale';

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <Container>
        <Categories />
        <div style={{ marginBottom: '80px' }}>
          <DiscountBanner />
        </div>
        <Sale />
      </Container>
    </>
  );
}

export default HomePage;