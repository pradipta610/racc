import type { Metadata } from 'next'
import { SitemapCheckerClient } from '@/components/tools/SitemapCheckerClient'

export const metadata: Metadata = {
  title: 'Sitemap Page Checker — RACC internal tools',
  description: 'Check if a page slug already exists in the RACC sitemap before creating it.',
}

export default function SitemapCheckerPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--td)' }}>
          Sitemap Page Checker
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tl)', marginTop: 4 }}>
          Cek apakah halaman sudah ada di sitemap sebelum dibuat — hindari duplikat.
        </p>
      </div>
      <SitemapCheckerClient />
    </div>
  )
}
