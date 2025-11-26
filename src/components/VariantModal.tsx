import { img } from "@utils/img.ts";
import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
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

type Variant = {
    id: number;
    productId: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    imageUrl: string;
    created_by: createdBy;
    updated_by: updatedBy;
    createdAt: string;
    updatedAt: string;
};

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

type VariantModalProps = {
    isOpen: boolean;
    product: Product;
    onClose: () => void;
    fetchVariants: (productId: number) => Promise<Variant[]>; // new
    onAdd: (form: FormData) => Promise<void>;
    onUpdate: (id: number, form: FormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
};

export function VariantModal({
    isOpen,
    product,
    onClose,
    fetchVariants,
    onAdd,
    onUpdate,
    onDelete
}: VariantModalProps) {

    const [mode, setMode] = useState<"list" | "add" | "edit">("list");
    const [selected, setSelected] = useState<Variant | null>(null);
    const [form, setForm] = useState({ name: "", price: "", stock: "", sku: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [loadingVariants, setLoadingVariants] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoadingVariants(true);
            try {
                const data = await fetchVariants(product.id);
                setVariants(data);
                // setPreview(img(data.imageUrl));
            } catch {
                toast.error("Failed to load variants");
            }
            setLoadingVariants(false);
        };

        load();

    }, [isOpen, product]);

    if (!isOpen) return null;

    const openAdd = () => {
        setPreview(null);
        setForm({ name: "", price: "", stock: "" , sku: "", image: ""});
        setMode("add");
    };

    const openEdit = (variant: Variant) => {
        setSelected(variant);
        setForm({
            name: variant.name,
            price: variant.price.toString(),
            stock: variant.stock.toString(),
            sku: variant.sku,
            image: variant.imageUrl
        });

        setPreview(img(variant.imageUrl));
        setMode("edit");
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const fd = new FormData();
            fd.append("name", form.name);
            fd.append("price", form.price);
            fd.append("stock", form.stock);
            fd.append("sku", form.sku);
            fd.append("productId", product.id.toString());
            if (imageFile) fd.append("image", imageFile);
            console.log(form);
            if (mode === "add") {
                await onAdd(fd);
                toast.success("Variant added");
            } else if (mode === "edit" && selected) {
                await onUpdate(selected.id, fd);
                toast.success("Variant updated");
            }

            // reload list
            setLoadingVariants(true);
            setVariants(await fetchVariants(product.id));
            setLoadingVariants(false);

            setMode("list");
        } finally {
            setLoading(false);
        }
    };

    // Handle image upload + preview
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };
    

    const handleDelete = async (variantId: number) => {
        
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

        await onDelete(variantId);

        // reload list
        setLoadingVariants(true);
        setVariants(await fetchVariants(product.id));
        setLoadingVariants(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-10 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-[#2E4E1E] mb-4">
                    Variants for: {product.name}
                </h2>

                {/* LIST MODE */}
                {mode === "list" && (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={openAdd}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                            >
                                + Add Variant
                            </button>
                        </div>

                        <>
                            {loadingVariants ? (
                                <div className="text-center py-6">
                                    <div className="w-6 h-6 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p>Loading variants...</p>
                                </div>
                            ) : variants.length === 0 ? (
                                <p className="text-gray-600 text-center">No variants yet</p>
                            ) : (
                                <table className="w-full text-sm border">
                                    <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                                        <tr>
                                            <th className="p-2 text-left">Name</th>
                                            <th className="p-2 text-left">Image</th>
                                            <th className="p-2">Price</th>
                                            <th className="p-2">Stock</th>
                                            <th className="p-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {variants.map((v) => (
                                            <tr key={v.id} className="border-t">
                                                <td className="p-2">{v.name}</td>
                                                <td className="p-2">                                        <img
                                                    src={
                                                        (img(v.imageUrl)) ||
                                                        "https://via.placeholder.com/80"
                                                    }
                                                    alt={v.name}
                                                    className="w-16 h-16 rounded-md object-cover border"
                                                /></td>
                                                <td className="p-2 text-center">Rp {v.price.toLocaleString()}</td>
                                                <td className="p-2 text-center">{v.stock}</td>
                                                <td className="p-2 text-center space-x-2">
                                                    <button
                                                        onClick={() => openEdit(v)}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(v.id)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    </>
                )}

                {/* FORM MODE (Add / Edit) */}
                {(mode === "add" || mode === "edit") && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Variant Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />

                        <input
                            type="text"
                            name="sku"
                            placeholder="SKU"
                            value={form.sku}
                            onChange={(e) => setForm({ ...form, sku: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />

                        {/* Upload image */}
                        <div>
                            <label className="block mb-1 font-medium">Upload Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="w-full"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    className="mt-3 h-32 w-32 object-cover rounded-lg border"
                                />
                            )}

                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setMode("list")} className="border px-4 py-2 rounded">
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 disabled:opacity-50"
                            >
                                {loading ? "Saving..." : mode === "add" ? "Add Variant" : "Update Variant"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}