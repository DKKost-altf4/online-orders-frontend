import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        <img src={product.image || product.img || 'https://picsum.photos/400/300'} alt={product.name} className="max-h-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-2 flex-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">{Number(product.price || product.cost || 0).toFixed(2)}₽</div>
          <button onClick={() => onAdd(product)} className="bg-indigo-600 text-white px-3 py-1 rounded hover:opacity-90">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
