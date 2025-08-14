<script lang="ts">  
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, tick } from "svelte";
    initLocale();
    
    let observer: IntersectionObserver;
    let scrollY = 0;
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
    
    <section class="w-full flex flex-col justify-center items-center relative overflow-hidden">


    <div class="absolute inset-0 bg-tertiary-500/13 dark:bg-surface-50"></div>


        <div class="max-w-7xl mx-auto w-full">
            <div class="relative z-10 p-6">
                <!-- Header Bar -->
                <section id="impact" class="mb-12 mt-12">
                    <div
                        class="bg-surface-contrast-50 p-4 sm:p-4 shadow-lg header-slide-in animate-on-scroll"
                    >
                        <h1 class="text-surface-50 text-xl sm:text-2xl font-bold text-center">
                            {$t("impact.impact-title")}
                        </h1>
                    </div>
                </section>

                <!-- Impact Sections -->
                <section class="max-w-7xl mx-auto relative">
                    <!-- Mobile: Image above content -->
                    <div class="block lg:hidden w-full flex items-center justify-center mb-8">
                        <img 
                            src="/images/impact/Map.svg" 
                            alt="Background Map" 
                            class="w-3/4 h-3/4 object-contain"
                        />
                    </div>

                    <!-- Desktop: Background Map - static centered -->
                    <div 
                        class="hidden lg:flex absolute inset-0 w-full h-full items-center justify-center pointer-events-none"
                    >
                        <img 
                            src="/images/impact/Map.svg" 
                            alt="Background Map" 
                            class="w-3/4 h-3/4 object-contain"
                        />
                    </div>

                    <!-- Section 1: Left aligned -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                        <div class="order-2 lg:order-1 text-center lg:text-left animate-on-scroll">
                            <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                                <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-6 ">
                                    {$t("impact.unknown-title")}
                                </h2>
                                <p class="text-sm sm:text-base text-surface-contrast-50 leading-relaxed ">
                                    {$t("impact.unknown-description")}
                                </p>
                            </div>
                        </div>
                        <div class="order-1 lg:order-2"></div>
                    </div>

                    <!-- Section 2: Right aligned -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                        <div class="order-1 lg:order-1"></div>
                        <div class="order-2 lg:order-2 text-center lg:text-left animate-on-scroll">
                            <div class="max-w-md md:max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                                <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-6 ">
                                    {$t("impact.harm-title")}
                                </h2>
                                <p class="text-sm sm:text-base text-surface-contrast-50 leading-relaxed ">
                                    {$t("impact.harm-description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Left aligned -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 relative z-10">
                        <div class="order-2 lg:order-1 text-center lg:text-left animate-on-scroll">
                            <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                                <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-6 ">
                                    {$t("impact.healthcare-cost-title")}
                                </h2>   
                                <p class="text-sm sm:text-base text-surface-contrast-50 leading-relaxed ">
                                    {$t("impact.healthcare-cost-description")}
                                </p>
                            </div>
                        </div>
                        <div class="order-1 lg:order-2"></div>
                    </div>
                </section>
            </div>
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