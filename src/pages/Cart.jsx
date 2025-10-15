import React from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart, total } = useCart();

  const checkout = async () => {
    if (items.length === 0) {
      toast.info("Корзина пуста");
      return;
    }

    const orderPayload = {
      items: items.map(i => ({ productId: i.product.id || i.product._id || i.product.slug, qty: i.qty })),
      total
    };

    try {
      await api.post("/orders", orderPayload);
      clearCart();
      toast.success("Заказ успешно создан");
    } catch (err1) {
      try {
        await api.post("/api/orders", orderPayload);
        clearCart();
        toast.success("Заказ успешно создан");
      } catch (err2) {
        console.warn("Checkout failed (API maybe not started or /orders missing).", err2?.message || err2);
        clearCart();
        toast.error("Не удалось создать заказ через API — корзина очищена локально. Свяжитесь с бэкендом или добавьте эндпоинт /orders");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Корзина</h2>
      <div className="bg-white p-6 rounded shadow">
        {items.length === 0 ? (
          <div className="text-gray-500">Ваша корзина пуста.</div>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {items.map(i => (
                <li key={i.product.id || i.product.slug} className="flex items-center gap-4">
                  <img src={i.product.image} alt="" className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{i.product.name}</div>
                    <div className="text-sm text-gray-500">{i.product.price} ₽</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(i.product.id || i.product.slug, Math.max(1, i.qty - 1))} className="px-2 py-1 border rounded">−</button>
                      <div>{i.qty}</div>
                      <button onClick={() => updateQty(i.product.id || i.product.slug, i.qty + 1)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => removeFromCart(i.product.id || i.product.slug)} className="ml-4 text-red-500 text-sm">Удалить</button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{(i.product.price * i.qty).toFixed(2)} ₽</div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Итого: {total.toFixed(2)} ₽</div>
              <div className="flex gap-3">
                <button onClick={clearCart} className="px-4 py-2 border rounded">Очистить</button>
                <button onClick={checkout} className="px-4 py-2 bg-indigo-600 text-white rounded">Оформить</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
