<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";

    initLocale();
    
    // Use SVG versions of the images
    const layer1 = new URL('/datastream-layers/datastream-layer-1.svg', import.meta.url).href;
    const layer2 = new URL('/datastream-layers/datastream-layer-2.svg', import.meta.url).href;
    const layer3 = new URL('/datastream-layers/datastream-layer-3.svg', import.meta.url).href;
    const layer4 = new URL('/datastream-layers/datastream-layer-4.svg', import.meta.url).href;
    const layer5 = new URL('/datastream-layers/datastream-layer-5.svg', import.meta.url).href;
</script>

<!-- Static Layout for Small/Medium Screens -->
<div class="w-full max-w-4xl mx-auto px-4 py-8">
    <!-- All layers overlaid -->
    <div class="mb-16 text-center">
        <div class="relative mb-6 flex items-center justify-center">
            <!-- Layer 1 - Base -->
            <img
                src={layer1}
                alt="Datastream Layer 1"
                class="w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 2 - Overlaid -->
            <img
                src={layer2}
                alt="Datastream Layer 2"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 3 - Overlaid -->
            <img
                src={layer3}
                alt="Datastream Layer 3"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 4 - Overlaid -->
            <img
                src={layer4}
                alt="Datastream Layer 4"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 5 - Overlaid -->
            <img
                src={layer5}
                alt="Datastream Layer 5"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
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

        <button class="btn preset-filled-tertiary-500 mx-auto animate-on-scroll">
            {$t("datastream.layer6-button")}
        </button>
    </div>
</div>
