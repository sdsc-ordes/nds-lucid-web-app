<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton-svelte'
    import { Menu, LanguagesIcon } from '@lucide/svelte'
    import { locale, locales, setLocale, t } from '$lib/i18n/i18n'
    import type { Locale } from '$lib/i18n/i18n'
    import { handleNavClick } from '$lib/utils/scroll'
    import { onMount } from 'svelte'

    let dropdownOpen = false
    let mobileMenuOpen = false
    let scrollY = 0
    let isScrolled = false
    let activeSection = 'low-value-care'

    function getHeaderHeight() {
        const header = document.querySelector('.navbar-wrapper')
        return header ? header.getBoundingClientRect().height : 0
    }

    // Nav links shared for desktop and mobile
    const navLinks = [
        { href: 'low-value-care', label: 'sections.label-lvc' },
        { href: 'impact', label: 'sections.label-impact' },
        { href: 'datastream', label: 'sections.label-datastream' },
        { href: 'main-goals', label: 'sections.label-main-goals' },
        { href: 'contact', label: 'sections.label-contact' },
    ]

    // Simple toggle functions
    const toggleDropdown = () => {
        mobileMenuOpen = false
        dropdownOpen = !dropdownOpen
    }

    const toggleMobileMenu = () => {
        dropdownOpen = false
        mobileMenuOpen = !mobileMenuOpen
    }

    const selectLocale = (code: string) => {
        setLocale(code as Locale)
        dropdownOpen = false
    }

    let isProgrammaticScroll = false

    const handleNavClickWithMenuClose = (event: Event, href: string) => {
        event.preventDefault()
        mobileMenuOpen = false
        activeSection = href

        // Disable scroll tracking during smooth scroll
        isProgrammaticScroll = true
        handleNavClick(event, href)

        // Re-enable scroll tracking after smooth scroll completes
        setTimeout(() => {
            isProgrammaticScroll = false
        }, 1000)
    }

    let pageLoaded = false

    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY
            isScrolled = scrollY > 50

            // Skip section tracking during programmatic scrolling or initial load
            if (isProgrammaticScroll || !pageLoaded) {
                return
            }

            // Update active section based on scroll position
            const sections = navLinks.map((link) => link.href)

            try {
                const documentHeight = document.documentElement.scrollHeight

                // Check if we're at the bottom of the page
                if (window.innerHeight + window.scrollY >= documentHeight - 50) {
                    activeSection = sections[sections.length - 1]
                    return
                }

                // Otherwise check each section (with error handling)
                for (const section of sections) {
                    const element = document.getElementById(section)
                    if (element) {
                        try {
                            const rect = element.getBoundingClientRect()
                            if (rect.top <= 200 && rect.bottom >= 200) {
                                activeSection = section
                                break
                            }
                        } catch (e) {
                            // Ignore errors during loading - element might be in flux
                            continue
                        }
                    }
                }
            } catch (e) {
                // Ignore errors during page loading
                return
            }
        }

        // Enable scroll immediately
        window.addEventListener('scroll', updateScroll, { passive: true })

        // Enable section tracking after page is fully loaded
        setTimeout(() => {
            pageLoaded = true
        }, 3000) // 3 seconds should be enough for everything to load

        return () => {
            window.removeEventListener('scroll', updateScroll)
        }
    })
</script>

<div class="navbar-wrapper {isScrolled ? 'scrolled' : ''} transition-all duration-300">
    <AppBar
        background="bg-surface-contrast-50"
        base="py-2 sm:py-3 transition-all duration-300 {isScrolled ? 'py-1 sm:py-2' : ''}"
    >
        {#snippet lead()}
            <button
                type="button"
                class="focus:outline-none"
                onclick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }}
                title="Scroll to top"
            >
                <img
                    src="/logos/lucid-logo-light.svg"
                    alt="LUCID"
                    class="transition-all duration-300 {isScrolled ? 'h-15' : 'h-25'}"
                />
            </button>
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
                            {$t(label)}
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
                            size={isScrolled ? 24 : 32}
                            class="transition-all duration-200"
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
                        <Menu size={isScrolled ? 24 : 32} class="transition-all duration-200" />
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
                                            onclick={(e) => handleNavClickWithMenuClose(e, href)}
                                        >
                                            {$t(label)}
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
