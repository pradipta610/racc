'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { supabase } from '@/lib/supabase'

const VISA_MAP: Record<string, string> = {
  '189PTS Points-Tested Stream': '189 Skilled Independent',
  '190SAS Skilled Australian Sponsored': '190 State/Territory Nominated',
  '491SNR State or Territory Nominated - Regional': '491 State/Territory Nominated',
  '491FSR Family Sponsored - Regional': '491 Family Sponsored',
}
const VISA_KEYS = Object.keys(VISA_MAP)
const STATE_ORDER = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ANY']

interface OccOption { anzsco_code: string; occupation_name: string }
interface SubmittedRow { visa_type: string; points: string; count_eois: string }
interface InvitedRow { visa_type: string; month_submitted: string; count_eois: string }
interface StateRow { visa_type: string; nominated_state: string; count_eois: string }

export function EOIBacklogClient() {
  const [query, setQuery] = useState('')
  const [months, setMonths] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [occupations, setOccupations] = useState<OccOption[]>([])
  const [selectedOcc, setSelectedOcc] = useState<OccOption | null>(null)
  const [submitted, setSubmitted] = useState<SubmittedRow[]>([])
  const [invited, setInvited] = useState<InvitedRow[]>([])
  const [stateData, setStateData] = useState<StateRow[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingOcc, setLoadingOcc] = useState(true)
  const fetchIdRef = useRef(0)

  // Fetch months + occupations on mount
  useEffect(() => {
    ;(async () => {
      const [mRes, oRes] = await Promise.all([
        supabase.from('eoi_occupation_submitted').select('as_at_month').order('as_at_month', { ascending: false }),
        supabase.from('eoi_occupation_submitted').select('anzsco_code, occupation_name'),
      ])
      const uniqueMonths = [...new Set((mRes.data ?? []).map((r: { as_at_month: string }) => r.as_at_month))].sort().reverse() as string[]
      setMonths(uniqueMonths)
      if (uniqueMonths.length) setSelectedMonth(uniqueMonths[0])

      const occMap = new Map<string, string>()
      for (const r of (oRes.data ?? []) as { anzsco_code: string; occupation_name: string }[]) {
        if (!occMap.has(r.anzsco_code)) occMap.set(r.anzsco_code, r.occupation_name)
      }
      const list: OccOption[] = []
      occMap.forEach((name, code) => list.push({ anzsco_code: code, occupation_name: name }))
      list.sort((a, b) => a.occupation_name.localeCompare(b.occupation_name))
      setOccupations(list)
      setLoadingOcc(false)
    })()
  }, [])

  const fetchDetail = useCallback(async (occ: OccOption, month: string) => {
    const id = ++fetchIdRef.current
    setLoading(true)
    const [sRes, iRes, stRes] = await Promise.all([
      supabase.from('eoi_occupation_submitted').select('*').eq('anzsco_code', occ.anzsco_code).eq('as_at_month', month),
      supabase.from('eoi_occupation_invited').select('*').eq('anzsco_code', occ.anzsco_code).eq('as_at_month', month),
      supabase.from('eoi_by_state_points').select('*').eq('eoi_status', 'SUBMITTED').eq('as_at_month', month),
    ])
    if (id !== fetchIdRef.current) return
    setSubmitted((sRes.data ?? []) as SubmittedRow[])
    setInvited((iRes.data ?? []) as InvitedRow[])
    setStateData((stRes.data ?? []) as StateRow[])
    setLoading(false)
  }, [])

  const q = query.trim().toLowerCase()
  const filteredOccs = useMemo(() => {
    if (!q) return occupations.slice(0, 50)
    return occupations.filter(o =>
      o.occupation_name.toLowerCase().includes(q) || o.anzsco_code.includes(q)
    )
  }, [occupations, q])

  const formatMonth = (m: string) => {
    if (!m) return ''
    const d = new Date(m + '-01')
    return d.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Month selector */}
      {months.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12, color: 'var(--tl)', fontWeight: 500 }}>Data month:</label>
          <select
            value={selectedMonth}
            onChange={e => { const m = e.target.value; setSelectedMonth(m); if (selectedOcc) fetchDetail(selectedOcc, m) }}
            style={{
              padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)',
              fontSize: 13, fontFamily: 'inherit', color: 'var(--td)', background: 'var(--white)',
            }}
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tl)', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelectedOcc(null) }}
          placeholder="Search by occupation name or ANZSCO code..."
          className="eoi-input"
          style={{
            width: '100%', padding: '10px 36px', borderRadius: 8,
            border: '1px solid var(--border)', background: 'var(--white)',
            fontSize: 14, color: 'var(--td)', outline: 'none', fontFamily: 'inherit',
          }}
        />
        {q && (
          <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tl)', fontSize: 16, padding: 2 }}>✕</button>
        )}
      </div>

      {loadingOcc && <SkeletonList />}

      {/* Occupation list */}
      {!selectedOcc && !loadingOcc && (
        <div style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--white)', overflow: 'hidden' }}>
          {filteredOccs.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', fontSize: 13, color: 'var(--tl)', fontStyle: 'italic' }}>No occupations found</div>
          ) : (
            filteredOccs.map((o, i) => (
              <div
                key={o.anzsco_code}
                onClick={() => { setSelectedOcc(o); fetchDetail(o, selectedMonth) }}
                style={{
                  padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer', borderBottom: i < filteredOccs.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--off)')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}
              >
                <span style={{
                  background: 'var(--navy)', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '3px 8px', borderRadius: 6, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}>{o.anzsco_code}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--td)' }}>{o.occupation_name}</span>
              </div>
            ))
          )}
          {!q && occupations.length > 50 && (
            <div style={{ padding: 10, textAlign: 'center', fontSize: 12, color: 'var(--tl)' }}>
              Type to search from {occupations.length} occupations
            </div>
          )}
        </div>
      )}

      {/* Detail view */}
      {selectedOcc && (
        <div className="animate-float-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Back + header */}
          <button onClick={() => setSelectedOcc(null)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--blue)', fontFamily: 'inherit', padding: 0 }}>← Back to list</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--navy)', color: '#fff', fontSize: 16, fontWeight: 700,
              padding: '5px 12px', borderRadius: 8, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}>{selectedOcc.anzsco_code}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--td)' }}>{selectedOcc.occupation_name}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--tl)' }}>EOI Data on {formatMonth(selectedMonth)}</div>

          {loading ? <SkeletonDetail /> : (
            submitted.length === 0 && invited.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', fontSize: 14, color: 'var(--tl)', background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)' }}>
                No EOI data available for this occupation
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {VISA_KEYS.map(vk => (
                  <VisaColumn
                    key={vk}
                    label={VISA_MAP[vk]}
                    submitted={submitted.filter(r => r.visa_type === vk)}
                    invited={invited.filter(r => r.visa_type === vk)}
                    stateData={(vk.startsWith('190') || vk.startsWith('491')) ? stateData.filter(r => r.visa_type === vk) : []}
                  />
                ))}
              </div>
            )
          )}
        </div>
      )}

      <style>{`
        .eoi-input:focus { border-color: var(--sky); box-shadow: 0 0 0 2px rgba(91,163,217,.2); }
        .eoi-input::placeholder { color: var(--tl); }
      `}</style>
    </div>
  )
}

/* ─── Visa Column ─── */
function VisaColumn({ label, submitted, invited, stateData }: {
  label: string;
  submitted: SubmittedRow[]; invited: InvitedRow[]; stateData: StateRow[]
}) {
  const [tab, setTab] = useState<'submitted' | 'invited'>('submitted')
  const hasData = submitted.length > 0 || invited.length > 0

  const totalSubmitted = useMemo(() => {
    let sum = 0
    for (const r of submitted) {
      if (r.count_eois !== '<20') { const n = parseInt(r.count_eois, 10); if (!isNaN(n)) sum += n }
    }
    return sum
  }, [submitted])

  const pillStyle = (active: boolean): CSSProperties => ({
    padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
    cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all .15s',
    background: active ? 'var(--navy)' : 'var(--light)',
    color: active ? '#fff' : 'var(--tm)',
  })

  const thS: CSSProperties = {
    padding: '8px 10px', fontSize: 10, fontWeight: 600, color: 'var(--tl)',
    textTransform: 'uppercase', letterSpacing: '.04em', borderBottom: '1px solid var(--border)',
    background: 'var(--off)', textAlign: 'left',
  }

  const tdS: CSSProperties = { padding: '7px 10px', fontSize: 13, borderBottom: '1px solid var(--border)' }

  // State breakdown rows
  const stateRows = useMemo(() => {
    const map = new Map<string, string>()
    for (const r of stateData) {
      const existing = map.get(r.nominated_state)
      if (!existing) map.set(r.nominated_state, r.count_eois)
      else {
        if (existing === '<20' || r.count_eois === '<20') map.set(r.nominated_state, '<20')
        else map.set(r.nominated_state, String(parseInt(existing, 10) + parseInt(r.count_eois, 10)))
      }
    }
    return STATE_ORDER.filter(s => map.has(s)).map(s => ({ state: s, count: map.get(s)! }))
  }, [stateData])

  return (
    <div style={{
      borderRadius: 12, border: '1px solid var(--border)', background: 'var(--white)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Visa label */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', background: 'var(--off)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--td)' }}>{label}</div>
      </div>

      {!hasData ? (
        <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: 'var(--tl)', fontStyle: 'italic' }}>No data</div>
      ) : (
        <>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, padding: '10px 14px' }}>
            <button style={pillStyle(tab === 'submitted')} onClick={() => setTab('submitted')}>Submitted</button>
            <button style={pillStyle(tab === 'invited')} onClick={() => setTab('invited')}>Invited</button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {tab === 'submitted' ? (
                    <><th style={thS}>Points</th><th style={{ ...thS, textAlign: 'right' }}>EOIs</th></>
                  ) : (
                    <><th style={thS}>Month Submitted</th><th style={{ ...thS, textAlign: 'right' }}>EOIs</th></>
                  )}
                </tr>
              </thead>
              <tbody>
                {tab === 'submitted' ? (
                  submitted.length === 0 ? (
                    <tr><td colSpan={2} style={{ ...tdS, textAlign: 'center', color: 'var(--tl)', fontStyle: 'italic' }}>—</td></tr>
                  ) : submitted.map((r, i) => (
                    <tr key={i}><td style={tdS}>{r.points}</td><td style={{ ...tdS, textAlign: 'right' }}>{r.count_eois}</td></tr>
                  ))
                ) : (
                  invited.length === 0 ? (
                    <tr><td colSpan={2} style={{ ...tdS, textAlign: 'center', color: 'var(--tl)', fontStyle: 'italic' }}>—</td></tr>
                  ) : invited.map((r, i) => (
                    <tr key={i}><td style={tdS}>{r.month_submitted}</td><td style={{ ...tdS, textAlign: 'right' }}>{r.count_eois}</td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)', fontSize: 12, fontWeight: 600, color: 'var(--tm)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Total (excl. &lt;20)</span><span>{totalSubmitted}</span>
          </div>

          {/* State breakdown for 190/491 */}
          {stateRows.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <div style={{ padding: '8px 14px', fontSize: 11, fontWeight: 600, color: 'var(--tl)', textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--off)' }}>By State</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {stateRows.map((r, i) => (
                    <tr key={r.state} style={{ borderBottom: i < stateRows.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '6px 14px', fontSize: 12 }}>{r.state}</td>
                      <td style={{ padding: '6px 14px', fontSize: 12, textAlign: 'right' }}>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ─── Skeletons ─── */
function SkeletonList() {
  return (
    <div style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--white)', overflow: 'hidden' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 64, height: 20, borderRadius: 6, background: 'var(--light)', animation: 'pulse 1.5s ease infinite' }} />
          <div style={{ flex: 1, height: 16, borderRadius: 4, background: 'var(--light)', animation: 'pulse 1.5s ease infinite' }} />
        </div>
      ))}
      <style>{`@keyframes pulse { 0%,100% { opacity:.6 } 50% { opacity:.3 } }`}</style>
    </div>
  )
}

function SkeletonDetail() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--white)', padding: 16, height: 200 }}>
          <div style={{ height: 16, width: '60%', borderRadius: 4, background: 'var(--light)', animation: 'pulse 1.5s ease infinite', marginBottom: 12 }} />
          <div style={{ height: 12, width: '80%', borderRadius: 4, background: 'var(--light)', animation: 'pulse 1.5s ease infinite', marginBottom: 8 }} />
          <div style={{ height: 12, width: '70%', borderRadius: 4, background: 'var(--light)', animation: 'pulse 1.5s ease infinite', marginBottom: 8 }} />
          <div style={{ height: 12, width: '50%', borderRadius: 4, background: 'var(--light)', animation: 'pulse 1.5s ease infinite' }} />
        </div>
      ))}
      <style>{`@keyframes pulse { 0%,100% { opacity:.6 } 50% { opacity:.3 } }`}</style>
    </div>
  )
}
