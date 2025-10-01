<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		isScrolled: boolean;
		onClick?: () => void;
	}

	let { isScrolled, onClick }: Props = $props();

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			// Default behavior: scroll to top
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};
</script>

<button
	type="button"
	class="focus:outline-none"
	onclick={handleClick}
	title="Scroll to top"
>
	<img
		src="/logos/lucid-logo-light.svg"
		alt="LUCID"
		class="transition-all duration-300 {isScrolled ? 'h-15' : 'h-25'}"
	/>
</button>
