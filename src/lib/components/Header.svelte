<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { Menu, LanguagesIcon } from "@lucide/svelte";
    import { locale, locales, setLocale } from "$lib/i18n/i18n";
    import type { Locale } from "$lib/i18n/i18n";
    import { onMount } from "svelte";

    // Dropdown states for language selector and mobile menu
    let dropdownOpen = false;
    let mobileMenuOpen = false;
    let scrollY = 0;
    let isScrolled = false;

    // Track scroll position
    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY;
            isScrolled = scrollY > 50;
        };
        
        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => window.removeEventListener('scroll', updateScroll);
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
        { href: "#low-value-care", label: "Low-Value Care" },
        { href: "#impact", label: "Impact" },
        { href: "#datastream", label: "National Data Stream" },
        { href: "#main-goals", label: "Goals" },
        { href: "#contact", label: "contact" },
    ];

    // Handle navigation click with smooth scrolling
    const handleNavClick = (event: Event, href: string) => {
        event.preventDefault();
        mobileMenuOpen = false; // Close mobile menu
        
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            const yOffset = -80; // Account for header height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };
</script>

<svelte:window bind:scrollY />

<div class="navbar-wrapper transition-all duration-300 ease-in-out {isScrolled ? 'scrolled' : ''}">
    <AppBar
        headlineClasses="sm:hidden"
        centerClasses="hidden sm:block"
        background="bg-surface-contrast-50"
        base="py-2 sm:py-3 transition-all duration-300 ease-in-out {isScrolled ? 'py-1 sm:py-2' : ''}"
    >
        {#snippet lead()}
            <h1 class="h1 text-primary-100 font-semibold transition-all duration-300 {isScrolled ? 'text-lg' : ''}">LUCID</h1>
        {/snippet}

        {#snippet trail()}
            <!-- Desktop Nav -->
            <div class="hidden sm:flex items-center relative gap-12">
                <nav>
                    <ul class="flex gap-12">
                        {#each navLinks as { href, label }}
                            <li>
                                <a
                                    href={href}
                                    class="text-surface-50 hover:text-primary-400 text-lg transition-all duration-200"
                                    on:click={(e) => handleNavClick(e, href)}
                                >
                                    {label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            </div>

            <!-- Language Dropdown -->
            <div class="relative flex items-center justify-center">
                <button
                    class="text-surface-50 hover:text-primary-400 w-6 h-6 flex items-center justify-center transition-all duration-200"
                    on:click={toggleDropdown}
                    aria-label="Select Language"
                >
                    <LanguagesIcon size={25} />
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
                                    on:click={() => selectLocale(code)}
                                >
                                    {name}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Mobile Menu Icon and Dropdown -->
            <div class="sm:hidden flex items-center relative">
                <button
                    aria-label="Toggle menu"
                    on:click={toggleMobileMenu}
                    class="text-surface-50 transition-all duration-200"
                >
                    <Menu size={24} />
                </button>

                {#if mobileMenuOpen}
                    <nav
                        class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-4 shadow-lg z-40 w-40"
                    >
                        <ul class="flex flex-col gap-4">
                            {#each navLinks as { href, label }}
                                <li>
                                    <a
                                        href={href}
                                        class="text-primary-900 active:text-primary-500 focus:text-primary-500 transition-colors duration-200"
                                        on:click={(e) => handleNavClick(e, href)}
                                    >
                                        {label}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </nav>
                {/if}
            </div>
        {/snippet}
    </AppBar>
</div>

