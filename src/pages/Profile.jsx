import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    api.get("/user/address")
      .then(res => {
        if (Array.isArray(res.data)) setAddresses(res.data);
      })
      .catch(() => {
        setAddresses([
          { id: 1, label: "Дом", address: "ул. Главная, 1" },
          { id: 2, label: "Работа", address: "ул. Офисная, 5" }
        ]);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Личный кабинет</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="font-semibold">Данные пользователя</h3>
        <div className="mt-2 text-gray-700">
          <div><strong>Имя:</strong> {user?.name || "-"}</div>
          <div><strong>Email:</strong> {user?.email || "-"}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Адреса</h3>
        <ul className="space-y-3">
          {addresses.map(a => (
            <li key={a.id} className="p-3 border rounded flex justify-between">
              <div>
                <div className="font-semibold">{a.label}</div>
                <div className="text-sm text-gray-500">{a.address}</div>
              </div>
              <div className="text-right">
                <button className="text-sm text-indigo-600">Редактировать</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
