export function ProductCard({ product }) {
  const { name, description, price, category, inStock, imageUrl } = product;
  const amount = typeof price === 'number' ? price : Number(price);

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
          disabled={!inStock}
          aria-disabled={!inStock}
        >
          {inStock ? 'Add to cart' : 'Notify me'}
        </button>
      </div>
    </article>
  );
}
