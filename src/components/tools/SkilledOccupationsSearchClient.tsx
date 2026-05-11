'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import type { AnzscoList, AnzscoOccupation } from '@/lib/types'
import { getStateCode, getVisaSubclass } from '@/lib/anzsco-utils'
import { highlightText } from '@/lib/highlight'

const LIST_OPTIONS: AnzscoList[] = ['MLTSSL', 'STSOL', 'ROL', 'CSOL']
const STATE_OPTIONS = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

const PAGE_SIZE = 30

interface Props {
  occupations: AnzscoOccupation[]
}

type FlagFilter = 'dama' | 'ila' | 'srlap' | 'in_shortage'

export function SkilledOccupationsSearchClient({ occupations }: Props) {
  const [query, setQuery] = useState('')
  const [selectedLists, setSelectedLists] = useState<Set<string>>(new Set())
  const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set())
  const [selectedVisas, setSelectedVisas] = useState<Set<string>>(new Set())
  const [selectedFlags, setSelectedFlags] = useState<Set<FlagFilter>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Build distinct visa subclass list from data (sorted)
  const allVisaSubclasses = useMemo(() => {
    const set = new Set<string>()
    occupations.forEach((o) => {
      o.eligible_visas.forEach((v) => {
        const code = getVisaSubclass(v)
        if (code) set.add(code)
      })
    })
    return Array.from(set).sort()
  }, [occupations])

  const q = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return occupations.filter((o) => {
      // Search
      if (q) {
        const hay =
          `${o.anzsco} ${o.occupation} ${o.alt_titles}`.toLowerCase()
        if (!hay.includes(q)) return false
      }

      // Lists (OR within group)
      if (selectedLists.size > 0) {
        const has = o.lists.some((l) => selectedLists.has(l))
        if (!has) return false
      }

      // States (OR within group)
      if (selectedStates.size > 0) {
        const has = o.state_nomination.some((s) => {
          const code = getStateCode(s)
          return code != null && selectedStates.has(code)
        })
        if (!has) return false
      }

      // Visa subclass
      if (selectedVisas.size > 0) {
        const codes = new Set<string>()
        o.eligible_visas.forEach((v) => {
          const c = getVisaSubclass(v)
          if (c) codes.add(c)
        })
        const has = Array.from(selectedVisas).some((c) => codes.has(c))
        if (!has) return false
      }

      // Flags
      if (selectedFlags.has('dama') && !o.dama) return false
      if (selectedFlags.has('ila') && !o.ila) return false
      if (selectedFlags.has('srlap') && !o.srlap) return false
      if (selectedFlags.has('in_shortage') && o.no_shortage) return false

      return true
    })
  }, [occupations, q, selectedLists, selectedStates, selectedVisas, selectedFlags])

  const visible = filtered.slice(0, visibleCount)

  const toggleSet = <T extends string>(
    s: Set<T>,
    setS: React.Dispatch<React.SetStateAction<Set<T>>>,
    value: T,
  ) => {
    const next = new Set(s)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setS(next)
    setVisibleCount(PAGE_SIZE)
  }

  const clearAll = () => {
    setQuery('')
    setSelectedLists(new Set())
    setSelectedStates(new Set())
    setSelectedVisas(new Set())
    setSelectedFlags(new Set())
    setVisibleCount(PAGE_SIZE)
  }

  const hasActiveFilters =
    q.length > 0 ||
    selectedLists.size > 0 ||
    selectedStates.size > 0 ||
    selectedVisas.size > 0 ||
    selectedFlags.size > 0

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
          onChange={(e) => {
            setQuery(e.target.value)
            setVisibleCount(PAGE_SIZE)
          }}
          placeholder="Search ANZSCO code, occupation, atau alt title (e.g. 261313, nurse, accountant…)"
          className="sos-input"
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
            onClick={() => { setQuery(''); setVisibleCount(PAGE_SIZE) }}
            style={clearBtn}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        padding: 14, borderRadius: 12,
        border: '1px solid var(--border)', background: 'var(--white)',
      }}>
        <FilterGroup label="List">
          {LIST_OPTIONS.map((l) => (
            <Chip
              key={l}
              active={selectedLists.has(l)}
              onClick={() => toggleSet(selectedLists, setSelectedLists, l)}
            >
              {l}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="State nomination">
          {STATE_OPTIONS.map((s) => (
            <Chip
              key={s}
              active={selectedStates.has(s)}
              onClick={() => toggleSet(selectedStates, setSelectedStates, s)}
            >
              {s}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Visa subclass">
          {allVisaSubclasses.map((v) => (
            <Chip
              key={v}
              active={selectedVisas.has(v)}
              onClick={() => toggleSet(selectedVisas, setSelectedVisas, v)}
            >
              {v}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Flags">
          <Chip
            active={selectedFlags.has('dama')}
            onClick={() => toggleSet(selectedFlags, setSelectedFlags, 'dama')}
          >
            DAMA
          </Chip>
          <Chip
            active={selectedFlags.has('ila')}
            onClick={() => toggleSet(selectedFlags, setSelectedFlags, 'ila')}
          >
            ILA
          </Chip>
          <Chip
            active={selectedFlags.has('srlap')}
            onClick={() => toggleSet(selectedFlags, setSelectedFlags, 'srlap')}
          >
            SRLAP
          </Chip>
          <Chip
            active={selectedFlags.has('in_shortage')}
            onClick={() => toggleSet(selectedFlags, setSelectedFlags, 'in_shortage')}
          >
            In-shortage
          </Chip>
        </FilterGroup>
      </div>

      {/* Summary + clear */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: 'var(--tl)', flexWrap: 'wrap', gap: 8,
      }}>
        <span>
          {filtered.length.toLocaleString()} of {occupations.length.toLocaleString()} occupations
          {filtered.length > visible.length && ` · showing ${visible.length}`}
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--blue, #1c3a8a)', fontSize: 12, padding: 0,
          }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <div style={{
          padding: 32, textAlign: 'center',
          fontSize: 14, fontStyle: 'italic', color: 'var(--tl)',
          borderRadius: 12, border: '1px solid var(--border)', background: 'var(--white)',
        }}>
          Tidak ada match
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map((o) => (
            <OccupationCard key={`${o.anzsco}-${o.occupation}`} occ={o} query={query} />
          ))}
        </div>
      )}

      {filtered.length > visible.length && (
        <button
          onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
          style={{
            padding: '10px 16px', borderRadius: 8,
            border: '1px solid var(--border)', background: 'var(--white)',
            color: 'var(--td)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', alignSelf: 'center', fontFamily: 'inherit',
          }}
        >
          Load {Math.min(PAGE_SIZE, filtered.length - visible.length)} more
        </button>
      )}

      <style>{`
        .sos-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 2px rgba(91,163,217,.2);
        }
        .sos-input::placeholder { color: var(--tl); }
        .sos-chip:hover { border-color: var(--sky); }
        .sos-chip-active:hover { border-color: var(--blue, #1c3a8a); }
      `}</style>
    </div>
  )
}

const clearBtn: CSSProperties = {
  position: 'absolute', right: 10, top: '50%',
  transform: 'translateY(-50%)', background: 'none',
  border: 'none', cursor: 'pointer', color: 'var(--tl)',
  fontSize: 16, lineHeight: 1, padding: 2,
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
      <div style={{
        fontSize: 11, fontWeight: 500, color: 'var(--tl)',
        textTransform: 'uppercase', letterSpacing: '0.04em',
        minWidth: 100, paddingTop: 6,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={active ? 'sos-chip sos-chip-active' : 'sos-chip'}
      style={{
        padding: '5px 11px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        background: active ? 'var(--blue, #1c3a8a)' : 'var(--white)',
        color: active ? 'var(--white)' : 'var(--tm)',
        border: active ? '1px solid var(--blue, #1c3a8a)' : '1px solid var(--border)',
        transition: 'all .15s',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

function OccupationCard({ occ, query }: { occ: AnzscoOccupation; query: string }) {
  return (
    <div style={{
      padding: 14, borderRadius: 12,
      border: '1px solid var(--border)', background: 'var(--white)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12, fontWeight: 600,
          color: 'var(--navy, #0b1f4a)',
          background: 'var(--light)',
          padding: '3px 7px',
          borderRadius: 5,
        }}>
          {occ.anzsco}
        </span>
        <span
          style={{ fontSize: 14, fontWeight: 500, color: 'var(--td)' }}
          dangerouslySetInnerHTML={{ __html: highlightText(occ.occupation, query) }}
        />
        {occ.skill_level && (
          <span style={{
            fontSize: 11, color: 'var(--tm)',
            padding: '2px 7px', borderRadius: 99,
            background: 'var(--light)',
          }}>
            Skill {occ.skill_level}
          </span>
        )}
        {occ.tier && (
          <span style={{
            fontSize: 11, color: 'var(--tm)',
            padding: '2px 7px', borderRadius: 99,
            background: 'var(--light)',
          }}>
            Tier {occ.tier}
          </span>
        )}
        {occ.assessed_by && (
          <span style={{ fontSize: 11, color: 'var(--tl)' }}>
            Assessed by {occ.assessed_by}
          </span>
        )}
      </div>

      {/* Alt titles */}
      {occ.alt_titles && (
        <p
          style={{ fontSize: 12, color: 'var(--tl)', marginTop: 6, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{
            __html: `Alt: ${highlightText(occ.alt_titles, query)}`,
          }}
        />
      )}

      {/* Lists row */}
      {occ.lists.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {occ.lists.map((l) => (
            <span key={l} style={pillStyle('list')}>{l}</span>
          ))}
          {occ.no_shortage === false && (
            <span style={pillStyle('shortage')}>In-shortage</span>
          )}
          {occ.dama && <span style={pillStyle('dama')}>DAMA</span>}
          {occ.ila && <span style={pillStyle('ila')}>ILA</span>}
          {occ.srlap && <span style={pillStyle('srlap')}>SRLAP</span>}
          {occ.last_invited_points && occ.last_invited_points !== 'Not invited' && (
            <span style={pillStyle('default')}>Last invited: {occ.last_invited_points}</span>
          )}
        </div>
      )}

      {/* Eligible visas */}
      {occ.eligible_visas.length > 0 && (
        <Section label="Eligible visas">
          {occ.eligible_visas.map((v, i) => (
            <span key={i} style={pillStyle('visa')}>{v}</span>
          ))}
        </Section>
      )}

      {/* State nominations */}
      {occ.state_nomination.length > 0 && (
        <Section label="State nominations">
          {occ.state_nomination.map((s, i) => (
            <span key={i} style={pillStyle('state')}>{s}</span>
          ))}
        </Section>
      )}

      {/* DAMA list */}
      {occ.dama_list.length > 0 && (
        <Section label="DAMA agreements">
          {occ.dama_list.map((d, i) => (
            <span key={i} style={pillStyle('default')}>{d}</span>
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{
        fontSize: 10, fontWeight: 500, color: 'var(--tl)',
        textTransform: 'uppercase', letterSpacing: '0.04em',
        marginBottom: 5,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  )
}

type PillKind = 'list' | 'visa' | 'state' | 'dama' | 'ila' | 'srlap' | 'shortage' | 'default'

function pillStyle(kind: PillKind): CSSProperties {
  const palette: Record<PillKind, { bg: string; color: string; border?: string }> = {
    list:     { bg: '#DBEAFE', color: '#1E40AF' },
    visa:     { bg: 'var(--light)', color: 'var(--tm)' },
    state:    { bg: '#F3E8FF', color: '#6B21A8' },
    dama:     { bg: '#FEF3C7', color: '#B45309' },
    ila:      { bg: '#DCFCE7', color: '#15803D' },
    srlap:    { bg: '#E0F2FE', color: '#075985' },
    shortage: { bg: '#FEE2E2', color: '#991B1B' },
    default:  { bg: 'var(--light)', color: 'var(--tm)' },
  }
  const c = palette[kind]
  return {
    fontSize: 11,
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: 99,
    background: c.bg,
    color: c.color,
    whiteSpace: 'nowrap',
  }
}
