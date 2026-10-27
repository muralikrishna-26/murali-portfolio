import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercel auto-detects Vite: build command "npm run build", output "dist".
export default defineConfig({
  plugins: [react()],
});
