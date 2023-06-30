import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig ({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "@react-vision-components/react-vision-tags",
   		 
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});