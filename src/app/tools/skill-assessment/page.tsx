import type { Metadata } from 'next'
import { SkillAssessmentClient } from '@/components/tools/SkillAssessmentClient'

export const metadata: Metadata = {
  title: 'Skill Assessment — RACC internal tools',
  description: 'Cari occupation, lihat assessing authority, biaya, dan processing time untuk skill assessment Australia.',
}

export default function SkillAssessmentPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Skill Assessment
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          714 occupations — cari by nama atau ANZSCO, filter by list type &amp; assessing authority. Klik baris untuk lihat detail biaya &amp; processing time.
        </p>
      </div>
      <SkillAssessmentClient />
    </div>
  )
}
