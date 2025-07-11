
<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { onMount } from 'svelte';
    import BreathingText from '$lib/components/BreathingText.svelte';

    let scrollY = 0;

    onMount(() => {
        const updateScrollY = () => scrollY = window.scrollY;
        window.addEventListener('scroll', updateScrollY);
        return () => window.removeEventListener('scroll', updateScrollY);
    });
</script>

<svelte:window bind:scrollY />

<!-- Hero Section - Full Screen with Parallax -->
<section class="h-screen flex flex-col justify-between relative overflow-hidden bg-surface-contrast-50">
    <!-- Background Map -->
    <div 
        class="absolute inset-0 w-full h-full flex items-start pt-64 justify-center lg:justify-end lg:pr-16"
        style="transform: translateY({scrollY * 0.5}px);"
    >
        <img 
            src="/Map.svg" 
            alt="Background Map" 
            class="w-3/4 h-3/4 "
            
        />
    </div>
    <!-- Main Content Area -->
    <div class="relative z-10 flex-1 flex items-start pt-20 lg:pt-32">
        <div class="container mx-auto px-6 max-w-7xl w-full">
            <div class="grid grid-cols-12 gap-8 items-start">
                <!-- Title and Description - Left Side -->
                <div class="col-span-12 lg:col-span-7 xl:col-span-6">
                
                    <div class="max-w-2xl">
                        <h1 class="text-3xl md:text-4xl lg:text-4xl font-bold text-primary-100 leading-tight mb-8">
                            {$t("hero.landing-title")}
                        </h1>
                        <p class="pace-y-6 text-lg md:text-xl text-primary-100 leading-relaxed mb-16">
                            {$t("hero.landing-description")}
                        </p>

                        <!-- Buttons for larger screens -->
                        <div class="hidden sm:flex flex-col sm:flex-row gap-4 justify-start items-start lg:mt-16">
                            <button class="btn preset-filled-primary-500 lg:btn-lg">
                                Learn More About LVC
                            </button>
                            <a 
                                href="/" 
                                class="btn preset-tonal-primary lg:btn-lg"
                            >
                                Choosing Wisely Switzerland
                            </a>
                        </div>

                        
<!-- 
                        <BreathingText 
                        children={$t("hero.landing-title")}
                        fromFontVariationSettings='"wght" 500'
                        toFontVariationSettings='"wght" 900'
                        radius={150}
                        falloff="exponential"
                        className="text-3xl md:text-4xl lg:text-4xl font-bold text-primary-100 leading-tight mb-8"
                    /> -->
                        
                            <!-- <BreathingText 
                            children={$t("hero.landing-description")}
                            fromFontVariationSettings='"wght" 300'
                            toFontVariationSettings='"wght" 900'
                            radius={50}
                            falloff="exponential"
                            className="pace-y-6 text-lg md:text-xl text-primary-100 leading-relaxed"
                        />
                         -->
                    </div>
                    
                </div>

                
            </div>
        </div>
    </div>
    
    <!-- Bottom Buttons for small screens -->
    <div class="relative z-10 pb-32 sm:hidden p-6">
        <div class="container mx-auto px-6 max-w-7xl">
            <div class="flex flex-col gap-4 justify-center items-center">
                <button class="btn preset-filled-primary-500 w-full">
                    Learn More About LVC
                </button>
                <a 
                    href="/" 
                    class="btn preset-tonal-primary w-full"
                >
                    Choosing Wisely Switzerland
                </a>
            </div>
        </div>
    </div>
</section>
