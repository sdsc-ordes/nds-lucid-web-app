<script lang="ts">
  import { onMount } from 'svelte';

  let scrollPosition = 0;
  let windowHeight = 0;
  
  // Thresholds for when each section should appear (in pixels from top)
  const thresholds = {
    section1: 300,
    section2: 800,
    section3: 1300
  };

  function handleScroll() {
    scrollPosition = window.scrollY;
  }

  onMount(() => {
    windowHeight = window.innerHeight;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window on:scroll={handleScroll} />

<div class="scroll-container">
  <!-- Hero Section -->
  <section class="hero-section min-h-screen flex flex-col items-center justify-center text-center">
    <h1 class="text-7xl font-bold tracking-wider mb-8">LUCID</h1>
    <button 
      class="btn bg-primary-500 hover:bg-primary-600 text-surface-50 px-8 py-3 rounded-lg text-lg transition-all duration-300"
      on:click={() => window.scrollTo({ top: thresholds.section1, behavior: 'smooth' })}
    >
      Explore
    </button>
  </section>

  <!-- Section 1 -->
  <section class="content-section min-h-screen flex items-center justify-center p-8">
    <div 
      class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-1000"
      style="opacity: {scrollPosition > thresholds.section1 - 100 ? Math.min(1, (scrollPosition - (thresholds.section1 - 100)) / 200) : 0}; 
             transform: translateY({scrollPosition > thresholds.section1 - 100 ? Math.max(0, 50 - (scrollPosition - (thresholds.section1 - 100)) / 4) : 50}px);"
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
        on:click={() => window.scrollTo({ top: thresholds.section2, behavior: 'smooth' })}
      >
        Continue
      </button>
    </div>
  </section>

  <!-- Section 2 -->
  <section class="content-section min-h-screen flex items-center justify-center p-8">
    <div 
      class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-1000"
      style="opacity: {scrollPosition > thresholds.section2 - 100 ? Math.min(1, (scrollPosition - (thresholds.section2 - 100)) / 200) : 0}; 
             transform: translateY({scrollPosition > thresholds.section2 - 100 ? Math.max(0, 50 - (scrollPosition - (thresholds.section2 - 100)) / 4) : 50}px);"
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
        on:click={() => window.scrollTo({ top: thresholds.section3, behavior: 'smooth' })}
      >
        Learn More
      </button>
    </div>
  </section>

  <!-- Section 3 -->
  <section class="content-section min-h-screen flex items-center justify-center p-8">
    <div 
      class="max-w-3xl bg-surface-800 p-8 rounded-lg shadow-lg transition-all duration-1000"
      style="opacity: {scrollPosition > thresholds.section3 - 100 ? Math.min(1, (scrollPosition - (thresholds.section3 - 100)) / 200) : 0}; 
             transform: translateY({scrollPosition > thresholds.section3 - 100 ? Math.max(0, 50 - (scrollPosition - (thresholds.section3 - 100)) / 4) : 50}px);"
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
