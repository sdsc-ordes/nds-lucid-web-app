<script lang="ts">
    // You can add props or logic here if needed in the future
    import { onMount } from 'svelte'
    import { t } from '$lib/i18n/i18n'

    let observer: IntersectionObserver
    let animatedElements = new Set()

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                        entry.target.classList.add('is-visible')
                        animatedElements.add(entry.target)
                    }
                })
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -200px 0px',
            }
        )

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el)
        })

        return () => {
            if (observer) observer.disconnect()
        }
    })
</script>

<section
    id="contact"
    class="w-full flex flex-col justify-center items-center relative overflow-hidden animate-on-scroll"
>
    <!-- backgrouund for dark mode -->
    <div class="absolute inset-0 bg-surface-50"></div>
    <div class="absolute inset-0 bg-tertiary-500/13"></div>

    <div class="max-w-7xl mx-auto w-full">
        <div class="relative z-10 p-8">
            <h5 class="text-surface-950 text-lg sm:text-xl font-bold text-left">
                {$t('contact.contact-title')}
            </h5>

            <div class="text-base text-surface-contrast-50 text-left">
                <p>{$t('contact.contact-description')}</p>
                <button
                    class="btn bg-surface-contrast-50 text-surface-50 font-light rounded-lg mt-4"
                    onclick={() => window.open('mailto:jean.regina@chuv.ch')}
                >
                    {$t('contact.contact-button')}
                </button>
                <h5 class="text-surface-950 text-sm sm:text-md text-left mt-16">A project by</h5>
                <div class="flex flex-wrap justify-start gap-8 mt-8 items-center w-2/3">
                    <img
                        src="/partner-logos/lucid_logo.svg"
                        alt="Lucid Logo"
                        class="h-10 md:h-14 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/sdsc.svg"
                        alt="SDSC Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/PHRT.png"
                        alt="PHRT Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/sphn.png"
                        alt="SPHN Logo"
                        class="h-10 md:h-14 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/usz.png"
                        alt="USZ Logo"
                        class="h-4 md:h-8 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/chuv.png"
                        alt="CHUV Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/hug.png"
                        alt="HUG Logo"
                        class="h-6 md:h-10 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/inselspital.png"
                        alt="Inselspital Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/unispital-basel.png"
                        alt="Unispital Basel Logo"
                        class="h-6 md:h-10 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/unifr.png"
                        alt="UniFR Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                    <img
                        src="/partner-logos/biomedit.png"
                        alt="Biomedit Logo"
                        class="h-8 md:h-12 object-contain transition-all duration-300"
                    />
                </div>
            </div>
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
