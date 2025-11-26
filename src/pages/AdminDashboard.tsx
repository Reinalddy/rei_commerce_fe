import { adminProductApi } from "@api/adminProductApi.ts";
import { Sidebar } from "@components/Sidebar";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [getTotalProductLoading, setGetTotalProductLoading] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);
    const [getTotalVariantLoading, setGetTotalVariantLoading] = useState(false);
    const [totalVariant, setTotalVariant] = useState(0);

    const geTotalProduk = async () => {
        try {
            setGetTotalProductLoading(true);
            const res = await adminProductApi.getTotalProduct();
            setTotalProduct(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setGetTotalProductLoading(false);
        }
    };

    const getTotalVariant = async () => {
        try {
            setGetTotalVariantLoading(true);
            const res = await adminProductApi.getTotalVariant();
            setTotalVariant(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setGetTotalVariantLoading(false);
        }
    };

    useEffect(() => {
        geTotalProduk();
        getTotalVariant();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
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
                        <p className="text-2xl font-bold text-[#2E4E1E]">Rp. 2.500.000</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#93C572]">
                        <h3 className="text-sm text-gray-500 mb-1">Total Produk</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">{getTotalProductLoading ? "Loading..." : totalProduct}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#B8E1A9]">
                        <h3 className="text-sm text-gray-500 mb-1">Total Varian Produk</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">{getTotalVariantLoading ? "Loading..." : totalVariant}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-5 border-t-4 border-[#A7D477]">
                        <h3 className="text-sm text-gray-500 mb-1">Transaksi Bulan Ini</h3>
                        <p className="text-2xl font-bold text-[#2E4E1E]">128</p>
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