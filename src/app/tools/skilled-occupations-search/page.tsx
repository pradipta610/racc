import type { Metadata } from 'next'
import { getAnzscoData } from '@/lib/anzsco'
import { SkilledOccupationsSearchClient } from '@/components/tools/SkilledOccupationsSearchClient'

export const metadata: Metadata = {
  title: 'Skilled Occupations Search — RACC internal tools',
  description:
    'Internal tool — cari ANZSCO occupation, filter by visa list (MLTSSL/STSOL/ROL/CSOL), visa type, dan state nomination eligibility.',
}

export default async function SkilledOccupationsSearchPage() {
  const occupations = await getAnzscoData()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Skilled Occupations Search
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Internal tool — search & filter <strong style={{ color: 'var(--tm)' }}>{occupations.length.toLocaleString()}</strong> ANZSCO occupations by list, visa type, dan state nomination eligibility.
        </p>
      </div>

      <SkilledOccupationsSearchClient occupations={occupations} />
    </div>
  )
}
