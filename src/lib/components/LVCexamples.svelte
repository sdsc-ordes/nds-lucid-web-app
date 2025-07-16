<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, onDestroy, tick } from "svelte";
    initLocale();

    let observer: IntersectionObserver;
    let animatedElements = new Set();

    onMount(async () => {
        await tick(); // Wait for DOM
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

<div class="p-6 max-w-7xl mx-auto w-full">
    <!-- Header Bar -->
    <section id="low-value-care" class="mb-12 mt-12">
        <div
            class="bg-surface-contrast-50 dark:bg-primary-200 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto header-slide-in animate-on-scroll"
        >
            <h1 class="text-surface-50-950 text-xl sm:text-2xl font-bold">
                {$t("lvc.lvc-title")}
            </h1>
        </div>
    </section>

    <!-- Grid -->
    <section>
        <!-- Row 1 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-1 text-center lg:text-left animate-on-scroll">
                <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                    <h2
                        class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 "
                    >
                        {$t("lvc.lab-test-title")}
                    </h2>
                    <p class="text-sm sm:text-base leading-relaxed ">
                        {$t("lvc.lab-test-description")}
                    </p>
                </div>
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
            <div class="order-2 lg:order-2 text-center lg:text-left animate-on-scroll">
                <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                    <h2
                        class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 "
                    >
                        {$t("lvc.sedatives-title")}
                    </h2>
                    <p class="text-sm sm:text-base leading-relaxed ">
                        {$t("lvc.sedatives-description")}
                    </p>
                </div>
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
            <div class="order-2 lg:order-1 text-center lg:text-left animate-on-scroll">
                <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                    <h2
                        class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 "
                    >
                        {$t("lvc.transfusions-title")}
                    </h2>
                    <p class="text-sm sm:text-base leading-relaxed ">
                        {$t("lvc.transfusions-description")}
                    </p>
                </div>
            </div>
            <div class="order-1 lg:order-2 flex justify-center">
                <img
                    src="/Transfusion.svg"
                    alt="Illustration of blood transfusion"
                    class=" w-full max-w-xs sm:max-w-sm animate-on-scroll"
                />
            </div>
        </div>

         <!-- Row 4 -->
         <div
         class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
     >
         <div class="order-2 lg:order-2 text-center lg:text-left animate-on-scroll">
             <div class="max-w-md md:max-w-sm mx-auto lg:mx-0">
                 <h2
                     class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 "
                 >
                     {$t("lvc.sleep-title")}
                 </h2>
                 <p class="text-sm sm:text-base leading-relaxed ">
                     {$t("lvc.sleep-description")}
                 </p>
             </div>
         </div>
         <div class="order-1 lg:order-1 flex justify-center">
             <!-- Placeholder for Image 2 -->
             <img
                 src="/Tests.svg"
                 alt="Illustration of sleep"
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

    :global(.header-slide-in) {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s ease-out;
    }

    :global(.header-slide-in.is-visible) {
        opacity: 1;
        transform: translateX(0);
    }
</style>
