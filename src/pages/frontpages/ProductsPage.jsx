import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-3 rounded shadow">
          <img src={p.image} alt={p.name} className="w-full h-40 object-contain" />
          <h3 className="font-semibold">{p.name}</h3>
          <p>{p.category_name}</p>
          <p className="text-blue-600">Rp {p.price.toLocaleString("id-ID")}</p>
        </div>
      ))}
    </div>
  );
}
