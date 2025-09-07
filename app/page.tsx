import week from '@/data/week.json'
import { slugFromISO, formatDateTitle } from '@/lib/time'

export default function HomePage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold mb-2'>בחרו יום</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          כל יום מוצג בעמוד עצמאי. לחצו כדי לפתוח את ציר השעות והפעילויות.
        </p>
      </div>

      <nav className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {week.map(day => {
          const slug = slugFromISO(day.date)
          return (
            <a
              key={day.date}
              href={`/day/${slug}`}
              className='group rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 hover:shadow-soft transition-shadow'
            >
              <div className='text-xs text-gray-500 dark:text-gray-400'>{day.date}</div>
              <div className='text-lg font-semibold'>{formatDateTitle(day.date)}</div>
              <div className='mt-3 text-sm opacity-80'>
                {day.events.length} פעילויות
              </div>
              <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
                לחץ/י לצפייה בציר שעות
              </div>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
