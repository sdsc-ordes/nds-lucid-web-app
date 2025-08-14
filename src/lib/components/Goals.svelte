<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { onMount, onDestroy, tick } from "svelte";
    import { BriefcaseMedical, MapPinned, User, Speech } from "lucide-svelte";

    initLocale();

    let observer: IntersectionObserver;
    let animatedElements = new Set();

    onMount(async () => {
        await tick(); // Wait for DOM
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        !animatedElements.has(entry.target)
                    ) {
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
    <section id="main-goals" class="mb-12 mt-12">
        <div
            class="bg-surface-contrast-50-950 p-4 sm:p-4 shadow-lg header-slide-in animate-on-scroll"
        >
            <h1
                class="text-surface-50-950 text-xl sm:text-2xl font-bold text-center"
            >
                {$t("main-goals.section-title")}
            </h1>
        </div>
    </section>

    <section>
        <div class="grid grid-cols-1 gap-8 items-center p-6 sm:p-8">
            <!-- Goal 1 -->
            <div class="animate-on-scroll bg-surface-200 p-6 shadow-lg rounded-lg">
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center">
                    <BriefcaseMedical class="w-20 h-20 text-primary-contrast-600 mb-4 sm:mb-0 mx-auto sm:mx-0" />
                    <div class="flex flex-col gap-2 w-full text-left">
                        <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center sm:text-left">{$t("main-goals.goal1-title")}</h2>
                        <p class="text-sm sm:text-base text-surface-950 dark:text-surface-950 leading-relaxed text-center sm:text-left">{$t("main-goals.goal1-description")}</p>
                    </div>
                </div>
            </div>

            <!-- Goal 2 -->
            <div class="animate-on-scroll bg-surface-200 p-6 shadow-lg rounded-lg">
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center">
                    <MapPinned class="w-20 h-20 text-primary-contrast-600 mb-4 sm:mb-0 mx-auto sm:mx-0" />
                    <div class="flex flex-col gap-2 w-full text-left">
                        <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center sm:text-left">{$t("main-goals.goal2-title")}</h2>
                        <p class="text-sm sm:text-base text-surface-950 dark:text-surface-950 leading-relaxed text-center sm:text-left">{$t("main-goals.goal2-description")}</p>
                    </div>
                </div>
            </div>

            <!-- Goal 3 -->
            <div class="animate-on-scroll bg-surface-200 p-6 shadow-lg rounded-lg">
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center">
                    <Speech class="w-20 h-20 text-primary-contrast-600 mb-4 sm:mb-0 mx-auto sm:mx-0" />
                    <div class="flex flex-col gap-2 w-full text-left">
                        <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center sm:text-left">{$t("main-goals.goal3-title")}</h2>
                        <p class="text-sm sm:text-base text-surface-950 dark:text-surface-950 leading-relaxed text-center sm:text-left">{$t("main-goals.goal3-description")}</p>
                    </div>
                </div>
            </div>

            <!-- Goal 4 -->
            <div class="animate-on-scroll bg-surface-200 p-6 shadow-lg rounded-lg">
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center">
                    <User class="w-15 h-15 sm:w-24 sm:h-24 text-primary-contrast-600 mb-4 sm:mb-0 mx-auto sm:mx-0" />
                    <div class="flex flex-col gap-2 w-full text-left">
                        <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center sm:text-left">{$t("main-goals.goal4-title")}</h2>
                        <p class="text-sm sm:text-base text-surface-950 dark:text-surface-950 leading-relaxed text-center sm:text-left">{$t("main-goals.goal4-description")}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
