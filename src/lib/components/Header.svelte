<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { Menu, LanguagesIcon } from "@lucide/svelte";
    import { locale, locales, setLocale } from "$lib/i18n/i18n";
    import type { Locale } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import { handleNavClick } from "$lib/utils/scroll";

    // Dropdown states for language selector and mobile menu
    let dropdownOpen = false;
    let mobileMenuOpen = false;
    let scrollY = 0;
    let isScrolled = false;
    let activeSection = "low-value-care"; // Default active section

    // Track scroll position and active section
    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY;
            isScrolled = scrollY > 50;

            // Get header height for offset calculations
            const headerHeight = document.querySelector('.navbar-wrapper')?.clientHeight || 0;
            
            // Update active section based on scroll position
            const sections = navLinks.map(link => link.href);
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Check if we're at the bottom of the page
            if (window.innerHeight + window.scrollY >= documentHeight - 50) {
                activeSection = sections[sections.length - 1];
                return;
            }

            // Calculate the scroll threshold considering header height
            const scrollThreshold = headerHeight + 10; // 10px buffer

            // Find the section that's currently in view
            let currentSection = '';
            let minDistance = Infinity;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - scrollThreshold);
                    
                    // If this section is closer to our threshold than the previous best match
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = section;
                    }
                }
            }

            if (currentSection) {
                activeSection = currentSection;
            }
        };

        // Initial update
        updateScroll();

        // Add scroll listener
        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    });

    // Toggle language dropdown, close mobile menu if open
    const toggleDropdown = () => {
        mobileMenuOpen = false;
        dropdownOpen = !dropdownOpen;
    };

    // Toggle mobile menu dropdown, close language dropdown if open
    const toggleMobileMenu = () => {
        dropdownOpen = false;
        mobileMenuOpen = !mobileMenuOpen;
    };

    // Select language and close dropdown
    const selectLocale = (code: string) => {
        setLocale(code as Locale);
        dropdownOpen = false;
    };

    // Nav links shared for desktop and mobile
    const navLinks = [
        { href: "low-value-care", label: "Low-Value Care" },
        { href: "impact", label: "Impact" },
        { href: "datastream", label: "National Data Stream" },
        { href: "main-goals", label: "Project Goals" },
        { href: "contact", label: "Contact" },
    ];

    // Handle navigation click with smooth scrolling
    const handleNavClickWithMenuClose = (event: Event, href: string) => {
        event.preventDefault();
        mobileMenuOpen = false; // Close mobile menu
        activeSection = href; // Update active section immediately
        handleNavClick(event, href);
    };
</script>

<svelte:window bind:scrollY />

<div
    class="navbar-wrapper transition-all duration-300 ease-in-out {isScrolled
        ? 'scrolled'
        : ''}"
>
    <AppBar
        background="bg-surface-contrast-50"
        base="py-2 sm:py-3 transition-all duration-300 ease-in-out {isScrolled
            ? 'py-1 sm:py-2'
            : ''}"
    >
        {#snippet lead()}
            <h1
                class="h1 text-primary-100 font-semibold transition-all duration-300 {isScrolled
                    ? 'text-lg'
                    : ''}"
            >
                LUCID
            </h1>
        {/snippet}

        {#snippet trail()}
            <div class="flex items-center gap-6">
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center">
                    {#each navLinks as { href, label }}
                        <a
                            {href}
                            class="text-surface-50 hover:text-primary-400 transition-colors duration-200 whitespace-nowrap px-3
                                {activeSection === href ? 'text-tertiary-500' : ''}"
                            onclick={(e) => handleNavClickWithMenuClose(e, href)}
                        >
                            {label}
                        </a>
                    {/each}
                </nav>

                <!-- Language Dropdown -->
                <div class="relative flex items-center justify-center">
                    <button
                        class="text-surface-50 hover:text-primary-400 w-6 h-6 flex items-center justify-center transition-all duration-200"
                        onclick={toggleDropdown}
                        aria-label="Select Language"
                    >
                        <LanguagesIcon
                            class="transition-all duration-200"
                            size={isScrolled ? 24 : 32}
                        />
                    </button>

                    {#if dropdownOpen}
                        <div
                            class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-2 shadow-lg z-30 min-w-[8rem]"
                        >
                            <div class="flex flex-col space-y-1">
                                {#each Object.entries(locales) as [code, name]}
                                    <button
                                        class="text-sm text-left px-3 py-1 rounded transition-colors duration-200
                                          {$locale === code
                                            ? 'bg-primary-500 text-surface-50'
                                            : 'text-surface-contrast-50 hover:bg-primary-500'}"
                                        onclick={() => selectLocale(code)}
                                    >
                                        {name}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Mobile Menu Icon and Dropdown -->
                <div class="md:hidden flex items-center relative">
                    <button
                        aria-label="Toggle menu"
                        onclick={toggleMobileMenu}
                        class="text-surface-50 transition-all duration-200"
                    >
                        <Menu
                            class="transition-all duration-200"
                            size={isScrolled ? 24 : 32}
                        />
                    </button>

                    {#if mobileMenuOpen}
                        <nav
                            class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-4 shadow-lg z-100 w-60"
                        >
                            <ul class="flex flex-col gap-4">
                                {#each navLinks as { href, label }}
                                    <li>
                                        <a
                                            {href}
                                            class="text-primary-900 active:text-primary-500 focus:text-primary-500 transition-colors duration-200 block
                                                {activeSection === href ? 'text-tertiary-500' : ''}"
                                            onclick={(e) =>
                                                handleNavClickWithMenuClose(e, href)}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        </nav>
                    {/if}
                </div>
            </div>
        {/snippet}
    </AppBar>
</div>