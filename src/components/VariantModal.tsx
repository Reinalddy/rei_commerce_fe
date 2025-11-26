import { useState } from "react";
import toast from "react-hot-toast";

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

type VariantModalProps = {
    isOpen: boolean;
    productName: string;
    productId: number;
    onClose: () => void;
    variants: Variant[];
    onAdd: (form: FormData) => Promise<void>;
    onUpdate: (id: number, form: FormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
};

export function VariantModal({
    isOpen,
    productName,
    productId,
    onClose,
    variants,
    onAdd,
    onUpdate,
    onDelete,
}: VariantModalProps) {

    const [mode, setMode] = useState<"list" | "add" | "edit">("list");
    const [selected, setSelected] = useState<Variant | null>(null);
    const [form, setForm] = useState({ name: "", price: "", stock: "" });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const openAdd = () => {
        setForm({ name: "", price: "", stock: "" });
        setMode("add");
    };

    const openEdit = (variant: Variant) => {
        setSelected(variant);
        setForm({
            name: variant.name,
            price: variant.price.toString(),
            stock: variant.stock.toString(),
        });
        setMode("edit");
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const fd = new FormData();
            fd.append("name", form.name);
            fd.append("price", form.price);
            fd.append("stock", form.stock);
            fd.append("productId", productId.toString());

            if (mode === "add") {
                await onAdd(fd);
                toast.success("Variant added");
            } else if (mode === "edit" && selected) {
                await onUpdate(selected.id, fd);
                toast.success("Variant updated");
            }

            setMode("list");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (variantId: number) => {
        if (!confirm("Delete this variant?")) return;

        await onDelete(variantId);
        toast.success("Variant deleted");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-[#2E4E1E] mb-4">
                    Variants for: {productName}
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

                        {variants.length === 0 ? (
                            <p className="text-gray-600 text-center">No variants yet</p>
                        ) : (
                            <table className="w-full text-sm border">
                                <thead className="bg-[#EAF4E0] text-[#2E4E1E]">
                                    <tr>
                                        <th className="p-2 text-left">Name</th>
                                        <th className="p-2">Price</th>
                                        <th className="p-2">Stock</th>
                                        <th className="p-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {variants.map((v) => (
                                        <tr key={v.id} className="border-t">
                                            <td className="p-2">{v.name}</td>
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