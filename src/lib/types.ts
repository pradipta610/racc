export type ConsultationType = 'free' | 'paid'

export interface VisaProcessingRow {
  visaCode: string
  visaName: string
  streamCode: string
  streamName: string
  visaUrl: string | null
  percent25Days: number | null
  percent50Days: number | null
  percent75Days: number | null
  percent90Days: number | null
  percent25Text: string
  percent50Text: string
  percent75Text: string
  percent90Text: string
  fetchedAt: string
}

export interface ConsultationItem {
  id: string
  label: string
  consultation_type: ConsultationType
  keywords: string[]
  note: string | null
  link_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}
