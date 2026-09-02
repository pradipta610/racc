import type { Metadata } from 'next'
import { ContentTrackerClient } from '@/components/tools/ContentTrackerClient'

export const metadata: Metadata = {
  title: 'Content Tracker — RACC internal tools',
  description: 'Track content from draft to published — real-time, shared across the team.',
}

export default function ContentTrackerPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Content Tracker
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Drag content across Draft, Review, Revision, and Published — everyone sees the same board update live.
        </p>
      </div>
      <ContentTrackerClient />
    </div>
  )
}
