import type { Config } from "tailwindcss";

export default {
    darkMode: "class", // 👈 wajib untuk toggle via class
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
                scaleIn: { from: { transform: "scale(0.95)" }, to: { transform: "scale(1)" } }, 
            },
            animation: {
                fadeIn: "fadeIn 0.2s ease-out",
                scaleIn: "scaleIn 0.2s ease-out",
            }
        },
    },
    plugins: [],
} satisfies Config;
