import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal load products:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>

      {products.length === 0 ? (
        <p>Loading produk...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
