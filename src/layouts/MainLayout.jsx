import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";


export default function MainLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <Navbar />

      {/* Search & Filter */}
      <header className="bg-gray-100 p-4 flex flex-col md:flex-row gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Fashion">Fashion</option>
          <option value="Kecantikan">Kecantikan</option>
        </select>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6">
        {/* kirim state ke semua Outlet (Dashboard, dll) */}
        <Outlet context={{ category, search }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 E-Commerce Simple App | Version 1.0</p>
      </footer>
    </div>
  );
}
