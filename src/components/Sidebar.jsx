import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "About", path: "/admin/about" },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold mb-6">My Admin</h2>
      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`px-3 py-2 rounded hover:bg-gray-200 ${
              location.pathname === item.path ? "bg-blue-600 text-white" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
