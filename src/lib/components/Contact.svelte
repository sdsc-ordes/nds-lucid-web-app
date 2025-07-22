<script lang="ts">
// You can add props or logic here if needed in the future
import { onMount } from "svelte";

let observer: IntersectionObserver;
let animatedElements = new Set();

onMount(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                    entry.target.classList.add("is-visible");
                    animatedElements.add(entry.target);
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "0px 0px -200px 0px",
        },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
    });

    return () => {
        if (observer) observer.disconnect();
    };
});
</script>

<style>
    :global(.animate-on-scroll) {
        opacity: 0;
        transform: translateY(20px);
        transition: all 1s ease-in-out;
    }
    :global(.animate-on-scroll.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }
    :global(.header-slide-in) {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.8s ease-out;
    }
    :global(.header-slide-in.is-visible) {
        opacity: 1;
        transform: translateX(0);
    }
</style>

<section id="contact" class="mb-12 mt-12">
  <div class="max-w-7xl mx-auto w-full">
    <div class="relative z-10 p-6">
      <div
        class="bg-surface-contrast-50 dark:bg-primary-200 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto header-slide-in animate-on-scroll"
      >
        <h1 class="text-surface-50-950 text-xl sm:text-2xl font-bold text-right">
          Contact & Data Access
        </h1>
      </div>
      <div class="text-sm text-surface-contrast-50 dark:text-primary-100 space-y-4 px-4 py-8 text-right">
        <p>Add information here on how to access the data.</p>
        <button
          class="btn preset-filled-tertiary-500 mt-4"
          on:click={() => window.open('mailto:jean.regina@chuv.ch')}
        >
          Contact Us
        </button>
        <!-- You can add more contact details or a form here -->
      </div>
    </div>
  </div>
</section> 