// src/pages/adminpages/AdminDashboard.jsx
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || []; //mengambil data dari local storage di checkout
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Pesanan</h1>

      {orders.length === 0 ? (
        <p>Tidak ada pesanan masuk.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">No HP</th>
              <th className="border px-4 py-2">Alamat</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer}</td>
                <td className="border px-4 py-2">{order.hp}</td>
                <td className="border px-4 py-2">{order.alamat}</td>
                <td className="border px-4 py-2">
                  Rp {order.total.toLocaleString("id-ID")}
                </td>
                <td className="border px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
