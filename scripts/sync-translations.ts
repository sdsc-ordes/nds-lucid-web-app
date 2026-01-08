/**
 * Script to sync translations from Google Sheets to common.json files
 *
 * Expected Google Sheet structure (one tab per locale: en, de, fr, it):
 * | section | key   | value                    |
 * |---------|-------|--------------------------|
 * | hero    | landing-title | Quality of Care... |
 * | hero    | landing-description | ...        |
 *
 * Usage:
 *   GOOGLE_SERVICE_ACCOUNT_KEY=<json> TRANSLATION_SHEET_ID=<id> npx tsx scripts/sync-translations.ts
 */

import { google } from 'googleapis'
import { writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOCALES_DIR = join(__dirname, '../src/lib/i18n/locales')

const LOCALES = ['en', 'de', 'fr', 'it'] as const
type Locale = (typeof LOCALES)[number]

interface TranslationRow {
    section: string
    key: string
    value: string
}

function getEnvVar(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

function parseServiceAccountKey(): object {
    const keyJson = getEnvVar('GOOGLE_SERVICE_ACCOUNT_KEY')
    try {
        return JSON.parse(keyJson)
    } catch {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON')
    }
}

async function fetchSheetData(
    sheets: ReturnType<typeof google.sheets>,
    spreadsheetId: string,
    locale: Locale
): Promise<TranslationRow[]> {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${locale}!A:C`, // section, key, value columns
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) {
        console.warn(`No data found for locale: ${locale}`)
        return []
    }

    // Skip header row, map to objects
    return rows.slice(1).map((row) => ({
        section: row[0]?.trim() || '',
        key: row[1]?.trim() || '',
        value: row[2] || '', // Don't trim value to preserve intentional whitespace
    }))
}

function convertRowsToNestedJson(rows: TranslationRow[]): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {}

    for (const row of rows) {
        if (!row.section || !row.key) {
            continue // Skip empty rows
        }

        if (!result[row.section]) {
            result[row.section] = {}
        }

        result[row.section][row.key] = row.value
    }

    return result
}

function sortObjectKeys<T extends Record<string, unknown>>(obj: T): T {
    const sorted = {} as T
    for (const key of Object.keys(obj).sort()) {
        const value = obj[key]
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            sorted[key as keyof T] = sortObjectKeys(value as Record<string, unknown>) as T[keyof T]
        } else {
            sorted[key as keyof T] = value as T[keyof T]
        }
    }
    return sorted
}

function writeLocaleFile(locale: Locale, data: Record<string, Record<string, string>>): boolean {
    const filePath = join(LOCALES_DIR, locale, 'common.json')

    // Sort keys for consistent output
    const sortedData = sortObjectKeys(data)
    const newContent = JSON.stringify(sortedData, null, 2) + '\n'

    // Check if content changed
    try {
        const existingContent = readFileSync(filePath, 'utf-8')
        if (existingContent === newContent) {
            console.log(`  ${locale}: No changes`)
            return false
        }
    } catch {
        // File doesn't exist, will create
    }

    writeFileSync(filePath, newContent)
    console.log(`  ${locale}: Updated`)
    return true
}

async function main() {
    console.log('Syncing translations from Google Sheets...\n')

    const spreadsheetId = getEnvVar('TRANSLATION_SHEET_ID')
    const credentials = parseServiceAccountKey()

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    let hasChanges = false

    for (const locale of LOCALES) {
        try {
            const rows = await fetchSheetData(sheets, spreadsheetId, locale)
            const json = convertRowsToNestedJson(rows)
            const changed = writeLocaleFile(locale, json)
            if (changed) hasChanges = true
        } catch (error) {
            console.error(`Error processing locale ${locale}:`, error)
            process.exit(1)
        }
    }

    console.log('')
    if (hasChanges) {
        console.log('✓ Translations updated successfully')
    } else {
        console.log('✓ All translations are already up to date')
    }
}

main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
})
