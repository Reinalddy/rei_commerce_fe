import { Sidebar } from "@components/Sidebar.tsx";
import { useState, useEffect } from "react";
import { AddProductModal } from "@components/AddProductModal";
import { adminProductApi} from "@api/adminProductApi.ts";
import toast from "react-hot-toast";
import { img } from "@utils/img.ts";

type category = {
    id: number;
    name: string;
}

type createdBy = {
    id: number;
    name: string;
}

type updatedBy = {
    id: number;
    name: string;
}

type Product = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    created_by: number;
    updated_by: number;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    category: category;
    createdBy: createdBy;
    updatedBy: updatedBy;
};

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function ProductList() {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const handleCreate = async (formData: FormData) => {
        const resFromCreateProduct = await adminProductApi.createProduct(formData);
        if(resFromCreateProduct.data.code === 200){
            toast.success(resFromCreateProduct.data.message);
        }
        console.log(resFromCreateProduct);
    };

    // LOAD PRODUCTS
    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await adminProductApi.getAllProduct(page, limit, search);
            console.log(import.meta.env.VITE_IMAGE_ENDPOINT, 'env');
            setProducts(res.data.data);
            setPagination(res.data.pagination);
            
        } catch (error) {
            toast.error("Gagal memuat produk");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [page, search]);

    // const products = [
    //     {
    //         id: 1,
    //         name: "Matcha Latte",
    //         category: "Minuman",
    //         price: 25000,
    //         stock: 120,
    //         image:
    //             "https://images.unsplash.com/photo-1625203036517-2212c35c2a43?auto=format&fit=crop&w=600&q=80",
    //     },
    //     {
    //         id: 2,
    //         name: "Matcha Cheesecake",
    //         category: "Dessert",
    //         price: 32000,
    //         stock: 80,
    //         image:
    //             "https://images.unsplash.com/photo-1614691098552-5aa2369900d3?auto=format&fit=crop&w=600&q=80",
    //     },
    //     {
    //         id: 3,
    //         name: "Iced Matcha Milk",
    //         category: "Minuman",
    //         price: 28000,
    //         stock: 55,
    //         image:
    //             "https://images.unsplash.com/photo-1585238342027-772eae3b11a8?auto=format&fit=crop&w=600&q=80",
    //     },
    //     {
    //         id: 4,
    //         name: "Matcha Parfait",
    //         category: "Dessert",
    //         price: 35000,
    //         stock: 42,
    //         image:
    //             "https://images.unsplash.com/photo-1629786080563-5cfa1c92e2f1?auto=format&fit=crop&w=600&q=80",
    //     },
    // ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* SIDEBAR */}
            <Sidebar />
            <main className="flex-1 p-6">
            {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2E4E1E]">Manage Products</h2>
                    <button className="bg-[#2E4E1E] text-white px-4 py-2 rounded-lg hover:bg-green-800" onClick={() => setOpen(true)}>
                        + Add Product
                    </button>
                </header>

                {/* Product Table */}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        className="border rounded-lg px-3 py-2 mb-2 ml-2 mt-2"
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Nama Produk</th>
                                <th className="px-4 py-3 text-left">Deskripsi</th>
                                <th className="px-4 py-3 text-left">Kategori</th>
                                <th className="px-4 py-3 text-left">Created By</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-500">
                                        Memuat produk...
                                    </td>
                                </tr>
                            )}

                            {!loading && products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-500">
                                        Tidak ada produk.
                                    </td>
                                </tr>
                            )}

                            {!loading && products.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={
                                                (img(p.imageUrl)) ||
                                                "https://via.placeholder.com/80"
                                            }
                                            alt={p.name}
                                            className="w-16 h-16 rounded-md object-cover border"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{p.name}</td>
                                    <td className="px-4 py-3">{p.category?.name ?? "-"}</td>
                                    <td className="px-4 py-3">Rp {p.description}</td>
                                    <td className="px-4 py-3">{p.category.name}</td>
                                    <td className="px-4 py-3">{p.createdBy.name}</td>
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
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border rounded"
                    >
                        Prev
                    </button>

                    <span className="px-3 py-1">
                        {pagination?.page} / {pagination?.totalPages}
                    </span>

                    <button
                        disabled={page >= pagination?.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border rounded"
                    >
                        Next
                    </button>
                </div>


            </main>

            <AddProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
}