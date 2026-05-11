import fs from 'node:fs/promises'
import path from 'node:path'
import type { AnzscoOccupation } from './types'

const JSON_FILENAME = 'ANZSCO Data (1).json'

export async function getAnzscoData(): Promise<AnzscoOccupation[]> {
  const filePath = path.join(process.cwd(), 'public', JSON_FILENAME)
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as AnzscoOccupation[]
}

// Extract unique state codes (e.g. "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA")
// from state_nomination strings like "ACT – 190".
export function getStateCode(entry: string): string | null {
  const m = entry.match(/^([A-Z]{2,4})\s*[–-]/)
  return m ? m[1] : null
}

// Extract visa subclass (3 digits) from strings like "189 Skilled Independent" or "ACT – 190".
export function getVisaSubclass(entry: string): string | null {
  const m = entry.match(/\b(\d{3})\b/)
  return m ? m[1] : null
}
