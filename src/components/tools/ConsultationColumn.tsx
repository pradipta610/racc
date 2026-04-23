import type { ConsultationItem, ConsultationType } from '@/lib/types'
import { highlightText } from '@/lib/highlight'

interface ConsultationColumnProps {
  type: ConsultationType
  items: ConsultationItem[]
  query: string
}

export function ConsultationColumn({
  type,
  items,
  query,
}: ConsultationColumnProps) {
  const isFree = type === 'free'
  const title = isFree ? 'Free consultation' : 'Paid consultation'
  const icon = isFree ? '✅' : '💰'
  const badgeBg = isFree ? '#DCFCE7' : '#FEF3C7'
  const badgeColor = isFree ? '#15803D' : '#B45309'

  return (
    <div style={{
      borderRadius: 12,
      border: '1px solid var(--border)',
      background: 'var(--white)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderBottom: '1px solid var(--border)',
        padding: '12px 16px',
      }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--td)' }}>{title}</span>
        <span style={{
          borderRadius: 99,
          padding: '2px 8px',
          fontSize: 10,
          fontWeight: 500,
          background: badgeBg,
          color: badgeColor,
        }}>
          {isFree ? 'Free' : 'Paid'}
        </span>
        <span style={{
          borderRadius: 99,
          padding: '2px 8px',
          fontSize: 10,
          fontWeight: 500,
          background: 'var(--light)',
          color: 'var(--tm)',
        }}>
          {items.length}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px' }}>
        {items.length > 0 ? (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item) => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                <span style={{
                  marginTop: 6,
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--border)',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(item.label, query),
                      }}
                    />
                    {item.link_url && (
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: 'var(--blue, #1c3a8a)',
                          textDecoration: 'none',
                          padding: '2px 8px',
                          borderRadius: 99,
                          background: 'var(--light)',
                          border: '1px solid var(--border)',
                          whiteSpace: 'nowrap',
                          transition: 'all .15s',
                        }}
                        className="cf-link-pill"
                      >
                        View page ↗
                      </a>
                    )}
                  </div>
                  {item.note && (
                    <p style={{ marginTop: 2, fontSize: 11, color: 'var(--tl)' }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--tl)' }}>Tidak ada match</p>
        )}
      </div>
    </div>
  )
}
