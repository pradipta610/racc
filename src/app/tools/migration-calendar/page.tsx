import type { Metadata } from 'next'
import { MigrationCalendarClient } from '@/components/tools/MigrationCalendarClient'

export const metadata: Metadata = {
  title: 'Migration Intelligence Calendar — RACC internal tools',
  description: 'Internal tool — roadmap konten 12 bulan untuk AI citation strategy.',
}

export default function MigrationCalendarPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Migration Intelligence Calendar
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Roadmap konten 12 bulan — AI citation strategy, topical authority, dan knowledge graph planning.
        </p>
      </div>
      <MigrationCalendarClient />
    </div>
  )
}
