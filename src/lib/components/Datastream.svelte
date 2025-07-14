<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, onDestroy, tick } from "svelte";
    import DatastreamLayers from './DatastreamLayers.svelte';
    
    initLocale();

    let scrollY = 0;
    let datastreamContainer: HTMLElement;
    let currentStep = 0;
    let sectionHeight = 0;
    let isInStickyMode = false;

    // Story steps with text content
    const steps = [
        {
            title: "Raw Data Collection",
            description: "Patient data is collected from multiple sources across Swiss university hospitals in real-time.",
            layer: 1
        },
        {
            title: "Data Processing & Validation", 
            description: "Advanced algorithms clean, validate, and standardize the incoming data streams for consistency.",
            layer: 2
        },
        {
            title: "Security & Encryption",
            description: "Multiple layers of encryption and privacy controls protect patient information while enabling research.",
            layer: 3
        },
        {
            title: "Analytics & Insights",
            description: "Machine learning models identify patterns, anomalies, and opportunities for healthcare improvement.",
            layer: 4
        },
        {
            title: "Actionable Intelligence",
            description: "Processed insights are delivered to healthcare providers for immediate quality improvements.",
            layer: 5
        }
    ];

    onMount(async () => {
        await tick();
        
        const updateScroll = () => {
            scrollY = window.scrollY;
            
            if (datastreamContainer) {
                const containerRect = datastreamContainer.getBoundingClientRect();
                const containerTop = datastreamContainer.offsetTop;
                const containerHeight = datastreamContainer.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Check if we're in the sticky section
                isInStickyMode = scrollY >= containerTop && scrollY <= (containerTop + containerHeight - viewportHeight);
                
                if (isInStickyMode) {
                    // Calculate progress through the section (0 to 1)
                    const progress = (scrollY - containerTop) / (containerHeight - viewportHeight);
                    
                    // Determine current step based on progress
                    const stepProgress = progress * steps.length;
                    currentStep = Math.min(Math.floor(stepProgress), steps.length - 1);
                }
            }
        };
        
        window.addEventListener('scroll', updateScroll, { passive: true });
        updateScroll(); // Initial call
        
        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    });
</script>

<svelte:window bind:scrollY />

<div class="p-6">
    <!-- Header Section - Non-sticky, scrolls away -->
    <section id="datastream" class="mb-12 mt-12">
        <div
            class="bg-surface-contrast-50 dark:bg-primary-200 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto"
        >
            <h1 class="text-surface-50-950 text-xl sm:text-2xl font-bold">
                National Data Stream
            </h1>
        </div>
    </section>
</div>

<!-- Datastream Scrollytelling Section -->
<div 
    bind:this={datastreamContainer}
    class="relative"
    style="height: 800vh;" 
>
    <!-- Sticky Content Area -->
    <div class="sticky top-0 h-screen bg-surface-50">
        <!-- Use the reusable DatastreamLayers component -->
        <DatastreamLayers {currentStep} />
    </div>
</div>

<style>
    /* Ensure smooth transitions for layer appearances */
    .layer-transition {
        transition: opacity 1s ease-in-out;
    }
    
    /* Custom scrollbar styling for better UX */
    :global(html) {
        scroll-behavior: smooth;
    }
</style>
