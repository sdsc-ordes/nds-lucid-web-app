<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";

    initLocale();
</script>

<!-- Static Layout for Small/Medium Screens -->
<div class="w-full max-w-4xl mx-auto px-4 py-8">
    <!-- All layers overlaid -->
    <div class="mb-16 text-center">
        <div class="relative mb-6 flex items-center justify-center">
            <!-- Layer 1 - Base -->
            <img
                src="/datastream-layer-1.png"
                alt="Datastream Layer 1"
                class="w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 2 - Overlaid -->
            <img
                src="/datastream-layer-2.png"
                alt="Datastream Layer 2"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 3 - Overlaid -->
            <img
                src="/datastream-layer-3.png"
                alt="Datastream Layer 3"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 4 - Overlaid -->
            <img
                src="/datastream-layer-4.png"
                alt="Datastream Layer 4"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />

            <!-- Layer 5 - Overlaid -->
            <img
                src="/datastream-layer-5.png"
                alt="Datastream Layer 5"
                class="absolute inset-0 w-full max-w-md mx-auto h-auto object-contain"
            />
        </div>
    </div>

    <!-- Text sections stacked -->
    <div class="space-y-8">
        <!-- Layer 1 Text -->
        <div class="bg-primary-100 p-6 rounded-lg mx-auto max-w-md shadow-lg">
            <h2 class="text-xl font-semibold text-surface-contrast-50 mb-3">
                {$t("datastream.layer1-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed">
                {$t("datastream.layer1-description")}
            </p>
        </div>

        <!-- Layer 2 Text -->
        <div class="bg-primary-100 p-6 rounded-lg mx-auto max-w-md shadow-lg">
            <h2 class="text-xl font-semibold text-surface-contrast-50 mb-3">
                {$t("datastream.layer2-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed">
                {$t("datastream.layer2-description")}
            </p>
        </div>

        <!-- Layer 3 Text -->
        <div class="bg-primary-100 p-6 rounded-lg mx-auto max-w-md shadow-lg">
            <h2 class="text-xl font-semibold text-surface-contrast-50 mb-3">
                {$t("datastream.layer3-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed">
                {$t("datastream.layer3-description")}
            </p>
        </div>

        <!-- Layer 4 Text -->
        <div class="bg-primary-100 p-6 rounded-lg mx-auto max-w-md shadow-lg">
            <h2 class="text-xl font-semibold text-surface-contrast-50 mb-3">
                {$t("datastream.layer4-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed">
                {$t("datastream.layer4-description")}
            </p>
        </div>
    </div>
</div>
