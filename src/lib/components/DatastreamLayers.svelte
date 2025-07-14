<script lang="ts">
    export let currentStep: number = 0;
</script>

<!-- SVG Layers Container -->
<div class="relative w-full h-full flex items-center justify-center overflow-hidden">
    <!-- Layer 1 - Always visible (base layer) -->
    <div class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000">
        <img 
            src="/datastream-layer-1.png" 
            alt="Datastream Layer 1" 
            class="w-auto h-auto max-w-[60vw] max-h-[60vh] object-contain"
        />
    </div>

    <!-- Layer 2 -->
    <div 
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 1 ? 1 : 0};"
    >
        <img 
            src="/datastream-layer-2.png" 
            alt="Datastream Layer 2" 
            class="w-auto h-auto max-w-[60vw] max-h-[60vh] object-contain"
        />
    </div>

    <!-- Layer 3 -->
    <div 
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 2 ? 1 : 0};"
    >
        <img 
            src="/datastream-layer-3.png" 
            alt="Datastream Layer 3" 
            class="w-auto h-auto max-w-[60vw] max-h-[60vh] object-contain"
        />
    </div>

    <!-- Layer 4 -->
    <div 
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 3 ? 1 : 0};"
    >
        <img 
            src="/datastream-layer-4.png" 
            alt="Datastream Layer 4" 
            class="w-auto h-auto max-w-[60vw] max-h-[60vh] object-contain"
        />
    </div>

    <!-- Layer 5 -->
    <div 
        class="absolute w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style="opacity: {currentStep >= 4 ? 1 : 0};"
    >
        <img 
            src="/datastream-layer-5.png" 
            alt="Datastream Layer 5" 
            class="w-auto h-auto max-w-[60vw] max-h-[60vh] object-contain"
        />
    </div>
</div> 