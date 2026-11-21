import { useLayoutEffect, useRef, useState } from 'react'

/** Small tilts so the rocks don't sit in a perfectly straight line. */
const TILTS = [-4, 3, -2, 4, -3, 2, 5, -5]

/**
 * Courses as asteroids drifting along a curved belt.
 *
 * The rocks wrap into rows like normal text, so any number of courses of any
 * length fits. After layout, each row is bent into a gentle downward curve:
 * every rock is nudged down by how close it is to the middle of its row, and
 * a faint dashed orbit is drawn through the row.
 */
export function AsteroidBelt({ courses }: { courses: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [orbits, setOrbits] = useState<{ d: string; key: number }[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const layout = () => {
      const rocks = Array.from(wrap.querySelectorAll<HTMLElement>('.rock'))
      // Group rocks into rows by their vertical centre (layout position,
      // unaffected by the curve offsets applied below).
      const rows = new Map<number, HTMLElement[]>()
      for (const el of rocks) {
        const key = Math.round(el.offsetTop + el.offsetHeight / 2)
        const row = rows.get(key)
        if (row) row.push(el)
        else rows.set(key, [el])
      }

      const next: { d: string; key: number }[] = []
      rows.forEach((row, y) => {
        const left = Math.min(...row.map((el) => el.offsetLeft)) - 28
        const right = Math.max(...row.map((el) => el.offsetLeft + el.offsetWidth)) + 28
        const mid = (left + right) / 2
        const half = (right - left) / 2
        const sag = Math.min(26, half * 0.07)
        for (const el of row) {
          const u = (el.offsetLeft + el.offsetWidth / 2 - mid) / half
          el.style.setProperty('--sag', `${(sag * (1 - u * u)).toFixed(1)}px`)
        }
        // Quadratic curve whose lowest point (y + sag) is at the row's middle.
        next.push({ key: y, d: `M${left} ${y}Q${mid} ${y + 2 * sag} ${right} ${y}` })
      })
      setOrbits(next)
      setSize({ w: wrap.offsetWidth, h: wrap.offsetHeight })
    }

    layout()
    void document.fonts?.ready.then(layout)
    const ro = new ResizeObserver(layout)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [courses])

  if (courses.length === 0) return null

  return (
    <div ref={wrapRef} className="belt">
      <svg
        className="belt-orbits"
        aria-hidden="true"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
        fill="none"
      >
        {orbits.map((o) => (
          <path key={o.key} d={o.d} />
        ))}
      </svg>
      <ul className="belt-list" aria-label="Coursework">
        {courses.map((course, i) => (
          <li
            key={`${course}-${i}`}
            className={`rock rock--${i % 4} drift-${i % 3}`}
            style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
          >
            {course}
          </li>
        ))}
      </ul>
    </div>
  )
}
