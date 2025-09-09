import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createSvgSpritePlugin({
            symbolId: "[name]", // имя символа будет равно имени файла
            // Можно указать папку для спрайта:
            include: ["src/assets/icons/**/*.svg"],
        }),
    ],
});
