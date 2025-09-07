import type { Category } from './categories'

export type EventItem = {
  title: string
  start: string
  end: string
  category: Category
  location?: string
  description?: string
}
export type DayData = {
  date: string // ISO 8601 (YYYY-MM-DD)
  events: EventItem[]
}
