<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import DatastreamLayers from './DatastreamLayers.svelte';
    import DatastreamStatic from './DatastreamStatic.svelte';
    
    initLocale();

    let datastreamContainer: HTMLElement;
    let currentStep = 0;
    let hasAnimated = false;
    let animationTimeouts: number[] = [];
    let animationsComplete = false;
    let isLargeScreen = false;

    onMount(() => {
        let observer: IntersectionObserver;
        
        // Check if screen is large
        const checkScreenSize = () => {
            isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        // Only set up intersection observer for large screens
        if (isLargeScreen) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated) {
                            hasAnimated = true;
                            startTimeBasedAnimation();
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.3,
                    rootMargin: "0px 0px -20% 0px"
                }
            );

            if (datastreamContainer) {
                observer.observe(datastreamContainer);
            }
        }

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            if (observer) observer.disconnect();
            // Clear any pending timeouts
            animationTimeouts.forEach(timeout => clearTimeout(timeout));
        };
    });

    function startTimeBasedAnimation() {
        // Only run animations on large screens
        if (!isLargeScreen) return;
        
        // Layer 1: Immediate
        currentStep = 1;
        
        // Layer 2: After 2 seconds
        animationTimeouts.push(setTimeout(() => {
            currentStep = 2;
        }, 2000));
        
        // Layer 3: After 4 seconds
        animationTimeouts.push(setTimeout(() => {
            currentStep = 3;
        }, 4000));
        
        // Layer 4: After 6 seconds
        animationTimeouts.push(setTimeout(() => {
            currentStep = 4;
        }, 6000));
        
        // Layer 5: After 8 seconds
        animationTimeouts.push(setTimeout(() => {
            currentStep = 5;
        }, 8000));

         // Layer 6: After 10 seconds
         animationTimeouts.push(setTimeout(() => {
            currentStep = 6;
        }, 10000));
        
        // Mark animations as complete after all layers are shown
        animationTimeouts.push(setTimeout(() => {
            animationsComplete = true;
        }, 12000)); // 2 second buffer after last animation
    }
</script>

<!-- Datastream Section -->
<div 
    bind:this={datastreamContainer}
    class="relative max-w-7xl mx-auto w-full"
>
    <!-- Header Section -->
    <div class="absolute top-0 left-0 right-0 z-10 p-6 lg:relative lg:p-6">
        <section id="datastream" class="mt-12">
            <div
                class="bg-surface-contrast-50 dark:bg-primary-200 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto header-slide-in animate-on-scroll"
            >
                <h1 class="text-surface-50-950 text-xl sm:text-2xl font-bold">
                    {$t("datastream.datastream-title")}
                </h1>
            </div>
        </section>
    </div>

    <!-- Large Screen: Animated Layout -->
    <div class="hidden lg:block">
        <div class="bg-surface-50 dark:bg-surface-700 flex items-center justify-center relative max-w-7xl mx-auto w-full" style="height: calc(100vh - 120px);">
            <!-- Use the animated DatastreamLayers component -->
            <DatastreamLayers {currentStep} />
            
            <!-- Scroll blocking indicator -->
            {#if hasAnimated && !animationsComplete}
                <div class="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
                    <div class="bg-primary-100 bg-opacity-90 text-surface-contrast-50 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
                        <div class="w-2 h-2 bg-surface-contrast-50 rounded-full animate-pulse"></div>
                        <span>Animation in progress...</span>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <!-- Small/Medium Screen: Static Layout -->
    <div class="lg:hidden bg-surface-50 min-h-screen pt-32">
        <DatastreamStatic />
    </div>
</div>

<style>
    :global(.header-slide-in) {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s ease-out;
    }

    :global(.header-slide-in.is-visible) {
        opacity: 1;
        transform: translateX(0);
    }
</style>
