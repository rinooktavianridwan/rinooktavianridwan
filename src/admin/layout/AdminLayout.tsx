import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Button } from "../components/ui";

const navItems = [
  { to: "/admin/profile", label: "Profile" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/technologies", label: "Technologies" },
  { to: "/admin/contacts", label: "Contacts" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#143AA2] text-white flex items-center justify-between px-4 h-14">
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col gap-1 p-2 -ml-2 hover:bg-white/10 rounded-md transition-colors"
        >
          <div className="h-1 w-6 bg-current rounded-full"></div>
          <div className="h-1 w-6 bg-current rounded-full"></div>
          <div className="h-1 w-6 bg-current rounded-full"></div>
        </button>
        <p className="font-bold">Portofolio Admin</p>
        <span className="w-8" />
      </header>

      {/* Backdrop (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[45] bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-[#143AA2] text-white flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-lg font-bold leading-tight">Portofolio Admin</p>
            {user?.name && (
              <p className="text-xs text-white/70 mt-1 truncate">{user.name}</p>
            )}
          </div>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/70 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button variant="danger" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      <main className="md:ml-60 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}