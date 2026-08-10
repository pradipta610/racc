'use client'

import { useEffect, useMemo, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

interface ProfFee { label: string; onshore: string; offshore: string }
interface TradeFeeItem { section?: string; label: string; amount: string }
interface Processing { service?: string; pathway?: string; time: string; notes?: string }
interface FeeSection { heading?: string; fees: { service?: string; fee?: string; label?: string; amount?: string }[] }

interface AuthData {
  type?: string
  profFees?: ProfFee[]
  tradeFees?: { pathway1?: TradeFeeItem[]; pathway2?: TradeFeeItem[] }
  fees?: { section?: string; label?: string; type?: string; excl_gst?: string; incl_gst?: string; service?: string; fee?: string; pathway?: string; amount?: string }[]
  sections?: FeeSection[]
  other?: { service?: string; fee?: string; label?: string; amount?: string }[]
  processing?: Processing[]
  feeNote?: string
  feeIncreaseNote?: string
  feesUrl?: string
  tradeFeesUrl?: string
  timesUrl?: string
}

interface Authority { abbr: string; full: string; url: string; data?: AuthData }

interface Occupation {
  occupation: string
  anzsco: string
  list: string
  visas: string[]
  authorities: Authority[]
}

// ── Constants ──────────────────────────────────────────────────────────────

const PER_PAGE = 25

const LIST_BADGES: Record<string, { bg: string; color: string }> = {
  MLTSSL: { bg: '#d4edda', color: '#155724' },
  STSOL:  { bg: '#cce5ff', color: '#004085' },
  ROL:    { bg: '#fff3cd', color: '#856404' },
  CSOL:   { bg: '#e2d9f3', color: '#4a235a' },
}

const AUTHORITIES: [string, string][] = [
  ['AACA', 'Architects Accreditation Council of Australia'],
  ['AASW', 'Australian Association of Social Workers Limited'],
  ['ACECQA', "Australian Children's Education and Care Quality"],
  ['ACPSEM', 'Australasian College of Physical Scientists and Engineers in Medicine'],
  ['ACS', 'Australian Computer Society Incorporated'],
  ['ACS (Data Scientist only)', 'Australian Computer Society Incorporated.'],
  ['ADC', 'Australian Dental Council Limited'],
  ['AIMS', 'Australian Institute of Medical Scientists'],
  ['AIQS', 'The Australian Institute of Quantity Surveyors'],
  ['AITSL', 'Australian Institute for Teaching and School Leadership Limited'],
  ['AMSA', 'Australian Maritime Safety Authority'],
  ['ANMAC', 'Australian Nursing & Midwifery Accreditation Council Limited'],
  ['ANZSNM', 'Australian and New Zealand Society of Nuclear Medicine'],
  ['AOAC', 'Australasian Osteopathic Accreditation Council Limited'],
  ['AOPA', 'Australian Orthotic Prosthetic Association Limited'],
  ['APC', 'Australian Physiotherapy Council Limited'],
  ['APharmC', 'Australian Pharmacy Council Limited'],
  ['APS', 'Australian Psychological Society Limited'],
  ['ASMIRT', 'Australian Society of Medical Imagery and Radiation Therapy'],
  ['AVBC', 'Australasian Veterinary Boards Council Incorporated'],
  ['CAANZ', 'Chartered Accountants Australia and New Zealand'],
  ['CASA', 'Civil Aviation Safety Authority'],
  ['CCEA', 'Council on Chiropractic Education Australasia Limited'],
  ['CMBA', 'Chinese Medicine Board of Australia'],
  ['Community Work Australia', 'Community Work Australia Limited'],
  ['CPAA', 'CPA Australia Ltd'],
  ['DAA', 'Dietitians Association of Australia'],
  ['Engineers Australia', 'The Institution of Engineers Australia'],
  ['IML', 'Institute of Managers and Leaders National'],
  ['IPA', 'Institute of Public Accountants Ltd'],
  ['ISNSW', 'Institution of Surveyors New South Wales'],
  ['Legal admissions authority of a state or territory', 'Legal admissions authority of a state or territory'],
  ['MedBA', 'Medical Board of Australia'],
  ['NAATI', 'National Accreditation Authority for Translators and Interpreters Ltd'],
  ['OCANZ', 'Optometry Council of Australia and New Zealand Limited'],
  ['OTC', 'Occupational Therapy Council of Australia Limited'],
  ['PodBA', 'Podiatry Board of Australia'],
  ['SPA', 'The Speech Pathology Association of Australia Limited'],
  ['TRA', 'Trades Recognition Australia'],
  ['TRA (trades)', 'Trades Recognition Australia'],
  ['VETASSESS', 'Vocational Education and Training Assessment Services'],
  ['VETASSESS (non-trades)', 'Vocational Education and Training Assessment Services'],
]

// ── Sub-components ─────────────────────────────────────────────────────────

function ListBadges({ list }: { list: string }) {
  const parts = list.split(/[,/]/).map(s => s.trim()).filter(Boolean)
  return (
    <>
      {parts.map(p => {
        const s = LIST_BADGES[p] ?? { bg: '#eee', color: '#555' }
        return (
          <span key={p} className={`list-badge lb-${p.toLowerCase().replace(/[^a-z]/g, '')}`}
            style={{ background: s.bg, color: s.color }}>
            {p}
          </span>
        )
      })}
    </>
  )
}

function FeeTable({ rows, headers }: { rows: (string | undefined)[][], headers: string[] }) {
  const clean = rows.filter(r => r.some(c => c))
  if (!clean.length) return null
  return (
    <div className="fee-table-wrap">
      <table className="auth-fees-table">
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {clean.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell ?? ''}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Subsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="auth-subsection">
      <div className="auth-subsection-label">{label}</div>
      {children}
    </div>
  )
}

function AuthBlock({ a }: { a: Authority }) {
  const d = a.data

  const header = (
    <div className="auth-block-header">
      <span className="auth-block-name">{a.abbr}</span>
      {a.full && <span className="auth-block-full">{a.full}</span>}
    </div>
  )

  if (!d) {
    return (
      <div className="auth-block">
        {header}
        <div className="auth-no-data">Fee data not available</div>
        {a.url && (
          <div className="auth-links">
            <a href={a.url} target="_blank" rel="noopener">Visit website ↗</a>
          </div>
        )}
      </div>
    )
  }

  let body: React.ReactNode

  if (d.type === 'vetassess') {
    const p1 = d.tradeFees?.pathway1?.filter(x => !x.section || x.section === '') ?? []
    const p2 = d.tradeFees?.pathway2?.filter(x => !x.section || x.section === '') ?? []
    body = (
      <>
        {d.profFees?.length ? (
          <Subsection label="Professional Fees (Onshore incl. GST / Offshore excl. GST)">
            <FeeTable headers={['Service', 'Onshore', 'Offshore']}
              rows={d.profFees.map(f => [f.label, f.onshore, f.offshore])} />
          </Subsection>
        ) : null}
        {p1.length ? (
          <Subsection label="Trades — Pathway 1">
            <FeeTable headers={['Stage', 'Fee (AUD)']} rows={p1.map(f => [f.label, f.amount])} />
          </Subsection>
        ) : null}
        {p2.length ? (
          <Subsection label="Trades — Pathway 2">
            <FeeTable headers={['Stage', 'Fee (AUD)']} rows={p2.map(f => [f.label, f.amount])} />
          </Subsection>
        ) : null}
        {d.processing?.length ? (
          <Subsection label="Processing Times">
            <FeeTable headers={['Service', 'Time', 'Notes']}
              rows={d.processing.map(f => [f.service ?? '', f.time, f.notes ?? ''])} />
          </Subsection>
        ) : null}
        <div className="auth-links">
          {d.feesUrl && <a href={d.feesUrl} target="_blank" rel="noopener">Professional fees ↗</a>}
          {d.tradeFeesUrl && <a href={d.tradeFeesUrl} target="_blank" rel="noopener">Trade fees ↗</a>}
          {d.timesUrl && <a href={d.timesUrl} target="_blank" rel="noopener">Processing times ↗</a>}
        </div>
        {d.feeIncreaseNote && <div className="auth-note">{d.feeIncreaseNote}</div>}
      </>
    )
  } else if (d.type === 'ea') {
    const sections = [...new Set((d.fees ?? []).map(f => f.section ?? ''))]
    body = (
      <>
        {sections.map(sec => (
          <Subsection key={sec} label={sec}>
            <FeeTable
              headers={['Assessment Type', 'Ex. GST', 'Incl. GST']}
              rows={(d.fees ?? []).filter(f => (f.section ?? '') === sec)
                .map(f => [f.type ?? f.label ?? '', f.excl_gst ?? '', f.incl_gst ?? ''])}
            />
          </Subsection>
        ))}
        {d.processing?.length ? (
          <Subsection label="Processing Times">
            <FeeTable headers={['Pathway', 'Time']}
              rows={d.processing.map(f => [f.pathway ?? f.service ?? '', f.time])} />
          </Subsection>
        ) : null}
        {d.feesUrl && (
          <div className="auth-links">
            <a href={d.feesUrl} target="_blank" rel="noopener">Full fee schedule ↗</a>
          </div>
        )}
        <div className="auth-note">GST applies to Australian residents only.</div>
      </>
    )
  } else if (d.type === 'acs') {
    body = (
      <>
        {d.fees?.length ? (
          <Subsection label="Assessment Fees (excl. GST)">
            <FeeTable headers={['Pathway', 'Fee (AUD)']}
              rows={d.fees.map(f => [f.pathway ?? f.label ?? '', f.amount ?? f.fee ?? ''])} />
          </Subsection>
        ) : null}
        {d.processing?.length ? (
          <Subsection label="Processing Times">
            <FeeTable headers={['Service', 'Time']}
              rows={d.processing.map(f => [f.service ?? '', f.time])} />
          </Subsection>
        ) : null}
        {d.feesUrl && (
          <div className="auth-links">
            <a href={d.feesUrl} target="_blank" rel="noopener">ACS MSA details ↗</a>
          </div>
        )}
        {d.feeNote && <div className="auth-note">{d.feeNote}</div>}
      </>
    )
  } else if (d.type === 'anmac') {
    body = (
      <>
        {d.fees?.length ? (
          <Subsection label="Assessment Fees">
            <FeeTable headers={['Assessment Type', 'Fee (AUD)']}
              rows={d.fees.map(f => [f.label ?? f.service ?? '', f.amount ?? f.fee ?? ''])} />
          </Subsection>
        ) : null}
        {d.other?.length ? (
          <Subsection label="Other Service Fees">
            <FeeTable headers={['Service', 'Fee (AUD)']}
              rows={d.other.map(f => [f.service ?? f.label ?? '', f.fee ?? f.amount ?? ''])} />
          </Subsection>
        ) : null}
        <div className="auth-links">
          {d.feesUrl && <a href={d.feesUrl} target="_blank" rel="noopener">ANMAC fees ↗</a>}
          {d.timesUrl && <a href={d.timesUrl} target="_blank" rel="noopener">Processing times ↗</a>}
        </div>
        {d.feeNote && <div className="auth-note">{d.feeNote}</div>}
      </>
    )
  } else {
    body = (
      <>
        {d.sections?.length
          ? d.sections.map((sec, i) => (
              <Subsection key={i} label={sec.heading ?? 'Assessment Fees'}>
                <FeeTable headers={['Service', 'Fee (AUD)']}
                  rows={sec.fees.map(f => [f.service ?? f.label ?? '', f.fee ?? f.amount ?? ''])} />
              </Subsection>
            ))
          : d.fees?.length
          ? (
            <Subsection label="Assessment Fees">
              <FeeTable headers={['Service', 'Fee (AUD)']}
                rows={d.fees.map(f => [f.service ?? f.label ?? '', f.fee ?? f.amount ?? ''])} />
            </Subsection>
          ) : null}
        {d.processing?.length ? (
          <Subsection label="Processing Times">
            <FeeTable headers={['Service', 'Time']}
              rows={d.processing.map(f => [f.service ?? '', f.time])} />
          </Subsection>
        ) : null}
        <div className="auth-links">
          {d.feesUrl && <a href={d.feesUrl} target="_blank" rel="noopener">Fee schedule ↗</a>}
          {d.timesUrl && <a href={d.timesUrl} target="_blank" rel="noopener">Processing times ↗</a>}
        </div>
        {d.feeNote && <div className="auth-note">{d.feeNote}</div>}
      </>
    )
  }

  return <div className="auth-block">{header}{body}</div>
}

function ExpandContent({ r }: { r: Occupation }) {
  return (
    <div className="expand-inner">
      <div className="expand-grid">
        <div>
          <div className="expand-section-label">Eligible visas</div>
          {r.visas.length ? (
            <ul className="visa-list">
              {r.visas.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          ) : (
            <div className="auth-no-data">—</div>
          )}
        </div>
        <div>
          <div className="expand-section-label">
            Assessing {r.authorities.length > 1 ? 'authorities' : 'authority'}
          </div>
          {r.authorities.map((a, i) => <AuthBlock key={i} a={a} />)}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export function SkillAssessmentClient() {
  const [data, setData] = useState<Occupation[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState('')
  const [authFilter, setAuthFilter] = useState('')
  const [page, setPage] = useState(1)
  const [sortDir, setSortDir] = useState<1 | -1>(1)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetch('/skill-assessment-data.json')
      .then(r => r.json())
      .then((d: Occupation[]) => { setData(d); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = data.filter(r => {
      const mq = !q || r.occupation.toLowerCase().includes(q) || r.anzsco.includes(q)
      const ml = !listFilter || r.list.includes(listFilter)
      const ma = !authFilter || r.authorities.some(a => a.abbr === authFilter)
      return mq && ml && ma
    })
    rows.sort((a, b) => a.occupation.localeCompare(b.occupation) * sortDir)
    return rows
  }, [data, query, listFilter, authFilter, sortDir])

  useEffect(() => { setPage(1); setExpanded(new Set()) }, [query, listFilter, authFilter, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const from = (safePage - 1) * PER_PAGE
  const slice = filtered.slice(from, from + PER_PAGE)

  function toggleExpand(idx: number) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  function goPage(p: number) {
    if (p < 1 || p > totalPages) return
    setPage(p)
    setExpanded(new Set())
    document.querySelector('.sa-controls')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function renderPagerBtns() {
    if (totalPages <= 1) return null
    const btns: React.ReactNode[] = []
    btns.push(<button key="prev" className="pb" onClick={() => goPage(safePage - 1)} disabled={safePage === 1}>‹ Prev</button>)
    const s = Math.max(1, safePage - 2)
    const e = Math.min(totalPages, safePage + 2)
    if (s > 1) {
      btns.push(<button key="1" className="pb" onClick={() => goPage(1)}>1</button>)
      if (s > 2) btns.push(<span key="e1" style={{ padding: '4px 5px', color: '#b0b8d0' }}>…</span>)
    }
    for (let p = s; p <= e; p++) {
      btns.push(<button key={p} className={`pb${p === safePage ? ' on' : ''}`} onClick={() => goPage(p)}>{p}</button>)
    }
    if (e < totalPages) {
      if (e < totalPages - 1) btns.push(<span key="e2" style={{ padding: '4px 5px', color: '#b0b8d0' }}>…</span>)
      btns.push(<button key="last" className="pb" onClick={() => goPage(totalPages)}>{totalPages}</button>)
    }
    btns.push(<button key="next" className="pb" onClick={() => goPage(safePage + 1)} disabled={safePage === totalPages}>Next ›</button>)
    return btns
  }

  return (
    <>
      <style>{`
        /* Controls */
        .sa-controls { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; align-items:stretch; }
        .sa-controls input[type="text"] {
          flex:1 1 200px; padding:10px 14px; border:1.5px solid #dde0ec; border-radius:8px;
          font-size:14px; font-family:inherit; color:#1a1a2e; outline:none; background:#fafbff; transition:border-color .15s;
        }
        .sa-controls input[type="text"]:focus { border-color:#243f97; background:#fff; }
        .sa-controls input[type="text"]::placeholder { color:#aab; }
        .sa-controls select {
          flex:0 1 auto; padding:10px 14px; border:1.5px solid #dde0ec; border-radius:8px;
          font-size:14px; font-family:inherit; color:#1a1a2e; background:#fafbff;
          cursor:pointer; outline:none; transition:border-color .15s; min-width:0;
        }
        .sa-controls select:focus { border-color:#243f97; }
        .result-count { align-self:center; font-size:13px; color:#7880a0; white-space:nowrap; margin-left:auto; padding:0 4px; }

        /* List badges */
        .list-badge {
          display:inline-block; font-size:11px; font-weight:700; padding:2px 8px;
          border-radius:20px; white-space:nowrap; margin:2px 3px 2px 0; letter-spacing:.3px;
        }

        /* Desktop table */
        .table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:10px; border:1px solid #e4e8f5; }
        table { width:100%; border-collapse:collapse; font-size:14px; table-layout:fixed; }
        col.col-occ { width:auto; }
        col.col-auth { width:260px; }
        thead th {
          background:#243f97; color:#fff; font-weight:600; font-size:12px;
          text-transform:uppercase; letter-spacing:.6px; padding:12px 16px;
          text-align:left; white-space:nowrap; cursor:pointer; user-select:none;
        }
        thead th:first-child { border-radius:9px 0 0 0; }
        thead th:last-child  { border-radius:0 9px 0 0; }
        thead th:hover { background:#1c3280; }
        thead th .si { margin-left:4px; opacity:.55; font-size:10px; }
        thead th.sorted .si { opacity:1; }
        thead th.no-sort { cursor:default; }
        thead th.no-sort:hover { background:#243f97; }
        tbody tr.data-row { border-bottom:1px solid #eef0f8; cursor:pointer; transition:background .1s; }
        tbody tr.data-row:last-of-type { border-bottom:none; }
        tbody tr.data-row:hover  { background:#f0f3fc; }
        tbody tr.data-row.open   { background:#eaeffc; }
        td { padding:12px 16px; vertical-align:middle; }
        .occ-name { font-weight:600; font-size:14px; color:#1a1a2e; line-height:1.4; }
        .anzsco-sub { font-size:12px; color:#7880a0; margin-top:3px; font-family:"SF Mono","Fira Code",monospace; }
        .auth-chip {
          display:inline-block; font-size:12px; font-weight:600; color:#243f97;
          background:#eef1fb; border-radius:4px; padding:2px 7px; margin:2px 3px 2px 0;
        }
        .chevron { font-size:12px; color:#b0b8d0; transition:transform .2s; display:inline-block; margin-left:4px; }
        tr.data-row.open .chevron { transform:rotate(180deg); }

        /* Expand row */
        tr.expand-row > td {
          background:#f5f7ff; border-bottom:2px solid #d4daee; padding:20px 20px 24px;
        }
        .expand-inner { width:100%; }
        .expand-grid { display:grid; grid-template-columns:200px 1fr; gap:20px 32px; align-items:start; }
        @media (max-width:860px) { .expand-grid { grid-template-columns:1fr; gap:20px; } }
        .expand-section-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.7px; color:#7880a0; margin-bottom:8px; }
        .visa-list { list-style:none; padding:0; margin:0; }
        .visa-list li { font-size:13px; color:#333; padding:6px 0; border-bottom:1px solid #e8eaf5; line-height:1.45; }
        .visa-list li:last-child { border-bottom:none; }

        /* Auth block */
        .auth-block { background:#fff; border:1px solid #dde0f0; border-radius:10px; padding:14px 16px; margin-bottom:12px; }
        .auth-block:last-child { margin-bottom:0; }
        .auth-block-header { display:flex; align-items:baseline; gap:8px; margin-bottom:10px; flex-wrap:wrap; padding-bottom:8px; border-bottom:1px solid #edf0fa; }
        .auth-block-name { font-weight:700; font-size:14px; color:#243f97; }
        .auth-block-full { font-size:12px; color:#7880a0; }
        .auth-subsection { margin-top:12px; }
        .auth-subsection:first-child { margin-top:0; }
        .auth-subsection-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:#7880a0; margin-bottom:6px; }
        .fee-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; max-width:100%; border-radius:6px; border:1px solid #edf0fa; margin-bottom:4px; }
        .auth-fees-table { width:100%; border-collapse:collapse; font-size:13px; }
        .auth-fees-table th { text-align:left; font-size:11px; color:#7880a0; font-weight:600; text-transform:uppercase; letter-spacing:.4px; padding:7px 10px; border-bottom:1px solid #edf0fa; background:#f8f9ff; white-space:nowrap; }
        .auth-fees-table td { padding:8px 10px; vertical-align:top; color:#333; border-bottom:1px solid #f4f5fb; word-break:break-word; font-size:13px; line-height:1.45; }
        .auth-fees-table tr:last-child td { border-bottom:none; }
        .auth-links { display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
        .auth-links a { font-size:12px; color:#243f97; text-decoration:none; display:inline-flex; align-items:center; gap:3px; padding:3px 0; border-bottom:1px solid #c0cbee; }
        .auth-links a:hover { border-bottom-color:#243f97; }
        .auth-note { font-size:12px; color:#7880a0; margin-top:8px; line-height:1.5; }
        .auth-no-data { font-size:13px; color:#b0b8d0; font-style:italic; padding:4px 0; }
        .empty td { text-align:center; padding:40px; color:#b0b8d0; font-style:italic; font-size:14px; }

        /* Mobile cards */
        .card-list { display:none; }
        @media (max-width:639px) {
          .table-scroll { display:none; }
          .card-list { display:block; }
          .card { border:1px solid #dde0ec; border-radius:10px; margin-bottom:10px; overflow:hidden; background:#fff; }
          .card-header { display:flex; align-items:flex-start; justify-content:space-between; padding:14px 14px 12px; cursor:pointer; gap:10px; -webkit-tap-highlight-color:transparent; }
          .card-header:active { background:#f0f3fc; }
          .card-left { flex:1; min-width:0; }
          .card-occ { font-weight:700; font-size:15px; line-height:1.4; color:#1a1a2e; }
          .card-anzsco { font-size:12px; color:#7880a0; margin-top:3px; font-family:monospace; }
          .card-badges { margin-top:7px; }
          .card-right { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; padding-top:2px; }
          .card-auth-chip { font-size:11px; font-weight:600; color:#243f97; background:#eef1fb; border-radius:4px; padding:2px 7px; }
          .card-chevron { font-size:14px; color:#b0b8d0; transition:transform .2s; }
          .card.open .card-chevron { transform:rotate(180deg); }
          .card-body { display:none; border-top:1px solid #edf0fa; background:#f5f7ff; padding:14px 14px 16px; overflow-x:hidden; max-width:100%; }
          .card.open .card-body { display:block; }
          .card-section { margin-bottom:16px; }
          .card-section:last-child { margin-bottom:0; }
          .card-section-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:#7880a0; margin-bottom:8px; }
          .card-visa-list { list-style:none; padding:0; margin:0; }
          .card-visa-list li { font-size:13px; color:#333; padding:6px 0; border-bottom:1px solid #e4e7f5; line-height:1.45; }
          .card-visa-list li:last-child { border-bottom:none; }
        }

        /* Pagination */
        .pager { display:flex; align-items:center; justify-content:space-between; margin-top:14px; flex-wrap:wrap; gap:8px; }
        .pager-info { font-size:13px; color:#7880a0; }
        .pager-btns { display:flex; gap:4px; flex-wrap:wrap; }
        .pb { padding:6px 11px; border:1.5px solid #dde0ec; border-radius:6px; background:#fff; font-size:13px; font-family:inherit; cursor:pointer; color:#333; min-width:36px; text-align:center; transition:all .12s; }
        .pb:hover:not(:disabled) { background:#eef1fb; border-color:#243f97; color:#243f97; }
        .pb.on { background:#243f97; color:#fff; border-color:#243f97; font-weight:700; }
        .pb:disabled { opacity:.3; cursor:default; }

        /* Disclaimer */
        .disclaimer { margin-top:16px; font-size:12.5px; color:#9198b5; line-height:1.6; border-top:1px solid #edf0fa; padding-top:12px; }
        .disclaimer a { color:#243f97; text-decoration:none; border-bottom:1px solid #c0cbee; }
        .disclaimer a:hover { border-bottom-color:#243f97; }
      `}</style>

      {/* Controls */}
      <div className="sa-controls">
        <input type="text" placeholder="Search occupation name or ANZSCO code…"
          value={query} onChange={e => setQuery(e.target.value)} />
        <select value={listFilter} onChange={e => setListFilter(e.target.value)}>
          <option value="">All list types</option>
          <option value="MLTSSL">MLTSSL</option>
          <option value="STSOL">STSOL</option>
          <option value="ROL">ROL</option>
          <option value="CSOL">CSOL</option>
        </select>
        <select value={authFilter} onChange={e => setAuthFilter(e.target.value)}>
          <option value="">All assessing authorities</option>
          {AUTHORITIES.map(([val, label]) => (
            <option key={val} value={val}>{val} — {label}</option>
          ))}
        </select>
        <div className="result-count">
          {loading ? 'Loading…' : `${filtered.length.toLocaleString()} result${filtered.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Desktop table */}
      <div className="table-scroll">
        <table>
          <colgroup>
            <col className="col-occ" />
            <col className="col-auth" />
          </colgroup>
          <thead>
            <tr>
              <th className="sorted" onClick={() => setSortDir(d => d === 1 ? -1 : 1)}>
                Occupation <span className="si">{sortDir === 1 ? '↑' : '↓'}</span>
              </th>
              <th className="no-sort">Assessing Authority</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} style={{ padding: 40, textAlign: 'center', color: '#b0b8d0' }}>Loading data…</td></tr>
            ) : !slice.length ? (
              <tr className="empty"><td colSpan={2}>No results found. Try a different search.</td></tr>
            ) : slice.flatMap((r, i) => {
              const idx = from + i
              const isOpen = expanded.has(idx)
              return [
                <tr key={`r-${idx}`} className={`data-row${isOpen ? ' open' : ''}`} onClick={() => toggleExpand(idx)}>
                  <td>
                    <div className="occ-name">{r.occupation}</div>
                    {r.anzsco && <div className="anzsco-sub">ANZSCO {r.anzsco}</div>}
                    <div style={{ marginTop: 5 }}><ListBadges list={r.list} /></div>
                  </td>
                  <td>
                    {r.authorities.map(a => <span key={a.abbr} className="auth-chip">{a.abbr}</span>)}
                    <span className="chevron">▾</span>
                  </td>
                </tr>,
                ...(isOpen ? [
                  <tr key={`e-${idx}`} className="expand-row">
                    <td colSpan={2}><ExpandContent r={r} /></td>
                  </tr>
                ] : []),
              ]
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="card-list">
        {!loading && slice.map((r, i) => {
          const idx = from + i
          const isOpen = expanded.has(idx)
          return (
            <div key={idx} className={`card${isOpen ? ' open' : ''}`} onClick={() => toggleExpand(idx)}>
              <div className="card-header">
                <div className="card-left">
                  <div className="card-occ">{r.occupation}</div>
                  {r.anzsco && <div className="card-anzsco">ANZSCO {r.anzsco}</div>}
                  <div className="card-badges"><ListBadges list={r.list} /></div>
                </div>
                <div className="card-right">
                  {r.authorities.map(a => <span key={a.abbr} className="card-auth-chip">{a.abbr}</span>)}
                  <div className="card-chevron">▾</div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-section">
                  <div className="card-section-label">Eligible visas</div>
                  <ul className="card-visa-list">
                    {r.visas.length
                      ? r.visas.map((v, vi) => <li key={vi}>{v}</li>)
                      : <li style={{ color: '#b0b8d0' }}>—</li>}
                  </ul>
                </div>
                <div className="card-section">
                  <div className="card-section-label">
                    Assessing {r.authorities.length > 1 ? 'authorities' : 'authority'}
                  </div>
                  {r.authorities.map((a, ai) => <AuthBlock key={ai} a={a} />)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="pager">
        <div className="pager-info">
          {!loading && filtered.length > 0 &&
            `Showing ${from + 1}–${Math.min(from + PER_PAGE, filtered.length)} of ${filtered.length.toLocaleString()}`}
        </div>
        <div className="pager-btns">{renderPagerBtns()}</div>
      </div>

      <p className="disclaimer">
        Skilled occupation list sourced from the{' '}
        <a href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list" target="_blank" rel="noopener">
          Department of Home Affairs
        </a>
        , August 2026. Fee and processing time data scraped live from each assessing authority&apos;s website.
        Information is indicative only — confirm eligibility with a registered migration agent.
      </p>
    </>
  )
}
