import { useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '../data/types'
import { layoutOrbits, orbitPosition, SCENE_H, SCENE_W } from '../lib/orbits'
import { SectionHeading } from './SectionHeading'

const SELECTED_RING = '0 0 0 3px #0B1026, 0 0 0 5px #E8EAF6, 0 0 24px 6px rgba(232,234,246,.25)'
const BUTTON_PAD = 6
const MIN_ICON_PLANET = 34

/**
 * A planet whose surface is the project's icon gets a thin ring and glow in its
 * planet colour, so each world keeps its own colour in the system.
 */
function planetShadow(color: string, hasIcon: boolean, selected: boolean): string {
  if (!hasIcon) return selected ? SELECTED_RING : 'none'
  // Soften the glow with ~45% alpha when the colour is a 6-digit hex.
  const glow = /^#[0-9a-f]{6}$/i.test(color) ? `${color}73` : color
  return selected
    ? `0 0 0 2px ${color}, 0 0 0 5px #0B1026, 0 0 0 7px #E8EAF6, 0 0 24px 6px ${glow}`
    : `0 0 0 2px ${color}, 0 0 16px 3px ${glow}`
}

// Faint background stars inside the scene: [cx, cy, r, colour]
const SCENE_STARS: [number, number, number, string][] = [
  [8, 6, 0.25, '#FFFFFF'],
  [91, 9, 0.3, '#C8D2FF'],
  [72, 4, 0.2, '#FFFFFF'],
  [14, 63, 0.3, '#FFFFFF'],
  [88, 66, 0.25, '#C8D2FF'],
  [60, 67, 0.2, '#FFFFFF'],
]

export function SolarSystem({ projects }: { projects: Project[] }) {
  const orbits = useMemo(() => layoutOrbits(projects.map((p) => p.planet)), [projects])
  const [selected, setSelected] = useState(0)
  const anchors = useRef<(HTMLDivElement | null)[]>([])
  const paused = useRef(false)

  // Move planets with direct style writes so React doesn't re-render every frame.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = performance.now()
    let t = 0
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (!paused.current && !reduceMotion.matches) t += dt
      orbits.forEach((o, i) => {
        const el = anchors.current[i]
        if (!el) return
        const p = orbitPosition(o, t)
        el.style.left = `${p.left}%`
        el.style.top = `${p.top}%`
        el.style.zIndex = p.front ? '3' : '1'
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [orbits])

  if (projects.length === 0) return null
  const active = Math.min(selected, projects.length - 1)
  const project = projects[active]
  const pause = () => (paused.current = true)
  const resume = () => (paused.current = false)

  return (
    <div className="band">
      <div className="container">
        <section id="projects" className="section projects">
          <SectionHeading numeral="III" title="Projects" align="center" />
          <div className="projects-body">
            <div className="system" style={{ aspectRatio: `${SCENE_W} / ${SCENE_H}` }}>
              <svg aria-hidden="true" viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} fill="none">
                {orbits.map((o, i) => (
                  <ellipse
                    key={i}
                    cx={SCENE_W / 2}
                    cy={SCENE_H / 2}
                    rx={o.rx}
                    ry={o.ry}
                    stroke={`rgba(232,234,246,${(0.22 - (0.09 * i) / Math.max(1, orbits.length - 1)).toFixed(3)})`}
                    strokeWidth="0.2"
                    strokeDasharray={i === orbits.length - 1 && orbits.length > 1 ? '0.6 1.2' : undefined}
                  />
                ))}
                {SCENE_STARS.map(([cx, cy, r, fill], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
                ))}
              </svg>
              <div className="sun" aria-hidden="true" />

              {orbits.map((o, i) => {
                const start = orbitPosition(o, 0)
                const { color, moon, ring } = o.planet
                const icon = projects[i].icon
                // Keep planets with an icon big enough for the icon to read.
                const size = icon ? Math.max(o.planet.size, MIN_ICON_PLANET) : o.planet.size
                const isActive = i === active
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      anchors.current[i] = el
                    }}
                    className="planet-anchor"
                    style={{ left: `${start.left}%`, top: `${start.top}%`, zIndex: start.front ? 3 : 1 }}
                  >
                    <button
                      type="button"
                      className="planet-btn"
                      aria-pressed={isActive}
                      onClick={() => setSelected(i)}
                      onPointerEnter={pause}
                      onPointerLeave={resume}
                      onFocus={pause}
                      onBlur={resume}
                      style={{ transform: `translate(-50%, ${-(size / 2 + BUTTON_PAD)}px)` }}
                    >
                      <span
                        aria-hidden="true"
                        className="planet"
                        style={{
                          width: size,
                          height: size,
                          background: icon ? '#FFFFFF' : color,
                          boxShadow: planetShadow(color, Boolean(icon), isActive),
                        }}
                      >
                        {icon && (
                          <span className="planet-icon">
                            <img src={icon} alt="" />
                          </span>
                        )}
                        {moon && <span className="planet-moon" />}
                        {ring && (
                          <span
                            className="planet-ring"
                            style={{ width: size * 1.6, height: size * 0.3 }}
                          />
                        )}
                      </span>
                      <span className="planet-label" style={{ fontWeight: isActive ? 600 : 400 }}>
                        {projects[i].name}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="project-card" aria-live="polite">
              {project.image && (
                <img
                  key={project.image}
                  className="project-cover"
                  src={project.image}
                  alt={project.imageAlt ?? `${project.name} preview`}
                />
              )}
              <p className="date project-meta">
                <span aria-hidden="true" className="project-dot" style={{ background: orbits[active].planet.color }} />
                Project {String(active + 1).padStart(2, '0')}
                {project.year ? ` · ${project.year}` : ''}
              </p>
              <h3>{project.name}</h3>
              <p className="project-copy">{project.description}</p>
              {project.tech.length > 0 && <p className="project-tech">{project.tech.join(' · ')}</p>}
              {project.links && project.links.length > 0 && (
                <div className="project-links">
                  {project.links.map((l) => (
                    <a key={l.label + l.href} href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
