import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ user, logout, cart, toggleCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* 🛍️ Brand */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-yellow-400 text-4xl">🛍️</span>
          <span className="text-2xl font-extrabold tracking-wide hover:text-gray-300 transition">
            Vibe Commerce
          </span>
        </div>

        {/* 👋 Greeting + Logout (Desktop) */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-6">
          {user && (
            <span className="text-gray-300 text-base">
              Hi,{" "}
              <span className="font-semibold text-white text-lg">
                {user.name}
              </span>
            </span>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm font-semibold uppercase tracking-wide shadow-sm hover:shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 no-underline text-white px-5 py-2 rounded-md text-sm font-semibold uppercase tracking-wide shadow-sm hover:shadow-md transition"
            >
              Login
            </a>
          )}
        </div>

        {/* 🛒 Cart + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-md hover:bg-gray-800 transition"
          >
            <FaShoppingCart size={26} />
            {cart.items?.length > 0 && (
              <span className="absolute -top-1.5 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {cart.items.length}
              </span>
            )}
          </button>

          {/* ☰ Menu (Mobile) */}
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 py-4 px-5 space-y-5 animate-fadeIn">
          {user && (
            <p className="text-base text-gray-300">
              Hi,{" "}
              <span className="text-white font-semibold text-lg">
                {user.name}
              </span>
            </p>
          )}
          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md text-sm font-semibold uppercase tracking-wide transition"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full bg-blue-600 hover:bg-blue-700 no-underline text-center text-white py-2.5 rounded-md text-sm font-semibold uppercase tracking-wide transition"
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
