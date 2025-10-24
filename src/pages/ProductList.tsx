import { Sidebar } from "@components/Sidebar.tsx";

export default function ProductList() {
    const products = [
        {
            id: 1,
            name: "Matcha Latte",
            category: "Minuman",
            price: 25000,
            stock: 120,
            image:
                "https://images.unsplash.com/photo-1625203036517-2212c35c2a43?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 2,
            name: "Matcha Cheesecake",
            category: "Dessert",
            price: 32000,
            stock: 80,
            image:
                "https://images.unsplash.com/photo-1614691098552-5aa2369900d3?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            name: "Iced Matcha Milk",
            category: "Minuman",
            price: 28000,
            stock: 55,
            image:
                "https://images.unsplash.com/photo-1585238342027-772eae3b11a8?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 4,
            name: "Matcha Parfait",
            category: "Dessert",
            price: 35000,
            stock: 42,
            image:
                "https://images.unsplash.com/photo-1629786080563-5cfa1c92e2f1?auto=format&fit=crop&w=600&q=80",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* SIDEBAR */}
            <Sidebar />
            <main className="flex-1 p-6">
            {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2E4E1E]">Manage Products</h2>
                    <button className="bg-[#2E4E1E] text-white px-4 py-2 rounded-lg hover:bg-green-800">
                        + Add Product
                    </button>
                </header>

                {/* Product Table */}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Nama Produk</th>
                                <th className="px-4 py-3 text-left">Kategori</th>
                                <th className="px-4 py-3 text-left">Harga</th>
                                <th className="px-4 py-3 text-left">Stok</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-16 h-16 rounded-md object-cover border"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{p.name}</td>
                                    <td className="px-4 py-3">{p.category}</td>
                                    <td className="px-4 py-3">Rp {p.price.toLocaleString("id-ID")}</td>
                                    <td className="px-4 py-3">{p.stock}</td>
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

                {/* Pagination Dummy */}
                <div className="flex justify-end mt-4 space-x-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
                    <button className="px-3 py-1 border rounded bg-[#2E4E1E] text-white hover:bg-green-800">
                        1
                    </button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
                </div>

            </main>
        </div>
    );
}