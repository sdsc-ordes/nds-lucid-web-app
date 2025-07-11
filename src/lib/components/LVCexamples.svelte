<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, onDestroy, tick } from "svelte";
    initLocale();

    let observer: IntersectionObserver;

    onMount(async () => {
        await tick(); // Wait for DOM
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
                threshold: 0.3,
                rootMargin: "0px 0px -200px 0px",
            },
        );

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el);
        });
    });

    onDestroy(() => {
        if (observer) observer.disconnect();
    });
</script>

<div class="p-6">
    <!-- Header Bar -->
    <section class="mb-12">
        <div
            class="bg-surface-contrast-50 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto"
        >
            <h1 class="text-surface-50 text-xl sm:text-2xl font-bold">
                {$t("lvc.lvc-title")}
            </h1>
        </div>
    </section>

    <!-- Grid -->
    <section class="max-w-6xl mx-auto">
        <!-- Row 1 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-1 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2 animate-on-scroll"
                >
                    {$t("lvc.lab-test-title")}
                </h2>
                <p class="text-sm sm:text-base leading-relaxed animate-on-scroll">
                    {$t("lvc.lab-test-description")}
                </p>
            </div>
            <div class="order-1 lg:order-2 flex justify-center">
                <img
                    src="/Tests.svg"
                    alt="Illustration of lab tests"
                    class=" w-full max-w-xs sm:max-w-sm animate-on-scroll"
                />
            </div>
        </div>

        <!-- Row 2 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-2 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2 animate-on-scroll"
                >
                    {$t("lvc.sedatives-title")}
                </h2>
                <p class="text-sm sm:text-base leading-relaxed animate-on-scroll">
                    {$t("lvc.sedatives-description")}
                </p>
            </div>
            <div class="order-1 lg:order-1 flex justify-center">
                <!-- Placeholder for Image 2 -->
                <img
                    src="/Pills.svg"
                    alt="Illustration of medication"
                    class=" w-full max-w-xs sm:max-w-sm animate-on-scroll"
                />
            </div>
        </div>
        <!-- Row 3 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-1 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2 animate-on-scroll"
                >
                    {$t("lvc.transfusions-title")}
                </h2>
                <p class="text-sm sm:text-base leading-relaxed animate-on-scroll">
                    {$t("lvc.transfusions-description")}
                </p>
            </div>
            <div class="order-1 lg:order-2 flex justify-center">
                <img
                    src="/Transfusion.svg"
                    alt="Illustration of blood transfusion"
                    class=" w-full max-w-xs sm:max-w-sm animate-on-scroll"
                />
            </div>
        </div>
    </section>
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
