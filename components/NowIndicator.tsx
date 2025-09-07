'use client'
import { useEffect, useState } from 'react'
import { toMin } from '@/lib/time'

type Props = {
  heightPx: number
  startMin: number
  endMin: number
  dateISO: string
}

export default function NowIndicator({ heightPx, startMin, endMin, dateISO }: Props) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const nowDate = new Date()
      const todayIso = nowDate.toISOString().slice(0,10)
      if (todayIso !== dateISO) {
        setNow(null)
        return
      }
      const m = nowDate.getHours()*60 + nowDate.getMinutes()
      if (m < startMin || m > endMin) setNow(null)
      else setNow(m)
    }
    tick()
    const id = setInterval(tick, 60 * 1000)
    return () => clearInterval(id)
  }, [dateISO, startMin, endMin])

  if (now == null) return null

  const y = ( (now - startMin) / (endMin - startMin) ) * heightPx

  return (
    <div className='absolute left-0 right-0' style={{ top: y }}>
      <div className='h-px bg-red-500'></div>
      <div className='w-2 h-2 rounded-full bg-red-500 absolute -left-1 -top-1'></div>
    </div>
  )
}
