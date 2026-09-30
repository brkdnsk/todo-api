import tailwindcss from "@tailwindcss/vite"; // 1. Tailwind eklentisini içeri aktarıyoruz
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(), // 2. Eklentiyi buraya ekliyoruz
	],
});
