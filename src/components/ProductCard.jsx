import React, { useRef } from 'react';
import { use3DCardEffect } from '../hooks/use3DCardEffect';
import styles from './ProductCard.module.css';

// --- NEW, WORKING IMAGE LINK ---
const exampleProductImage = 'https://m.media-amazon.com/images/I/71T+O83TLfL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg';

export const ProductCard = () => {
  const containerRef = useRef(null);
  
  const { style, shineStyle, containerStyle } = use3DCardEffect(containerRef, {
    maxRotation: 12,
    maxShineOpacity: 0.5,
    scaleOnHover: 1.05,
  });

  return (
    <div 
      ref={containerRef} 
      className={styles.container} 
      style={containerStyle}
    >
      <div 
        className={styles.card} 
        style={style}
      >
        <div className={styles.shine} style={shineStyle}></div>
        
        <div className={styles.contentWrapper}>
          <img
            src={exampleProductImage} // <-- The new link is used here
            alt="Product"
            className={styles.productImage}
          />
          <h3 className={styles.title}>Aura Wireless Headset</h3>
          <p className={styles.description}>
            Experience crystal-clear audio with our new noise-cancelling
            wireless headphones.
          </p>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};