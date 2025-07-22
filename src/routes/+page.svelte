<script lang="ts">
  import { onMount } from 'svelte';
  import InfoSection from '$lib/components/InfoSection.svelte';
  import { t, initLocale } from '$lib/i18n/i18n';
  import LVCexamples from '$lib/components/LVCexamples.svelte';
  import Impact from '$lib/components/Impact.svelte';
  import Datastream from '$lib/components/Datastream.svelte';
  import Goals from '$lib/components/Goals.svelte';
  import Sources from '$lib/components/Sources.svelte';
  import Contact from '$lib/components/Contact.svelte';
  let scrollPosition = 0;
  let windowHeight = 0;
  let scrollIndex: number | undefined = undefined;
  
  function handleScroll() {
    scrollPosition = window.scrollY;
  }
  
  // Generic scroll function that works with any section ID
  function scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -50; // Offset for better positioning
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  onMount(() => {
    windowHeight = window.innerHeight;
    window.addEventListener('scroll', handleScroll);
    
    // Initialize locale from localStorage if available
    initLocale();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window onscroll={handleScroll} />

<div>

  <InfoSection/>
  <LVCexamples/>
  <Impact/>
  <Datastream/>
  <Goals/>
  <Contact/>
  
  <Sources/>
  
</div>

