<script lang="ts">
	import { BasicForm, createForm } from '@sjsf/form';
	import { resolver } from '@sjsf/form/resolvers/basic';
	import { translation } from '@sjsf/form/translations/en';
	import { theme } from '@sjsf/skeleton3-theme';
	import '@sjsf/skeleton3-theme/extra-widgets/textarea-include';
	import '@sjsf/skeleton3-theme/extra-widgets/checkboxes-include';
	import '@sjsf/form/fields/extra-fields/multi-enum-include';

	interface Props {
		schema: any;
		uiSchema: any;
		initialValue: any;
		disabled?: boolean;
		onSubmit?: (data: any, e: SubmitEvent) => void;
		onChange?: (data: any) => void;
	}

	let { schema, uiSchema, initialValue, disabled = false, onSubmit, onChange }: Props = $props();

	const idPrefix = 'daa-form';
	const validator = { isValid: () => true };

	let form = $state<ReturnType<typeof createForm> | undefined>(undefined);

	const handleSubmit = (data: any, e: SubmitEvent) => {
		if (onSubmit) {
			onSubmit(data, e);
		} else {
			console.log('Form submitted:', data);
		}
	};

	const handleChange = (data: any) => {
		if (onChange) {
			onChange(data);
		}
	};

	// Recreate form whenever schema or uiSchema changes
	$effect(() => {
		if (schema && uiSchema) {
			form = createForm({
				disabled,
				idPrefix,
				validator,
				resolver,
				theme,
				initialValue,
				schema,
				uiSchema,
				translation,
				onSubmit: handleSubmit
			});
		}
	});

	// Remove the onChange effect to prevent infinite loops
	// The forms will sync through the shared initialValue prop
</script>

{#if form}
	<div class="form-wrapper rounded-lg p-4 border-2 border-surface-400 dark:border-surface-800">
		<BasicForm {form} style="margin-bottom: 1rem;" data-theme="lucid" />
	</div>
{/if}

<style>
	/* Custom checkbox styling */
	:global(.form-wrapper input[type="checkbox"]) {
		appearance: none;
		-webkit-appearance: none;
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid var(--color-surface-400);
		border-radius: 0.375rem;
		margin-right: 0.75rem;
		cursor: pointer;
		position: relative;
		transition: all 0.2s ease;
		flex-shrink: 0;
		background-color: var(--color-surface-50);
	}

	:global(.form-wrapper input[type="checkbox"]:hover) {
		border-color: var(--color-primary-500);
	}

	:global(.form-wrapper input[type="checkbox"]:checked) {
		background-color: var(--color-primary-600);
		border-color: var(--color-primary-600);
	}

	:global(.form-wrapper input[type="checkbox"]:checked::after) {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		width: 0.35rem;
		height: 0.65rem;
		border: solid var(--color-surface-50);
		border-width: 0 2px 2px 0;
	}

	:global(.form-wrapper input[type="checkbox"]:focus) {
		outline: none;
		border-color: var(--color-primary-500);
	}

	/* Dark mode checkbox */
	:global(.dark .form-wrapper input[type="checkbox"]) {
		background-color: var(--color-surface-700);
		border-color: var(--color-surface-500);
	}

	:global(.dark .form-wrapper input[type="checkbox"]:checked) {
		background-color: var(--color-primary-500);
		border-color: var(--color-primary-500);
	}

	/* Make description text smaller and ensure it's below */
	:global(.form-wrapper .field-description),
	:global(.form-wrapper small) {
		display: block !important;
		font-size: 0.65rem !important;
		line-height: 1.2 !important;
		color: var(--color-surface-500) !important;
		margin-top: 0.25rem !important;
		margin-left: 2rem !important;
		margin-bottom: 0 !important;
		opacity: 0.7 !important;
		font-weight: 400 !important;
	}

	/* Add more spacing between checkbox fields */
	:global(.form-wrapper .field-boolean) {
		margin-bottom: 1rem !important;
	}

	/* Ensure labels stay on same line as checkbox */
	:global(.form-wrapper label) {
		display: flex !important;
		align-items: center !important;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	:global(.form-wrapper label:hover) {
		color: var(--color-primary-600);
	}

	/* Submit button styling */
	:global(.form-wrapper button[type="submit"]) {
		margin-top: 1.5rem;
		padding: 0.5rem 1.25rem;
		background-color: var(--color-primary-600);
		color: white;
		border-radius: 0.375rem;
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		border: none;
		cursor: pointer;
		align-self: flex-start;
	}

</style>
