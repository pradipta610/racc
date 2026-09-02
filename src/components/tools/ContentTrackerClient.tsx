'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

// ── Color tokens (matching Migration Calendar / internal tools palette) ───────
const C = {
  ink: '#17211f', muted: '#66706d', line: '#dbe3df', paper: '#fbfcfa',
  panel: '#ffffff', soft: '#eef5f1', green: '#0d7a55', blue: '#275b89',
  amber: '#a66500', rose: '#a83f48',
}

const TABLE = 'content_tracker_items'

type Stage = 'draft' | 'review' | 'revisi' | 'publish'

interface ContentItem {
  id: string
  title: string
  stage: Stage
  deadline: string | null
  link: string | null
  notes: string | null
}

const STAGES: { key: Stage; label: string; dot: string }[] = [
  { key: 'draft', label: 'Draft', dot: C.muted },
  { key: 'review', label: 'Review', dot: C.blue },
  { key: 'revisi', label: 'Revision', dot: C.amber },
  { key: 'publish', label: 'Published', dot: C.green },
]

function uid() { return Math.random().toString(36).slice(2, 9) }

function daysUntil(dateStr: string) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr + 'T00:00:00')
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

function deadlineInfo(dateStr: string | null): { label: string; tone: 'normal' | 'soon' | 'overdue' } | null {
  if (!dateStr) return null
  const diff = daysUntil(dateStr)
  const fmt = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
  if (diff < 0) return { label: `${Math.abs(diff)}d late · ${fmt}`, tone: 'overdue' }
  if (diff === 0) return { label: 'Due today', tone: 'soon' }
  if (diff <= 3) return { label: `${diff}d left · ${fmt}`, tone: 'soon' }
  return { label: fmt, tone: 'normal' }
}

const inputSt: React.CSSProperties = {
  width: '100%', padding: '7px 10px', borderRadius: 6,
  border: `1px solid ${C.line}`, fontSize: 13, fontFamily: 'inherit',
  color: C.ink, background: C.panel, outline: 'none',
}
const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: C.muted,
  textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4,
}
function btn(variant: 'primary' | 'ghost' | 'danger'): React.CSSProperties {
  return {
    padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit', border: 'none',
    background: variant === 'primary' ? C.green : variant === 'danger' ? C.rose : 'transparent',
    color: variant === 'ghost' ? C.muted : '#fff',
  }
}
const actionBtn = (danger?: boolean): React.CSSProperties => ({
  padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
  border: danger ? '1px solid rgba(168,63,72,.3)' : `1px solid ${C.line}`,
  background: danger ? '#fff4f5' : C.panel,
  color: danger ? C.rose : C.muted,
})
function toneStyle(tone: 'normal' | 'soon' | 'overdue') {
  if (tone === 'overdue') return { background: '#fff1f2', color: C.rose }
  if (tone === 'soon') return { background: '#fff8e9', color: C.amber }
  return { background: C.soft, color: C.muted }
}

// ── Card ──────────────────────────────────────────────────────────────────────
function ItemCard({ item, dragging, onMove, onEdit, onDragStart, onDragEnd }: {
  item: ContentItem
  dragging: boolean
  onMove: (dir: -1 | 1) => void
  onEdit: () => void
  onDragStart: () => void
  onDragEnd: () => void
}) {
  const idx = STAGES.findIndex(s => s.key === item.stage)
  const dl = deadlineInfo(item.deadline)
  return (
    <article
      draggable
      onDragStart={e => { e.dataTransfer.setData('text/plain', item.id); e.dataTransfer.effectAllowed = 'move'; onDragStart() }}
      onDragEnd={onDragEnd}
      style={{
        border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel,
        padding: '12px 14px 10px', cursor: 'grab', opacity: dragging ? .4 : 1,
      }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: C.ink }}>
        {item.title}
      </h3>
      {(dl || item.link) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
          {dl && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
              borderRadius: 999, fontSize: 11, fontWeight: 700, ...toneStyle(dl.tone),
            }}>{dl.label}</span>
          )}
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: C.blue, textDecoration: 'none' }}>
              ↗ Draft link
            </a>
          )}
        </div>
      )}
      {item.notes && (
        <p style={{ margin: '0 0 8px', fontSize: 12, fontStyle: 'italic', color: C.muted, lineHeight: 1.45 }}>
          {item.notes}
        </p>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6,
        borderTop: `1px solid ${C.line}`, paddingTop: 8, marginTop: 4,
      }}>
        <button onClick={() => onMove(-1)} disabled={idx === 0} style={{ ...actionBtn(), marginRight: 'auto', opacity: idx === 0 ? .35 : 1 }}>‹</button>
        <button onClick={onEdit} style={actionBtn()}>Edit</button>
        <button onClick={() => onMove(1)} disabled={idx === STAGES.length - 1} style={{ ...actionBtn(), opacity: idx === STAGES.length - 1 ? .35 : 1 }}>›</button>
      </div>
    </article>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function ItemModal({ item, defaultStage, onSave, onDelete, onClose }: {
  item: ContentItem | null
  defaultStage: Stage
  onSave: (data: { title: string; stage: Stage; deadline: string | null; link: string | null; notes: string | null }) => void
  onDelete?: () => void
  onClose: () => void
}) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [stage, setStage] = useState<Stage>(item?.stage ?? defaultStage)
  const [deadline, setDeadline] = useState(item?.deadline ?? '')
  const [link, setLink] = useState(item?.link ?? '')
  const [notes, setNotes] = useState(item?.notes ?? '')
  const [confirmDel, setConfirmDel] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      title: title.trim(), stage,
      deadline: deadline || null,
      link: link.trim() || null,
      notes: notes.trim() || null,
    })
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(20,24,22,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 20,
    }}>
      <form onClick={e => e.stopPropagation()} onSubmit={submit} style={{
        width: 'min(440px, 100%)', maxHeight: '90vh', overflowY: 'auto',
        background: C.panel, borderRadius: 10, padding: 22,
        boxShadow: '0 18px 48px rgba(23,33,31,.25)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 17, color: C.ink }}>{item ? 'Edit content' : 'New content'}</h2>

        <div>
          <label style={lbl}>Title</label>
          <input style={inputSt} value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Article or content title" autoFocus required maxLength={140} />
        </div>

        <div>
          <label style={lbl}>Stage</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {STAGES.map(s => (
              <button type="button" key={s.key} onClick={() => setStage(s.key)}
                style={{
                  flex: 1, padding: '7px 6px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                  border: stage === s.key ? `1px solid ${s.dot}` : `1px solid ${C.line}`,
                  background: stage === s.key ? C.soft : C.panel,
                  color: stage === s.key ? C.ink : C.muted,
                }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={lbl}>Deadline</label>
            <input type="date" style={inputSt} value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Draft link</label>
            <input type="url" style={inputSt} value={link} onChange={e => setLink(e.target.value)} placeholder="https://docs.google.com/..." />
          </div>
        </div>

        <div>
          <label style={lbl}>Notes / feedback</label>
          <textarea style={{ ...inputSt, resize: 'vertical', minHeight: 72, fontFamily: 'inherit' }}
            value={notes} onChange={e => setNotes(e.target.value)} maxLength={600}
            placeholder="Review notes, requested revisions, etc." />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          {onDelete && (
            confirmDel ? (
              <>
                <button type="button" onClick={onDelete} style={{ ...btn('danger'), fontSize: 11 }}>Confirm delete?</button>
                <button type="button" onClick={() => setConfirmDel(false)} style={btn('ghost')}>Cancel</button>
              </>
            ) : (
              <button type="button" onClick={() => setConfirmDel(true)} style={btn('danger')}>Delete</button>
            )
          )}
          <div style={{ flex: 1 }} />
          <button type="button" onClick={onClose} style={btn('ghost')}>Cancel</button>
          <button type="submit" style={btn('primary')}>Save</button>
        </div>
      </form>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ContentTrackerClient() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [modal, setModal] = useState<{ item: ContentItem | null; stage: Stage } | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null)
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flashError = useCallback((msg: string) => {
    setError(msg)
    if (errorTimer.current) clearTimeout(errorTimer.current)
    errorTimer.current = setTimeout(() => setError(null), 4000)
  }, [])

  const upsertLocal = useCallback((row: ContentItem) => {
    setItems(prev => prev.some(i => i.id === row.id)
      ? prev.map(i => i.id === row.id ? row : i)
      : [...prev, row])
  }, [])
  const removeLocal = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  // Load once, then subscribe to live changes from every viewer
  useEffect(() => {
    let active = true
    ;(async () => {
      const { data, error: loadError } = await supabase.from(TABLE).select('*')
      if (!active) return
      if (loadError) flashError('Failed to load data.')
      else setItems((data ?? []) as ContentItem[])
      setLoading(false)
    })()

    const channel = supabase
      .channel('content_tracker_items_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLE }, payload => upsertLocal(payload.new as ContentItem))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: TABLE }, payload => upsertLocal(payload.new as ContentItem))
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: TABLE }, payload => removeLocal((payload.old as ContentItem).id))
      .subscribe(status => setConnected(status === 'SUBSCRIBED'))

    return () => { active = false; supabase.removeChannel(channel) }
  }, [upsertLocal, removeLocal, flashError])

  async function saveItem(data: { title: string; stage: Stage; deadline: string | null; link: string | null; notes: string | null }) {
    const editing = modal?.item
    const row: ContentItem = editing ? { ...editing, ...data } : { id: uid(), ...data }
    upsertLocal(row)
    setModal(null)
    const { error: saveError } = editing
      ? await supabase.from(TABLE).update(data).eq('id', editing.id)
      : await supabase.from(TABLE).insert(row)
    if (saveError) flashError('Failed to save changes.')
  }

  async function deleteItem(id: string) {
    removeLocal(id)
    setModal(null)
    const { error: delError } = await supabase.from(TABLE).delete().eq('id', id)
    if (delError) flashError('Failed to delete content.')
  }

  async function setStage(item: ContentItem, stage: Stage) {
    if (item.stage === stage) return
    upsertLocal({ ...item, stage })
    const { error: moveError } = await supabase.from(TABLE).update({ stage }).eq('id', item.id)
    if (moveError) flashError('Failed to move stage.')
  }

  function moveItem(item: ContentItem, dir: -1 | 1) {
    const idx = STAGES.findIndex(s => s.key === item.stage)
    const next = STAGES[idx + dir]
    if (next) setStage(item, next.key)
  }

  function handleDrop(e: React.DragEvent, stage: Stage) {
    e.preventDefault()
    setDragOverStage(null)
    const id = e.dataTransfer.getData('text/plain')
    const item = items.find(i => i.id === id)
    if (item) setStage(item, stage)
  }

  return (
    <div style={{ color: C.ink }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: connected ? C.green : C.muted, fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: connected ? C.green : C.line }} />
          {loading ? 'Loading…' : connected ? 'Connected — live' : 'Connecting…'}
        </span>
        <button onClick={() => setModal({ item: null, stage: 'draft' })} style={btn('primary')}>+ New Content</button>
      </div>

      {error && (
        <div style={{ marginBottom: 16, padding: '8px 12px', borderRadius: 6, background: '#fff1f2', border: '1px solid rgba(168,63,72,.3)', color: C.rose, fontSize: 13 }}>
          {error}
        </div>
      )}

      <div className="ct-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 14 }}>
        {STAGES.map(stage => {
          const stageItems = items
            .filter(i => i.stage === stage.key)
            .sort((a, b) => {
              if (!a.deadline && !b.deadline) return 0
              if (!a.deadline) return 1
              if (!b.deadline) return -1
              return a.deadline.localeCompare(b.deadline)
            })
          const isDragTarget = dragOverStage === stage.key
          return (
            <section key={stage.key}
              onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (dragOverStage !== stage.key) setDragOverStage(stage.key) }}
              onDragLeave={() => setDragOverStage(prev => (prev === stage.key ? null : prev))}
              onDrop={e => handleDrop(e, stage.key)}
              style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                borderRadius: 10, padding: 6,
                background: isDragTarget ? C.soft : 'transparent',
                outline: isDragTarget ? `1px dashed ${stage.dot}` : 'none',
                outlineOffset: -2,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingBottom: 8, borderBottom: `2px solid ${C.line}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: stage.dot }} />
                <h2 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: C.ink, flex: 1 }}>
                  {stage.label}
                </h2>
                <span style={{ fontSize: 12, color: C.muted }}>{stageItems.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 40 }}>
                {stageItems.length === 0 ? (
                  <p style={{ margin: 0, padding: 14, textAlign: 'center', fontSize: 12, color: C.muted, border: `1px dashed ${C.line}`, borderRadius: 8 }}>
                    No content yet
                  </p>
                ) : stageItems.map(item => (
                  <ItemCard key={item.id} item={item}
                    dragging={draggingId === item.id}
                    onMove={dir => moveItem(item, dir)}
                    onEdit={() => setModal({ item, stage: item.stage })}
                    onDragStart={() => setDraggingId(item.id)}
                    onDragEnd={() => { setDraggingId(null); setDragOverStage(null) }} />
                ))}
              </div>

              <button onClick={() => setModal({ item: null, stage: stage.key })} style={{
                background: 'transparent', border: `1px dashed ${C.line}`, color: C.muted,
                borderRadius: 6, padding: '7px 8px', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer',
              }}>+ Add to {stage.label}</button>
            </section>
          )
        })}
      </div>

      {modal && (
        <ItemModal
          item={modal.item}
          defaultStage={modal.stage}
          onSave={saveItem}
          onDelete={modal.item ? () => deleteItem(modal.item!.id) : undefined}
          onClose={() => setModal(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .ct-board { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 560px) {
          .ct-board { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
