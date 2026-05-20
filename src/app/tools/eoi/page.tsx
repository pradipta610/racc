import type { Metadata } from 'next'
import { EOIBacklogClient } from '@/components/tools/EOIBacklogClient'

export const metadata: Metadata = {
  title: 'EOI Backlog — RACC internal tools',
  description:
    'Internal tool — lihat data EOI SkillSelect backlog per occupation, visa type, dan state.',
}

export default function EOIPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          EOI SkillSelect Backlog
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Internal tool — cari occupation, lihat data EOI submitted &amp; invited per visa type. Data dari SkillSelect.
        </p>
      </div>

      <EOIBacklogClient />
    </div>
  )
}
