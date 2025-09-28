import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil context (search & category) dari MainLayout
  const { search, category } = useOutletContext();

  useEffect(() => {
    fetch("/products.json") // otomatis nyari di public/
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load produk:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading produk...</p>;

  // 🔎 Filter produk berdasarkan kategori & pencarian
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "Semua" || p.category.toLowerCase() === category.toLowerCase();
    const matchSearch =
      search === "" || p.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <div key={p.id} className="border p-3 rounded shadow">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-contain"
            />
            <h3 className="font-semibold">{p.name}</h3>
            <p>{p.category_name}</p>
            <p className="text-blue-600">
              Rp {p.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          Tidak ada produk yang sesuai.
        </p>
      )}
    </div>
  );
}
