'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { EventItem } from '@/lib/types'
import { CATEGORY_STYLES } from '@/lib/categories'

type Props = {
  open: boolean
  onClose: () => void
  event?: EventItem | null
}
export default function EventModal({ open, onClose, event }: Props) {
  return (
    <AnimatePresence>
      {open && event && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='absolute inset-0 bg-black/40' onClick={onClose} />
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='relative max-w-lg w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden'
          >
            <div className={'p-5 ' + (CATEGORY_STYLES as any)[event.category]}>
              <div className='text-xs opacity-70 mb-1'>{event.category}</div>
              <h3 className='text-xl font-semibold'>{event.title}</h3>
              <div className='mt-1 text-sm opacity-80'>{event.start}–{event.end}</div>
            </div>
            <div className='p-5 space-y-2'>
              {event.location && (
                <div className='text-sm'><span className='opacity-70'>מיקום: </span>{event.location}</div>
              )}
              {event.description && (
                <div className='text-sm leading-6 whitespace-pre-wrap'>{event.description}</div>
              )}
              <div className='pt-3 flex justify-end'>
                <motion.button whileTap={{scale:0.95}} onClick={onClose} className='px-4 py-2 rounded-full border border-black/10 dark:border-white/15'>
                  סגור
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
