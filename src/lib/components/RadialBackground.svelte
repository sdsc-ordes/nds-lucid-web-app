<script lang="ts">
    import { onMount } from "svelte";

    let scrollY = 0;
    let clickRadials: Array<{id: number, x: number, y: number, size: number, speed: number, direction: 'clockwise' | 'counterclockwise'}> = [];
    let radialId = 0;

    onMount(() => {
        const updateScrollY = () => (scrollY = window.scrollY);
        window.addEventListener("scroll", updateScrollY);
        return () => window.removeEventListener("scroll", updateScrollY);
    });

    // Handle click to add new radial
    const handleClick = (event: MouseEvent | KeyboardEvent) => {
        const target = event.currentTarget as HTMLElement;
        if (!target) return;
        
        const rect = target.getBoundingClientRect();
        let x: number, y: number;
        
        if (event instanceof MouseEvent) {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        } else {
            // For keyboard events, place in center
            x = rect.width / 2;
            y = rect.height / 2;
        }
        
        const sizes = [64, 80, 96, 112, 128];
        const speeds = [60, 90, 120, 150, 180];
        
        clickRadials = [...clickRadials, {
            id: radialId++,
            x: x,
            y: y,
            size: sizes[Math.floor(Math.random() * sizes.length)],
            speed: speeds[Math.floor(Math.random() * speeds.length)],
            direction: Math.random() > 0.5 ? 'clockwise' : 'counterclockwise'
        }];
    };
</script>

<svelte:window bind:scrollY />

<style>
    @keyframes rotate-clockwise {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes rotate-counterclockwise {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }

    .rotating-radial-1 {
        animation: rotate-clockwise 120s linear infinite;
    }

    .rotating-radial-2 {
        animation: rotate-counterclockwise 90s linear infinite;
    }

    .rotating-radial-3 {
        animation: rotate-clockwise 180s linear infinite;
    }

    .rotating-radial-4 {
        animation: rotate-counterclockwise 150s linear infinite;
    }

    .click-radial {
        position: absolute;
        pointer-events: none;
    }

    .click-radial-clockwise {
        animation: rotate-clockwise var(--speed) linear infinite;
    }

    .click-radial-counterclockwise {
        animation: rotate-counterclockwise var(--speed) linear infinite;
    }
</style>

<!-- Background Radial SVG -->
<div
    class="absolute inset-0 w-full h-full cursor-pointer"
    style="transform: translateY({scrollY * 0.5}px);"
    onclick={handleClick}
    onkeydown={(e) => e.key === 'Enter' && handleClick(e)}
    tabindex="0"
    role="button"
    aria-label="Click to add radial elements"
>
    <!-- Large Background Radial -->
    <img
        src="/Radial.svg"
        alt="Background Radial"
        class="absolute bottom-64 left-64 w-150 h-150 rotating-radial-1 opacity-80"
    />
    
    <!-- Click-generated Radials -->
    {#each clickRadials as radial (radial.id)}
        <img
            src="/Radial.svg"
            alt="Click Radial"
            class="click-radial click-radial-{radial.direction}"
            style="
                left: {radial.x - radial.size/2}px;
                top: {radial.y - radial.size/2}px;
                width: {radial.size}px;
                height: {radial.size}px;
                --speed: {radial.speed}s;
                opacity: 1;
            "
        />
    {/each}
</div> 