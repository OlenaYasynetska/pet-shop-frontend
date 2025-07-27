import React from 'react';
import './PaginationButton.css';

const PaginationButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '' 
}) => {
  return (
    <button
      className={`pagination-button ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaginationButton; 