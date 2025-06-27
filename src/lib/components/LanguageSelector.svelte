<script lang="ts">
  import { locale, locales, setLocale } from '$lib/i18n/i18n';
  import type { Locale } from '$lib/i18n/i18n';
</script>

<div class="language-selector bg-surface-800 rounded-lg p-2 shadow-lg">
  <div class="flex space-x-4">
    {#each Object.entries(locales) as [code, name]}
      <button 
        class="text-sm px-3 py-1 rounded transition-colors duration-200 {$locale === code ? 'bg-primary-500 text-surface-50' : 'text-surface-50 hover:bg-surface-700'}"
        onclick={() => setLocale(code as Locale)}
      >
        {name}
      </button>
    {/each}
  </div>
</div>

<style>
  .language-selector {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 20;
  }
</style> 