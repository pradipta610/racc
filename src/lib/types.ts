export type ConsultationType = 'free' | 'paid'

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
