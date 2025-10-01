<script lang="ts">
    import { onMount } from 'svelte'
    import Hero from '$lib/components/Hero.svelte'
    import { t, initLocale } from '$lib/i18n/i18n'
    import LVCexamples from '$lib/components/LVCexamples.svelte'
    import Impact from '$lib/components/Impact.svelte'
    import Datastream from '$lib/components/Datastream.svelte'
    import Goals from '$lib/components/Goals.svelte'
    import Sources from '$lib/components/Sources.svelte'
    import Contact from '$lib/components/Contact.svelte'
    import NavigationItems from '$lib/components/NavigationItems.svelte'
    import { handleNavClick } from '$lib/utils/scroll'
    import { setLayoutSlots } from '$lib/utils/layout'
    
    let activeSection = $state('low-value-care')

    // Nav links for home page - scroll behavior
    const navLinks = [
        { href: 'low-value-care', label: 'sections.label-lvc', action: 'scroll' as const },
        { href: 'impact', label: 'sections.label-impact', action: 'scroll' as const },
        { href: 'datastream', label: 'sections.label-datastream', action: 'scroll' as const },
        { href: 'main-goals', label: 'sections.label-main-goals', action: 'scroll' as const },
        { href: 'contact', label: 'sections.label-contact', action: 'scroll' as const },
    ]

    const handleNavClickWithMenuClose = (event: Event, href: string) => {
        event.preventDefault()
        activeSection = href
        handleNavClick(event, href)
    }

    onMount(() => {
        // Initialize locale from localStorage if available
        initLocale()

        // Set up navigation snippet
        setLayoutSlots({ topnavigationitems })

        // Simple section tracking - find which section is in view
        const updateActiveSection = () => {
            const sections = navLinks.map((link) => link.href)

            // Check if we're at the bottom of the page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                activeSection = sections[sections.length - 1]
                return
            }

            // Find the section that's currently in view
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        activeSection = section
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', updateActiveSection, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateActiveSection)
        }
    })
</script>

{#snippet topnavigationitems()}
    <NavigationItems 
        navLinks={navLinks} 
        activeSection={activeSection} 
        onNavClick={handleNavClickWithMenuClose}
    />
{/snippet}

<Hero />
<LVCexamples />
<Impact />
<Datastream />
<Goals />
<Sources />
<Contact />