<script lang="ts">
    import { onMount } from "svelte";

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    let containerElement: HTMLElement;

    // Generate multiple radial elements across the background
    let radialElements: Array<{
        id: number;
        x: number;
        y: number;
        baseSize: number;
        currentSize: number;
        duration: number;
        delay: number;
        proximity: number;
    }> = [];

    const PROXIMITY_THRESHOLD = 100; // Distance in pixels for size increase
    const SIZE_MULTIPLIER = 2.5; // How much larger they get when cursor is close
    const DURATIONS = [3, 4, 5, 6, 7, 8, 9]; // Fade in/out durations in seconds
    const SIZES = [100, 140, 180, 220, 260, 300, 340]; // Different sizes for variety

    onMount(() => {
        const updateScrollY = () => (scrollY = window.scrollY);
        const updateMousePosition = (e: MouseEvent) => {
            if (containerElement) {
                const rect = containerElement.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                updateProximityEffects();
            }
        };
        const updateContainerSize = () => {
            if (containerElement) {
                containerWidth = containerElement.offsetWidth;
                containerHeight = containerElement.offsetHeight;
                generateRadialElements();
            }
        };

        window.addEventListener("scroll", updateScrollY);
        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("resize", updateContainerSize);
        
        // Initial setup
        updateContainerSize();
        
        return () => {
            window.removeEventListener("scroll", updateScrollY);
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("resize", updateContainerSize);
        };
    });

    function generateRadialElements() {
        const numElements = Math.floor((containerWidth * containerHeight) / 50000); // Density based on container size
        const elements = [];
        
        for (let i = 0; i < numElements; i++) {
            const baseSize = SIZES[Math.floor(Math.random() * SIZES.length)];
            const duration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
            
            // Ensure elements are positioned within container bounds, accounting for their size
            const maxX = containerWidth - baseSize;
            const maxY = containerHeight - baseSize;
            const x = Math.max(0, Math.min(maxX, Math.random() * containerWidth));
            const y = Math.max(0, Math.min(maxY, Math.random() * containerHeight));
            
            elements.push({
                id: i,
                x: x,
                y: y,
                baseSize: baseSize,
                currentSize: baseSize,
                duration: duration,
                delay: Math.random() * duration, // Random delay to stagger appearances
                proximity: 0
            });
        }
        
        radialElements = elements;
    }

    function updateProximityEffects() {
        radialElements = radialElements.map(element => {
            const distance = Math.sqrt(
                Math.pow(mouseX - element.x, 2) + Math.pow(mouseY - element.y, 2)
            );
            
            const proximity = Math.max(0, 1 - (distance / PROXIMITY_THRESHOLD));
            
            return {
                ...element,
                proximity
            };
        });
    }
</script>

<svelte:window bind:scrollY />

<style>
    @keyframes fadeInOut {
        0%, 100% {
            opacity: 0;
            transform: scale(calc(0.8 * var(--proximity-scale, 1)));
        }
        50% {
            opacity: 1;
            transform: scale(calc(1.2 * var(--proximity-scale, 1)));
        }
    }

    .radial-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        max-width: 100vw;
        max-height: 100vh;
    }

    .radial-element {
        position: absolute;
        pointer-events: none;
        transition: filter 0.3s ease;
        animation: fadeInOut var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        transform-origin: center;
        max-width: 100%;
        max-height: 100%;
    }

    .radial-element:hover {
        filter: brightness(1.2);
    }
</style>

<!-- Interactive Radial Background -->
<div
    bind:this={containerElement}
    class="radial-container"
    style="transform: translateY({scrollY * 0.5}px);"
>
            {#each radialElements as element (element.id)}
            <img
                src="/Radial.svg"
                alt="Radial Element"
                class="radial-element"
                style="
                    left: {element.x}px;
                    top: {element.y}px;
                    width: {element.baseSize}px;
                    height: {element.baseSize}px;
                    --duration: {element.duration}s;
                    --delay: {element.delay}s;
                    --proximity-scale: {1 + element.proximity * (SIZE_MULTIPLIER - 1)};
                    filter: brightness({1 + element.proximity * 0.5});
                "
            />
        {/each}
</div> 