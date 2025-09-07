'use client'

import { useState } from 'react'
import { Event } from '@/lib/types'
import { generateICS, downloadICS } from '@/lib/calendar'

interface CalendarExportProps {
  events: Event[]
  title?: string
}

export default function CalendarExport({ events, title = 'תוכנית נסיעה לתאילנד' }: CalendarExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: 'google' | 'outlook' | 'ics') => {
    setIsExporting(true)

    try {
      const icsContent = generateICS(events, title)

      switch (type) {
        case 'google':
          downloadICS(icsContent, 'thailand-schedule-google.ics')
          break
        case 'outlook':
          downloadICS(icsContent, 'thailand-schedule-outlook.ics')
          break
        case 'ics':
          downloadICS(icsContent, 'thailand-schedule.ics')
          break
      }
    } catch (error) {
      console.error('Error exporting calendar:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">ייצא ללוח שנה</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleExport('google')}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google Calendar
        </button>

        <button
          onClick={() => handleExport('outlook')}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.5 17.5h-3v-11h3v11zm5.5 0h-3v-5.5h3v5.5zm0-7h-3v-4h3v4z"/>
          </svg>
          Outlook
        </button>

        <button
          onClick={() => handleExport('ics')}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-xs bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          קובץ ICS
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        הורד קובץ לוח שנה ויבא אותו ללוח השנה שלך. התאריכים והשעות מותאמים לאזור הזמן של תאילנד.
      </p>
    </div>
  )
}
