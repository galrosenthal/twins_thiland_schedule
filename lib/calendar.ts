import { Event } from '@/lib/types'

// ICS format utilities for calendar export
export function generateICS(events: Event[], title: string = 'תוכנית נסיעה לתאילנד'): string {
  const now = new Date()
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Schedule App//Thailand Trip//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${title}`,
    'X-WR-TIMEZONE:Asia/Bangkok',
    'X-WR-CALDESC:תוכנית מסע לתאילנד עם פעילויות יומיות'
  ]

  events.forEach((event, index) => {
    const eventId = `event-${index}-${timestamp}`
    const startDateTime = formatICSDateTime(event.dateISO, event.start)
    const endDateTime = formatICSDateTime(event.dateISO, event.end)

    ics.push(
      'BEGIN:VEVENT',
      `UID:${eventId}`,
      `DTSTAMP:${timestamp}`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `SUMMARY:${escapeICSText(event.title)}`,
      `DESCRIPTION:${escapeICSText(event.description || '')}`,
      `LOCATION:${escapeICSText(event.location || '')}`,
      `CATEGORIES:${escapeICSText(event.category)}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    )
  })

  ics.push('END:VCALENDAR')
  return ics.join('\r\n')
}

function formatICSDateTime(dateISO: string, time: string): string {
  // Convert date (YYYY-MM-DD) and time (HH:MM) to ICS format (YYYYMMDDTHHMMSSZ)
  // Using Thailand timezone (+7 UTC)
  const [year, month, day] = dateISO.split('-')
  const [hour, minute] = time.split(':')

  // Convert Thailand time to UTC (subtract 7 hours)
  const localDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00+07:00`)
  const utcDate = new Date(localDate.toISOString())

  return utcDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
}

export function downloadICS(icsContent: string, filename: string = 'thailand-schedule.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

export function getGoogleCalendarUrl(icsContent: string): string {
  // Google Calendar doesn't directly support ICS import via URL,
  // so we'll create a data URL that users can download and import
  const blob = new Blob([icsContent], { type: 'text/calendar' })
  return URL.createObjectURL(blob)
}

export function getOutlookCalendarUrl(icsContent: string): string {
  // Similar to Google Calendar, we'll provide a download link
  const blob = new Blob([icsContent], { type: 'text/calendar' })
  return URL.createObjectURL(blob)
}
