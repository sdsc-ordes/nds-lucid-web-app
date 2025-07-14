<script lang="ts">  
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, tick } from "svelte";
    initLocale();
    
    let observer: IntersectionObserver;
    let scrollY = 0;
    
    onMount(() => {
        tick().then(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                        } else {
                            entry.target.classList.remove("is-visible");
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
    
        // Track scroll for parallax
        const updateScrollY = () => scrollY = window.scrollY;
        window.addEventListener('scroll', updateScrollY);
        
        // Return cleanup function
        return () => {
            window.removeEventListener('scroll', updateScrollY);
            if (observer) observer.disconnect();
        };
    });
    </script>
    
    <svelte:window bind:scrollY />
    
    <div class="relative min-h-screen bg-surface-contrast-50">
        <div class="relative z-10 p-6">
            <!-- Header Bar -->
            <section id="impact" class="mb-12 mt-12">
                <div
                    class="bg-primary-100 p-4 sm:p-4 shadow-lg sm:w-2/3 max-w-3xl mr-auto"
                >
                    <h1 class="text-surface-contrast-50 text-xl sm:text-2xl font-bold">
                        {$t("impact.impact-title")}
                    </h1>
                </div>
            </section>
    
            <!-- Impact Sections -->
            <section class="max-w-6xl mx-auto relative">
                <!-- Background Map - static centered -->
                <div 
                    class="absolute inset-0 w-full h-full flex items-center justify-center opacity-50 pointer-events-none"
                >
                    <img 
                        src="/Map.svg" 
                        alt="Background Map" 
                        class="w-3/4 h-3/4 object-contain"
                    />
                </div>

                <!-- Section 1: Left aligned -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                    <div class="order-2 lg:order-1 text-center lg:text-left">
                        <h2 class="text-3xl s:text-xl font-semibold text-primary-100 mb-6 animate-on-scroll">
                            {$t("impact.unknown-title")}
                        </h2>
                        <p class="text-sm sm:text-base text-primary-100 leading-relaxed animate-on-scroll">
                            {$t("impact.unknown-description")}
                        </p>
                    </div>
                    <div class="order-1 lg:order-2"></div>
                </div>

                <!-- Section 2: Right aligned -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                    <div class="order-1 lg:order-1"></div>
                    <div class="order-2 lg:order-2 text-center lg:text-right">
                        <h2 class="text-3xl s:text-xl font-semibold text-primary-100 mb-6 animate-on-scroll">
                            {$t("impact.billion-title")}
                        </h2>
                        <p class="text-sm sm:text-base text-primary-100 leading-relaxed animate-on-scroll">
                            {$t("impact.billion-description")}
                        </p>
                    </div>
                </div>

                <!-- Section 3: Left aligned -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                    <div class="order-2 lg:order-1 text-center lg:text-left">
                        <h2 class="text-3xl s:text-xl font-semibold text-primary-100 mb-6 animate-on-scroll">
                            {$t("impact.healthcare-cost-title")}
                        </h2>   
                        <p class="text-sm sm:text-base text-primary-100 leading-relaxed animate-on-scroll">
                            {$t("impact.healthcare-cost-description")}
                        </p>
                    </div>
                    <div class="order-1 lg:order-2"></div>
                </div>
            </section>
        </div>
    </div>
    
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
    </style>