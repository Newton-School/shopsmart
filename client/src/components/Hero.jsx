export function Hero() {
  return (
    <section className="hero" aria-label="Featured">
      <div className="hero__content">
        <p className="hero__eyebrow">Online store</p>
        <h1 className="hero__title">Electronics, home &amp; more</h1>
        <p className="hero__subtitle">
          Browse the catalog, add to cart, and check out with shipping—fast and simple.
        </p>
        <div className="hero__cta">
          <a href="#catalog" className="btn btn--primary">
            Shop now
          </a>
          <a href="#footer" className="btn btn--ghost">
            Why Shopsmart
          </a>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__card">
          <span className="hero__card-label">Storewide</span>
          <strong className="hero__card-value">Free shipping on orders $50+</strong>
        </div>
      </div>
    </section>
  );
}
