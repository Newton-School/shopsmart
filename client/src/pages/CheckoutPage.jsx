import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';

export function CheckoutPage() {
  usePageTitle('Checkout');
  const { isAuthenticated } = useAuth();
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState('');
  const [shippingLine1, setShippingLine1] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostal, setShippingPostal] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <main className="page-narrow">
        <h1 className="page-title">Checkout</h1>
        <p className="muted">
          <Link to="/login" state={{ from: { pathname: '/checkout' } }}>
            Sign in to Shopsmart
          </Link>{' '}
          to enter shipping details and place your order.
        </p>
      </main>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.ordersCheckout({
        shippingName,
        shippingLine1,
        shippingCity,
        shippingPostal,
      });
      await refreshCart();
      navigate(`/orders/${res.data.id}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  }

  const lines = cart.items || [];
  const empty = !lines.length;

  return (
    <main className="page-narrow checkout-page">
      <h1 className="page-title">Checkout</h1>
      {empty ? (
        <p className="muted">
          Your cart is empty. <Link to="/">Browse products</Link> on Shopsmart first.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="checkout-section">
            <h2 className="checkout-section__title">Order summary</h2>
            <ul className="checkout-lines">
              {lines.map((line) => (
                <li key={line.id}>
                  {line.product.name} × {line.quantity} — ${line.lineTotal.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="cart-total">
              Total: <strong>${cart.total.toFixed(2)}</strong>
            </p>
          </section>
          <section className="checkout-section">
            <h2 className="checkout-section__title">Shipping</h2>
            {error && <p className="form-error">{error}</p>}
            <label className="form-label">
              Full name
              <input
                className="form-input"
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                required
              />
            </label>
            <label className="form-label">
              Address line
              <input
                className="form-input"
                value={shippingLine1}
                onChange={(e) => setShippingLine1(e.target.value)}
                required
              />
            </label>
            <label className="form-label">
              City
              <input
                className="form-input"
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                required
              />
            </label>
            <label className="form-label">
              Postal code
              <input
                className="form-input"
                value={shippingPostal}
                onChange={(e) => setShippingPostal(e.target.value)}
                required
              />
            </label>
          </section>
          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? 'Placing order…' : `Pay $${cart.total.toFixed(2)}`}
          </button>
          <p className="checkout-note muted">
            Shopsmart demo — no payment processor connected; orders are recorded for testing only.
          </p>
        </form>
      )}
    </main>
  );
}
