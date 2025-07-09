<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { onMount } from 'svelte';

    let scrollY = 0;

    onMount(() => {
        const updateScrollY = () => scrollY = window.scrollY;
        window.addEventListener('scroll', updateScrollY);
        return () => window.removeEventListener('scroll', updateScrollY);
    });
</script>

<svelte:window bind:scrollY />

<!-- Hero Section - Full Screen with Parallax -->
<section class="min-h-screen flex flex-col justify-between relative overflow-hidden bg-surface-contrast-50">
    <!-- Parallax Background Map -->
    <div 
        class="absolute inset-0 w-full h-full flex items-start pt-64"
        style="transform: translateY({scrollY * 0.5}px);"
    >
        <img 
            src="/Map.svg" 
            alt="Background Map" 
            class="w-3/4 h-3/4 mx-auto"
        />
    </div>
    <!-- Main Content Area -->
    <div class="relative z-10 flex-1 flex items-start pt-10 lg:pt-20">
        <div class="container mx-auto px-6 max-w-7xl">
            <div class="grid grid-cols-12 gap-8 items-start">
                <!-- Title and Description - Left Side -->
                <div class="col-span-12 lg:col-span-7 xl:col-span-6">
                    <div class="max-w-2xl">
                        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-100 leading-tight mb-8">
                            {$t("hero.landing-title")}
                        </h1>
                        <div class="space-y-6 text-lg md:text-xl text-primary-100 leading-relaxed">
                            <p>
                                {$t("hero.landing-description")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bottom Buttons -->
    <div class="relative z-10 pb-32">
        <div class="container mx-auto px-6 max-w-7xl">
            <div class="flex flex-col sm:flex-row gap-4 justify-centre lg:justify-start items-start lg:items-start">
                <button class="btn preset-filled-primary-500 lg:btn-lg">
                    Learn More About LVC
                </button>
                <a 
                    href="/" 
                    class="btn preset-outlined-primary-500 lg:btn-lg text-primary-100"
                >
                    Choosing Wisely Switzerland
                </a>
            </div>
        </div>
    </div>
</section>
