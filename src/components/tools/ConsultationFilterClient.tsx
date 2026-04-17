'use client'

import { useState, useMemo, type CSSProperties } from 'react'
import type { ConsultationItem } from '@/lib/types'
import { ResultBanner } from './ResultBanner'
import { ConsultationColumn } from './ConsultationColumn'

type FilterTab = 'all' | 'free' | 'paid'

export function ConsultationFilterClient({
  items,
}: {
  items: ConsultationItem[]
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterTab>('all')

  const q = query.trim().toLowerCase()

  const matchesSearch = (item: ConsultationItem) => {
    if (!q) return true
    const labelMatch = item.label.toLowerCase().includes(q)
    const keywordMatch = item.keywords.some((kw) =>
      kw.toLowerCase().includes(q),
    )
    return labelMatch || keywordMatch
  }

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (filter !== 'all' && item.consultation_type !== filter) return false
        return matchesSearch(item)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, filter, q],
  )

  const freeItems = useMemo(
    () => filtered.filter((i) => i.consultation_type === 'free'),
    [filtered],
  )
  const paidItems = useMemo(
    () => filtered.filter((i) => i.consultation_type === 'paid'),
    [filtered],
  )

  const allCount = useMemo(
    () => items.filter(matchesSearch).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, q],
  )
  const freeTabCount = useMemo(
    () =>
      items.filter(
        (i) => i.consultation_type === 'free' && matchesSearch(i),
      ).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, q],
  )
  const paidTabCount = useMemo(
    () =>
      items.filter(
        (i) => i.consultation_type === 'paid' && matchesSearch(i),
      ).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, q],
  )

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: `All (${allCount})` },
    { key: 'free', label: `Free (${freeTabCount})` },
    { key: 'paid', label: `Paid (${paidTabCount})` },
  ]

  const isSearching = q.length > 0

  const tabStyle = (active: boolean): CSSProperties => ({
    padding: '7px 16px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'all .15s',
    background: active ? 'var(--white)' : 'transparent',
    color: active ? 'var(--td)' : 'var(--tl)',
    boxShadow: active ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
    fontFamily: 'inherit',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--tl)',
          fontSize: 14,
          pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search visa atau service (e.g. 485, partner, 189, nursing...)"
          className="cf-input"
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
        {isSearching && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--tl)',
              fontSize: 16,
              lineHeight: 1,
              padding: 2,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 4,
        borderRadius: 8,
        background: 'var(--light)',
        padding: 4,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={tabStyle(filter === tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Result banner */}
      {isSearching && (
        <ResultBanner
          query={query.trim()}
          freeCount={freeTabCount}
          paidCount={paidTabCount}
        />
      )}

      {/* Two-column grid */}
      <div className="cf-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        {(filter === 'all' || filter === 'free') && (
          <ConsultationColumn
            type="free"
            items={freeItems}
            query={query.trim()}
          />
        )}
        {(filter === 'all' || filter === 'paid') && (
          <ConsultationColumn
            type="paid"
            items={paidItems}
            query={query.trim()}
          />
        )}
      </div>

      {/* Footer notes */}
      <div style={{ fontSize: 12, color: 'var(--tl)', lineHeight: 1.8 }}>
        <p>* Paid consultation fees apply</p>
        <p>** Client within ~3 months is paid</p>
      </div>

      <style>{`
        .cf-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 2px rgba(91,163,217,.2);
        }
        .cf-input::placeholder {
          color: var(--tl);
        }
        @media (max-width: 640px) {
          .cf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
