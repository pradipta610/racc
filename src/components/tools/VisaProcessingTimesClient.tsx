'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import type { VisaProcessingRow } from '@/lib/types'
import { highlightText } from '@/lib/highlight'

type SortKey = 'visa' | 'p25' | 'p50' | 'p75' | 'p90'
type SortDir = 'asc' | 'desc'

interface Props {
  rows: VisaProcessingRow[]
  lastFetched: string | null
}

export function VisaProcessingTimesClient({ rows, lastFetched }: Props) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('visa')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const q = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!q) return rows
    return rows.filter((r) => {
      return (
        r.visaName.toLowerCase().includes(q) ||
        r.visaCode.toLowerCase().includes(q) ||
        r.streamName.toLowerCase().includes(q) ||
        r.streamCode.toLowerCase().includes(q)
      )
    })
  }, [rows, q])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    const dir = sortDir === 'asc' ? 1 : -1
    copy.sort((a, b) => {
      if (sortKey === 'visa') {
        const aKey = `${a.visaCode} ${a.streamName}`.toLowerCase()
        const bKey = `${b.visaCode} ${b.streamName}`.toLowerCase()
        return aKey.localeCompare(bKey) * dir
      }
      const aVal = getDays(a, sortKey)
      const bVal = getDays(b, sortKey)
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      return (aVal - bVal) * dir
    })
    return copy
  }, [filtered, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'visa' ? 'asc' : 'desc')
    }
  }

  const thStyle = (key: SortKey, align: 'left' | 'right' = 'left'): CSSProperties => ({
    padding: '10px 12px',
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--tl)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    textAlign: align,
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    userSelect: 'none',
    background: 'var(--off)',
    whiteSpace: 'nowrap',
  })

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  const lastFetchedDisplay = lastFetched
    ? new Date(lastFetched).toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)', color: 'var(--tl)',
          fontSize: 14, pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search visa code, name, atau stream (e.g. 485, partner, skilled)…"
          className="vpt-input"
          style={{
            width: '100%',
            padding: '10px 36px 10px 36px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--white)',
            fontSize: 14,
            color: 'var(--td)',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        {q && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: 10, top: '50%',
              transform: 'translateY(-50%)', background: 'none',
              border: 'none', cursor: 'pointer', color: 'var(--tl)',
              fontSize: 16, lineHeight: 1, padding: 2,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Summary */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: 'var(--tl)', flexWrap: 'wrap', gap: 8,
      }}>
        <span>
          {sorted.length} of {rows.length} visas
        </span>
        <span>Last fetched: <strong style={{ color: 'var(--tm)' }}>{lastFetchedDisplay}</strong></span>
      </div>

      {/* Table */}
      <div style={{
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--white)',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={thStyle('visa')} onClick={() => toggleSort('visa')}>
                  Visa{sortIndicator('visa')}
                </th>
                <th style={thStyle('p25', 'right')} onClick={() => toggleSort('p25')}>
                  25%{sortIndicator('p25')}
                </th>
                <th style={thStyle('p50', 'right')} onClick={() => toggleSort('p50')}>
                  50%{sortIndicator('p50')}
                </th>
                <th style={thStyle('p75', 'right')} onClick={() => toggleSort('p75')}>
                  75%{sortIndicator('p75')}
                </th>
                <th style={thStyle('p90', 'right')} onClick={() => toggleSort('p90')}>
                  90%{sortIndicator('p90')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{
                    padding: '24px 12px', textAlign: 'center',
                    fontSize: 13, fontStyle: 'italic', color: 'var(--tl)',
                  }}>
                    Tidak ada match
                  </td>
                </tr>
              ) : (
                sorted.map((r, idx) => (
                  <tr key={`${r.visaCode}-${r.streamCode}-${idx}`} style={{
                    borderBottom: idx === sorted.length - 1 ? 'none' : '1px solid var(--border)',
                  }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--navy, #0b1f4a)',
                          background: 'var(--light)',
                          padding: '2px 6px',
                          borderRadius: 4,
                          flexShrink: 0,
                        }}>
                          {r.visaCode}
                        </span>
                        <span
                          style={{ color: 'var(--td)', fontWeight: 500 }}
                          dangerouslySetInnerHTML={{ __html: highlightText(cleanVisaName(r.visaName), query) }}
                        />
                        {r.streamName && (
                          <span
                            style={{ color: 'var(--tm)', fontSize: 12 }}
                            dangerouslySetInnerHTML={{ __html: `· ${highlightText(r.streamName, query)}` }}
                          />
                        )}
                        {r.visaUrl && (
                          <a
                            href={r.visaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 11, fontWeight: 500,
                              color: 'var(--blue, #1c3a8a)',
                              textDecoration: 'none',
                              padding: '2px 8px',
                              borderRadius: 99,
                              background: 'var(--light)',
                              border: '1px solid var(--border)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Home Affairs ↗
                          </a>
                        )}
                      </div>
                    </td>
                    <Cell text={r.percent25Text} days={r.percent25Days} />
                    <Cell text={r.percent50Text} days={r.percent50Days} />
                    <Cell text={r.percent75Text} days={r.percent75Days} />
                    <Cell text={r.percent90Text} days={r.percent90Days} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 12, color: 'var(--tl)', lineHeight: 1.8 }}>
        <p>
          * Data snapshot dari{' '}
          <a
            href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--blue, #1c3a8a)' }}
          >
            Department of Home Affairs
          </a>.
        </p>
        <p>** 25/50/75/90% = persentase aplikasi yang sudah diproses dalam durasi tsb (lebih rendah = lebih cepat).</p>
      </div>

      <style>{`
        .vpt-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 2px rgba(91,163,217,.2);
        }
        .vpt-input::placeholder { color: var(--tl); }
      `}</style>
    </div>
  )
}

function Cell({ text, days }: { text: string; days: number | null }) {
  return (
    <td style={{
      padding: '12px',
      textAlign: 'right',
      whiteSpace: 'nowrap',
      color: 'var(--td)',
      fontVariantNumeric: 'tabular-nums',
    }}>
      <div style={{ fontSize: 13 }}>{text}</div>
      {days != null && (
        <div style={{ fontSize: 10, color: 'var(--tl)', marginTop: 2 }}>
          {days} days
        </div>
      )}
    </td>
  )
}

function getDays(row: VisaProcessingRow, key: SortKey): number | null {
  switch (key) {
    case 'p25': return row.percent25Days
    case 'p50': return row.percent50Days
    case 'p75': return row.percent75Days
    case 'p90': return row.percent90Days
    default: return null
  }
}

// Strip trailing "(subclass ###)" since visaCode is shown as a pill
function cleanVisaName(name: string): string {
  return name.replace(/\s*\(subclass\s+\d+\w*\)\s*$/i, '').trim()
}
