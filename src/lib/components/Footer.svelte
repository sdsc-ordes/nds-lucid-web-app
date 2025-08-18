<script>
    import { Heart } from 'lucide-svelte'
</script>

<footer class="bg-surface-950 px-4 py-6 w-full">
    <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 max-w-7xl mx-auto w-full"
    >
        <!-- Left: Copyright -->
        <div class="text-xs sm:text-sm text-surface-50">
            &copy;2025. LUCID. All rights reserved.
        </div>
        <!-- Right: Logos -->
        <div class="flex items-center gap-2 text-xs sm:text-sm text-surface-50">
            Built with <img src="/heart-full.svg" alt="Heart" class="h-5 w-auto" /> at the
            <img src="/logos/sdsc-colour-light.svg" alt="SDSC Logo" class="h-5 w-auto" />
        </div>
    </div>
</footer>
