import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AboutPage from "./pages/adminpages/AboutPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import { CartProvider } from "./pages/frontpages/context/CartContext";
import ProductsPage from "./pages/frontpages/ProductsPage";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Frontend */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />      // alias path = "/"
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
