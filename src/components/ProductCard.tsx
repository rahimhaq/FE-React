import React from 'react';

interface ProductCardProps {
  id: number; name: string; price: number; image: string;
  onAddToCart: (id: number) => void;
  isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price, onAddToCart, isInCart }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px', width: '200px', textAlign: 'center' }}>
    <img src={image} alt={name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
    <h3>{name}</h3>
    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${price.toFixed(2)}</p>
    <button onClick={() => onAddToCart(id)} disabled={isInCart} style={{ background: isInCart ? '#999' : '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
      {isInCart ? '✓ In Cart' : 'Add to Cart'}
    </button>
  </div>
);


export default ProductCard;