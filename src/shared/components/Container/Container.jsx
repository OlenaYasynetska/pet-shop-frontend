import React from 'react';
import './Container.css';

const Container = ({ children, className = '' }) => (
  <div className={`container ${className}`.trim()}>
    {children}
  </div>
);

export default Container;
