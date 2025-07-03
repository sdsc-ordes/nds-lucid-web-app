import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";

// Import all locale files
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import de from "./locales/de/common.json";

// Define available locales
export const locales = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
};

// Type for translations
type TranslationDict = Record<string, any>;

// Define translation dictionaries
const translations: Record<string, TranslationDict> = {
    en,
    fr,
    de,
};

// Type for locale keys
export type Locale = keyof typeof translations;

// Create a writable store for the active locale
export const locale: Writable<Locale> = writable("en");

// Create a store containing the translations for the active locale
export const t = derived(locale, ($locale) => {
    return (key: string) => {
        // Split the key by dots to access nested properties
        const keys = key.split(".");

        // Get the translation object for the current locale
        let translation: any = translations[$locale];

        // Navigate through the nested keys
        for (const k of keys) {
            if (
                translation &&
                typeof translation === "object" &&
                k in translation
            ) {
                translation = translation[k];
            } else {
                console.warn(
                    `Translation key not found: ${key} in locale ${$locale}`,
                );
                return key; // Fallback to the key itself
            }
        }

        return translation;
    };
});

// Function to change the locale
export function setLocale(newLocale: Locale): void {
    locale.set(newLocale);
    // Store the chosen locale in localStorage for persistence
    if (typeof window !== "undefined") {
        localStorage.setItem("locale", newLocale);
    }
}

// Function to load the saved locale from localStorage
export function initLocale(): void {
    if (typeof window !== "undefined") {
        const savedLocale = localStorage.getItem("locale") as Locale | null;
        if (savedLocale && savedLocale in translations) {
            locale.set(savedLocale);
        }
    }
}
