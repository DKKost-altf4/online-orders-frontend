import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import productsData from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${slug}`)
      .then(res => setProduct(res.data))
      .catch(() => {
        const fallback = productsData.find(p => (p.slug === slug) || String(p.id) === slug || p.name === slug);
        setProduct(fallback || null);
      });
  }, [slug]);

  if (!product) return <div className="container mx-auto px-4 py-8">Товар не найден</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white p-6 rounded shadow flex gap-6">
        <img src={product.image || 'https://picsum.photos/400/300'} alt={product.name} className="w-96 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 text-2xl font-bold">{Number(product.price || 0).toFixed(2)} ₽</div>
          <div className="mt-6">
            <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white px-4 py-2 rounded">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
}
