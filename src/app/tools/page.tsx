import Link from 'next/link'

const tools = [
  {
    name: 'Consultation filter',
    description: 'Cari visa atau service untuk tahu tipe konsultasi (Free / Paid).',
    href: '/tools/consultation-filter',
    icon: '🔍',
    external: false,
  },
  {
    name: 'Skilled Occupations Search',
    description:
      'Cari 1,125 ANZSCO occupation — filter by visa list (MLTSSL/STSOL/ROL/CSOL), visa type, state eligibility, dan flags (DAMA/ILA/SRLAP).',
    href: '/tools/skilled-occupations-search/index.html',
    icon: '🧭',
    external: true,
  },
  {
    name: 'RACC Courses Directory',
    description:
      'Browse daftar course & institusi partner RACC di racc.co.id.',
    href: 'https://racc.co.id/courses/index.php',
    icon: '📚',
    external: true,
  },
  {
    name: 'Global Visa Processing Times',
    description:
      'Snapshot 76 visa subclass — cari & sort by 25 / 50 / 75 / 90 percentile processing time dari Home Affairs.',
    href: '/tools/visa-processing-times',
    icon: '⏱️',
    external: false,
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
        {tools.map((tool) => {
          const cardContent = (
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
          )
          const isAbsolute = /^https?:\/\//i.test(tool.href)
          return tool.external ? (
            <a
              key={tool.href}
              href={tool.href}
              className="tool-card"
              target={isAbsolute ? '_blank' : undefined}
              rel={isAbsolute ? 'noopener noreferrer' : undefined}
            >
              {cardContent}
            </a>
          ) : (
            <Link key={tool.href} href={tool.href} className="tool-card">
              {cardContent}
            </Link>
          )
        })}
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
