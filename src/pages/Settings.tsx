import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";

export default function Settings() {
    const { isDark, toggle } = useDarkMode();
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("id");
    const [emailNotif, setEmailNotif] = useState(true);
    const [popupNotif, setPopupNotif] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#2E4E1E] flex items-center">
                    ⚙️ Settings
                </h2>
                <button className="bg-[#2E4E1E] text-white px-4 py-2 rounded-lg hover:bg-green-800">
                    Save Changes
                </button>
            </header>

            {/* Section: Profile */}
            <section className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                    🧑‍💼 Admin Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            defaultValue="Reinalddy Aldy"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue="admin@matchabliss.com"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <input
                            type="text"
                            disabled
                            value="Administrator"
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                            Ganti Password
                        </button>
                    </div>
                </div>
            </section>

            {/* Section: Store Info */}
            <section className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                    🏪 Store Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama Toko</label>
                        <input
                            type="text"
                            defaultValue="Matcha Bliss"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Alamat Toko
                        </label>
                        <input
                            type="text"
                            defaultValue="Jl. Sakura No. 88, Kyoto Street, Indonesia"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            rows={3}
                            defaultValue="Toko minuman premium berbasis matcha asli Jepang 🍵"
                            className="w-full border rounded-lg px-3 py-2"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Jam Operasional
                        </label>
                        <input
                            type="text"
                            defaultValue="08:00 - 21:00"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>
            </section>

            {/* Section: Preferences */}
            <section className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                    ⚙️ System Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tema</label>
                        <select
                            value={isDark ? "dark" : "light"}
                            onChange={toggle}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="light">🌤️ Light</option>
                            <option value="dark">🌙 Dark</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bahasa</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="id">🇮🇩 Indonesia</option>
                            <option value="en">🇬🇧 English</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Section: Notifications */}
            <section className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-[#2E4E1E] mb-4">
                    🔔 Notifications
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium">
                            Email Notification
                        </label>
                        <input
                            type="checkbox"
                            checked={emailNotif}
                            onChange={(e) => setEmailNotif(e.target.checked)}
                            className="w-5 h-5 accent-green-700"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium">
                            Popup Notification
                        </label>
                        <input
                            type="checkbox"
                            checked={popupNotif}
                            onChange={(e) => setPopupNotif(e.target.checked)}
                            className="w-5 h-5 accent-green-700"
                        />
                    </div>
                </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="bg-[#2E4E1E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800">
                    Simpan Pengaturan
                </button>
            </div>
        </div>
    );
}