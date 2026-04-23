import Link from 'next/link'

const tools = [
  {
    name: 'Consultation filter',
    description: 'Cari visa atau service untuk tahu tipe konsultasi (Free / Paid).',
    href: '/tools/consultation-filter',
    icon: '🔍',
  },
]

export default function ToolsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
        Internal tools
      </h1>
      <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
        Staff reference tools for RACC Migration.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginTop: 24,
      }}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card">
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'var(--light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}>
                  {tool.icon}
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--td)' }}>
                  {tool.name}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--tl)', marginTop: 10, lineHeight: 1.5 }}>
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .tool-card {
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--white);
          text-decoration: none;
          color: inherit;
          display: block;
          transition: all .2s ease;
        }
        .tool-card:hover {
          border-color: var(--sky);
          box-shadow: 0 4px 16px rgba(28,58,138,.08);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}
