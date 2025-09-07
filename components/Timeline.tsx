'use client'
import { useMemo, useState } from 'react'
import type { EventItem } from '@/lib/types'
import { CATEGORY_STYLES, type Category } from '@/lib/categories'
import { DAY_END, DAY_START, minutesBetween, pctFromStart, toMin } from '@/lib/time'
import { motion } from 'framer-motion'
import EventModal from './EventModal'
import NowIndicator from './NowIndicator'
import CategoryFilter from './CategoryFilter'

type Props = {
  events: EventItem[]
  dateISO: string
}

const HOURS = Array.from({length: (parseInt(DAY_END) - parseInt(DAY_START)) + 1}, (_,i) => i + parseInt(DAY_START))

export default function Timeline({ events, dateISO }: Props) {
  const startMin = toMin(DAY_START)
  const endMin = toMin(DAY_END)
  const totalMin = minutesBetween(DAY_START, DAY_END)
  const heightPx = totalMin / 60 * 64 // 64px per hour

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [visibleCats, setVisibleCats] = useState<Category[]>(['לוגיסטיקה','טיול','סדנה','ארוחה','תוכן משפחתי'])

  const onEventClick = (ev: EventItem) => {
    setSelected(ev); setOpen(true)
  }

  const items = useMemo(() => {
    return events
      .slice()
      .sort((a,b) => a.start.localeCompare(b.start))
  }, [events])

  return (
    <div className='relative'>
      <div className='mb-4'>
        <CategoryFilter all={['לוגיסטיקה','טיול','סדנה','ארוחה','תוכן משפחתי']} value={visibleCats} onChange={setVisibleCats} />
      </div>
      <div className='grid grid-cols-[80px_1fr] gap-3'>
        {/* time rail */}
        <div className='relative'>
          {HOURS.map((h, i) => (
            <div key={h} className='time-cell flex items-start justify-end pr-2 text-xs text-gray-500 dark:text-gray-400'>
              <span className='sticky top-2'>{String(h).padStart(2,'0')}:00</span>
            </div>
          ))}
        </div>
        {/* canvas */}
        <div className='relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden'>
          <div style={{height: heightPx}} className='relative'>
            {/* grid */}
            {HOURS.map((h,i) => (
              <div key={h} className='absolute left-0 right-0 border-t border-dashed border-gray-200/70 dark:border-gray-800'
                   style={{ top: i * 64 }} />
            ))}
            {/* half hour dashed */}
            {HOURS.slice(0,-1).map((h,i) => (
              <div key={h+'-half'} className='absolute left-0 right-0 border-t border-dashed border-gray-200/40 dark:border-gray-800/60'
                   style={{ top: i * 64 + 32 }} />
            ))}

            {/* now indicator */}
            <NowIndicator heightPx={heightPx} startMin={startMin} endMin={endMin} dateISO={dateISO} />

            {/* events */}
            {items.filter(e => visibleCats.includes(e.category as Category)).map((ev, idx) => {
              const top = pctFromStart(ev.start) * heightPx
              const height = (minutesBetween(ev.start, ev.end) / totalMin) * heightPx
              return (
                <motion.button
                  key={idx}
                  title={`${ev.title} • ${ev.start}-${ev.end}`}
                  onClick={() => onEventClick(ev)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={'absolute left-2 right-2 text-right p-3 event-card ' + (CATEGORY_STYLES as any)[ev.category]}
                  style={{ top, height }}
                >
                  <div className='text-[10px] opacity-70'>{ev.category}</div>
                  <div className='font-medium leading-tight'>{ev.title}</div>
                  <div className='text-xs opacity-80'>{ev.start}–{ev.end}</div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <EventModal open={open} event={selected} onClose={() => setOpen(false)} />
    </div>
  )
}
