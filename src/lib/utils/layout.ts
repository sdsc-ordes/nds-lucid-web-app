import { getContext } from 'svelte'
import type { Snippet } from 'svelte'

// Define the shape of your slots for type safety
export type LayoutSlots = {
    desktopnavigationitems: Snippet
    mobilenavigationitems: Snippet
    content: Snippet
}

export function setLayoutSlots(slots: Partial<LayoutSlots>) {
    // Retrieve the shared slots object from the context
    const layoutSlots = getContext<Partial<LayoutSlots>>('layout-slots')

    // Assign the provided snippets to the context object
    if (layoutSlots) {
        Object.assign(layoutSlots, slots)
    }
}
