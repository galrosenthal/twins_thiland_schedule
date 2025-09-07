'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    // initialize
    const ls = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = ls ? ls === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', dark)
    setIsDark(dark)
  }, [])

  if (!mounted) return null

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <motion.button
      onClick={toggle}
      className='px-3 py-1 rounded-full text-sm border border-black/10 dark:border-white/15 shadow-soft'
      whileTap={{ scale: 0.95 }}
      aria-label='החלפת מצב כהה/בהיר'
    >
      {isDark ? '☀️ מצב בהיר' : '🌙 מצב כהה'}
    </motion.button>
  )
}
