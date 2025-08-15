<script lang="ts">
    import { t } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import { tick } from "svelte";
    import { ChevronLeft, ChevronRight } from "lucide-svelte";
    const carouselImages = [
    "/images/datastream/carousel-1.jpeg",
    "/images/datastream/carousel-2.jpeg",
    "/images/datastream/carousel-3.jpeg",
    "/images/datastream/carousel-4.jpeg",
    "/images/datastream/carousel-5.jpeg",
    "/images/datastream/carousel-6.jpeg"
];

    let observer: IntersectionObserver;
    let animatedElements = new Set();
    let carouselContainer: HTMLDivElement;
    let currentSlide = 0;

    // Carousel data with images and content
    const carouselData = carouselImages.map((image, index) => ({
        image,
        title: `datastream.layer${index + 1}-title`,
        description: `datastream.layer${index + 1}-description`,
    }));

    onMount(() => {
        tick().then(() => {
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
                    threshold: 0.2,
                    rootMargin: "0px 0px -100px 0px",
                },
            );

            document.querySelectorAll(".animate-on-scroll").forEach((el) => {
                observer.observe(el);
            });
        });

        // Add scroll listener to track current slide
        if (carouselContainer) {
            const updateCurrentSlide = () => {
                const slideWidth = carouselContainer.clientWidth;
                const scrollLeft = carouselContainer.scrollLeft;
                const newSlide = Math.round(scrollLeft / slideWidth);
                if (newSlide !== currentSlide) {
                    currentSlide = newSlide;
                }
            };

            carouselContainer.addEventListener('scroll', updateCurrentSlide);
        }
    });

    function carouselLeft() {
        if (!carouselContainer) return;
        const newSlide =
            currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1;
        const x =
            currentSlide === 0
                ? carouselContainer.clientWidth * (carouselData.length - 1)
                : carouselContainer.scrollLeft - carouselContainer.clientWidth;
        carouselContainer.scrollTo({ left: x, behavior: "smooth" });
        currentSlide = newSlide;
    }

    function carouselRight() {
        if (!carouselContainer) return;
        const newSlide =
            currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1;
        const x =
            currentSlide === carouselData.length - 1
                ? 0
                : carouselContainer.scrollLeft + carouselContainer.clientWidth;
        carouselContainer.scrollTo({ left: x, behavior: "smooth" });
        currentSlide = newSlide;
    }
</script>

<!-- Datastream Section -->
<section id="datastream" class="relative w-full py-16">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
        <div
            class="bg-surface-contrast-50-950 p-4 sm:p-4 shadow-lg header-slide-in animate-on-scroll"
        >
            <h1
                class="text-surface-50-950 text-xl sm:text-2xl font-bold text-center"
            >
                {$t("datastream.datastream-title")}
            </h1>
        </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-6">
        <div class="w-full relative">
            <!-- Carousel Container -->
            <div class="relative w-full">
                <!-- Full Images -->
                <div
                    bind:this={carouselContainer}
                    class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto scrollbar-hide"
                >
                    {#each carouselData as item, i}
                        <!-- Desktop Layout -->
                        <div class="snap-center w-full flex-shrink-0 hidden lg:flex flex-row gap-0 h-[600px]">
                            <!-- Text box -->
                            <div class="w-1/2 bg-surface-contrast-50 flex flex-col justify-center p-24">
                                <div class="space-y-4">
                                    <h2 class="text-2xl font-bold text-tertiary-500">
                                        {$t(item.title)}
                                    </h2>
                                    <p class="text-base leading-relaxed text-surface-50">
                                        {@html $t(item.description)}
                                    </p>
                                </div>
                            </div>

                            <!-- Image -->
                            <div class="w-1/2 h-full overflow-hidden flex items-center justify-center">
                                <img
                                    class="w-full h-full object-cover object-center"
                                    src={item.image}
                                    alt={`Layer ${i + 1}`}
                                    loading={i === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                />
                            </div>
                        </div>

                        <!-- Mobile Layout -->
                        <div class="snap-center w-full flex-shrink-0 flex lg:hidden flex-col gap-0 h-[400px]">
                            <!-- Text box -->
                            <div class="w-full flex flex-col justify-center p-16 h-full">
                                <div class="space-y-4">
                                    <h2 class="text-xl font-bold text-tertiary-500 text-center">
                                        {$t(item.title)}
                                    </h2>
                                    <p class="text-sm leading-relaxed text-surface-950-50 text-center ">
                                        {@html $t(item.description)}
                                    </p>
                                  
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- Navigation Buttons (Layered on top) -->
                <div
                    class="absolute inset-0 pointer-events-none flex items-center justify-between p-4"
                >
                    <!-- Button: Left -->
                    <button
                        type="button"
                        class="btn pointer-events-auto"
                        onclick={carouselLeft}
                        title="Previous slide"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={40} class="text-surface-950-50" />
                    </button>

                    <!-- Button: Right -->
                    <button
                        type="button"
                        class="btn  pointer-events-auto"
                        onclick={carouselRight}
                        title="Next slide"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={40} class="text-surface-950-50" />
                    </button>
                </div>


            </div>
        </div>
    </div>

    <!-- Indicator Circles -->
    <div class="flex justify-center space-x-6 mt-8">
        {#each carouselData as _, i}
            <button
                class="w-3 h-3 rounded-full transition-all duration-200 {currentSlide === i ? 'bg-tertiary-500' : 'bg-surface-950-50/90'}"
                onclick={() => {
                    if (carouselContainer) {
                        carouselContainer.scrollTo({ left: carouselContainer.clientWidth * i, behavior: "smooth" });
                        currentSlide = i;
                    }
                }}
                aria-label="Go to slide {i + 1}"
            >
            </button>
        {/each}
    </div>
</section>
<style>
    :global(.animate-on-scroll) {
        opacity: 0;
        transform: translateY(20px);
        transition: all 1s ease-in-out;
    }

    :global(.animate-on-scroll.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    :global(.header-slide-in) {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.8s ease-out;
    }

    :global(.header-slide-in.is-visible) {
        opacity: 1;
        transform: translateX(0);
    }

    /* Hide scrollbar */
    :global(.scrollbar-hide) {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    :global(.scrollbar-hide::-webkit-scrollbar) {
        display: none;  /* Chrome, Safari and Opera */
    }
</style>

