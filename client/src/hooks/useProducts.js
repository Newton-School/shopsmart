import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then((json) => {
        if (!cancelled) {
          setProducts(Array.isArray(json.data) ? json.data : []);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Failed to load products');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, error, loading };
}
