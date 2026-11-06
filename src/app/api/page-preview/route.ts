import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_HOSTS = new Set(['racc.net.au', 'www.racc.net.au'])

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim()
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]*>/g, ' '))
}

function getAttribute(tag: string, name: string): string {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))
  return match?.[2]?.trim() ?? ''
}

function getMeta(html: string, key: string): string {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    const identifier = getAttribute(tag, 'property') || getAttribute(tag, 'name')
    if (identifier.toLowerCase() === key.toLowerCase()) {
      return decodeHtml(getAttribute(tag, 'content'))
    }
  }
  return ''
}

function fallbackTitle(url: URL): string {
  const lastSegment = url.pathname.split('/').filter(Boolean).pop() || 'RACC homepage'
  return lastSegment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function makeScreenshotUrl(url: string): string {
  return `https://image.thum.io/get/width/640/crop/480/maxAge/168/allowJPG/${url}`
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get('url')

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing page URL.' }, { status: 400 })
  }

  let pageUrl: URL
  try {
    pageUrl = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: 'Invalid page URL.' }, { status: 400 })
  }

  if (pageUrl.protocol !== 'https:' || !ALLOWED_HOSTS.has(pageUrl.hostname.toLowerCase())) {
    return NextResponse.json({ error: 'Page URL is not allowed.' }, { status: 400 })
  }

  try {
    const response = await fetch(pageUrl.toString(), {
      redirect: 'error',
      headers: {
        'User-Agent': 'RACC-Internal-Tools/1.0 (+page preview)',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) throw new Error(`Upstream error: ${response.status}`)

    const html = await response.text()
    const resolvedUrl = new URL(response.url || pageUrl.toString())
    const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
    const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
    const rawImage = getMeta(html, 'og:image') || getMeta(html, 'twitter:image')
    let image = ''

    if (rawImage) {
      try {
        image = new URL(rawImage, resolvedUrl).toString()
      } catch {
        image = ''
      }
    }

    return NextResponse.json(
      {
        url: pageUrl.toString(),
        title: getMeta(html, 'og:title') || stripTags(titleMatch?.[1] ?? '') || fallbackTitle(pageUrl),
        description: getMeta(html, 'description') || getMeta(html, 'og:description'),
        h1: stripTags(h1Match?.[1] ?? ''),
        image,
        screenshotUrl: makeScreenshotUrl(pageUrl.toString()),
      },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },
    )
  } catch {
    return NextResponse.json(
      {
        url: pageUrl.toString(),
        title: fallbackTitle(pageUrl),
        description: '',
        h1: '',
        image: '',
        screenshotUrl: makeScreenshotUrl(pageUrl.toString()),
      },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    )
  }
}
