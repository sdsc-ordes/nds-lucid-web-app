import { defineConfig } from "vite";
import svelte from "@vitejs/plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte() 
  ],
});