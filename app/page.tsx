import week from '@/data/week.json'
import { slugFromISO, formatDateTitle } from '@/lib/time'
import Link from 'next/link'
import CalendarExport from '@/components/CalendarExport'
import { Event } from '@/lib/types'
import { Category } from '@/lib/categories'

export default function HomePage() {
  // Flatten all events from all days for full schedule export
  const allEvents: Event[] = week.flatMap(day =>
    day.events.map(event => ({
      ...event,
      category: event.category as Category,
      dateISO: day.date
    }))
  )

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold mb-2'>בחרו יום</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          כל יום מוצג בעמוד עצמאי. לחצו כדי לפתוח את ציר השעות והפעילויות.
        </p>
      </div>

      {/* Calendar Export Section */}
      <div className='rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5'>
        <CalendarExport events={allEvents} title="תוכנית מסע לתאילנד - תוכנית מלאה" />
      </div>

      <nav className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {week.map(day => {
          const slug = slugFromISO(day.date)
          return (
            <Link
              key={day.date}
              href={`/day/${slug}`}
              className='group rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 hover:shadow-soft transition-shadow block'
            >
              <div className='text-xs text-gray-500 dark:text-gray-400'>{day.date}</div>
              <div className='text-lg font-semibold'>{formatDateTitle(day.date)}</div>
              <div className='mt-3 text-sm opacity-80'>
                {day.events.length} פעילויות
              </div>
              <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
                לחץ/י לצפייה בציר שעות
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
