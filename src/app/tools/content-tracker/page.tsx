import type { Metadata } from 'next'
import { ContentTrackerClient } from '@/components/tools/ContentTrackerClient'

export const metadata: Metadata = {
  title: 'Content Tracker — RACC internal tools',
  description: 'Lacak konten dari draft sampai terbit — pengganti spreadsheet, real-time untuk seluruh tim.',
}

export default function ContentTrackerPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Content Tracker
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Geser konten dari Draft ke Review, Revisi, sampai Terbit — semua orang lihat update yang sama.
        </p>
      </div>
      <ContentTrackerClient />
    </div>
  )
}
