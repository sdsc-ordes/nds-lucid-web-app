import { inject, pageview } from '@vercel/analytics'
import { browser } from '$app/env'
import { page } from '$app/state'

/**
 * Vercel Web Analytics for SvelteKit 3.
 *
 * Mirrors `injectAnalytics` from `@vercel/analytics/sveltekit`, which still
 * imports `$app/stores` (removed in SvelteKit 3) and crashes hydration.
 * Swap back to it once Vercel ships a SvelteKit 3 compatible release.
 *
 * Call once from the root layout's component initialisation.
 */
export function injectAnalytics() {
    if (!browser) return

    inject(
        {
            basePath: import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH,
            disableAutoTrack: true,
            framework: 'sveltekit',
        },
        import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG
    )

    $effect(() => {
        if (page.route.id) {
            pageview({ route: page.route.id, path: page.url.pathname })
        }
    })
}
