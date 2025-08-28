<script>
    import '../app.css'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
    injectAnalytics()

    let { children } = $props()
</script>

<div class="min-h-screen w-full flex flex-col">
    <header class="sticky top-0 z-50 flex-shrink-0">
        <Header />
    </header>
    <main class="flex-1 w-full overflow-x-hidden">
        {@render children()}
    </main>
    <footer class="flex-shrink-0">
        <Footer />
    </footer>
</div>

<style>
</style>
