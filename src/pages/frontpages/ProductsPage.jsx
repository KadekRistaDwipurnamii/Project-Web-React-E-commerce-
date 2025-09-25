// src/pages/frontpages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ambil data produk dari public/products.json
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal fetch produk:", err));
  }, []);

  if (products.length === 0) {
    return <p className="p-6">Loading produk...</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow rounded p-4 hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-contain mb-3"
          />
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category_name}</p>
          <p className="text-blue-600 font-bold text-lg">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <Link
            to={`/products/${product.slug}`}
            className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Lihat Detail
          </Link>
        </div>
      ))}
    </div>
  );
}
