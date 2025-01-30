import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // This allows external devices to access the app
    port: 5173, // Make sure this matches the port you're using
    open: true, // Automatically open in the browser when the server starts (optional)
  },
});
