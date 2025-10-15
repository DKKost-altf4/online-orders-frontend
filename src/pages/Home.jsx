import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(productsData);
        }
      })
      .catch(err => {
        console.warn("Cannot load products from API — using mock data.", err?.message || err);
        setProducts(productsData);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Каталог продуктов</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <ProductCard key={p.id || p.slug || p.name} product={p} onAdd={(prod) => addToCart(prod)} />
        ))}
      </div>
    </div>
  );
}
