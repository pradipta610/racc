interface ResultBannerProps {
  query: string
  freeCount: number
  paidCount: number
}

export function ResultBanner({ query, freeCount, paidCount }: ResultBannerProps) {
  const total = freeCount + paidCount

  const config = (() => {
    if (total === 0)
      return {
        bg: '#FEF2F2',
        border: '#FECACA',
        color: '#B91C1C',
        icon: '❌',
        message: `Tidak ada match untuk '${query}'. Coba keyword lain.`,
      }
    if (freeCount > 0 && paidCount === 0)
      return {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        color: '#15803D',
        icon: '✅',
        message: `Free consultation — ${freeCount} match${freeCount !== 1 ? 'es' : ''} for '${query}'`,
      }
    if (paidCount > 0 && freeCount === 0)
      return {
        bg: '#FFFBEB',
        border: '#FDE68A',
        color: '#B45309',
        icon: '💰',
        message: `Paid consultation — ${paidCount} match${paidCount !== 1 ? 'es' : ''} for '${query}'`,
      }
    return {
      bg: 'var(--light)',
      border: 'var(--border)',
      color: 'var(--tm)',
      icon: 'ℹ️',
      message: `${total} match${total !== 1 ? 'es' : ''} for '${query}' — ${freeCount} free, ${paidCount} paid`,
    }
  })()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderRadius: 8,
      border: `1px solid ${config.border}`,
      background: config.bg,
      color: config.color,
      padding: '10px 14px',
      fontSize: 13,
    }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{config.icon}</span>
      <span style={{ fontWeight: 500 }}>{config.message}</span>
    </div>
  )
}
