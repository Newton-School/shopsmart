import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';

export function CartPage() {
  usePageTitle('Shopping cart');
  const { isAuthenticated } = useAuth();
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

  if (!isAuthenticated) {
    return (
      <main className="page-narrow">
        <h1 className="page-title">Shopping cart</h1>
        <p className="muted">
          <Link to="/login" state={{ from: { pathname: '/cart' } }}>
            Sign in to Shopsmart
          </Link>{' '}
          to add products, save your cart, and checkout.
        </p>
      </main>
    );
  }

  if (loading && !cart.items?.length) {
    return (
      <main className="page-narrow">
        <h1 className="page-title">Shopping cart</h1>
        <p className="muted">Loading your cart…</p>
      </main>
    );
  }

  const lines = cart.items || [];

  return (
    <main className="page-narrow cart-page">
      <h1 className="page-title">Shopping cart</h1>
      {!lines.length ? (
        <p className="muted">
          Your Shopsmart cart is empty. <Link to="/">Browse products</Link>
        </p>
      ) : (
        <>
          <ul className="cart-lines">
            {lines.map((line) => (
              <li key={line.id} className="cart-line">
                <div className="cart-line__info">
                  <strong>{line.product.name}</strong>
                  <span className="muted">${line.product.price.toFixed(2)} each</span>
                </div>
                <div className="cart-line__actions">
                  <input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => {
                      const q = parseInt(e.target.value, 10);
                      if (q >= 1) updateQuantity(line.product.id, q);
                    }}
                    className="cart-line__qty"
                    aria-label="Quantity"
                  />
                  <span className="cart-line__sub">${line.lineTotal.toFixed(2)}</span>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => removeFromCart(line.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p className="cart-total">
              Total: <strong>${cart.total.toFixed(2)}</strong>
            </p>
            <Link to="/checkout" className="btn btn--primary">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
