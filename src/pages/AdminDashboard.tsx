import { Sidebar } from "@components/Sidebar";

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* 🌿 SIDEBAR */}
            <Sidebar />
            {/* 🌸 MAIN CONTENT */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2E4E1E]">
                        Dashboard Overview
                    </h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border px-3 py-2 rounded-lg"
                        />
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Admin"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </header>

                {/* 📈 Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#7FB77E]">
                        <h3 className="text-sm text-gray-500 mb-1">Total Penjualan</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">Rp 12.540.000</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#93C572]">
                        <h3 className="text-sm text-gray-500 mb-1">Produk Terdaftar</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">42 Produk</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#A7D477]">
                        <h3 className="text-sm text-gray-500 mb-1">Transaksi Bulan Ini</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">128</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#B8E1A9]">
                        <h3 className="text-sm text-gray-500 mb-1">Pelanggan Baru</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">23</p>
                    </div>
                </section>

                {/* 🛍️ Product Management */}
                <section className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-[#2E4E1E]">
                            Manage Products
                        </h3>
                        <button className="bg-[#2E4E1E] text-white px-4 py-2 rounded-lg hover:bg-green-800">
                            + Add Product
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="min-w-full text-sm">
                            <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                                <tr>
                                    <th className="px-4 py-3 text-left">Nama Produk</th>
                                    <th className="px-4 py-3 text-left">Harga</th>
                                    <th className="px-4 py-3 text-left">Stok</th>
                                    <th className="px-4 py-3 text-left">Kategori</th>
                                    <th className="px-4 py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        name: "Matcha Latte",
                                        price: "Rp 25.000",
                                        stock: 120,
                                        category: "Minuman",
                                    },
                                    {
                                        name: "Matcha Cheesecake",
                                        price: "Rp 32.000",
                                        stock: 80,
                                        category: "Dessert",
                                    },
                                ].map((p, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="px-4 py-3">{p.name}</td>
                                        <td className="px-4 py-3">{p.price}</td>
                                        <td className="px-4 py-3">{p.stock}</td>
                                        <td className="px-4 py-3">{p.category}</td>
                                        <td className="px-4 py-3 text-center space-x-2">
                                            <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 💰 Sales Summary */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                        Sales Summary
                    </h3>
                    <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
                        📈 Grafik penjualan akan ditampilkan di sini (dummy)
                    </div>
                </section>

                {/* 🧾 Transaction Summary */}
                <section>
                    <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                        Transaction Summary
                    </h3>
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                                <tr>
                                    <th className="px-4 py-3 text-left">Tanggal</th>
                                    <th className="px-4 py-3 text-left">Order ID</th>
                                    <th className="px-4 py-3 text-left">Customer</th>
                                    <th className="px-4 py-3 text-left">Total</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        date: "2025-10-10",
                                        orderId: "#ORD1023",
                                        customer: "Alya Rahma",
                                        total: "Rp 75.000",
                                        status: "Completed",
                                        color: "text-green-600",
                                    },
                                    {
                                        date: "2025-10-09",
                                        orderId: "#ORD1022",
                                        customer: "Fadil Ananda",
                                        total: "Rp 52.000",
                                        status: "Pending",
                                        color: "text-yellow-600",
                                    },
                                ].map((t, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="px-4 py-3">{t.date}</td>
                                        <td className="px-4 py-3">{t.orderId}</td>
                                        <td className="px-4 py-3">{t.customer}</td>
                                        <td className="px-4 py-3">{t.total}</td>
                                        <td className={`px-4 py-3 font-semibold ${t.color}`}>
                                            {t.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}