import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }) {
  const { name, description, price, category, inStock, imageUrl, id } = product;
  const amount = typeof price === 'number' ? price : Number(price);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [busy, setBusy] = useState(false);

  async function handleAddToCart() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    setBusy(true);
    try {
      await addToCart(id, 1);
    } catch (e) {
      window.alert(e.message || 'Could not add to cart');
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="product-card__img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="product-card__img product-card__img--placeholder" aria-hidden="true" />
        )}
        <span className="product-card__category">{category}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        {description && <p className="product-card__desc">{description}</p>}
        <div className="product-card__row">
          <p className="product-card__price">
            <span className="product-card__currency">$</span>
            {Number.isFinite(amount) ? amount.toFixed(2) : '—'}
          </p>
          <span
            className={`stock-pill ${inStock ? 'stock-pill--in' : 'stock-pill--out'}`}
            aria-label={inStock ? 'In stock' : 'Out of stock'}
          >
            {inStock ? 'In stock' : 'Sold out'}
          </span>
        </div>
        <button
          type="button"
          className="btn btn--cart"
          disabled={!inStock || busy}
          onClick={handleAddToCart}
        >
          {!inStock
            ? 'Sold out'
            : busy
              ? 'Adding…'
              : isAuthenticated
                ? 'Add to cart'
                : 'Sign in to add'}
        </button>
      </div>
    </article>
  );
}
