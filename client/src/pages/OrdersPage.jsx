import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';

export function OrdersPage() {
  usePageTitle('Your orders');
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await api.ordersList();
        if (!cancelled) setOrders(res.data || []);
      } catch {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="page-narrow">
        <h1 className="page-title">Order history</h1>
        <p className="muted">
          <Link to="/login" state={{ from: { pathname: '/orders' } }}>
            Sign in to Shopsmart
          </Link>{' '}
          to view your past purchases.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page-narrow">
        <h1 className="page-title">Order history</h1>
        <p className="muted">Loading your orders…</p>
      </main>
    );
  }

  return (
    <main className="page-narrow">
      <h1 className="page-title">Your Shopsmart orders</h1>
      {!orders.length ? (
        <p className="muted">No orders yet — your completed checkouts will appear here.</p>
      ) : (
        <ul className="order-list">
          {orders.map((o) => (
            <li key={o.id} className="order-list__item">
              <Link to={`/orders/${o.id}`}>
                Order #{o.id} — ${o.total.toFixed(2)} — {new Date(o.createdAt).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
