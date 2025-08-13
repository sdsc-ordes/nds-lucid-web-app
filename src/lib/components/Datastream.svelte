<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import { tick } from "svelte";

    let observer: IntersectionObserver;
    let animatedElements = new Set();

    onMount(() => {
        tick().then(() => {
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
                    threshold: 0.2,
                    rootMargin: "0px 0px -100px 0px",
                },
            );
    
            document.querySelectorAll(".animate-on-scroll").forEach((el) => {
                observer.observe(el);
            });
        });
    });


</script>

<!-- Datastream Section -->
<section id="datastream" class="relative w-full py-16">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
        <div class="bg-surface-contrast-50 dark:bg-primary-200 p-4 sm:p-4 shadow-lg header-slide-in animate-on-scroll">
            <h1 class="text-surface-50-950 text-xl sm:text-2xl font-bold text-center">
                {$t("datastream.datastream-title")}
            </h1>
        </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-6">
        
    </div>
</section>

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
