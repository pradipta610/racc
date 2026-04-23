const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] || char)
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlightText(text: string, query: string): string {
  const escaped = escapeHtml(text)

  if (!query.trim()) {
    return escaped
  }

  const escapedQuery = escapeHtml(query.trim())
  const regex = new RegExp(`(${escapeRegex(escapedQuery)})`, 'gi')

  return escaped.replace(
    regex,
    '<mark style="background:#FEF08A;border-radius:2px;padding:0 2px">$1</mark>',
  )
}
