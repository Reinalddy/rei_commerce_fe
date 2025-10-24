import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate("/admin/login");
    };

    const menuItems = [
        { name: "📊 Dashboard", path: "/admin/dashboard" },
        { name: "🛍️ Products", path: "/admin/products" },
        { name: "💸 Sales Summary", path: "/admin/sales" },
        { name: "📑 Transactions", path: "/admin/transactions" },
        { name: "⚙️ Settings", path: "/admin/settings" },
    ];

    return (
        <aside className="w-64 bg-[#2E4E1E] text-white flex flex-col min-h-screen">
            {/* Header */}
            <div className="p-6 border-b border-green-800">
                <h1 className="text-2xl font-bold">🍵 Katcha Admin</h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-green-700 text-white"
                                : "text-green-100 hover:bg-green-700/60"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-green-800">
                <button
                    onClick={handleLogout}
                    className="w-full bg-green-800 hover:bg-green-700 py-2 rounded-lg text-sm transition"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}