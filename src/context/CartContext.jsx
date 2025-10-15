import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "online_orders_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
    }
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const found = prev.find(i => i.product.id === product.id);
      if (found) {
        return prev.map(i => i.product.id === product.id ? {...i, qty: i.qty + qty} : i);
      }
      return [...prev, { product, qty }];
    });
  }

  function removeFromCart(productId) {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }

  function updateQty(productId, qty) {
    setItems(prev => prev.map(i => i.product.id === productId ? {...i, qty} : i));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + (Number(i.product.price) || 0) * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
