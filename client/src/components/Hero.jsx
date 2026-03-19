export function Hero() {
  return (
    <section className="hero" aria-label="Featured">
      <div className="hero__content">
        <p className="hero__eyebrow">Spring collection</p>
        <h1 className="hero__title">Everything you need, curated for you.</h1>
        <p className="hero__subtitle">
          Fresh picks from our catalog—quality goods with clear pricing and real-time availability.
        </p>
        <div className="hero__cta">
          <a href="#catalog" className="btn btn--primary">
            Browse catalog
          </a>
          <a href="#footer" className="btn btn--ghost">
            How it works
          </a>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__card">
          <span className="hero__card-label">Today&apos;s deal</span>
          <strong className="hero__card-value">Free shipping $50+</strong>
        </div>
      </div>
    </section>
  );
}
