import React from "react";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b-4 border-white-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
            <img src="../book.svg" alt="Book Icon" className="w-6 h-6" />
          </div>

          <span className="font-semibold font-sans tracking-widest text-2xl text-white">
            MajStore
          </span>
        </div>

        <div className="hidden md:flex gap-6 text-white font-medium">
          <a href="/" className="hover:text-blue-500 transition-colors">
            Home
          </a>
          <a href="/product" className="hover:text-blue-500 transition-colors">
            Product
          </a>
          <a
            href="/ManageProduct"
            className="hover:text-blue-500 transition-colors"
          >
            Manage
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-base-100/80 backdrop-blur-lg border-t border-white/20">
          <a
            href="/"
            className="block px-6 py-3 text-white hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/product"
            className="block px-6 py-3 text-white hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Product
          </a>
          <a
            href="/ManageProduct"
            className="block px-6 py-3 text-white hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Manage
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
