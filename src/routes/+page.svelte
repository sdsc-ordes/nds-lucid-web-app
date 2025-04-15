<script lang="ts">
  import { onMount } from 'svelte';
  import Scroll from '$lib/components/Scroll.svelte';

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window onscroll={handleScroll} />

<div class="scroll-container">
  <!-- Hero Section -->
  <section class="hero-section min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
    <!-- Logo with parallax effect -->
    <div 
      class="absolute inset-0 flex items-center justify-center opacity-10"
      style="transform: translateY({scrollPosition * 0.2}px);"
    >
      <img src="/logo.svg" alt="LUCID Logo" class="w-64 h-64" />
    </div>
    
    <h1 class="text-7xl font-bold tracking-wider mb-8 relative z-10">LUCID</h1>
    <button 
      class="btn bg-primary-500 hover:bg-primary-600 text-surface-50 px-8 py-3 rounded-lg text-lg transition-all duration-300 relative z-10"
      onclick={() => scrollToElement('section-1')}
    >
      Explore
    </button>
  </section>

  <Scroll bind:value={scrollIndex} top={200} bottom={200}>
    <!-- Section 1 -->
    <section id="section-1" class="content-section min-h-screen flex items-center justify-center p-8">
      <div 
        class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-700"
        style="
          opacity: {scrollIndex === 0 ? 1 : 0}; 
          transform: translateY({scrollIndex === 0 ? 0 : 50}px);
        "
      >
        <h2 class="text-4xl font-bold mb-6">Welcome to LUCID</h2>
        <p class="text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor.
        </p>
        <p class="text-lg mb-4">
          Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl 
          tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor 
          posuere. Praesent id metus massa, ut blandit odio.
        </p>
        <button 
          class="btn bg-primary-500 hover:bg-primary-600 text-surface-50 px-6 py-2 rounded-lg mt-4 transition-all duration-300"
          onclick={() => scrollToElement('section-2')}
        >
          Continue
        </button>
      </div>
    </section>

    <!-- Section 2 -->
    <section id="section-2" class="content-section min-h-screen flex items-center justify-center p-8">
      <div 
        class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-700"
        style="
          opacity: {scrollIndex === 1 ? 1 : 0}; 
          transform: translateY({scrollIndex === 1 ? 0 : 50}px);
        "
      >
        <h2 class="text-4xl font-bold mb-6">Our Mission</h2>
        <p class="text-lg mb-4">
          Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. 
          Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate 
          vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend.
        </p>
        <p class="text-lg mb-4">
          Ut nonummy. Fusce aliquet pede non pede. Suspendisse dapibus. Nam at justo 
          vitae lectus hendrerit hendrerit. Mauris massa. Vestibulum lacinia arcu eget nulla.
        </p>
        <button 
          class="btn bg-primary-500 hover:bg-primary-600 text-surface-50 px-6 py-2 rounded-lg mt-4 transition-all duration-300"
          onclick={() => scrollToElement('section-3')}
        >
          Learn More
        </button>
      </div>
    </section>

    <!-- Section 3 -->
    <section id="section-3" class="content-section min-h-screen flex items-center justify-center p-8">
      <div 
        class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-700"
        style="
          opacity: {scrollIndex === 2 ? 1 : 0}; 
          transform: translateY({scrollIndex === 2 ? 0 : 50}px);
        "
      >
        <h2 class="text-4xl font-bold mb-6">Join Us</h2>
        <p class="text-lg mb-4">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos 
          himenaeos. Praesent dapibus. Neque id cursus faucibus, tortor neque egestas augue, 
          eu vulputate magna eros eu erat.
        </p>
        <p class="text-lg mb-4">
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis 
          luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec 
          consectetuer ligula vulputate sem tristique cursus.
        </p>
        <a 
          href="/access" 
          class="btn bg-primary-500 hover:bg-primary-600 text-surface-50 px-6 py-2 rounded-lg mt-4 inline-block transition-all duration-300"
        >
          Request Access
        </a>
      </div>
    </section>
  </Scroll>
</div>

<style>
  .scroll-container {
    scroll-behavior: smooth;
  }

  .hero-section {
    background-color: var(--color-surface-900);
  }

  .content-section {
    background-color: var(--color-surface-900);
  }

  .btn {
    cursor: pointer;
    font-weight: 500;
  }
</style>
