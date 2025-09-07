import week from '@/data/week.json'
import Timeline from '@/components/Timeline'
import { isoFromSlug, slugFromISO, formatDateTitle } from '@/lib/time'
import { notFound } from 'next/navigation'
import { Category } from '@/lib/categories'
import Link from 'next/link'
import CalendarExport from '@/components/CalendarExport'
import { Event } from '@/lib/types'

// This function generates all possible static paths at build time
export async function generateStaticParams() {
  return week.map((day) => ({
    slug: slugFromISO(day.date),
  }))
}

export default function DayPage({ params }: { params: { slug: string } }) {
  const iso = isoFromSlug(params.slug, 2025)
  const day = week.find(d => d.date === iso)
  if (!day) return notFound()

  const events = day.events.map(e => ({ ...e, category: e.category as Category }))

  // Prepare events for calendar export with dateISO
  const eventsForExport: Event[] = events.map(event => ({
    ...event,
    dateISO: day.date
  }))

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-2xl font-bold'>{formatDateTitle(day.date)}</h1>
          <div className='text-sm text-gray-600 dark:text-gray-400'>{day.date}</div>
        </div>
        <Link href='/' className='text-sm underline underline-offset-4 text-gray-600 dark:text-gray-300'>⬅ חזרה לימים</Link>
      </div>

      {/* Calendar Export for this specific day */}
      <div className='rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5'>
        <CalendarExport
          events={eventsForExport}
          title={`תוכנית מסע לתאילנד - ${formatDateTitle(day.date)}`}
        />
      </div>

      <Timeline events={events} dateISO={day.date} />
    </div>
  )
}
