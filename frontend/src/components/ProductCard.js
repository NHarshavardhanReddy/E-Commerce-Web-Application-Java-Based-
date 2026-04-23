import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductId } from '../utils/products';

const ProductCard = React.memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const productId = getProductId(product);
  const productImage = product.image;

  return (
    <Link to={`/product/${productId}`} className="compact-card">
      <div className="compact-image-wrap">
        <img
          src={productImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
          data-loaded={imageLoaded ? 'true' : undefined}
          onLoad={() => setImageLoaded(true)}
          onError={(event) => {
            event.target.src = '/product-images/wireless-headphones.svg';
            setImageLoaded(true);
          }}
        />
      </div>
      <div className="compact-meta">
        <p className="compact-title">{product.name}</p>
        <p className="compact-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
});

export default ProductCard;
