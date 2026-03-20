import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as api from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';

export function OrderDetailPage() {
  const { id } = useParams();
  usePageTitle(`Order #${id || ''}`);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.ordersGet(id);
        if (!cancelled) setOrder(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load order');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <main className="page-narrow">
        <p className="form-error">{error}</p>
        <Link to="/orders">Back to orders</Link>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="page-narrow">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  return (
    <main className="page-narrow order-detail">
      <h1 className="page-title">Shopsmart order #{order.id}</h1>
      <p className="order-meta muted">
        {new Date(order.createdAt).toLocaleString()} · {order.status} · ${order.total.toFixed(2)}
      </p>
      <p className="order-detail__thanks muted">Thank you for shopping on Shopsmart.</p>
      <section className="checkout-section">
        <h2 className="checkout-section__title">Ship to</h2>
        <p>
          {order.shippingName}
          <br />
          {order.shippingLine1}
          <br />
          {order.shippingCity} {order.shippingPostal}
        </p>
      </section>
      <section className="checkout-section">
        <h2 className="checkout-section__title">Items</h2>
        <ul className="checkout-lines">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.productName} × {item.quantity} @ ${item.price.toFixed(2)} = $
              {(item.quantity * item.price).toFixed(2)}
            </li>
          ))}
        </ul>
      </section>
      <Link to="/orders" className="btn btn--ghost">
        All orders
      </Link>
    </main>
  );
}
