<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    initLocale();
    export let currentStep: number = 0;
    let animatedSteps = new Set();
    
    // Import all images
    import layer1 from '/datastream-layers/datastream-layer-1.png';
    import layer1Dark from '/datastream-layers/datastream-layer-1-dark.png';
    import layer2 from '/datastream-layers/datastream-layer-2.png';
    import layer2Dark from '/datastream-layers/datastream-layer-2-dark.png';
    import layer3 from '/datastream-layers/datastream-layer-3.png';
    import layer3Dark from '/datastream-layers/datastream-layer-3-dark.png';
    import layer4 from '/datastream-layers/datastream-layer-4.png';
    import layer4Dark from '/datastream-layers/datastream-layer-4-dark.png';
    import layer5 from '/datastream-layers/datastream-layer-5.png';
    import layer5Dark from '/datastream-layers/datastream-layer-5-dark.png';
    
    $: {
        if (currentStep >= 1 && !animatedSteps.has(1)) { animatedSteps.add(1); animatedSteps = animatedSteps; }
        if (currentStep >= 2 && !animatedSteps.has(2)) { animatedSteps.add(2); animatedSteps = animatedSteps; }
        if (currentStep >= 3 && !animatedSteps.has(3)) { animatedSteps.add(3); animatedSteps = animatedSteps; }
        if (currentStep >= 4 && !animatedSteps.has(4)) { animatedSteps.add(4); animatedSteps = animatedSteps; }
        if (currentStep >= 5 && !animatedSteps.has(5)) { animatedSteps.add(5); animatedSteps = animatedSteps; }
        if (currentStep >= 6 && !animatedSteps.has(6)) { animatedSteps.add(6); animatedSteps = animatedSteps; }
    }
</script>

<!-- 4-column grid: left (1-3), center (images, spans 2 cols), right (4-6 + button) -->
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full items-center justify-center pt-16 pb-16">
    <!-- Left column: statements 1-3 -->
    <div class="flex flex-col gap-8 items-start justify-center ">
        {#each [1,2,3] as n}
            <div class="animate-on-scroll max-w-md text-left" class:text-animation={animatedSteps.has(n)} style="opacity: {currentStep >= n || animatedSteps.has(n) ? 1 : 0};">
                <h2 class="text-2xl font-bold text-tertiary-500 mb-2">{ $t(`datastream.layer${n}-title`) }</h2>
                <p class="text-base leading-relaxed">{ $t(`datastream.layer${n}-description`) }</p>
            </div>
        {/each}
    </div>

    <!-- Center columns: stacked images, span 2 columns -->
    <div class="relative flex flex-col items-center justify-center h-full min-h-[400px] col-span-2">
        <img src={layer1} alt="Layer 1" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-10 block dark:hidden" style="opacity: 1;" />
        <img src={layer1Dark} alt="Layer 1 Dark" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-10 hidden dark:block" style="opacity: 1;" />
        <img src={layer2} alt="Layer 2" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-20 block dark:hidden" style="opacity: {currentStep >= 2 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer2Dark} alt="Layer 2 Dark" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-20 hidden dark:block" style="opacity: {currentStep >= 2 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer3} alt="Layer 3" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-30 block dark:hidden" style="opacity: {currentStep >= 3 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer3Dark} alt="Layer 3 Dark" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-30 hidden dark:block" style="opacity: {currentStep >= 3 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer4} alt="Layer 4" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-40 block dark:hidden" style="opacity: {currentStep >= 4 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer4Dark} alt="Layer 4 Dark" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-40 hidden dark:block" style="opacity: {currentStep >= 4 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer5} alt="Layer 5" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-50 block dark:hidden" style="opacity: {currentStep >= 5 ? 1 : 0}; transition: opacity 1s;" />
        <img src={layer5Dark} alt="Layer 5 Dark" class="absolute w-auto h-auto max-w-[40vw] max-h-[40vh] object-contain z-50 hidden dark:block" style="opacity: {currentStep >= 5 ? 1 : 0}; transition: opacity 1s;" />
    </div>

    <!-- Right column: statements 4-6 + button -->
    <div class="flex flex-col gap-8 items-start justify-center">
        {#each [4,5,6] as n}
            <div class="animate-on-scroll max-w-md text-left" class:text-animation={animatedSteps.has(n)} style="opacity: {currentStep >= n || animatedSteps.has(n) ? 1 : 0};">
                <h2 class="text-2xl font-bold text-tertiary-500 mb-2">{ $t(`datastream.layer${n}-title`) }</h2>
                <p class="text-base leading-relaxed">{ $t(`datastream.layer${n}-description`) }</p>
                {#if n === 6}
                    <button class="btn preset-filled-tertiary-500 mt-4">{ $t("datastream.layer6-button") }</button>
                {/if}
            </div>
        {/each}
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
