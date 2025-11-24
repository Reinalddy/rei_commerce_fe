import { Sidebar } from "@components/Sidebar.tsx";
import { useState, useEffect } from "react";
import { AddProductModal } from "@components/AddProductModal";
import { adminProductApi} from "@api/adminProductApi.ts";
import toast from "react-hot-toast";
import { img } from "@utils/img.ts";
import { AddVariantModal } from "@components/AddVariantModal";
import { EditProductModal } from "@components/EditProductModal";
import Swal from "sweetalert2";

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
    const [openModalVariant, setOpenModalVariant] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [productDetails, setProductDetails] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        imageUrl: "",
        created_by: 0,
        updated_by: 0,
        createdAt: "",
        updatedAt: "",
        categoryId: 0,
        category: { id: 0, name: "" },
        createdBy: { id: 0, name: "" },
        updatedBy: { id: 0, name: "" },
    });
    const [categories, setCategories] = useState<category[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [productId, setProductId] = useState(90);
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
    };

    const handleCreateVariant = async (formData: FormData) => {
        console.log(formData, 'resFromCreateVariant');
        const resFromCreateVariant = await adminProductApi.createVariant(formData);
        if(resFromCreateVariant.data.code === 200){
            toast.success(resFromCreateVariant.data.message);
        } else {
            toast.error(resFromCreateVariant.data.message);
        }

    };

    const handleUpdateProducts = async (id: number, formData: FormData) => {
        const resFromUpdateProduct = await adminProductApi.updateProduct(id, formData);
        if(resFromUpdateProduct.data.code === 200){
            toast.success(resFromUpdateProduct.data.message);
        }
    };

    const handleEditVariantBtnOnclick = (id: number) => {
        setProductId(id);
        // SET TIME OUT FIRTS FOR PREVENT ID NOT UPDATE
        setTimeout(() => setOpenModalVariant(true), 0); 
    }

    const handleDeleteProduct = async (id: number) => {
        // SHOW CONFIRMATION
        const confirm = await Swal.fire({
            title: 'Apakah anda yakin ingin menghapus produk ini ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        });

        if(!confirm.isConfirmed) return;

        const resFromDeleteProduct = await adminProductApi.deleteProduct(id);
        if(resFromDeleteProduct.data.code === 200){
            toast.success(resFromDeleteProduct.data.message);
        }
    }

    const handleEditBtnOnclick = (id: number, product: Product) => {
        console.log(product);
        setProductId(id);
        setProductDetails(product);
        // SET TIME OUT FIRTS FOR PREVENT ID NOT UPDATE
        setTimeout(() => setOpenModalEdit(true), 0); 
    }

    // LOAD PRODUCTS
    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await adminProductApi.getAllProduct(page, limit, search);

            setProducts(res.data.data);
            setPagination(res.data.pagination);
            
        } catch (error) {
            toast.error("Gagal memuat produk");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadProductCategories = async () => {
        try {
            const res = await adminProductApi.getAllProductCategory();
            console.log(res.data.data, 'res');
            setCategories(res.data.data);
        } catch (error) {
            toast.error("Gagal memuat kategori produk");
            console.error(error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [page, search]);

    useEffect(() => {
        loadProductCategories();
    }, []);

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
                                    <td className="px-4 py-3">{p.id}</td>
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
                                    <td className="px-4 py-3">{p.description}</td>
                                    <td className="px-4 py-3">{p.category?.name ?? "-"}</td>
                                    <td className="px-4 py-3">{p.createdBy.name}</td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditVariantBtnOnclick(p.id)}>
                                            Tambah Variant
                                        </button>
                                        <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500" onClick={() => handleEditBtnOnclick(p.id, p)}>
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDeleteProduct(p.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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

            <AddVariantModal 
                isOpen={openModalVariant}
                onClose={() => setOpenModalVariant(false)}
                onSubmit={handleCreateVariant}
                productId={productId.toString()}
            />

            <EditProductModal 
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                onSubmit={handleUpdateProducts}
                product={productDetails}
                productCategories={categories}
            />
        </div>
    );
}