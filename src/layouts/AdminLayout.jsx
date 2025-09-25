import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isRootAdmin = location.pathname === "/admin"; 

  return (
    <div className="flex h-screen bg-white-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (for mobile) */}
        <div className="md:hidden bg-white shadow p-4 flex justify-between">
          <h1 className="font-bold">My Admin</h1>
          <button
            className="p-2 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ≡
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isRootAdmin ? (
            <div className="bg-blue p-8 rounded shadow text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to My Admin 👋</h1>
              <p className="text-gray-600">
                Gunakan menu di sidebar untuk mengelola <b>Dashboard</b>, 
                <b> Pesanan</b>, <b>Produk</b>, dan lainnya.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Versi 1.0.0 — {new Date().getFullYear()}
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-500 border-t mt-6">
          © {new Date().getFullYear()} My Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}
