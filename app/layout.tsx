import './globals.css'
import type { Metadata } from 'next'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'לוח זמנים • משפחות | צ׳אנג מאי',
  description: 'לוח שבועי אינטראקטיבי לפי ימים',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='he' dir='rtl' className='rtl'>
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{ __html: `
            try {
              const ls = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const dark = ls ? ls === 'dark' : prefersDark;
              if (dark) document.documentElement.classList.add('dark');
            } catch {}
          ` }}
        />
      </head>
      <body className='min-h-screen antialiased'>
        <header className='sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-950/60 border-b border-black/10 dark:border-white/10'>
          <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4'>
            <a href='/' className='text-lg font-semibold'>לוח זמנים</a>
            <ThemeToggle />
          </div>
        </header>
        <main className='max-w-6xl mx-auto px-4 py-6'>{children}</main>
        <footer className='max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500 dark:text-gray-400'>
          נבנה עם Next.js, Tailwind ו‑Framer Motion.
        </footer>
      </body>
    </html>
  )
}
