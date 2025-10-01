import type { Schema, UiSchemaRoot } from '@sjsf/form';

export interface Concept {
	iri: string;
	label: string;
	definition: string;
	properties: any[];
}

export async function loadConcepts(): Promise<Concept[]> {
	const response = await fetch('/access-fields/output.json');
	return response.json();
}

export function createSchema(concepts: Concept[]): Schema {
	const schemaProperties: any = {};

	// Sort concepts alphabetically by label
	const sortedConcepts = [...concepts].sort((a, b) => a.label.localeCompare(b.label));

	sortedConcepts.forEach((concept) => {
		const conceptKey = sanitizeKey(concept.label);
		
		// All concepts shown as simple checkboxes with definition as description
		schemaProperties[conceptKey] = {
			type: 'boolean',
			title: concept.label,
			default: false
		};
	});

	return {
		type: 'object',
		title: 'Select Data Access Fields',
		description: 'Choose the SPHN concepts you want to request access to',
		properties: schemaProperties
	};
}

export function createUiSchema(concepts: Concept[]): UiSchemaRoot {
	// Sort concepts alphabetically by label
	const sortedConcepts = [...concepts].sort((a, b) => a.label.localeCompare(b.label));

	// Calculate rows needed for 3 columns
	const totalItems = sortedConcepts.length;
	const rowsNeeded = Math.ceil(totalItems / 3);
	
	const uiSchemaProperties: any = {
		'ui:options': {
			layouts: {
				'object-properties': {
					style: `display: grid; grid-template-rows: repeat(${rowsNeeded}, auto); grid-auto-flow: column; grid-template-columns: repeat(3, 1fr); gap: 0.5rem 2rem;`
				}
			},
			translations: {
				submit: 'Request Access'
			}
		}
	};

	// Configure each concept to show small description below checkbox
	sortedConcepts.forEach((concept) => {
		const conceptKey = sanitizeKey(concept.label);
		uiSchemaProperties[conceptKey] = {
			'ui:options': {
				layouts: {
					'field-wrapper': {
						style: 'margin-bottom: 0.75rem; break-inside: avoid; page-break-inside: avoid;'
					}
				}
			}
		};
	});

	return uiSchemaProperties;
}

// Helper function to sanitize concept labels for use as object keys
export function sanitizeKey(label: string): string {
	return label
		.replace(/[^a-zA-Z0-9]/g, '_')
		.replace(/^_+|_+$/g, '')
		.replace(/_+/g, '_');
}

export type FormValue = Record<string, any>;

export const initialValue: FormValue = {};