<script lang="ts">
    import { onMount } from 'svelte'
    import NavigationItems from '$lib/components/NavigationItems.svelte'
    import { goto } from '$app/navigation'
    import { setLayoutSlots } from '$lib/utils/layout'
    import { loadConcepts, sanitizeKey, type Concept } from './schema'
    import { SearchIcon, XIcon } from 'lucide-svelte'
    import { t, initLocale } from '$lib/i18n/i18n'

    let concepts = $state<Concept[]>([])
    let filteredConcepts = $state<Concept[]>([])
    let selectedConcepts = $state<string[]>([])
    let formData = $state<Record<string, boolean>>({})
    let searchQuery = $state<string>('')
    let selectedMap = $state<Record<string, boolean>>({})

    // Nav links for access page - redirect to home page sections
    let navLinks = $state([{ href: '/', label: 'Home', action: 'navigate' as const }])

    const handleNavClickWithMenuClose = (event: Event, href: string) => {
        event.preventDefault()
        goto(href)
    }

    // Navigation snippets will be set up after they're defined

    onMount(async () => {
        // Initialize locale from localStorage if available
        initLocale()

        // Load concepts and create schema
        concepts = await loadConcepts()
        filteredConcepts = sortConcepts(concepts)
        formData = buildInitial(filteredConcepts)
    })

    // Set up navigation snippets after component is initialized
    setLayoutSlots({
        desktopnavigationitems,
        mobilenavigationitems,
    })

    function buildInitial(conceptsList: Concept[]) {
        const next: Record<string, boolean> = {}
        conceptsList.forEach((concept) => {
            const key = sanitizeKey(concept.label)
            next[key] = formData[key] ?? false
        })
        return next
    }

    function sortConcepts(list: Concept[]) {
        return [...list].sort((a, b) => a.label.localeCompare(b.label))
    }

    function handleSearch() {
        if (searchQuery.trim() === '') {
            filteredConcepts = sortConcepts(concepts)
        } else {
            const query = searchQuery.toLowerCase()
            filteredConcepts = sortConcepts(
                concepts.filter(
                    (concept) =>
                        concept.label.toLowerCase().includes(query) ||
                        concept.definition.toLowerCase().includes(query)
                )
            )
        }
    }

    function handleSubmit(data: Record<string, boolean>, e: any) {
        const selectedKeys: string[] = []
        const selectedIris: string[] = []

        Object.entries(selectedMap).forEach(([key, value]) => {
            if (value === true) {
                selectedKeys.push(key)
                const concept = concepts.find((c) => sanitizeKey(c.label) === key)
                if (concept) {
                    selectedIris.push(concept.iri)
                }
            }
        })

        selectedConcepts = selectedKeys
        selectedMap = selectedKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
        console.log('Selected concept IRIs:', selectedIris)
    }

    function removeSelected(key: string) {
        if (!selectedMap[key]) return
        selectedMap = { ...selectedMap, [key]: false }
        formData = { ...formData, [key]: false }
        updateSelectedFromFormData()
    }

    function toggleConcept(key: string) {
        const next = !selectedMap[key]
        selectedMap = { ...selectedMap, [key]: next }
        formData = { ...formData, [key]: next }
        updateSelectedFromFormData()
    }

    function updateSelectedFromFormData() {
        const nextSelected = Object.entries({ ...formData, ...selectedMap })
            .filter(([, value]) => value === true)
            .map(([key]) => key)
        selectedConcepts = nextSelected
        selectedMap = nextSelected.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    }
</script>

{#snippet desktopnavigationitems()}
    <NavigationItems
        {navLinks}
        activeSection=""
        onNavClick={handleNavClickWithMenuClose}
        isMobile={false}
    />
{/snippet}

{#snippet mobilenavigationitems()}
    <NavigationItems
        {navLinks}
        activeSection=""
        onNavClick={handleNavClickWithMenuClose}
        isMobile={true}
    />
{/snippet}

<div class="container mx-auto p-8 min-h-full flex flex-col">
    <h1 class="text-3xl font-bold mb-4">Data Access Request</h1>
    <p class="text-lg mb-4">
        Select the SPHN ontology concepts you need access to for your research project.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div class="lg:col-span-2 space-y-2">
            <div class="relative">
                <input
                    type="text"
                    bind:value={searchQuery}
                    oninput={handleSearch}
                    placeholder="Search concepts by name or description..."
                    class="w-full px-4 py-3 pl-12 pr-12 border-1 border-surface-800 dark:border-surface-600 rounded-full focus:outline-none focus:border-primary-700 text-surface-900 dark:text-surface-100"
                />
                <SearchIcon
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-800 dark:text-surface-300"
                />
                {#if searchQuery.trim() !== ''}
                    <button
                        class="absolute right-5 top-1/2 -translate-y-1/2 text-surface-800 dark:text-surface-300 hover:text-surface-600 dark:hover:text-surface-200"
                        onclick={() => {
                            searchQuery = ''
                            handleSearch()
                        }}
                        aria-label="Clear search"
                    >
                        <XIcon class="w-7 h-7 text-surface-800 dark:text-surface-300" />
                    </button>
                {/if}
            </div>
            <p class="text-sm text-surface-800 dark:text-surface-300 mt-2">
                Showing {filteredConcepts.length} of {concepts.length} concepts
            </p>
        </div>

        <!-- Selected pills: mobile second, desktop right -->
        <div class="order-1 lg:order-2 lg:col-span-1">
            <div class="border border-surface-800 dark:border-surface-600 rounded-lg p-4 space-y-3">
                <h2 class="text-lg font-bold">Selected concepts</h2>
                {#if selectedConcepts.length === 0}
                    <p class="text-surface-800 dark:text-surface-300 text-sm">
                        No concepts selected
                    </p>
                {:else}
                    <div class="flex flex-wrap gap-2">
                        {#each selectedConcepts as key}
                            {#if selectedMap[key]}
                                <span
                                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-contrast-50 dark:bg-surface-100 text-surface-50 dark:text-surface-900 text-sm"
                                >
                                    {concepts.find((c) => sanitizeKey(c.label) === key)?.label ??
                                        key}
                                    <button
                                        class="text-primary-700 hover:text-primary-900"
                                        onclick={() => removeSelected(key)}
                                        aria-label="Remove selected concept"
                                    >
                                        <XIcon
                                            class="w-5 h-5 text-surface-50 dark:text-surface-900 hover:text-primary-200 hover:dark:text-primary-800"
                                        />
                                    </button>
                                </span>
                            {/if}
                        {/each}
                    </div>
                {/if}

                <div class="flex justify-end">
                    <button
                        class="w-full lg:w-auto px-4 py-2 bg-primary-600 text-surface-50 rounded-md hover:bg-primary-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        onclick={() => handleSubmit(formData, null)}
                        disabled={selectedConcepts.length === 0}
                    >
                        Request Access
                    </button>
                </div>
            </div>
        </div>

        <!-- Checkbox list: mobile third, desktop left -->
        <div class="order-2 lg:order-1 lg:col-span-2 space-y-4 flex flex-col">
            <div
                class="border border-surface-800 dark:border-surface-600 rounded-lg p-4 flex-1 min-h-[50vh] max-h-[calc(100vh-320px)] overflow-auto"
            >
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                    {#each filteredConcepts as concept}
                        {#if concept}
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!selectedMap[sanitizeKey(concept.label)]}
                                    onchange={() => toggleConcept(sanitizeKey(concept.label))}
                                    class="mt-1"
                                />
                                <div class="space-y-1">
                                    <div class="font-medium text-surface-900 dark:text-surface-50">
                                        {concept.label}
                                    </div>
                                    <div
                                        class="text-xs text-surface-900 dark:text-surface-50 leading-snug"
                                    >
                                        {concept.definition}
                                    </div>
                                </div>
                            </label>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
