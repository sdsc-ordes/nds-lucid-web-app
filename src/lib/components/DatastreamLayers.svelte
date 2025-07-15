<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";

    initLocale();
    export let currentStep: number = 0;

    let animatedSteps = new Set();
    let allAnimationsComplete = false;

    // Track which steps have been animated
    $: {
        if (currentStep >= 1 && !animatedSteps.has(1)) {
            animatedSteps.add(1);
            animatedSteps = animatedSteps; // Trigger reactivity
        }
        if (currentStep >= 2 && !animatedSteps.has(2)) {
            animatedSteps.add(2);
            animatedSteps = animatedSteps; // Trigger reactivity
        }
        if (currentStep >= 3 && !animatedSteps.has(3)) {
            animatedSteps.add(3);
            animatedSteps = animatedSteps; // Trigger reactivity
        }
        if (currentStep >= 4 && !animatedSteps.has(4)) {
            animatedSteps.add(4);
            animatedSteps = animatedSteps; // Trigger reactivity
            allAnimationsComplete = true;
        }
    }
</script>

<!-- SVG Layers Container -->
<div
    class="relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-1000"
>
    <!-- Layer 1 - Always visible (base layer)-->
    <div
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="transform: translateY(-10%); pointer-events: none;"
    >
        <img
            src="/datastream-layer-1.png"
            alt="Datastream Layer 1"
            class="w-auto h-auto max-w-[35vw] max-h-[35vh] object-contain"
        />
    </div>

    <!-- Layer 2-->
    <div
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 2 ? 1 : 0}; transform: translateY(-10%); pointer-events: none;"
    >
        <img
            src="/datastream-layer-2.png"
            alt="Datastream Layer 2"
            class="w-auto h-auto max-w-[35vw] max-h-[35vh] object-contain"
        />
        <!-- Top-left text -->
        <div class="absolute top-[20%] left-[8%] max-w-sm text-animation {animatedSteps.has(2) ? 'is-visible' : ''}"
             style="opacity: {currentStep >= 2 || animatedSteps.has(2) ? 1 : 0}; pointer-events: auto; z-index: 10;">
            <h2 class="text-2xl font-bold text-tertiary-500 mb-2 select-text">
                {$t("datastream.layer1-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed select-text">
                {$t("datastream.layer1-description")}
            </p>
        </div>
    </div>

    <!-- Layer 3 -->
    <div
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 3 ? 1 : 0}; transform: translateY(-10%); pointer-events: none;"
    >
        <img
            src="/datastream-layer-3.png"
            alt="Datastream Layer 3"
            class="w-auto h-auto max-w-[35vw] max-h-[35vh] object-contain"
        />
                <!-- Bottom-right text -->
        <div class="absolute bottom-[20%] right-[8%] max-w-sm text-right text-animation {animatedSteps.has(3) ? 'is-visible' : ''}"
             style="opacity: {currentStep >= 3 || animatedSteps.has(3) ? 1 : 0}; pointer-events: auto; z-index: 10;">
            <h2 class="text-2xl font-bold text-tertiary-500 mb-2 select-text">
                {$t("datastream.layer2-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed select-text">
                {$t("datastream.layer2-description")}
            </p>
        </div>
    </div>

    <!-- Layer 4 -->
    <div
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 4 ? 1 : 0}; transform: translateY(-10%); pointer-events: none;"
    >
        <img
            src="/datastream-layer-4.png"
            alt="Datastream Layer 4"
            class="w-auto h-auto max-w-[35vw] max-h-[35vh] object-contain"
        />
        <!-- Bottom-left text -->
        <div class="absolute bottom-[15%] left-[8%] max-w-sm text-animation {animatedSteps.has(4) ? 'is-visible' : ''}"
             style="opacity: {currentStep >= 4 || animatedSteps.has(4) ? 1 : 0}; pointer-events: auto; z-index: 10;">
            <h2 class="text-2xl font-bold text-tertiary-500 mb-2 select-text">
                {$t("datastream.layer3-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed select-text">
                {$t("datastream.layer3-description")}
            </p>
        </div>
    </div>

    <!-- Layer 5 -->
    <div
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 5 ? 1 : 0}; transform: translateY(-10%); pointer-events: none;"
    >
        <img
            src="/datastream-layer-5.png"
            alt="Datastream Layer 5"
            class="w-auto h-auto max-w-[35vw] max-h-[35vh] object-contain"
        />
        <!-- Top-right text -->
        <div class="absolute top-[15%] right-[8%] max-w-sm text-right text-animation {animatedSteps.has(5) ? 'is-visible' : ''}"
             style="opacity: {currentStep >= 5 || animatedSteps.has(5) ? 1 : 0}; pointer-events: auto; z-index: 10;">
            <h2 class="text-2xl font-bold text-tertiary-500 mb-2 select-text">
                {$t("datastream.layer4-title")}
            </h2>
            <p class="text-sm text-surface-contrast-50 leading-relaxed select-text">
                {$t("datastream.layer4-description")}
            </p>
        </div>
    </div>
</div>

<style>
    :global(.text-animation) {
        transform: translateY(20px);
        transition: all 1s ease-in-out;
    }

    :global(.text-animation.is-visible) {
        transform: translateY(0);
    }
</style>
