<script lang="ts">
    import { onMount } from 'svelte';

    export let children: string = '';
    export let className: string = '';
    export let fromFontVariationSettings: string = '"wght" 400';
    export let toFontVariationSettings: string = '"wght" 800';
    export let radius: number = 100;
    export let falloff: 'linear' | 'exponential' | 'gaussian' = 'linear';

    let containerElement: HTMLDivElement;
    let letterElements: (HTMLSpanElement | null)[] = [];
    let mousePosition = { x: 0, y: 0 };
    let words: string[] = [];
    let animationFrameId: number;

    // Parse font variation settings
    $: parsedSettings = (() => {
        const parseSettings = (settingsString: string) => {
            return new Map(
                settingsString
                    .split(',')
                    .map(s => s.trim())
                    .map(s => {
                        const [name, value] = s.split(' ');
                        return [name.replace(/['"]/g, ''), parseFloat(value)];
                    })
            );
        };

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue,
        }));
    })();

    // Split text into words and letters
    $: words = children.split(' ');

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const calculateFalloff = (distance: number): number => {
        const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

        switch (falloff) {
            case 'exponential':
                return Math.pow(normalizedDistance, 2);
            case 'gaussian':
                return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
            case 'linear':
            default:
                return normalizedDistance;
        }
    };

    const updateLetterStyles = () => {
        if (!containerElement) return;
        
        const containerRect = containerElement.getBoundingClientRect();

        letterElements.forEach((letterElement, index) => {
            if (!letterElement) return;

            const rect = letterElement.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
            const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

            const distance = calculateDistance(
                mousePosition.x,
                mousePosition.y,
                letterCenterX,
                letterCenterY
            );

            if (distance >= radius) {
                if (letterElement.style.fontVariationSettings !== fromFontVariationSettings) {
                    letterElement.style.fontVariationSettings = fromFontVariationSettings;
                }
                return;
            }

            const falloffValue = calculateFalloff(distance);

            const newSettings = parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(', ');

            letterElement.style.fontVariationSettings = newSettings;
        });

        animationFrameId = requestAnimationFrame(updateLetterStyles);
    };

    onMount(() => {
        const updateMousePosition = (x: number, y: number) => {
            if (containerElement) {
                const rect = containerElement.getBoundingClientRect();
                mousePosition = {
                    x: x - rect.left,
                    y: y - rect.top
                };
            }
        };

        const handleMouseMove = (ev: MouseEvent) => {
            updateMousePosition(ev.clientX, ev.clientY);
        };

        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0];
            updateMousePosition(touch.clientX, touch.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        // Start animation loop
        updateLetterStyles();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    });

    let letterIndex = 0;
    const getLetterIndex = () => letterIndex++;
    
    // Reset letter index when words change
    $: if (words) {
        letterIndex = 0;
    }
</script>

<div 
    bind:this={containerElement}
    class="breathing-text {className}"
>
    {#each words as word, wordIndex}
        <span class="inline-block whitespace-nowrap" aria-hidden="true">
            {#each word.split('') as letter}
                {@const currentLetterIndex = getLetterIndex()}
                <span
                    bind:this={letterElements[currentLetterIndex]}
                    class="inline-block"
                    aria-hidden="true"
                    style="font-variation-settings: {fromFontVariationSettings};"
                >
                    {letter}
                </span>
            {/each}
            {#if wordIndex < words.length - 1}
                <span class="inline-block">&nbsp;</span>
            {/if}
        </span>
    {/each}
    <span class="sr-only">{children}</span>
</div>

<style>
    .breathing-text {
        cursor: default;
        font-feature-settings: "kern" 1;
    }

    /* Screen reader only utility */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style> 