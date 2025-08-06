<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    import { handleNavClick } from "$lib/utils/scroll";
    initLocale();
</script>

<!-- Static Layout for Small/Medium Screens -->
<div class="w-full max-w-4xl mx-auto px-4 py-8 mt-32">
    <!-- Map image -->
    <div class="mb-16 text-center">
        <div class="relative mb-6 flex items-center justify-center">
            <!-- Light mode map -->
            <img
                src="/datastream-layers/Map-light.svg"
                alt="Datastream Map"
                class="w-full max-w-md mx-auto h-auto object-contain dark:hidden"
            />
            <!-- Dark mode map -->
            <img
                src="/datastream-layers/Map-dark.svg"
                alt="Datastream Map"
                class="w-full max-w-md mx-auto h-auto object-contain hidden dark:block"
            />
        </div>
    </div>

    <!-- Text sections stacked -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-6 sm:p-8">
        <!-- Layer 1 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer1-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer1-description")}
            </p>
        </div>
        <!-- Layer 2 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer2-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer2-description")}
            </p>
        </div>
        <!-- Layer 3 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer3-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer3-description")}
            </p>
        </div>
        <!-- Layer 4 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer4-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer4-description")}
            </p>
        </div>
        <!-- Layer 5 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer5-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer5-description")}
            </p>
        </div>
        <!-- Layer 6 Text -->
        <div class="animate-on-scroll mx-auto max-w-md">
            <h2 class="text-lg sm:text-2xl font-bold text-tertiary-500 mb-2 text-center">
                {$t("datastream.layer6-title")}
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-center">
                {$t("datastream.layer6-description")}
            </p>
        </div>

        <button class="btn preset-filled-tertiary-500 mx-auto animate-on-scroll" onclick={(e) => handleNavClick(e, "contact")}>
            {$t("datastream.layer6-button")}
        </button>
    </div>
</div>
