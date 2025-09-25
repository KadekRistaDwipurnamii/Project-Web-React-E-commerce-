import { useCart } from "./context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalHarga = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <p className="p-6">Keranjang kosong.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>

      <ul className="divide-y">
        {cart.map((item, i) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <div>
              {item.name} x {item.qty}
            </div>
            <div className="flex items-center gap-4">
              <span>
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold text-xl">
        Total: Rp {totalHarga.toLocaleString("id-ID")}
      </p>

      {/* tombol checkout menuju halaman Checkout */}
      <Link
        to="/checkout"
        className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Lanjut ke Checkout
      </Link>
    </div>
  );
}
