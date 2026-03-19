import { ProductCard } from './ProductCard';

function SkeletonCard() {
  return (
    <li className="product-grid__item" aria-hidden="true">
      <div className="skeleton-card">
        <div className="skeleton skeleton--media" />
        <div className="skeleton-card__body">
          <div className="skeleton skeleton--line skeleton--line-lg" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--line-sm" />
        </div>
      </div>
    </li>
  );
}

export function ProductList({ products, loading, error }) {
  if (loading) {
    return (
      <ul className="product-grid" role="list" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="empty-state empty-state--error" role="alert">
        <p className="empty-state__title">We couldn&apos;t load products</p>
        <p className="empty-state__text">{error}</p>
        <p className="empty-state__hint">Make sure the API is running on port 5001.</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No products yet</p>
        <p className="empty-state__text">Run the seed script on the server to add sample items.</p>
      </div>
    );
  }

  return (
    <ul className="product-grid" role="list">
      {products.map((p) => (
        <li key={p.id} className="product-grid__item">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
