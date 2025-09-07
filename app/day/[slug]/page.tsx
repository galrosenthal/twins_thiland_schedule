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
  const currentDayIndex = week.findIndex(d => d.date === iso)
  const day = week[currentDayIndex]
  if (!day) return notFound()

  const events = day.events.map(e => ({ ...e, category: e.category as Category }))

  // Prepare events for calendar export with dateISO
  const eventsForExport: Event[] = events.map(event => ({
    ...event,
    dateISO: day.date
  }))

  // Find previous and next days
  const previousDay = currentDayIndex > 0 ? week[currentDayIndex - 1] : null
  const nextDay = currentDayIndex < week.length - 1 ? week[currentDayIndex + 1] : null

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-2xl font-bold'>{formatDateTitle(day.date)}</h1>
          <div className='text-sm text-gray-600 dark:text-gray-400'>{day.date}</div>
        </div>
        <Link href='/' className='text-sm underline underline-offset-4 text-gray-600 dark:text-gray-300'>⬅ חזרה לימים</Link>
      </div>

      {/* Day Navigation */}
      <div className='flex items-center justify-between gap-4 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5'>
        <div className='flex-1'>
          {previousDay ? (
            <Link
              href={`/day/${slugFromISO(previousDay.date)}`}
              className='flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div>
                <div className='font-medium'>יום קודם</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>{formatDateTitle(previousDay.date)}</div>
              </div>
            </Link>
          ) : (
            <div className='p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 text-sm'>
              <div className='font-medium'>אין יום קודם</div>
            </div>
          )}
        </div>

        <div className='text-center px-4'>
          <div className='text-xs text-gray-500 dark:text-gray-400'>יום {currentDayIndex + 1} מתוך {week.length}</div>
        </div>

        <div className='flex-1 flex justify-end'>
          {nextDay ? (
            <Link
              href={`/day/${slugFromISO(nextDay.date)}`}
              className='flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm'
            >
              <div className='text-right'>
                <div className='font-medium'>יום הבא</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>{formatDateTitle(nextDay.date)}</div>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          ) : (
            <div className='p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 text-sm text-right'>
              <div className='font-medium'>אין יום הבא</div>
            </div>
          )}
        </div>
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
