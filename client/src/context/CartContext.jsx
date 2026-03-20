import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!api.getStoredToken()) {
      setCart({ items: [], total: 0 });
      return;
    }
    setLoading(true);
    try {
      const res = await api.cartGet();
      setCart(res.data);
    } catch {
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart({ items: [], total: 0 });
    }
  }, [isAuthenticated, refreshCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    const res = await api.cartAddItem(productId, quantity);
    setCart(res.data);
    return res.data;
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    const res = await api.cartUpdateItem(productId, quantity);
    setCart(res.data);
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    const res = await api.cartRemoveItem(productId);
    setCart(res.data);
  }, []);

  const itemCount = cart.items?.reduce((n, line) => n + line.quantity, 0) ?? 0;

  const value = useMemo(
    () => ({
      cart,
      loading,
      itemCount,
      refreshCart,
      addToCart,
      updateQuantity,
      removeFromCart,
    }),
    [cart, loading, itemCount, refreshCart, addToCart, updateQuantity, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
