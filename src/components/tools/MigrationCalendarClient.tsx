'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

// ── Color tokens (matching original design) ───────────────────────────────────
const C = {
  ink: '#17211f', muted: '#66706d', line: '#dbe3df', paper: '#fbfcfa',
  panel: '#ffffff', soft: '#eef5f1', green: '#0d7a55', blue: '#275b89',
  amber: '#a66500', rose: '#a83f48',
}

// ── Types ─────────────────────────────────────────────────────────────────────
type TagType = 'priority' | 'warning' | 'family' | 'skill' | ''
type Priority = 'S' | 'A' | 'B'

interface MonthTag { label: string; type: TagType }
interface Month {
  id: string; name: string; isNow: boolean; focus: string
  stars: number; reason: string; tags: MonthTag[]
}
interface TableRow {
  id: string; category: string; aiCitation: string; leadValue: string; priority: Priority
}
interface JourneyStep { id: string; num: string; title: string; desc: string }
interface CategoryGroup { id: string; name: string; tags: string[] }

// ── Initial data ──────────────────────────────────────────────────────────────
const INIT_MONTHS: Month[] = [
  { id: 'm1', name: 'July', isNow: true, focus: 'Fee changes + legislation changes', stars: 5,
    reason: 'Highest priority karena AI masih sempat indexing untuk Agustus. Fokus pada biaya baru, threshold, dan halaman evergreen yang revenue-relevant.',
    tags: [{label:'485',type:'priority'},{label:'482',type:'priority'},{label:'186',type:'priority'},
           {label:'Partner 820/801',type:'family'},{label:'Partner 309/100',type:'family'},
           {label:'Student 500',type:'priority'},{label:'Visitor 600',type:''},
           {label:'BVA',type:''},{label:'BVB',type:''},{label:'Visa Cost Hub',type:'warning'}] },
  { id: 'm2', name: 'August', isNow: false, focus: 'Skilled Migration Month', stars: 5,
    reason: 'Orang mulai serius prepare PR setelah financial year baru. Cocok untuk cluster SkillSelect dan state nomination.',
    tags: [{label:'189',type:'skill'},{label:'190',type:'skill'},{label:'491',type:'skill'},
           {label:'Skill Assessment',type:''},{label:'Occupation List',type:''},
           {label:'Points Calculator',type:''},{label:'EOI',type:''},{label:'SkillSelect',type:''}] },
  { id: 'm3', name: 'September', isNow: false, focus: 'Student & Graduate', stars: 5,
    reason: 'Bangun authority untuk intake, graduate pathway, dan requirement yang sering berubah.',
    tags: [{label:'Student 500',type:'priority'},{label:'485',type:'priority'},
           {label:'Student Dependant',type:''},{label:'Course Change',type:''},
           {label:'GS Requirement',type:''},{label:'English Requirement',type:''},
           {label:'COE',type:''},{label:'GTE vs GS',type:''}] },
  { id: 'm4', name: 'October', isNow: false, focus: 'Employer + DAMA', stars: 4,
    reason: 'Fokus employer pathway, sponsorship, labour agreement, dan regional employer needs.',
    tags: [{label:'482',type:'priority'},{label:'186',type:'priority'},{label:'494',type:''},
           {label:'DAMA',type:''},{label:'Labour Agreement',type:''},{label:'Employer Sponsorship',type:''}] },
  { id: 'm5', name: 'November', isNow: false, focus: 'Invitation Intelligence', stars: 4,
    reason: 'Bulan kuat untuk konten invitation round, state nomination, dan perubahan demand occupation.',
    tags: [{label:'189',type:'skill'},{label:'190',type:'skill'},{label:'491',type:'skill'},
           {label:'State Nomination',type:''},{label:'Invitation Round',type:''},{label:'Occupation Ceiling',type:''}] },
  { id: 'm6', name: 'December', isNow: false, focus: 'Planning Year', stars: 4,
    reason: 'Audience mulai planning tahun depan: study, travel, partner, working holiday, dan graduate route.',
    tags: [{label:'Student 500',type:'priority'},{label:'Partner',type:'family'},
           {label:'Visitor',type:''},{label:'Working Holiday',type:''},{label:'485',type:'priority'}] },
  { id: 'm7', name: 'January', isNow: false, focus: 'University Prep', stars: 4,
    reason: 'Pre-intake moment untuk students, extensions, graduate pathway, dan work rights.',
    tags: [{label:'Student',type:'priority'},{label:'Student Extension',type:''},
           {label:'485',type:'priority'},{label:'Student Work Rights',type:''}] },
  { id: 'm8', name: 'February', isNow: false, focus: 'Semester Start', stars: 4,
    reason: 'Support content untuk student visa, dependant, visitor-to-student intent, dan OSHC.',
    tags: [{label:'Student',type:'priority'},{label:'Student Dependant',type:''},
           {label:'Visitor to Student',type:''},{label:'OSHC',type:''}] },
  { id: 'm9', name: 'March', isNow: false, focus: 'Skilled Migration', stars: 4,
    reason: 'Refresh skilled pathway setelah semester mulai dan sebelum mid-year preparation.',
    tags: [{label:'189',type:'skill'},{label:'190',type:'skill'},{label:'491',type:'skill'},
           {label:'Skills Assessment',type:''}] },
  { id: 'm10', name: 'April', isNow: false, focus: 'Family Migration', stars: 4,
    reason: 'Family pathway punya lead value tinggi, terutama partner dan parent visa.',
    tags: [{label:'Partner',type:'family'},{label:'Parent',type:'family'},{label:'Child',type:'family'},
           {label:'Remaining Relative',type:'family'},{label:'Carer',type:'family'}] },
  { id: 'm11', name: 'May', isNow: false, focus: 'Employer Planning', stars: 4,
    reason: 'Banyak company mulai planning financial year. Dorong sponsorship, nomination, dan salary threshold education.',
    tags: [{label:'482',type:'priority'},{label:'186',type:'priority'},{label:'494',type:''}] },
  { id: 'm12', name: 'June', isNow: false, focus: 'Pre-July Update', stars: 5,
    reason: 'Bulan paling sibuk. Audit semua cost pages, processing time, salary threshold, dan legislation updates sebelum 1 July.',
    tags: [{label:'All Cost Pages',type:'warning'},{label:'All Processing Time',type:'warning'},
           {label:'All Salary Threshold',type:'warning'},{label:'All Legislation',type:'warning'}] },
]

const INIT_TABLE: TableRow[] = [
  { id: 't1', category: '485', aiCitation: '★★★★★', leadValue: '★★★★', priority: 'S' },
  { id: 't2', category: 'Partner', aiCitation: '★★★★★', leadValue: '★★★★★', priority: 'S' },
  { id: 't3', category: 'Student', aiCitation: '★★★★★', leadValue: '★★★★', priority: 'S' },
  { id: 't4', category: '482', aiCitation: '★★★★★', leadValue: '★★★★★', priority: 'S' },
  { id: 't5', category: '186', aiCitation: '★★★★★', leadValue: '★★★★★', priority: 'S' },
  { id: 't6', category: '189 / 190', aiCitation: '★★★★★', leadValue: '★★★★', priority: 'S' },
  { id: 't7', category: '491 / Parent / Visitor / Citizenship / Bridging', aiCitation: '★★★★', leadValue: '★★★-★★★★★', priority: 'A' },
  { id: 't8', category: 'Working Holiday / Child / Other Family / Resident Return', aiCitation: '★★★', leadValue: '★★★', priority: 'B' },
]

const INIT_JOURNEY: JourneyStep[] = [
  { id: 'j1', num: '01', title: 'Explore Australia', desc: 'Visitor Visa 600, ETA 601, eVisitor 651, transit needs.' },
  { id: 'j2', num: '02', title: 'Study in Australia', desc: 'Student 500, guardian 590, OSHC, COE, GS requirement.' },
  { id: 'j3', num: '03', title: 'Graduate', desc: '485, second 485, graduate season, work rights, transition planning.' },
  { id: 'j4', num: '04', title: 'Get Sponsored', desc: '482 to 186, 494, DAMA, labour agreement, employer sponsorship.' },
  { id: 'j5', num: '05', title: 'Skilled Migration', desc: '189, 190, 491, EOI, SkillSelect, occupation lists, points test.' },
  { id: 'j6', num: '06', title: 'Bring Family', desc: 'Partner, parent, child, carer, remaining relative pathways.' },
  { id: 'j7', num: '07', title: 'Become Australian', desc: 'PR rights, citizenship by conferral, descent, evidence, resumption.' },
  { id: 'j8', num: '08', title: 'Travel Again', desc: 'Resident Return Visa 155/157 and return planning for PR holders.' },
]

const INIT_CATEGORIES: CategoryGroup[] = [
  { id: 'c1', name: 'Student', tags: ['500','590','485','Second 485','Student Dependant'] },
  { id: 'c2', name: 'Employer Sponsored', tags: ['482','186','494','407','DAMA','Labour Agreement'] },
  { id: 'c3', name: 'Skilled Migration', tags: ['189','190','491','EOI','SkillSelect','Occupation Lists','Points Test','Skills Assessment'] },
  { id: 'c4', name: 'Family', tags: ['820','801','309','100','300','143','173','103','804','864','884'] },
  { id: 'c5', name: 'Visitor & Temporary', tags: ['600','601','651','771','417','462','408','403','400'] },
  { id: 'c6', name: 'Bridging & Return', tags: ['BVA','BVB','BVC','BVD','BVE','155','157'] },
  { id: 'c7', name: 'Citizenship', tags: ['Citizenship','Conferral','Descent','Evidence','Resumption'] },
  { id: 'c8', name: 'Child & Adoption', tags: ['101','102','802','445'] },
  { id: 'c9', name: 'Business & Investment', tags: ['188 historical','888','858 historical','National Innovation Visa'] },
]

const INIT_KILLER = 'Explore Australia → Study → Graduate → Get Sponsored / Skilled Migration → Bring Family → Become PR → Become Australian → Travel Again'

const DB_ID = 'singleton'

function uid() { return Math.random().toString(36).slice(2, 9) }
function stars(n: number) { return '★'.repeat(n) + '☆'.repeat(5 - n) }

function tagStyle(type: TagType): React.CSSProperties {
  if (type === 'priority') return { background: '#e1f3ea', color: '#075f42' }
  if (type === 'warning')  return { background: '#fff1d6', color: '#7b4a00' }
  if (type === 'family')   return { background: '#ffecef', color: '#8b3038' }
  if (type === 'skill')    return { background: '#eaf4fb', color: '#1d4d75' }
  return { background: C.soft, color: '#293633' }
}

function pillColor(p: Priority) {
  if (p === 'S') return { color: C.green, borderColor: 'rgba(13,122,85,.25)', background: '#effaf5' }
  if (p === 'A') return { color: C.blue,  borderColor: 'rgba(39,91,137,.25)',  background: '#f0f6fb' }
  return { color: C.amber, borderColor: 'rgba(166,101,0,.25)', background: '#fff8e9' }
}

const inputSt: React.CSSProperties = {
  width: '100%', padding: '7px 10px', borderRadius: 6,
  border: `1px solid ${C.line}`, fontSize: 13, fontFamily: 'inherit',
  color: C.ink, background: C.panel, outline: 'none',
}

function btn(variant: 'primary' | 'ghost' | 'danger'): React.CSSProperties {
  return {
    padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit', border: 'none',
    background: variant === 'primary' ? C.green : variant === 'danger' ? C.rose : 'transparent',
    color: variant === 'ghost' ? C.muted : '#fff',
  }
}

const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: C.muted,
  textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4,
}

const actionBtn = (danger?: boolean): React.CSSProperties => ({
  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
  border: danger ? `1px solid rgba(168,63,72,.3)` : `1px solid ${C.line}`,
  background: danger ? '#fff4f5' : C.panel,
  color: danger ? C.rose : C.muted,
})

// ── Month Card ────────────────────────────────────────────────────────────────
function MonthCard({ month, onUpdate, onDelete }: {
  month: Month; onUpdate: (m: Month) => void; onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Month>(month)
  const [newTag, setNewTag] = useState('')
  const [confirmDel, setConfirmDel] = useState(false)

  function save() { onUpdate(draft); setEditing(false) }

  function setTagField(i: number, field: keyof MonthTag, val: string) {
    setDraft(d => ({ ...d, tags: d.tags.map((t, idx) => idx === i ? { ...t, [field]: val } : t) }))
  }

  if (editing) {
    return (
      <div style={{ border: `2px solid ${C.green}`, borderRadius: 8, background: C.panel, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Editing: {draft.name}</span>
          <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 18 }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <label style={lbl}>Name</label>
            <input style={inputSt} value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
          </div>
          <div>
            <label style={lbl}>Stars</label>
            <select style={inputSt} value={draft.stars} onChange={e => setDraft(d => ({ ...d, stars: Number(e.target.value) }))}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{stars(n)}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={lbl}>Focus</label>
          <input style={inputSt} value={draft.focus} onChange={e => setDraft(d => ({ ...d, focus: e.target.value }))} />
        </div>

        <div>
          <label style={lbl}>Reason</label>
          <textarea style={{ ...inputSt, resize: 'vertical', minHeight: 72 }} value={draft.reason} onChange={e => setDraft(d => ({ ...d, reason: e.target.value }))} />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={draft.isNow} onChange={e => setDraft(d => ({ ...d, isNow: e.target.checked }))} />
          Mark as current month (highlighted)
        </label>

        <div>
          <label style={lbl}>Tags</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {draft.tags.map((tag, i) => (
              <div key={i} style={{ display: 'flex', gap: 6 }}>
                <input style={{ ...inputSt, flex: 2 }} value={tag.label} onChange={e => setTagField(i, 'label', e.target.value)} placeholder="Label" />
                <select style={{ ...inputSt, flex: 1 }} value={tag.type} onChange={e => setTagField(i, 'type', e.target.value as TagType)}>
                  <option value="">Default</option>
                  <option value="priority">Priority</option>
                  <option value="warning">Warning</option>
                  <option value="family">Family</option>
                  <option value="skill">Skill</option>
                </select>
                <button onClick={() => setDraft(d => ({ ...d, tags: d.tags.filter((_, idx) => idx !== i) }))} style={{ ...btn('danger'), padding: '5px 8px' }}>✕</button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 6 }}>
              <input style={{ ...inputSt, flex: 1 }} value={newTag} onChange={e => setNewTag(e.target.value)}
                placeholder="New tag..." onKeyDown={e => { if (e.key === 'Enter' && newTag.trim()) { setDraft(d => ({ ...d, tags: [...d.tags, { label: newTag.trim(), type: '' }] })); setNewTag('') } }} />
              <button onClick={() => { if (newTag.trim()) { setDraft(d => ({ ...d, tags: [...d.tags, { label: newTag.trim(), type: '' }] })); setNewTag('') } }} style={{ ...btn('primary'), flexShrink: 0 }}>+ Add</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setEditing(false)} style={btn('ghost')}>Cancel</button>
          <button onClick={save} style={btn('primary')}>Save</button>
        </div>
      </div>
    )
  }

  return (
    <article style={{
      display: 'flex', flexDirection: 'column', minHeight: 315, padding: 18,
      border: month.isNow ? `1px solid rgba(13,122,85,.45)` : `1px solid ${C.line}`,
      borderRadius: 8, background: C.panel, position: 'relative',
      boxShadow: month.isNow ? '0 12px 30px rgba(13,122,85,.12)' : 'none',
    }}>
      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
        <button onClick={() => { setDraft(month); setEditing(true) }} style={actionBtn()}>Edit</button>
        {confirmDel
          ? <><button onClick={onDelete} style={{ ...btn('danger'), fontSize: 11 }}>Confirm?</button><button onClick={() => setConfirmDel(false)} style={btn('ghost')}>×</button></>
          : <button onClick={() => setConfirmDel(true)} style={actionBtn(true)}>Delete</button>
        }
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12, paddingRight: 110 }}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: 20, lineHeight: 1.15, color: C.ink }}>{month.name}</h3>
          <div style={{ color: C.green, fontWeight: 800, fontSize: 14 }}>{month.focus}</div>
        </div>
        <div style={{ color: C.amber, fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 }}>{stars(month.stars)}</div>
      </div>

      <p style={{ margin: '0 0 14px', color: C.muted, fontSize: 14 }}>{month.reason}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 'auto' }}>
        {month.tags.map((tag, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 26, padding: '3px 9px', borderRadius: 999, fontSize: 13, fontWeight: 700, ...tagStyle(tag.type) }}>{tag.label}</span>
        ))}
      </div>
    </article>
  )
}

// ── Journey Step ──────────────────────────────────────────────────────────────
function StepCard({ step, isLast, onUpdate, onDelete }: {
  step: JourneyStep; isLast: boolean; onUpdate: (s: JourneyStep) => void; onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<JourneyStep>(step)
  const [confirmDel, setConfirmDel] = useState(false)

  if (editing) {
    return (
      <div style={{ border: `2px solid ${C.green}`, borderRadius: 8, background: C.panel, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Editing step</span>
          <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 16 }}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 8 }}>
          <div><label style={lbl}>Num</label><input style={inputSt} value={draft.num} onChange={e => setDraft(d => ({ ...d, num: e.target.value }))} /></div>
          <div><label style={lbl}>Title</label><input style={inputSt} value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} /></div>
        </div>
        <div><label style={lbl}>Description</label><textarea style={{ ...inputSt, resize: 'vertical', minHeight: 60 }} value={draft.desc} onChange={e => setDraft(d => ({ ...d, desc: e.target.value }))} /></div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setEditing(false)} style={btn('ghost')}>Cancel</button>
          <button onClick={() => { onUpdate(draft); setEditing(false) }} style={btn('primary')}>Save</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', minHeight: 145, padding: 16, border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel }}>
      {!isLast && (
        <div style={{ position: 'absolute', top: 16, right: 12, width: 26, height: 26, border: `1px solid ${C.line}`, borderRadius: 999, background: C.paper, color: C.muted, textAlign: 'center', lineHeight: '24px', fontWeight: 800, fontSize: 13 }}>→</div>
      )}
      <small style={{ display: 'block', marginBottom: 7, color: C.green, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{step.num}</small>
      <strong style={{ display: 'block', paddingRight: 32, marginBottom: 8, fontSize: 17, lineHeight: 1.2, color: C.ink, fontWeight: 700 }}>{step.title}</strong>
      <span style={{ color: C.muted, fontSize: 14 }}>{step.desc}</span>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <button onClick={() => { setDraft(step); setEditing(true) }} style={actionBtn()}>Edit</button>
        {confirmDel
          ? <><button onClick={onDelete} style={{ ...btn('danger'), fontSize: 11 }}>Confirm?</button><button onClick={() => setConfirmDel(false)} style={btn('ghost')}>×</button></>
          : <button onClick={() => setConfirmDel(true)} style={actionBtn(true)}>Delete</button>
        }
      </div>
    </div>
  )
}

// ── Category Group ────────────────────────────────────────────────────────────
function CategoryCard({ group, onUpdate, onDelete }: {
  group: CategoryGroup; onUpdate: (g: CategoryGroup) => void; onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<CategoryGroup>(group)
  const [newTag, setNewTag] = useState('')
  const [confirmDel, setConfirmDel] = useState(false)

  if (editing) {
    return (
      <div style={{ border: `2px solid ${C.green}`, borderRadius: 8, background: C.panel, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Editing category</span>
          <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 16 }}>✕</button>
        </div>
        <div><label style={lbl}>Group name</label><input style={inputSt} value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} /></div>
        <div>
          <label style={lbl}>Tags</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {draft.tags.map((tag, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: C.soft, fontSize: 12, fontWeight: 700 }}>
                {tag}
                <button onClick={() => setDraft(d => ({ ...d, tags: d.tags.filter((_, idx) => idx !== i) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input style={{ ...inputSt, flex: 1 }} value={newTag} onChange={e => setNewTag(e.target.value)}
              placeholder="New tag..." onKeyDown={e => { if (e.key === 'Enter' && newTag.trim()) { setDraft(d => ({ ...d, tags: [...d.tags, newTag.trim()] })); setNewTag('') } }} />
            <button onClick={() => { if (newTag.trim()) { setDraft(d => ({ ...d, tags: [...d.tags, newTag.trim()] })); setNewTag('') } }} style={{ ...btn('primary'), flexShrink: 0 }}>+ Add</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setEditing(false)} style={btn('ghost')}>Cancel</button>
          <button onClick={() => { onUpdate(draft); setEditing(false) }} style={btn('primary')}>Save</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 20, border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18, color: C.ink }}>{group.name}</h3>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 8 }}>
          <button onClick={() => { setDraft(group); setEditing(true) }} style={actionBtn()}>Edit</button>
          {confirmDel
            ? <><button onClick={onDelete} style={{ ...btn('danger'), fontSize: 11 }}>Confirm?</button><button onClick={() => setConfirmDel(false)} style={btn('ghost')}>×</button></>
            : <button onClick={() => setConfirmDel(true)} style={actionBtn(true)}>Delete</button>
          }
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {group.tags.map((tag, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 26, padding: '3px 9px', borderRadius: 999, background: C.soft, color: '#293633', fontSize: 13, fontWeight: 700 }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// ── Table Row ─────────────────────────────────────────────────────────────────
function TableRowEditable({ row, onUpdate, onDelete }: {
  row: TableRow; onUpdate: (r: TableRow) => void; onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<TableRow>(row)
  const [confirmDel, setConfirmDel] = useState(false)
  const pc = pillColor(row.priority)

  const tdSt: React.CSSProperties = { padding: '13px 14px', borderBottom: `1px solid ${C.line}`, verticalAlign: 'top', fontSize: 14 }

  if (editing) {
    return (
      <tr style={{ background: '#f3faf6' }}>
        <td colSpan={5} style={{ padding: '12px 14px', borderBottom: `1px solid ${C.line}` }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ flex: '2 1 160px' }}><label style={lbl}>Category</label><input style={inputSt} value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value }))} /></div>
            <div style={{ flex: '1 1 110px' }}><label style={lbl}>AI Citation</label><input style={inputSt} value={draft.aiCitation} onChange={e => setDraft(d => ({ ...d, aiCitation: e.target.value }))} /></div>
            <div style={{ flex: '1 1 110px' }}><label style={lbl}>Lead Value</label><input style={inputSt} value={draft.leadValue} onChange={e => setDraft(d => ({ ...d, leadValue: e.target.value }))} /></div>
            <div style={{ flex: '0 0 72px' }}>
              <label style={lbl}>Priority</label>
              <select style={inputSt} value={draft.priority} onChange={e => setDraft(d => ({ ...d, priority: e.target.value as Priority }))}>
                <option value="S">S</option><option value="A">A</option><option value="B">B</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 6, paddingBottom: 1 }}>
              <button onClick={() => { onUpdate(draft); setEditing(false) }} style={btn('primary')}>Save</button>
              <button onClick={() => setEditing(false)} style={btn('ghost')}>Cancel</button>
            </div>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td style={tdSt}>{row.category}</td>
      <td style={{ ...tdSt, color: C.amber, whiteSpace: 'nowrap' }}>{row.aiCitation}</td>
      <td style={{ ...tdSt, color: C.amber, whiteSpace: 'nowrap' }}>{row.leadValue}</td>
      <td style={tdSt}>
        <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 28, padding: '4px 10px', border: `1px solid ${pc.borderColor}`, borderRadius: 999, background: pc.background, color: pc.color, fontSize: 13, fontWeight: 700 }}>{row.priority}</span>
      </td>
      <td style={{ ...tdSt, whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => { setDraft(row); setEditing(true) }} style={actionBtn()}>Edit</button>
          {confirmDel
            ? <><button onClick={onDelete} style={{ ...btn('danger'), fontSize: 11 }}>Confirm?</button><button onClick={() => setConfirmDel(false)} style={btn('ghost')}>×</button></>
            : <button onClick={() => setConfirmDel(true)} style={actionBtn(true)}>Delete</button>
          }
        </div>
      </td>
    </tr>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export function MigrationCalendarClient() {
  const [months, setMonths] = useState<Month[]>(INIT_MONTHS)
  const [tableRows, setTableRows] = useState<TableRow[]>(INIT_TABLE)
  const [journey, setJourney] = useState<JourneyStep[]>(INIT_JOURNEY)
  const [categories, setCategories] = useState<CategoryGroup[]>(INIT_CATEGORIES)
  const [killerText, setKillerText] = useState(INIT_KILLER)
  const [editingKiller, setEditingKiller] = useState(false)
  const [killerDraft, setKillerDraft] = useState(INIT_KILLER)
  const [hydrated, setHydrated] = useState(false)
  const [saving, setSaving] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load from DB on mount
  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from('migration_calendar_config')
        .select('*')
        .eq('id', DB_ID)
        .single()
      if (data) {
        if (data.months)      setMonths(data.months)
        if (data.table_rows)  setTableRows(data.table_rows)
        if (data.journey)     setJourney(data.journey)
        if (data.categories)  setCategories(data.categories)
        if (data.killer_text) setKillerText(data.killer_text)
      }
      setHydrated(true)
    })()
  }, [])

  // Debounced save to DB (500ms after last change)
  useEffect(() => {
    if (!hydrated) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaving(true)
    saveTimer.current = setTimeout(async () => {
      await supabase.from('migration_calendar_config').upsert({
        id: DB_ID,
        months,
        table_rows: tableRows,
        journey,
        categories,
        killer_text: killerText,
        updated_at: new Date().toISOString(),
      })
      setSaving(false)
    }, 500)
  }, [months, tableRows, journey, categories, killerText, hydrated])

  const updateMonth   = useCallback((u: Month)         => setMonths(ms => ms.map(m => m.id === u.id ? u : m)), [])
  const deleteMonth   = useCallback((id: string)       => setMonths(ms => ms.filter(m => m.id !== id)), [])
  const updateRow     = useCallback((u: TableRow)      => setTableRows(rs => rs.map(r => r.id === u.id ? u : r)), [])
  const deleteRow     = useCallback((id: string)       => setTableRows(rs => rs.filter(r => r.id !== id)), [])
  const updateStep    = useCallback((u: JourneyStep)   => setJourney(js => js.map(j => j.id === u.id ? u : j)), [])
  const deleteStep    = useCallback((id: string)       => setJourney(js => js.filter(j => j.id !== id)), [])
  const updateCat     = useCallback((u: CategoryGroup) => setCategories(cs => cs.map(c => c.id === u.id ? u : c)), [])
  const deleteCat     = useCallback((id: string)       => setCategories(cs => cs.filter(c => c.id !== id)), [])

  function addMonth() {
    setMonths(ms => [...ms, { id: uid(), name: 'New Month', isNow: false, focus: 'Focus area', stars: 3, reason: 'Describe the content strategy...', tags: [] }])
  }
  function addRow() {
    setTableRows(rs => [...rs, { id: uid(), category: 'New Category', aiCitation: '★★★', leadValue: '★★★', priority: 'B' }])
  }
  function addStep() {
    const num = String(journey.length + 1).padStart(2, '0')
    setJourney(js => [...js, { id: uid(), num, title: 'New Step', desc: 'Describe this step...' }])
  }
  function addCategory() {
    setCategories(cs => [...cs, { id: uid(), name: 'New Category', tags: [] }])
  }
  function resetAll() {
    if (!confirm('Reset semua data ke default? Semua perubahan akan hilang.')) return
    setMonths(INIT_MONTHS); setTableRows(INIT_TABLE); setJourney(INIT_JOURNEY)
    setCategories(INIT_CATEGORIES); setKillerText(INIT_KILLER)
  }

  const thSt: React.CSSProperties = {
    padding: '13px 14px', textAlign: 'left', verticalAlign: 'top',
    background: C.soft, color: '#3d4b48', fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase',
    borderBottom: `1px solid ${C.line}`,
  }

  return (
    <div style={{ color: C.ink, lineHeight: 1.55 }}>

      {/* Hero */}
      <section className="mc-hero" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0,1.25fr) minmax(240px,0.75fr)',
        gap: 28, alignItems: 'end', padding: 34,
        border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 38,
        background: 'linear-gradient(135deg,rgba(217,238,229,.95),rgba(255,255,255,.9)),radial-gradient(circle at 88% 10%,rgba(39,91,137,.15),transparent 28%)',
        boxShadow: '0 18px 48px rgba(23,33,31,.08)',
      }}>
        <div>
          <p style={{ margin: '0 0 12px', color: C.green, fontSize: 13, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>RACC AI Citation Strategy</p>
          <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(26px,4vw,52px)', lineHeight: 0.98, letterSpacing: 0, color: C.ink }}>Migration Intelligence Calendar</h1>
          <p style={{ margin: 0, color: '#40514d', fontSize: 16 }}>Roadmap konten 12 bulan untuk membangun topical authority, knowledge graph, dan peluang AI citation berdasarkan financial year Australia, university intake, invitation rounds, legislative changes, search seasonality, dan AI indexing lead time 30-60 hari.</p>
        </div>
        <aside style={{ display: 'grid', gap: 10 }}>
          {[['12','Bulan strategi'],['30-60','Hari indexing lead time'],['S/A/B','Priority scoring']].map(([val, label]) => (
            <div key={label} style={{ padding: 16, border: '1px solid rgba(13,122,85,.22)', borderRadius: 8, background: 'rgba(255,255,255,.72)' }}>
              <strong style={{ display: 'block', fontSize: 24, lineHeight: 1.05, color: C.ink }}>{val}</strong>
              <span style={{ color: C.muted, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </aside>
      </section>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: saving ? C.amber : C.green, fontWeight: 600 }}>
          {hydrated ? (saving ? 'Menyimpan...' : 'Tersimpan') : 'Memuat...'}
        </span>
        <button onClick={resetAll} style={{ padding: '5px 14px', borderRadius: 6, border: `1px solid ${C.line}`, background: C.panel, color: C.muted, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Reset ke default</button>
      </div>

      {/* Calendar Roadmap */}
      <section style={{ marginBottom: 38 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(20px,3vw,30px)', color: C.ink }}>Calendar Roadmap</h2>
            <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>Urutan publish disusun dari momen demand, perubahan regulasi, dan readiness AI indexing.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {([
              ['Current push', C.rose, 'rgba(168,63,72,.25)', '#fff4f5'],
              ['S priority', C.green, 'rgba(13,122,85,.25)', '#effaf5'],
              ['A priority', C.blue, 'rgba(39,91,137,.25)', '#f0f6fb'],
              ['B priority', C.amber, 'rgba(166,101,0,.25)', '#fff8e9'],
            ] as [string, string, string, string][]).map(([label, color, border, bg]) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 28, padding: '4px 10px', border: `1px solid ${border}`, borderRadius: 999, background: bg, color, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{label}</span>
            ))}
          </div>
        </div>

        <div className="mc-cal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14 }}>
          {months.map(m => (
            <MonthCard key={m.id} month={m} onUpdate={updateMonth} onDelete={() => deleteMonth(m.id)} />
          ))}
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={addMonth} style={{ ...btn('primary'), padding: '7px 18px' }}>+ Add Month</button>
        </div>
      </section>

      {/* Killer Strategy + Table */}
      <section className="mc-grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.1fr)', gap: 18, marginBottom: 38 }}>
        <div style={{ padding: 20, border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 22, color: C.ink }}>Killer Strategy</h2>
          <p style={{ margin: '0 0 16px', color: C.muted, fontSize: 14 }}>Jangan hanya bikin kalender berdasarkan visa. Bangun berdasarkan life journey seseorang, karena itu membuat RACC terlihat memahami keseluruhan perjalanan migrasi.</p>
          {editingKiller ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <textarea style={{ ...inputSt, resize: 'vertical', minHeight: 80 }} value={killerDraft} onChange={e => setKillerDraft(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setEditingKiller(false)} style={btn('ghost')}>Cancel</button>
                <button onClick={() => { setKillerText(killerDraft); setEditingKiller(false) }} style={btn('primary')}>Save</button>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <div style={{ padding: 18, border: `1px dashed rgba(13,122,85,.5)`, borderRadius: 8, background: '#f3faf6', color: '#28423a', fontWeight: 700, fontSize: 14, lineHeight: 1.6 }}>{killerText}</div>
              <button onClick={() => { setKillerDraft(killerText); setEditingKiller(true) }} style={{ position: 'absolute', top: 8, right: 8, ...actionBtn() }}>Edit</button>
            </div>
          )}
        </div>

        <div style={{ border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460, fontSize: 14 }}>
              <thead>
                <tr>
                  {['Visa Category','AI Citation Potential','Lead Value','Priority',''].map(h => (
                    <th key={h} style={thSt}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map(row => (
                  <TableRowEditable key={row.id} row={row} onUpdate={updateRow} onDelete={() => deleteRow(row.id)} />
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.line}` }}>
            <button onClick={addRow} style={{ ...btn('primary'), padding: '5px 14px' }}>+ Add Row</button>
          </div>
        </div>
      </section>

      {/* Life Journey */}
      <section style={{ marginBottom: 38 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(20px,3vw,30px)', color: C.ink }}>Life Journey Knowledge Graph</h2>
          <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>Pakai struktur ini untuk internal linking, content hub, dan AI-readable topical map.</p>
        </div>
        <div className="mc-journey" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10 }}>
          {journey.map((step, i) => (
            <StepCard key={step.id} step={step} isLast={i === journey.length - 1} onUpdate={updateStep} onDelete={() => deleteStep(step.id)} />
          ))}
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={addStep} style={{ ...btn('primary'), padding: '7px 18px' }}>+ Add Step</button>
        </div>
      </section>

      {/* Visa Category Bank */}
      <section>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(20px,3vw,30px)', color: C.ink }}>Visa Category Bank</h2>
          <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>Gunakan sebagai checklist cluster saat produksi artikel dan halaman pendukung.</p>
        </div>
        <div className="mc-cats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14 }}>
          {categories.map(group => (
            <CategoryCard key={group.id} group={group} onUpdate={updateCat} onDelete={() => deleteCat(group.id)} />
          ))}
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={addCategory} style={{ ...btn('primary'), padding: '7px 18px' }}>+ Add Category</button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mc-hero    { grid-template-columns: 1fr !important; }
          .mc-grid-2  { grid-template-columns: 1fr !important; }
          .mc-cal     { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .mc-journey { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .mc-cats    { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 560px) {
          .mc-cal     { grid-template-columns: 1fr !important; }
          .mc-journey { grid-template-columns: 1fr !important; }
          .mc-cats    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
