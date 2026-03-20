import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function SiteHeader({ health }) {
  const { data, loading, error } = health;
  const online = !loading && !error && data?.status === 'ok';
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-logo" aria-label="Shopsmart home">
          <span className="site-logo__mark" aria-hidden="true" />
          <span className="site-logo__text">Shopsmart</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <NavLink to="/" end className="site-nav__link">
            Products
          </NavLink>
          <NavLink to="/orders" className="site-nav__link">
            Orders
          </NavLink>
          <a href="#footer" className="site-nav__link">
            Support
          </a>
        </nav>

        <div className="site-header__actions">
          <div
            className="live-pill"
            title={
              online
                ? data?.message || 'Connected'
                : loading
                  ? 'Checking connection…'
                  : error || 'Offline'
            }
          >
            <span
              className={`live-pill__dot ${online ? 'live-pill__dot--on' : loading ? 'live-pill__dot--pulse' : 'live-pill__dot--off'}`}
              aria-hidden="true"
            />
            <span className="live-pill__label">
              {loading ? 'Connecting…' : online ? 'Store live' : 'Offline'}
            </span>
          </div>

          {isAuthenticated ? (
            <span className="header-user">
              <span className="header-user__name">{user?.name}</span>
              <button type="button" className="link-btn header-user__out" onClick={() => logout()}>
                Log out
              </button>
            </span>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Sign in
              </Link>
              <Link to="/register" className="btn btn--header-register">
                Register
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="icon-btn icon-btn--cart"
            aria-label={`Cart (${itemCount} items)`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6h15l-1.5 9h-12L4 3H1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {itemCount > 0 && (
              <span className="icon-btn__badge">{itemCount > 99 ? '99+' : itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
