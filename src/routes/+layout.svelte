<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>


	<div class="min-h-screen flex flex-col bg-surface-900 text-surface-50">
		<header>
			<Header />
		</header>
		<main class="flex-grow flex items-center justify-center">
			{@render children()}
		</main>

		<footer>
			<Footer />
		</footer>
	</div>


<style>
	:global(html) {
		background-color: var(--color-surface-900);
		color: var(--color-surface-50);
	}
</style>
