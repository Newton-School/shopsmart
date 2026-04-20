import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { Footer } from '../components/Footer';
import { useProducts } from '../hooks/useProducts';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
  usePageTitle('Shop products online');
  const { products, loading, error } = useProducts();

  return (
    <>
      <Hero />
      <main id="catalog" className="catalog">
        <div className="catalog__head">
          <div>
            <h2 className="catalog__title">Our products</h2>
            <p className="catalog__subtitle">
              Electronics, groceries, sports gear, home goods, and more—add to cart when you&apos;re
              signed in, then checkout securely.
            </p>
          </div>
          {!loading && !error && (
            <p className="catalog__count" aria-live="polite">
              <strong>{products.length}</strong> products
            </p>
          )}
        </div>
        <ProductList products={products} loading={loading} error={error} />
      </main>
      <Footer />
    </>
  );
}
