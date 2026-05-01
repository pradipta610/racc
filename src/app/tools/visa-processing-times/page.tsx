import type { Metadata } from 'next'
import { getVisaProcessingData } from '@/lib/visa-processing'
import { VisaProcessingTimesClient } from '@/components/tools/VisaProcessingTimesClient'

export const metadata: Metadata = {
  title: 'Global visa processing times — RACC internal tools',
  description:
    'Internal tool — cari Australian visa subclass untuk lihat processing time (25 / 50 / 75 / 90 percentile).',
}

export default async function VisaProcessingTimesPage() {
  const { rows, dataLabel, lastFetched } = await getVisaProcessingData()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Global visa processing times
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Internal tool — cari visa subclass, lihat processing time 25 / 50 / 75 / 90 percentile. Data snapshot: <strong style={{ color: 'var(--tm)' }}>{dataLabel}</strong>.
        </p>
      </div>

      <VisaProcessingTimesClient rows={rows} lastFetched={lastFetched} />
    </div>
  )
}
