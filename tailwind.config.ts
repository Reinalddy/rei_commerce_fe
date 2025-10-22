import type { Config } from "tailwindcss";

export default {
    darkMode: "class", // 👈 wajib untuk toggle via class
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config;
