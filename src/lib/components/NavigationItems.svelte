<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { handleNavClick } from '$lib/utils/scroll';
	import { goto } from '$app/navigation';

	interface NavLink {
		href: string;
		label: string;
		action?: 'scroll' | 'navigate';
	}

	interface Props {
		navLinks: NavLink[];
		activeSection: string;
		onNavClick?: (event: Event, href: string) => void;
		isMobile?: boolean;
	}

	let { navLinks, activeSection, onNavClick, isMobile = false }: Props = $props();

	const handleClick = (event: Event, href: string, action: 'scroll' | 'navigate' = 'scroll') => {
		if (action === 'navigate') {
			event.preventDefault();
			goto(href);
		} else if (onNavClick) {
			onNavClick(event, href);
		} else {
			handleNavClick(event, href);
		}
	};
</script>

{#if isMobile}
	<!-- Mobile Navigation -->
	<nav class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-4 shadow-lg z-100 w-60">
		<ul class="flex flex-col gap-4">
			{#each navLinks as { href, label, action = 'scroll' }}
				<li>
					<a
						{href}
						class="text-primary-900 active:text-primary-500 focus:text-primary-500 transition-colors duration-200 block
							{activeSection === href ? 'text-tertiary-500' : ''}"
						onclick={(e) => handleClick(e, href, action)}
					>
						{$t(label)}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{:else}
	<!-- Desktop Navigation -->
	<nav class="hidden md:flex items-center">
		{#each navLinks as { href, label, action = 'scroll' }}
			<a
				{href}
				class="text-surface-50 hover:text-primary-400 transition-colors duration-200 whitespace-nowrap px-3
					{activeSection === href ? 'text-tertiary-500' : ''}"
				onclick={(e) => handleClick(e, href, action)}
			>
				{$t(label)}
			</a>
		{/each}
	</nav>
{/if}
