import fs from 'node:fs/promises'
import path from 'node:path'
import type { VisaProcessingRow } from './types'

const JSON_FILENAME = 'Global Visa Processing Times May 2026.json'

interface RawEntry {
  visaCode: string
  visaName: string
  streamCode: string
  streamName: string
  processingData?: {
    success?: boolean
    data?: Array<{
      VisaUrl?: string
      Percent25?: string
      Percent50?: string
      Percent75?: string
      Percent90?: string
      Percent25Text?: string
      Percent50Text?: string
      Percent75Text?: string
      Percent90Text?: string
    }>
  }
  fetchedAt: string
}

const toNumber = (value: string | undefined): number | null => {
  if (!value) return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export async function getVisaProcessingData(): Promise<{
  rows: VisaProcessingRow[]
  dataLabel: string
  lastFetched: string | null
}> {
  const filePath = path.join(process.cwd(), 'public', JSON_FILENAME)
  const raw = await fs.readFile(filePath, 'utf-8')
  const entries: RawEntry[] = JSON.parse(raw)

  const rows: VisaProcessingRow[] = entries.map((entry) => {
    const d = entry.processingData?.data?.[0]
    const visaUrl = d?.VisaUrl
      ? d.VisaUrl.startsWith('http')
        ? d.VisaUrl
        : `https://immi.homeaffairs.gov.au${d.VisaUrl}`
      : null

    return {
      visaCode: entry.visaCode,
      visaName: entry.visaName,
      streamCode: entry.streamCode ?? '',
      streamName: entry.streamName ?? '',
      visaUrl,
      percent25Days: toNumber(d?.Percent25),
      percent50Days: toNumber(d?.Percent50),
      percent75Days: toNumber(d?.Percent75),
      percent90Days: toNumber(d?.Percent90),
      percent25Text: d?.Percent25Text ?? '—',
      percent50Text: d?.Percent50Text ?? '—',
      percent75Text: d?.Percent75Text ?? '—',
      percent90Text: d?.Percent90Text ?? '—',
      fetchedAt: entry.fetchedAt,
    }
  })

  const lastFetched = rows
    .map((r) => r.fetchedAt)
    .filter(Boolean)
    .sort()
    .pop() ?? null

  // Derive "May 2026" label from filename
  const dataLabel = JSON_FILENAME.replace(/^Global Visa Processing Times\s*/i, '')
    .replace(/\.json$/i, '')
    .trim()

  return { rows, dataLabel, lastFetched }
}
