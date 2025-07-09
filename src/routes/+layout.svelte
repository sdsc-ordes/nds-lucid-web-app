<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>


	<div class="min-h-screen min-w-screen flex flex-col">
		<header>
			<Header />
		</header>
		<main class="">
			{@render children()}
		</main>

		<footer>
			<Footer />
		</footer>
	</div>


<style>
</style>
