// src/pages/frontpages/Checkout.jsx
import { useCart } from "./context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    nama: "",
    hp: "",
    alamat: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0); // simpan total harga terakhir

  const totalHarga = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nama || !form.hp || !form.alamat) {
      alert("Harap lengkapi data diri sebelum konfirmasi!");
      return;
    }

    // simpan dulu total harga sebelum cart dikosongkan
    setFinalTotal(totalHarga);

    // === SIMPAN PESANAN KE localStorage ===
    const newOrder = {
      id: Date.now(),
      customer: form.nama,
      hp: form.hp,
      alamat: form.alamat,
      items: cart,
      total: totalHarga,
      status: "Diproses",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || []; // simpan dengan local storage
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // tampilkan modal sukses
    setShowSuccess(true);

    // kosongkan keranjang setelah modal muncul
    clearCart();
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <p className="p-6">
        Keranjang kosong. Silakan pilih produk dulu sebelum checkout.
      </p>
    );
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Ringkasan Belanja */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Ringkasan Belanja</h2>
        <ul className="divide-y">
          {cart.map((item, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-xl">
          Total: Rp {totalHarga.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Form Data Diri */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Data Pemesan</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="hp"
            placeholder="Nomor HP"
            value={form.hp}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <textarea
            name="alamat"
            placeholder="Alamat Lengkap"
            value={form.alamat}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Konfirmasi Pesanan
          </button>
        </form>
      </div>

      {/* Modal Sukses */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-bold mb-4">Pesanan Berhasil!</h2>
            <p className="mb-2">Terima kasih, {form.nama}.</p>
            <p className="mb-2">Pesananmu sedang diproses 🚚</p>
            <p className="font-bold">
              Total: Rp {finalTotal.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
