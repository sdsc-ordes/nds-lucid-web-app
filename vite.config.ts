import adapter from '@sveltejs/adapter-vercel'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            // Consult https://svelte.dev/docs/kit/integrations
            // for more information about preprocessors
            preprocess: vitePreprocess(),
            adapter: adapter({
                runtime: 'nodejs22.x',
            }),
        }),
    ],
})
