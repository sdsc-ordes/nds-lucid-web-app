/** @type {import('tailwindcss').Config} */
import { THEME_CONTENT } from '@sjsf/skeleton-theme/preset'
import coolwind from '../static/themes/coolwind.css'
import * as themes from '@skeletonlabs/skeleton/themes';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // Include Skeleton UI components
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'), THEME_CONTENT 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    skeleton({
      themes: [coolwind, themes.cerberus],
    }),
    // Form elements
    require('@tailwindcss/forms'),
    // Typography
    require('@tailwindcss/typography'),
    // Skeleton UI
    require('@skeletonlabs/skeleton/tailwind/theme.cjs')
  ]
} 