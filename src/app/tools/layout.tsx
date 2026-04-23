import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internal tools — RACC Australia',
  description: 'Internal staff tools for RACC Migration.',
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--off)' }}>
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--white)',
        padding: '12px 5%',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="/tools" style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--navy)',
            textDecoration: 'none',
          }}>
            RACC internal tools
          </a>
          <a href="/" style={{
            fontSize: 12,
            color: 'var(--tl)',
            textDecoration: 'none',
          }}>
            ← Back to main site
          </a>
        </div>
      </header>
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 5%' }}>
        {children}
      </main>
    </div>
  )
}
