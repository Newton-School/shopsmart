export function SiteHeader({ health }) {
  const { data, loading, error } = health;
  const online = !loading && !error && data?.status === 'ok';

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-logo">
          <span className="site-logo__mark" aria-hidden="true" />
          <span className="site-logo__text">ShopSmart</span>
        </a>

        <nav className="site-nav" aria-label="Main">
          <a href="#catalog" className="site-nav__link site-nav__link--active">
            Shop
          </a>
          <a href="#catalog" className="site-nav__link">
            New arrivals
          </a>
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
          <button type="button" className="icon-btn" aria-label="Search (coming soon)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M11 19a8 8 0 100-16 8 8 0 000 16zm9 2l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button type="button" className="icon-btn icon-btn--cart" aria-label="Cart (0 items)">
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
            <span className="icon-btn__badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
