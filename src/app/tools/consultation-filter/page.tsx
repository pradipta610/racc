import type { Metadata } from 'next'
import { ConsultationFilterClient } from '@/components/tools/ConsultationFilterClient'
import { supabase } from '@/lib/supabase'
import type { ConsultationItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Consultation filter — RACC internal tools',
  description:
    'Internal tool — cari visa atau service untuk tahu tipe konsultasi (Free / Paid).',
}

async function getConsultationItems(): Promise<ConsultationItem[]> {
  const { data, error } = await supabase
    .from('consultation_items')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    return []
  }

  return data as ConsultationItem[]
}

export const revalidate = 60

export default async function ConsultationFilterPage() {
  const items = await getConsultationItems()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          RACC consultation filter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Internal tool — cari visa atau service untuk tahu tipe konsultasi
          (Free / Paid).
        </p>
      </div>

      <ConsultationFilterClient items={items} />
    </div>
  )
}
