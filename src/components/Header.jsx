import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-indigo-600">OnlineShop</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">Каталог</Link>
          <Link to="/cart" className="text-sm text-gray-600 hover:text-indigo-600">Корзина</Link>
          {user ? (
            <>
              <button onClick={() => navigate("/profile")} className="text-sm text-gray-700">
                {user.name || user.email || "Профиль"}
              </button>
              <button onClick={() => { logout(); navigate("/"); }} className="text-sm text-red-500">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Войти</Link>
              <Link to="/register" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:opacity-90">Регистрация</Link>
            </>
          )}
          <button onClick={() => navigate("/cart")} className="relative">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7"></path>
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {items.length}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => navigate("/cart")} className="relative">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7"></path>
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {items.length}
              </span>
            )}
          </button>

          <button onClick={() => setOpen(v => !v)} aria-label="menu">
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block">Каталог</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block">Корзина</Link>
            {user ? (
              <>
                <button onClick={() => { setOpen(false); navigate("/profile"); }} className="block text-left w-full">Профиль</button>
                <button onClick={() => { logout(); setOpen(false); navigate("/"); }} className="block text-left w-full text-red-500">Выйти</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block">Войти</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block">Регистрация</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
