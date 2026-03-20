import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { useHealth } from './hooks/useHealth';
import { useProducts } from './hooks/useProducts';

function App() {
  const health = useHealth();
  const { products, loading, error } = useProducts();

  return (
    <div className="layout">
      <SiteHeader health={health} />
      <Hero />
      <main id="catalog" className="catalog">
        <div className="catalog__head">
          <div>
            <h2 className="catalog__title">Shop the catalog</h2>
            <p className="catalog__subtitle">
              Hand-picked items with photos, categories, and live stock from your API.
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
    </div>
  );
}

export default App;
