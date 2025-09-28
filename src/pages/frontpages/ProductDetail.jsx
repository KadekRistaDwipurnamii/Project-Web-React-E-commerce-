import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Ambil data produk dari JSON
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.slug === slug);
        setProduct(found || null);
      })
      .catch((err) => console.error("Gagal fetch detail produk:", err));
  }, [slug]);

  if (!product) return <p className="p-6">Produk tidak ditemukan.</p>;

  const total = qty * product.price;

  const handleAddToCart = () => {
    if (qty > product.stock) {
      alert("Jumlah melebihi stok tersedia!");
      return;
    }
    addToCart(product, qty);
    alert("Produk ditambahkan ke keranjang!");
  };

  const handleBuyNow = () => {
    if (qty > product.stock) {
      alert("Jumlah melebihi stok tersedia!");
      return;
    }
    addToCart(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gambar Produk */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 object-contain rounded"
        />
      </div>

      {/* Detail Produk */}
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-500">{product.category_name}</p>
        <p className="text-yellow-600">⭐ {product.rating}</p>   {/* Tambahan Rating */}
        <p className="text-blue-600 font-bold text-xl">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        <p className="mt-3">{product.description}</p>

        {/* Input Jumlah */}
        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="qty">Jumlah:</label>
          <input
            id="qty"
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={(e) =>
              setQty(Math.min(Number(e.target.value), product.stock))
            }
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        {/* Total Harga */}
        <p className="mt-3 text-lg font-semibold">
          Total: Rp {total.toLocaleString("id-ID")}
        </p>

        {/* Tombol Aksi */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambah ke Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
