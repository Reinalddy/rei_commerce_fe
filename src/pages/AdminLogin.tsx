import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Dummy validation
        if (email === "admin@matchabliss.com" && password === "123456") {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/admin");
        } else {
            setError("Email atau password salah");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF4E0] to-[#B8E1A9] dark:from-[#1e1e1e] dark:to-[#121212] transition-colors duration-500">
            <div className="bg-white dark:bg-[#2a2a2a] shadow-lg rounded-2xl p-10 w-full max-w-md text-center border border-[#d9e7d2] dark:border-[#333]">
                {/* 🍵 Logo */}
                <div className="mb-6">
                    <div className="flex justify-center items-center space-x-2 mb-2">
                        <span className="text-4xl">🍵</span>
                        <h1 className="text-2xl font-bold text-[#2E4E1E] dark:text-[#B8E1A9]">
                            Katcha
                        </h1>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Admin Dashboard Login
                    </p>
                </div>

                {/* ⚙️ Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@matchabliss.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-2 focus:ring-[#2E4E1E] outline-none transition"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-2 focus:ring-[#2E4E1E] outline-none transition"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#2E4E1E] hover:bg-[#3B5E2A] text-white py-2.5 rounded-lg font-semibold shadow transition"
                    >
                        Masuk
                    </button>
                </form>

                {/* 🔄 Info bawah */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                    © {new Date().getFullYear()} Katcha — Admin Panel
                </p>
            </div>
        </div>
    );
}
