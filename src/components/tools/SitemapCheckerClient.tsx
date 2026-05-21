'use client'

import { useState, useCallback } from 'react'

const SITEMAPS = {
  pages: 'https://www.racc.net.au/pages-sitemap.xml',
  blog:  'https://www.racc.net.au/blog-posts-sitemap.xml',
}

type Source = 'pages' | 'blog' | 'both'
type ResultItem = { slug: string; found: boolean; matches: string[] }
type Tab = 'all' | 'found' | 'missing'

async function fetchSitemap(url: string): Promise<string[]> {
  const res = await fetch('/api/fetch-sitemap?url=' + encodeURIComponent(url))
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Error ${res.status} fetching sitemap.`)
  }
  const xml = await res.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')
  const locs = [...doc.querySelectorAll('loc')].map(l => l.textContent?.trim() ?? '')
  if (!locs.length) throw new Error('No URLs found in sitemap. It may be empty or blocked.')
  return locs
}

export function SitemapCheckerClient() {
  const [source, setSource]         = useState<Source>('pages')
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [progress, setProgress]     = useState(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [error, setError]           = useState('')
  const [results, setResults]       = useState<ResultItem[]>([])
  const [allUrls, setAllUrls]       = useState<string[]>([])
  const [tab, setTab]               = useState<Tab>('all')
  const [resultSearch, setResultSearch] = useState('')
  const [allSearch, setAllSearch]   = useState('')
  const [copied, setCopied]         = useState(false)
  const [hasRun, setHasRun]         = useState(false)

  const runCheck = useCallback(async () => {
    const slugs = input.split('\n').map(s => s.trim().toLowerCase()).filter(Boolean)
    if (!slugs.length) { setError('Masukkan minimal satu slug atau keyword.'); return }
    setError('')
    setLoading(true)
    setProgress(5)
    setProgressLabel('Connecting…')

    try {
      let urls: string[] = []
      if (source === 'both') {
        setProgressLabel('Fetching pages sitemap…')
        setProgress(15)
        const p = await fetchSitemap(SITEMAPS.pages)
        setProgressLabel('Fetching blog sitemap…')
        setProgress(55)
        const b = await fetchSitemap(SITEMAPS.blog)
        urls = [...p, ...b]
      } else {
        setProgressLabel('Fetching sitemap…')
        setProgress(30)
        urls = await fetchSitemap(source === 'pages' ? SITEMAPS.pages : SITEMAPS.blog)
      }
      setProgress(85)
      setProgressLabel('Analysing…')

      const checked: ResultItem[] = slugs.map(slug => ({
        slug,
        found: urls.some(u => u.toLowerCase().includes(slug)),
        matches: urls.filter(u => u.toLowerCase().includes(slug)),
      }))

      setProgress(100)
      setProgressLabel('Done!')
      setAllUrls(urls)
      setResults(checked)
      setTab('all')
      setResultSearch('')
      setAllSearch('')
      setHasRun(true)
      setTimeout(() => { setProgress(0); setProgressLabel('') }, 700)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch sitemap.')
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }, [source, input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runCheck()
  }

  const copyMissing = () => {
    const text = results.filter(r => !r.found).map(r => r.slug).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const visibleResults = results
    .filter(r => tab === 'all' ? true : tab === 'found' ? r.found : !r.found)
    .filter(r => !resultSearch || r.slug.includes(resultSearch.toLowerCase()))

  const visibleAll = allUrls.filter(u => !allSearch || u.toLowerCase().includes(allSearch.toLowerCase()))

  const foundCount   = results.filter(r => r.found).length
  const missingCount = results.filter(r => !r.found).length

  const sourceOptions: { key: Source; label: string; sub: string; tag: string }[] = [
    { key: 'pages', label: 'Pages Sitemap',      sub: 'pages-sitemap.xml',       tag: 'PAGES' },
    { key: 'blog',  label: 'Blog Posts Sitemap', sub: 'blog-posts-sitemap.xml',  tag: 'BLOG'  },
    { key: 'both',  label: 'Both Sitemaps',      sub: 'pages + blog-posts',       tag: 'ALL'   },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* SOURCE SELECTOR */}
      <div style={card}>
        <Label>Sitemap to check against</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
          {sourceOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => { setSource(opt.key); setHasRun(false); setResults([]); setAllUrls([]) }}
              style={sourceBtn(source === opt.key)}
            >
              <span style={dot(source === opt.key)} />
              <span style={{ flex: 1, textAlign: 'left' }}>
                <span style={{ display: 'block', fontWeight: 600, fontSize: 13 }}>{opt.label}</span>
                <span style={{ fontSize: 11, opacity: .65 }}>{opt.sub}</span>
              </span>
              <span style={tag(source === opt.key)}>{opt.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* INPUT */}
      <div style={card}>
        <Label>Slugs atau keywords (satu per baris)</Label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'skilled-occupations\nvisa-491\npartner-visa'}
          rows={5}
          style={textarea}
        />
        <p style={{ fontSize: 12, color: 'var(--tl)', marginTop: 6 }}>
          Partial match — kalau URL mengandung keyword akan terdeteksi. Tekan <kbd style={kbd}>⌘ Enter</kbd> untuk cek.
        </p>

        <button onClick={runCheck} disabled={loading} style={btnPrimary(loading)}>
          {loading ? '⏳ Checking…' : '🔍 Check Sitemap'}
        </button>

        {/* Progress */}
        {progress > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 5, borderRadius: 10, background: 'var(--light)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--navy)', borderRadius: 10, transition: 'width .3s' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--tl)', marginTop: 5, textAlign: 'center' }}>{progressLabel}</p>
          </div>
        )}

        {/* Error */}
        {error && <div style={errorBox}>{error}</div>}
      </div>

      {/* RESULTS */}
      {hasRun && results.length > 0 && (
        <div style={card}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--td)', flex: 1 }}>Results</span>
            <span style={pill('var(--navy)', '#fff')}>{results.length} checked</span>
            {foundCount   > 0 && <span style={pill('#dcfce7', '#15803d')}>✓ {foundCount} found</span>}
            {missingCount > 0 && <span style={pill('#fee2e2', '#b91c1c')}>✗ {missingCount} not found</span>}
            {missingCount > 0 && (
              <button onClick={copyMissing} style={btnSecondary}>
                {copied ? '✓ Copied!' : '📋 Copy missing'}
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {(['all', 'found', 'missing'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={tabBtn(tab === t, t)}>
                {t === 'all' ? 'All' : t === 'found' ? 'Found' : 'Not Found'}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            value={resultSearch}
            onChange={e => setResultSearch(e.target.value)}
            placeholder="Filter results…"
            style={searchInput}
          />

          {/* List */}
          <div style={scrollList}>
            {visibleResults.length === 0
              ? <div style={empty}>No results match.</div>
              : visibleResults.map(r => (
                <div key={r.slug} style={resultItem(r.found)}>
                  <span style={badge(r.found)}>{r.found ? 'FOUND' : 'NOT FOUND'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <code style={{ fontSize: 13 }}>{r.slug}</code>
                    {r.found
                      ? r.matches.slice(0, 5).map(u => (
                          <div key={u} style={urlLine}>
                            ↳ <a href={u} target="_blank" rel="noopener" style={{ color: 'var(--navy)' }}>{u}</a>
                          </div>
                        ))
                      : <div style={{ ...urlLine, color: 'var(--tl)' }}>Safe to create — no match in sitemap</div>
                    }
                    {r.matches.length > 5 && (
                      <div style={{ ...urlLine, color: 'var(--tl)' }}>…and {r.matches.length - 5} more</div>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* ALL PAGES */}
      {hasRun && allUrls.length > 0 && (
        <div style={card}>
          <Label>All pages in sitemap ({allUrls.length.toLocaleString()} URLs)</Label>
          <input
            value={allSearch}
            onChange={e => setAllSearch(e.target.value)}
            placeholder="Search all pages…"
            style={{ ...searchInput, marginBottom: 10 }}
          />
          <div style={scrollList}>
            {visibleAll.length === 0
              ? <div style={empty}>No pages match.</div>
              : visibleAll.map(u => (
                <div key={u} style={{ ...resultItem(false), background: 'var(--white)', borderColor: 'var(--border)' }}>
                  <div style={urlLine}>
                    <a href={u} target="_blank" rel="noopener" style={{ color: 'var(--navy)', fontFamily: 'monospace', fontSize: 12 }}>{u}</a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

    </div>
  )
}

/* ===== INLINE STYLES ===== */
const card: React.CSSProperties = {
  background: 'var(--white)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '20px 22px',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--tl)', marginBottom: 10 }}>
      {children}
    </p>
  )
}

function sourceBtn(active: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px', borderRadius: 10,
    border: `1.5px solid ${active ? 'var(--navy)' : 'var(--border)'}`,
    background: active ? 'var(--navy)' : 'var(--off)',
    color: active ? '#fff' : 'var(--td)',
    cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all .15s',
  }
}
function dot(active: boolean): React.CSSProperties {
  return { width: 9, height: 9, borderRadius: '50%', background: active ? 'var(--yellow)' : 'var(--border)', flexShrink: 0 }
}
function tag(active: boolean): React.CSSProperties {
  return {
    fontSize: 10, padding: '2px 7px', borderRadius: 6, fontWeight: 700, letterSpacing: '.4px',
    background: active ? 'rgba(255,255,255,.18)' : 'var(--light)',
    color: active ? '#fff' : 'var(--tl)',
  }
}

const textarea: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid var(--border)', borderRadius: 10,
  fontSize: 13, fontFamily: 'monospace', lineHeight: 1.7,
  background: 'var(--off)', outline: 'none', resize: 'vertical',
}

const kbd: React.CSSProperties = {
  fontSize: 11, padding: '2px 6px', borderRadius: 5,
  background: 'var(--light)', border: '1px solid var(--border)', fontFamily: 'monospace',
}

function btnPrimary(disabled: boolean): React.CSSProperties {
  return {
    marginTop: 12, width: '100%', padding: '13px',
    border: 'none', borderRadius: 10,
    background: disabled ? 'var(--tl)' : 'var(--navy)',
    color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all .15s',
  }
}

const btnSecondary: React.CSSProperties = {
  padding: '5px 12px', border: '1.5px solid var(--border)', borderRadius: 8,
  background: 'var(--off)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
  cursor: 'pointer', color: 'var(--td)',
}

function tabBtn(active: boolean, t: Tab): React.CSSProperties {
  const colors: Record<Tab, string> = { all: 'var(--navy)', found: '#15803d', missing: '#b91c1c' }
  return {
    padding: '6px 14px', borderRadius: 20,
    border: `1.5px solid ${active ? colors[t] : 'var(--border)'}`,
    background: active ? colors[t] : 'var(--off)',
    color: active ? '#fff' : 'var(--tl)',
    fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'all .15s',
  }
}

const searchInput: React.CSSProperties = {
  width: '100%', padding: '9px 12px',
  border: '1.5px solid var(--border)', borderRadius: 8,
  fontSize: 13, fontFamily: 'inherit', background: 'var(--off)', outline: 'none',
  marginBottom: 8,
}

const scrollList: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 6,
  maxHeight: 440, overflowY: 'auto',
}

function resultItem(found: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '10px 12px', borderRadius: 10,
    border: `1px solid ${found ? 'rgba(34,197,94,.3)' : 'rgba(185,28,28,.2)'}`,
    background: found ? 'rgba(34,197,94,.05)' : 'rgba(185,28,28,.04)',
    fontSize: 13,
  }
}
function badge(found: boolean): React.CSSProperties {
  return {
    flexShrink: 0, padding: '2px 7px', borderRadius: 6,
    fontSize: 10, fontWeight: 700, letterSpacing: '.3px', textTransform: 'uppercase',
    background: found ? 'rgba(34,197,94,.15)' : 'rgba(185,28,28,.1)',
    color: found ? '#15803d' : '#b91c1c', marginTop: 1,
  }
}
function pill(bg: string, color: string): React.CSSProperties {
  return { padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: bg, color }
}
const urlLine: React.CSSProperties = { fontSize: 11, marginTop: 3, wordBreak: 'break-all', fontFamily: 'monospace' }
const errorBox: React.CSSProperties = {
  marginTop: 10, padding: '10px 14px', borderRadius: 8,
  background: '#fee2e2', border: '1px solid #fca5a5',
  fontSize: 13, color: '#b91c1c',
}
const empty: React.CSSProperties = { textAlign: 'center', padding: '32px 0', color: 'var(--tl)', fontSize: 14 }
