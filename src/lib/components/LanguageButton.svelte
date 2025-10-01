<script lang="ts">
	import { LanguagesIcon } from '@lucide/svelte';
	import { locale, locales, setLocale } from '$lib/i18n/i18n';
	import type { Locale } from '$lib/i18n/i18n';

	interface Props {
		isScrolled: boolean;
		dropdownOpen: boolean;
		onToggleDropdown: () => void;
	}

	let { isScrolled, dropdownOpen, onToggleDropdown }: Props = $props();

	const selectLocale = (code: string) => {
		setLocale(code as Locale);
		onToggleDropdown();
	};
</script>

<div class="relative flex items-center justify-center">
	<button
		class="text-surface-50 hover:text-primary-400 w-6 h-6 flex items-center justify-center transition-all duration-200"
		onclick={onToggleDropdown}
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
