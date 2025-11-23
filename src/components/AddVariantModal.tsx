import { useEffect, useState, type ChangeEvent } from "react";

type AddVariantModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (form: FormData) => void;
    productId: string;
};

export function AddVariantModal({ isOpen, onClose, onSubmit, productId }: AddVariantModalProps) {

    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        productId: productId,
        name: "",
        sku : "",
        price : "",
        stock : "",
    });
    
    useEffect(() => {
        setForm(prev => ({ ...prev, productId: productId }))
    }, [productId]);

    if (!isOpen) return null;

    // Handle input text
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle image upload + preview
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // Handle form submit
    const handleSubmit = async () => {
        setLoading(true);
        const fd = new FormData();
        fd.append("productId", form.productId);
        fd.append("name", form.name);
        fd.append("price", form.price);
        fd.append("stock", form.stock);
        fd.append("sku", form.sku);
        if (imageFile) fd.append("image", imageFile);

        await onSubmit(fd);

        setLoading(false);

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-xl shadow-xl p-6 relative animate-scaleIn">

                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-[#2E4E1E] dark:text-green-400 mb-4">
                    Tambah Variant 🍵
                </h2>

                <div className="space-y-4">

                    {/* Nama */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Variant"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 dark:bg-[#222] dark:border-gray-700"
                    />

                    {/* SKU */}
                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU"
                        value={form.sku}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 dark:bg-[#222] dark:border-gray-700"
                    />

                    {/* STOCK */}
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 dark:bg-[#222] dark:border-gray-700"
                    />

                    {/* PRICE */}
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 dark:bg-[#222] dark:border-gray-700"
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
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 bg-[#2E4E1E] text-white rounded-lg hover:bg-green-800 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Simpan Produk"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}