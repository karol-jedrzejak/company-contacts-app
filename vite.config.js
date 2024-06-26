import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/scss/app.scss",
                "resources/js/app.js",
                "resources/js/Datatables/companies.js",
                "resources/js/Datatables/standard.js",
                "resources/js/companies-GPS.js",
            ],
            refresh: true,
        }),
    ],
});
