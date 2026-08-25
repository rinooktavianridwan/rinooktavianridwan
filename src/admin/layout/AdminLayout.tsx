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
    <div className="min-h-screen bg-gradient-to-br from-[#f3f8ff] via-[#eaf2ff] to-[#dbe9ff] text-slate-800">
      <div className="pointer-events-none fixed -top-20 -right-20 h-72 w-72 rounded-full bg-[#3E8DE3]/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#143AA2]/20 blur-3xl" />

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#143AA2]/95 backdrop-blur-md text-white flex items-center justify-between px-4 h-14 border-b border-white/10">
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
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#143AA2] to-[#102c7b] text-white flex flex-col z-50 transition-transform duration-300 md:translate-x-0 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-lg font-bold leading-tight tracking-tight">Portofolio Admin</p>
            <p className="text-xs text-white/60 mt-1">Dashboard Management</p>
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
                `block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white/20 text-white shadow"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
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
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex items-center justify-between mb-6 rounded-2xl border border-[#c7ddff] bg-white/75 backdrop-blur px-5 py-3 shadow-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#2E6FBF] font-semibold">
                Admin Panel
              </p>
              <p className="text-sm text-slate-600">Kelola konten website dengan tampilan serasi tema public</p>
            </div>
            {user?.name && (
              <div className="rounded-full bg-[#143AA2] text-white text-xs px-3 py-1.5 font-semibold">
                {user.name}
              </div>
            )}
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}