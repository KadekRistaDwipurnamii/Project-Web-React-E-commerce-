import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  // Ambil context dari MainLayout (search & category)
  const { search, category } = useOutletContext();

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal load products:", err));
  }, []);

  // 🔎 Filter produk sesuai kategori & pencarian
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "Semua" || p.category.toLowerCase() === category.toLowerCase();
    const matchSearch =
      search === "" || p.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>

      {products.length === 0 ? (
        <p>Loading produk...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">Tidak ada produk yang sesuai.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-contain"
              />
              <Link
                to={`/product/${p.slug}`}
                className="block font-bold text-blue-600 hover:underline mt-2"
              >
                {p.name}
              </Link>
              <p className="text-gray-500">{p.category_name}</p>
              <p className="text-blue-600 font-bold">
                Rp {p.price.toLocaleString("id-ID")}
              </p>

              {/* Tambahan Rating dan Stok */}
              <p className="text-sm text-yellow-600">⭐ {p.rating}</p>
              <p className="text-sm text-gray-600">Stok: {p.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
