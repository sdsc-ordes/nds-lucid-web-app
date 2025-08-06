<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>


	<div class="min-h-screen w-full flex flex-col overflow-x-hidden">
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
