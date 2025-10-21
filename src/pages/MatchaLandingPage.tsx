export default function MatchaLandingPage() {
    const products = [
        {
            id: 1,
            name: "Matcha Latte",
            price: 25000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
        {
            id: 2,
            name: "Matcha Cheesecake",
            price: 32000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
        {
            id: 3,
            name: "Iced Matcha Milk",
            price: 28000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
        {
            id: 4,
            name: "Matcha Parfait",
            price: 35000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
        {
            id: 5,
            name: "Matcha Choco Cake",
            price: 42000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
        {
            id: 6,
            name: "Matcha Tiramisu",
            price: 40000,
            imageUrl:
                "/public/images/matcha_1.jpg",
        },
    ];

    return (
        <div className="min-h-screen font-sans bg-[#F8F9F5] text-[#3E3E3E]">
            {/* 🌿 Hero Section */}
            <section className="bg-gradient-to-b from-[#B8E1A9] to-[#EAF4E0] text-center py-24 px-6">
                <h1 className="text-5xl font-extrabold text-[#2E4E1E] mb-4">
                    Katcha 🍵
                </h1>
                <p className="text-lg text-[#45643D] mb-8 max-w-xl mx-auto">
                    Nikmati kelezatan matcha asli Jepang — segar, lembut, dan menenangkan.
                </p>
                <a
                    href="#products"
                    className="inline-block bg-[#2E4E1E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3D5E2A] transition"
                >
                    Lihat Produk
                </a>
            </section>

            {/* 🌸 About Section */}
            <section className="py-16 px-8 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#2E4E1E] mb-4">Tentang Kami</h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Katcha berdiri dengan semangat menghadirkan kenikmatan matcha
                    berkualitas premium dari Jepang. Kami percaya bahwa setiap tegukan
                    matcha bukan hanya minuman — tapi pengalaman menenangkan jiwa.
                </p>
            </section>

            {/* 🛍️ Featured Products */}
            <section id="products" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-[#2E4E1E] mb-10">
                        Produk Unggulan
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="bg-[#F9FBF8] rounded-lg shadow hover:shadow-md transition overflow-hidden border border-[#E2E8D5]"
                            >
                                <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-[#2E4E1E] truncate">
                                        {p.name}
                                    </h3>
                                    <p className="text-[#558B43] font-bold mt-1">
                                        Rp {p.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 💚 Why Choose Us */}
            <section className="py-20 bg-[#F2F6EF]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#2E4E1E] mb-10">
                        Kenapa Pilih Katcha?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div>
                            <div className="text-5xl mb-4">🍃</div>
                            <h3 className="font-semibold text-lg text-[#2E4E1E] mb-2">
                                100% Natural
                            </h3>
                            <p className="text-gray-600">
                                Terbuat dari daun teh hijau organik pilihan tanpa bahan kimia.
                            </p>
                        </div>
                        <div>
                            <div className="text-5xl mb-4">☕</div>
                            <h3 className="font-semibold text-lg text-[#2E4E1E] mb-2">
                                Fresh & Premium
                            </h3>
                            <p className="text-gray-600">
                                Diproses langsung dari Jepang untuk menjaga aroma dan rasa asli.
                            </p>
                        </div>
                        <div>
                            <div className="text-5xl mb-4">💚</div>
                            <h3 className="font-semibold text-lg text-[#2E4E1E] mb-2">
                                Handmade dengan Cinta
                            </h3>
                            <p className="text-gray-600">
                                Semua minuman dan dessert dibuat langsung oleh barista kami.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 📞 Footer */}
            <footer className="bg-[#2E4E1E] text-white py-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Matcha Bliss</h3>
                <p className="text-sm opacity-80 mb-3">
                    Jalan Sakura No. 88, Kyoto Street, Indonesia
                </p>
                <div className="space-x-4">
                    <a href="#" className="hover:text-[#B8E1A9] transition">
                        Instagram
                    </a>
                    <a href="#" className="hover:text-[#B8E1A9] transition">
                        Tiktok
                    </a>
                    <a href="#" className="hover:text-[#B8E1A9] transition">
                        WhatsApp
                    </a>
                </div>
                <p className="text-xs opacity-60 mt-6">
                    © {new Date().getFullYear()} Katcha. All rights reserved.
                </p>
            </footer>
        </div>
    );
}