<script lang="ts">
    import '../app.css'
    import { AppBar } from '@skeletonlabs/skeleton-svelte'
    import { onMount } from 'svelte'
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
    import Footer from '$lib/components/Footer.svelte'
    import Logo from '$lib/components/Logo.svelte'
    import LanguageButton from '$lib/components/LanguageButton.svelte'
    import MobileMenuButton from '$lib/components/MobileMenuButton.svelte'
    import { setContext } from 'svelte'
    import { setLayoutSlots, type LayoutSlots } from '$lib/utils/layout'

    let { children, slots } = $props<{ children: any; slots: LayoutSlots }>()

    let dropdownOpen = $state(false)
    let mobileMenuOpen = $state(false)
    let scrollY = $state(0)
    let isScrolled = $state(false)

    // Set up the layout slots context
    const layoutSlots = $state<Partial<LayoutSlots>>({})
    setContext('layout-slots', layoutSlots)
    
    // Provide mobile menu state to child components
    setContext('mobile-menu-state', {
        get isOpen() { return mobileMenuOpen },
        close: () => { mobileMenuOpen = false }
    })

    // Simple toggle functions
    const toggleDropdown = () => {
        mobileMenuOpen = false
        dropdownOpen = !dropdownOpen
    }

    const toggleMobileMenu = () => {
        dropdownOpen = false
        mobileMenuOpen = !mobileMenuOpen
    }

    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY
            isScrolled = scrollY > 50
        }

        window.addEventListener('scroll', updateScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateScroll)
        }
    })

    injectAnalytics()
</script>

<div class="w-full min-h-screen flex flex-col">
    <header class="sticky top-0 z-50">
        <div class="navbar-wrapper {isScrolled ? 'scrolled' : ''} transition-all duration-300">
            <AppBar
                background="bg-surface-contrast-50"
                base="py-2 sm:py-3 transition-all duration-300 {isScrolled ? 'py-1 sm:py-2' : ''}"
            >
                {#snippet lead()}
                    <Logo {isScrolled} />
                {/snippet}

                {#snippet trail()}
                    <div class="flex items-center gap-6">
                        <!-- Desktop Navigation Items from snippet -->
                        {@render layoutSlots.desktopnavigationitems?.()}

                        <!-- Language Dropdown -->
                        <LanguageButton 
                            {isScrolled}
                            {dropdownOpen}
                            onToggleDropdown={toggleDropdown}
                        />

                        <!-- Mobile Menu Icon and Dropdown -->
                        <div class="md:hidden flex items-center relative">
                            <MobileMenuButton 
                                {isScrolled}
                                onToggleMobileMenu={toggleMobileMenu}
                            />

                            {#if mobileMenuOpen}
                                <div class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-4 shadow-lg z-100 w-60">
                                    {@render layoutSlots.mobilenavigationitems?.()}
                                </div>
                            {/if}
                        </div>
                    </div>
                {/snippet}
            </AppBar>
        </div>
    </header>
	<main class="w-full flex-1">
        {@render children()}
    </main>
    <footer>
        <Footer />
    </footer>
</div>

<style>
</style>
