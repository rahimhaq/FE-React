import React from 'react';

interface ShoppingCartProps { itemCount: number; }

const ShoppingCart: React.FC<ShoppingCartProps> = ({ itemCount }) => (
  <div style={{ position: 'sticky', top: '0', padding: '10px', zIndex: 10, textAlign: 'center' }}>
    <h2>Cart : {itemCount} item(s)</h2>
  </div>
);

export default ShoppingCart;