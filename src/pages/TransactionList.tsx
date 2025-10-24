import { useState } from "react";
import { Sidebar } from "@components/Sidebar.tsx";

export default function TransactionList() {
    const [statusFilter, setStatusFilter] = useState("all");

    const transactions = [
        {
            id: "#ORD1031",
            date: "2025-10-11",
            customer: "Alya Rahma",
            total: 125000,
            payment: "QRIS",
            status: "Completed",
        },
        {
            id: "#ORD1030",
            date: "2025-10-10",
            customer: "Rian Aditya",
            total: 88000,
            payment: "Cash",
            status: "Pending",
        },
        {
            id: "#ORD1029",
            date: "2025-10-09",
            customer: "Dina Kartika",
            total: 142000,
            payment: "QRIS",
            status: "Cancelled",
        },
        {
            id: "#ORD1028",
            date: "2025-10-08",
            customer: "Andika Putra",
            total: 56000,
            payment: "Cash",
            status: "Completed",
        },
    ];

    const filteredTransactions =
        statusFilter === "all"
            ? transactions
            : transactions.filter((t) => t.status === statusFilter);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* SIDEBAR */}
            <Sidebar />
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2E4E1E]">Transactions</h2>

                    <select
                        className="border px-3 py-2 rounded-lg text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="Completed">Selesai</option>
                        <option value="Pending">Menunggu</option>
                        <option value="Cancelled">Dibatalkan</option>
                    </select>
                </header>

                {/* Transaction Table */}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                            <tr>
                                <th className="px-4 py-3 text-left">Tanggal</th>
                                <th className="px-4 py-3 text-left">Invoice</th>
                                <th className="px-4 py-3 text-left">Customer</th>
                                <th className="px-4 py-3 text-left">Metode Pembayaran</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t, i) => (
                                    <tr
                                        key={i}
                                        className="border-b hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="px-4 py-3">{t.date}</td>
                                        <td className="px-4 py-3 font-semibold">{t.id}</td>
                                        <td className="px-4 py-3">{t.customer}</td>
                                        <td className="px-4 py-3">{t.payment}</td>
                                        <td className="px-4 py-3">
                                            Rp {t.total.toLocaleString("id-ID")}
                                        </td>
                                        <td
                                            className={`px-4 py-3 font-semibold ${t.status === "Completed"
                                                    ? "text-green-600"
                                                    : t.status === "Pending"
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }`}
                                        >
                                            {t.status}
                                        </td>
                                        <td className="px-4 py-3 text-center space-x-2">
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                Detail
                                            </button>
                                            {t.status === "Pending" && (
                                                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                                    Selesaikan
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center text-gray-500 py-6 italic"
                                    >
                                        Tidak ada transaksi ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Dummy */}
                <div className="flex justify-end mt-4 space-x-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">
                        Prev
                    </button>
                    <button className="px-3 py-1 border rounded bg-[#2E4E1E] text-white hover:bg-green-800">
                        1
                    </button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">
                        2
                    </button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">
                        Next
                    </button>
                </div>

            </main>
        </div>
    );
}