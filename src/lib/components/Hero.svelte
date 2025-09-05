<script lang="ts">
    import { t } from '$lib/i18n/i18n'
    import { onMount } from 'svelte'

    let scrollY = 0

    onMount(() => {
        const handleScroll = () => {
            scrollY = window.scrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
</script>

<!-- Hero Section - Full Screen with Parallax -->
<section
    id="home"
    class="w-full flex flex-col justify-center items-center relative overflow-hidden overflow-x-hidden h-[800px]"
>
    <!-- Background Layer (with Svelte parallax effect) -->
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/hero/hero-background.webp'); transform: translateY({scrollY *
            0.5}px);"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-surface-contrast-50/75"></div>

    <!-- Main Content Area -->
    <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 class="text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
            {@html $t('hero.landing-title')}
        </h1>
        <p class="text-lg md:text-2xl text-white leading-relaxed mb-16 max-w-3xl mx-auto">
            {@html $t('hero.landing-description')}
        </p>
    </div>
</section>
