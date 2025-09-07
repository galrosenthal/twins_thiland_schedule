export const DAY_START = '08:00'
export const DAY_END = '21:00'

export function toMin(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
export function minutesBetween(a: string, b: string) {
  return toMin(b) - toMin(a)
}
export function pctFromStart(t: string) {
  const total = minutesBetween(DAY_START, DAY_END)
  return (toMin(t) - toMin(DAY_START)) / total
}
export function formatDateTitle(d: string) {
  // d: ISO date (YYYY-MM-DD) -> "dd/mm EEE"
  const date = new Date(d + 'T00:00:00')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const intl = new Intl.DateTimeFormat('he-IL', { weekday: 'short' }).format(date)
  return `${day}/${month} · ${intl}`
}
export function slugFromISO(d: string) {
  const date = new Date(d + 'T00:00:00')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}`
}
export function isoFromSlug(slug: string, year = 2025) {
  const [day, month] = slug.split('-').map(Number)
  return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
}
