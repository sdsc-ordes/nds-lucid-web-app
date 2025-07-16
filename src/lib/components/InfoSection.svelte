<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import BreathingText from "$lib/components/BreathingText.svelte";

    let scrollY = 0;

    onMount(() => {
        const updateScrollY = () => (scrollY = window.scrollY);
        window.addEventListener("scroll", updateScrollY);
        return () => window.removeEventListener("scroll", updateScrollY);
    });
</script>

<svelte:window bind:scrollY />

<!-- Hero Section - Full Screen with Parallax -->
<section
    id="home"
    class="h-screen flex flex-col justify-between relative overflow-hidden bg-surface-contrast-50"
>
    <div class="max-w-7xl mx-auto w-full">
        <!-- Background Map -->
        <div
            class="absolute inset-0 w-full h-full flex items-start pt-64 justify-center lg:justify-end lg:pr-16"
            style="transform: translateY({scrollY * 0.5}px);"
        >
            <img src="/Map.svg" alt="Background Map" class="w-3/4 h-3/4" />
        </div>
        <!-- Main Content Area -->
        <div class="relative z-10 flex-1 flex items-start pt-20 lg:pt-32">
            <div class="container mx-auto px-6 max-w-7xl w-full">
                <div class="grid grid-cols-12 gap-8 items-start">
                    <!-- Title and Description - Left Side -->
                    <div class="col-span-12 lg:col-span-7 xl:col-span-6">
                        <div class="max-w-2xl flex flex-col gap-8">
                            <div>
                                <h1
                                    class="text-3xl md:text-4xl lg:text-4xl font-bold text-primary-100 leading-tight mb-8"
                                >
                                    {$t("hero.landing-title")}
                                </h1>
                                <p
                                    class="pace-y-6 text-lg md:text-xl text-primary-100 leading-relaxed mb-16"
                                >
                                    {$t("hero.landing-description")}
                                </p>
                            </div>

                            <!-- Buttons for larger screens -->
                            <div
                                class="hidden sm:flex flex-col sm:flex-row gap-4 justify-start items-start"
                            >
                                <button
                                    class="btn preset-filled-primary-500 lg:btn-lg"
                                >
                                    {$t("hero.call-to-action-patients")}
                                </button>

                                <button
                                    class="btn preset-tonal-primary lg:btn-lg"
                                >
                                    {$t(
                                        "hero.call-to-action-healthcare-providers",
                                    )}
                                </button>
                                <button
                                    class="btn preset-filled-tertiary-500 lg:btn-lg"
                                >
                                    {$t("hero.call-to-action-researchers")}
                                </button>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Buttons for small screens -->
        <div class="absolute bottom-30 w-full z-10 pb-8 sm:hidden p-6">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="flex flex-col gap-4 justify-center items-center">
                    <button class="btn preset-filled-primary-500 w-full">
                        {$t("hero.call-to-action-patients")}
                    </button>
                    <button class="btn preset-tonal-primary w-full">
                        {$t("hero.call-to-action-healthcare-providers")}
                    </button>
                    <button class="btn preset-filled-tertiary-500 w-full">
                        {$t("hero.call-to-action-researchers")}
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
