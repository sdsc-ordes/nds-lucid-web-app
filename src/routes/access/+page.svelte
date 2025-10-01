<script lang="ts">
	import { onMount } from 'svelte';
	import JsonFormViewer from '$lib/components/JsonFormViewer.svelte';
	import NavigationItems from '$lib/components/NavigationItems.svelte';
	import { goto } from '$app/navigation';
	import { setLayoutSlots } from '$lib/utils/layout';
	import {
		loadConcepts,
		createSchema,
		createUiSchema,
		initialValue,
		sanitizeKey,
		type Concept
	} from './schema';
	import { SearchIcon } from 'lucide-svelte';
    import { t, initLocale } from '$lib/i18n/i18n'

	let concepts = $state<Concept[]>([]);
	let filteredConcepts = $state<Concept[]>([]);
	let schema = $state<any>(undefined);
	let uiSchema = $state<any>(undefined);
	let selectedConcepts = $state<string[]>([]);
	let searchQuery = $state<string>('');

	// Nav links for access page - redirect to home page sections
	let navLinks = $state([
		{ href: '/', label: 'Home', action: 'navigate' as const },
	]);

	const handleNavClickWithMenuClose = (event: Event, href: string) => {
		event.preventDefault();
		goto(href);
	};

	// Navigation snippets will be set up after they're defined

	onMount(async () => {
		// Initialize locale from localStorage if available
		initLocale()

		// Load concepts and create schema
		concepts = await loadConcepts();
		filteredConcepts = concepts;
		updateSchema();
	});

	// Set up navigation snippets after component is initialized
	setLayoutSlots({ 
		desktopnavigationitems,
		mobilenavigationitems
	})

	function updateSchema() {
		schema = createSchema(filteredConcepts);
		uiSchema = createUiSchema(filteredConcepts);
	}

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredConcepts = concepts;
		} else {
			const query = searchQuery.toLowerCase();
			filteredConcepts = concepts.filter((concept) =>
				concept.label.toLowerCase().includes(query) ||
				concept.definition.toLowerCase().includes(query)
			);
		}
		updateSchema();
	}

	function handleSubmit(data: any, e: any) {
		// Process the form data - all concepts are simple booleans
		const selectedKeys: string[] = [];
		const selectedIris: string[] = [];
		
		Object.entries(data).forEach(([key, value]) => {
			if (value === true) {
				selectedKeys.push(key);
				// Find the concept and get its IRI
				const concept = concepts.find((c) => sanitizeKey(c.label) === key);
				if (concept) {
					selectedIris.push(concept.iri);
				}
			}
		});
		
		selectedConcepts = selectedKeys;
		console.log('Selected concept IRIs:', selectedIris);
	}

    
</script>

{#snippet desktopnavigationitems()}
	<NavigationItems 
		navLinks={navLinks} 
		activeSection="" 
		onNavClick={handleNavClickWithMenuClose}
		isMobile={false}
	/>
{/snippet}

{#snippet mobilenavigationitems()}
	<NavigationItems 
		navLinks={navLinks} 
		activeSection="" 
		onNavClick={handleNavClickWithMenuClose}
		isMobile={true}
	/>
{/snippet}


<div class="container mx-auto p-8">
	<h1 class="text-3xl font-bold mb-4">Data Access Request</h1>
	<p class="text-lg mb-4">
		Select the SPHN ontology concepts you need access to for your research project.
	</p>

	<!-- Search Bar -->
	<div class="mb-6">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				oninput={handleSearch}
				placeholder="Search concepts by name or description..."
				class="w-1/2 px-4 py-3 pl-12 border-1 border-surface-300 dark:border-surface-600 rounded-lg focus:outline-none focus:border-primary-500 text-surface-900 dark:text-surface-100"
			/>
			<SearchIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
		</div>
		<p class="text-sm text-surface-500 mt-2">
			Showing {filteredConcepts.length} of {concepts.length} concepts
		</p>
	</div>

	{#if schema && uiSchema}
		<div class="tooltip-form-wrapper">
			{#key filteredConcepts.length}
				<JsonFormViewer {schema} {uiSchema} {initialValue} disabled={false} onSubmit={handleSubmit} />
			{/key}
		</div>

	{:else}
		<div class="flex items-center justify-center p-12">
			<p class="text-lg">Loading concepts...</p>
		</div>
	{/if}
</div>

