<script>
    import '../app.css'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
    injectAnalytics()

    let { children } = $props()
</script>

<div class="w-full">
    <header class="sticky top-0 z-50">
        <Header />
    </header>
    <main class="w-full">
        {@render children()}
    </main>
    <footer>
        <Footer />
    </footer>
</div>

<style>
</style>
