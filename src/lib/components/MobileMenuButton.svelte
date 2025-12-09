<script lang="ts">
    import { Menu } from '@lucide/svelte'

    interface Props {
        isScrolled: boolean
        onToggleMobileMenu: () => void
    }

    let { isScrolled, onToggleMobileMenu }: Props = $props()
</script>

<button
    aria-label="Toggle menu"
    onclick={onToggleMobileMenu}
    class="text-surface-50 transition-all duration-200"
>
    <Menu size={isScrolled ? 24 : 32} class="transition-all duration-200" />
</button>
