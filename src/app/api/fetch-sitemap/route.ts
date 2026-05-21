import { NextRequest, NextResponse } from 'next/server'

const ALLOWED = [
  'https://www.racc.net.au/pages-sitemap.xml',
  'https://www.racc.net.au/blog-posts-sitemap.xml',
]

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !ALLOWED.includes(url)) {
    return NextResponse.json({ error: 'Invalid or disallowed URL.' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'RACC-Internal-Tools/1.0' },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: 502 })
    }

    const xml = await res.text()
    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch sitemap.' }, { status: 502 })
  }
}
