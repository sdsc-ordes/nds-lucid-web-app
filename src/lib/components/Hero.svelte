<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { handleNavClick } from "$lib/utils/scroll";
</script>

<!-- Hero Section - Full Screen with Parallax -->
<section
    id="home"
    class="h-screen flex flex-col justify-center items-center relative overflow-hidden overflow-x-hidden w-full"
>
    <!-- Background Image -->
    <img
        src="/images/hero-background.jpg"
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-surface-contrast-50/75"></div>


    <!-- Main Content Area - Centered -->
    <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div class="flex flex-col gap-8">
            <div>
                <h1
                    class="text-xl md:text-5xl lg:text-6xl text-white leading-tight mb-8"
                >
                    {@html $t("hero.landing-title")}
                </h1>
                <p
                    class="text-lg md:text-2xl text-white leading-relaxed mb-16 max-w-3xl mx-auto"
                >
                    {@html $t("hero.landing-description")}
                </p>
            </div>
        </div>
    </div>
</section>
