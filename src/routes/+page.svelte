<script lang="ts">
  import { onMount } from 'svelte';
  import InfoSection from '$lib/components/InfoSection.svelte';
  import { t, initLocale } from '$lib/i18n/i18n';
  import LVCexamples from '$lib/components/LVCexamples.svelte';
  import Impact from '$lib/components/Impact.svelte';
  import Datastream from '$lib/components/Datastream.svelte';
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

  <!-- Goals Section -->
  <section id="goals" class="min-h-screen bg-surface-contrast-50 py-16">
    <div class="max-w-7xl mx-auto px-6 w-full">
      <h2 class="text-3xl font-bold text-primary-100 mb-8">Goals</h2>
      <p class="text-lg text-surface-50">
        Content for goals section will be added here.
      </p>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="min-h-screen bg-surface-100 py-16">
    <div class="max-w-7xl mx-auto px-6 w-full">
      <h2 class="text-3xl font-bold text-primary-900 mb-8">Contact</h2>
      <p class="text-lg text-surface-contrast-50">
        Content for contact section will be added here.
      </p>
    </div>
  </section>

  
</div>

