import tailwindcss from "@tailwindcss/vite"; // Tailwind eklentisini içe aktarıyoruz
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(), // Tailwind'i buraya plugin olarak ekliyoruz
	],
});
