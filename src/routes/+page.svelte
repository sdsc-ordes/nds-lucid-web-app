<script lang="ts">
    import { onMount } from 'svelte'
    import Hero from '$lib/components/Hero.svelte'
    import { t, initLocale } from '$lib/i18n/i18n'
    import LVCexamples from '$lib/components/LVCexamples.svelte'
    import Impact from '$lib/components/Impact.svelte'
    import Datastream from '$lib/components/Datastream.svelte'
    import Goals from '$lib/components/Goals.svelte'
    import Sources from '$lib/components/Sources.svelte'
    import Contact from '$lib/components/Contact.svelte'
    onMount(() => {
        // Initialize locale from localStorage if available
        initLocale()
    })
</script>

<Hero />
<LVCexamples />
<Impact />
<Datastream />
<Goals />
<Sources />
<Contact />
