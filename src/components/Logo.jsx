import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  const [mark, setMark] = useState(true)
  return (
    <Link to="/" className="group flex items-center gap-3.5 text-paper" aria-label="Yellow Equipment Services home">
      {mark ? (
        <img
          src="/brand/yes-logo.webp"
          alt="Yellow Equipment Services LLC"
          className="h-auto w-[min(300px,58vw)] object-contain object-left sm:w-[min(320px,42vw)]"
          onError={() => setMark(false)}
        />
      ) : null}
      {!mark ? (
        <>
          <svg viewBox="0 0 40 40" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" aria-hidden="true">
            <path d="M6 5 L18 23 V35" fill="none" stroke="#f3f0e8" strokeWidth="2.6" />
            <path d="M34 5 L19 23" fill="none" stroke="#f0c014" strokeWidth="2.6" />
          </svg>
          <span className={compact ? 'sr-only sm:not-sr-only' : ''}>
            <span className="block font-display text-[1.55rem] leading-none tracking-[0.12em] sm:text-[1.7rem]">
              YELLOW EQUIPMENT
            </span>
            <span className="mt-1.5 block text-[11px] uppercase tracking-[0.28em] text-mist sm:text-xs">
              Services LLC / Oman
            </span>
          </span>
        </>
      ) : null}
    </Link>
  )
}
