// src/pages/admin/AboutPage.jsx
export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tentang Aplikasi</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <section>
          <h2 className="text-xl font-semibold">Profil</h2>
          <p>
            Aplikasi ini merupakan sistem manajemen pemesanan sederhana
            yang membantu admin untuk memantau pesanan, mengelola produk,
            dan melihat laporan penjualan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Developer</h2>
          <ul className="list-disc ml-6">
            <li>Nama: Rista Team</li>
            <li>Email: ristadwi@gmail.com</li>
            <li>Telp/WA: 0898-3456-5114</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Versi Aplikasi</h2>
          <p>Versi 1.0.0 (Beta)</p>
        </section>
      </div>
    </div>
  );
}
