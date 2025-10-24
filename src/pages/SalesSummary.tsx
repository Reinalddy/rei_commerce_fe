import { useState } from "react";
import { Sidebar } from "@components/Sidebar.tsx";

export default function SalesSummary() {
    const [filter, setFilter] = useState("monthly");

    const salesSummary = {
        daily: {
            total: 950_000,
            orders: 25,
            average: 38_000,
        },
        weekly: {
            total: 5_800_000,
            orders: 120,
            average: 48_000,
        },
        monthly: {
            total: 22_450_000,
            orders: 520,
            average: 43_000,
        },
    };

    const summary = salesSummary[filter as keyof typeof salesSummary];

    const transactions = [
        {
            id: "#INV1023",
            date: "2025-10-10",
            customer: "Alya Rahma",
            total: 75000,
            status: "Completed",
        },
        {
            id: "#INV1022",
            date: "2025-10-09",
            customer: "Fadil Ananda",
            total: 52000,
            status: "Completed",
        },
        {
            id: "#INV1021",
            date: "2025-10-09",
            customer: "Sinta Dewi",
            total: 125000,
            status: "Pending",
        },
        {
            id: "#INV1019",
            date: "2025-10-08",
            customer: "Rian Aditya",
            total: 95000,
            status: "Completed",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* SIDEBAR */}
            <Sidebar />
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2E4E1E]">Sales Summary</h2>
                    <select
                        className="border px-3 py-2 rounded-lg text-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="daily">Harian</option>
                        <option value="weekly">Mingguan</option>
                        <option value="monthly">Bulanan</option>
                    </select>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#7FB77E]">
                        <h3 className="text-sm text-gray-500 mb-1">Total Penjualan</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">
                            Rp {summary.total.toLocaleString("id-ID")}
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#A7D477]">
                        <h3 className="text-sm text-gray-500 mb-1">Total Pesanan</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">
                            {summary.orders} Orders
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#B8E1A9]">
                        <h3 className="text-sm text-gray-500 mb-1">Rata-rata Transaksi</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">
                            Rp {summary.average.toLocaleString("id-ID")}
                        </p>
                    </div>
                </section>

                {/* Grafik Dummy */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                        Grafik Penjualan ({filter === "daily"
                            ? "Harian"
                            : filter === "weekly"
                                ? "Mingguan"
                                : "Bulanan"}
                        )
                    </h3>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="h-40 bg-gradient-to-r from-[#B8E1A9] to-[#93C572] rounded-md flex items-end justify-center">
                            <p className="text-gray-700 font-medium mb-2">📈 Grafik dummy</p>
                        </div>
                    </div>
                </section>

                {/* Transaction Table */}
                <section>
                    <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                        Riwayat Transaksi Terbaru
                    </h3>
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                                <tr>
                                    <th className="px-4 py-3 text-left">Tanggal</th>
                                    <th className="px-4 py-3 text-left">Invoice</th>
                                    <th className="px-4 py-3 text-left">Customer</th>
                                    <th className="px-4 py-3 text-left">Total</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{t.date}</td>
                                        <td className="px-4 py-3 font-medium">{t.id}</td>
                                        <td className="px-4 py-3">{t.customer}</td>
                                        <td className="px-4 py-3">
                                            Rp {t.total.toLocaleString("id-ID")}
                                        </td>
                                        <td
                                            className={`px-4 py-3 font-semibold ${t.status === "Completed"
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                                }`}
                                        >
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