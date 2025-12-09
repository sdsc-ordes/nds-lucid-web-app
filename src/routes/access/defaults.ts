export { translation } from '@sjsf/form/translations/en'

export { resolver } from '@sjsf/form/resolvers/basic'

// Import extra fields - must be imported before theme
import '@sjsf/form/fields/extra-fields/enum-include'
import '@sjsf/form/fields/extra-fields/multi-enum-include'

export { theme } from '@sjsf/skeleton3-theme'

// Import extra widgets for Skeleton theme
import '@sjsf/skeleton3-theme/extra-widgets/checkboxes-include'

// Simple validator for the form
export const validator = { isValid: () => true }

export const idPrefix = 'access-form'
