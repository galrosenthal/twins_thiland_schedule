'use client'
import { useState, useEffect } from 'react'
import type { Category } from '@/lib/categories'
import { motion } from 'framer-motion'

type Props = {
  all: Category[]
  value?: Category[]
  onChange?: (v: Category[]) => void
}

export default function CategoryFilter({ all, value, onChange }: Props) {
  const [checked, setChecked] = useState<Set<Category>>(new Set(value ?? all))

  useEffect(() => {
    onChange?.(Array.from(checked))
  }, [checked]) // eslint-disable-line

  const toggle = (c: Category) => {
    setChecked(prev => {
      const n = new Set(prev)
      if (n.has(c)) n.delete(c)
      else n.add(c)
      return n
    })
  }

  const allChecked = checked.size === all.length

  const toggleAll = () => {
    setChecked(new Set(allChecked ? [] : all))
  }

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={toggleAll}
        className='px-3 py-1 rounded-full border border-black/10 dark:border-white/15 text-sm'
      >
        {allChecked ? 'בטל סינון' : 'בחר הכל'}
      </motion.button>

      {all.map(c => (
        <label
          key={c}
          className='flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-black/10 dark:border-white/15 cursor-pointer'
        >
          <input
            type='checkbox'
            className='accent-black dark:accent-white'
            checked={checked.has(c)}
            onChange={() => toggle(c)}
          />
          <span>{c}</span>
        </label>
      ))}
    </div>
  )
}
