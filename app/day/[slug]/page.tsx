import week from '@/data/week.json'
import Timeline from '@/components/Timeline'
import { isoFromSlug, slugFromISO, formatDateTitle } from '@/lib/time'
import { notFound } from 'next/navigation'
import { Category } from '@/lib/categories'

export default function DayPage({ params }: { params: { slug: string } }) {
  const iso = isoFromSlug(params.slug, 2025)
  const day = week.find(d => d.date === iso)
  if (!day) return notFound()

  const events = day.events.map(e => ({ ...e, category: e.category as Category }))

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-2xl font-bold'>{formatDateTitle(day.date)}</h1>
          <div className='text-sm text-gray-600 dark:text-gray-400'>{day.date}</div>
        </div>
        <a href='/' className='text-sm underline underline-offset-4 text-gray-600 dark:text-gray-300'>⬅ חזרה לימים</a>
      </div>
      <Timeline events={events} dateISO={day.date} />
    </div>
  )
}
