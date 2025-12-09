import type { Schema, UiSchemaRoot } from '@sjsf/form'

export interface Concept {
    iri: string
    label: string
    definition: string
    properties: any[]
}

export async function loadConcepts(): Promise<Concept[]> {
    const response = await fetch('/access-fields/output.json')
    return response.json()
}

export function createSchema(concepts: Concept[]): Schema {
    // JSON schema no longer used (form replaced by custom selector)
    return { type: 'object', properties: {} }
}

export function createUiSchema(concepts: Concept[]): UiSchemaRoot {
    // UI schema not used in custom selector
    return {}
}

// Helper function to sanitize concept labels for use as object keys
export function sanitizeKey(label: string): string {
    return label
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/^_+|_+$/g, '')
        .replace(/_+/g, '_')
}

export type FormValue = Record<string, any>

export const initialValue: FormValue = {}
