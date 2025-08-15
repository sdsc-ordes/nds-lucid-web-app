import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // Use Vercel adapter for proper deployment
        adapter: adapter({
            runtime: 'nodejs20.x',
            // Ensure static assets are handled correctly
            assets: true,
            // Configure static file serving
            pages: true,
            // Precompress static assets
            precompress: true,
            // Configure static directory
            public: true
        }),
        // Ensure paths are handled correctly
        paths: {
            base: "",
            assets: ""
        }
    },
};

export default config;
