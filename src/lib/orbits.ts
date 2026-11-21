import type { PlanetStyle } from '../data/types'

/**
 * Generates the Projects solar system for any number of planets.
 *
 * The scene is a 100 × 70 box with the sun at its centre. Orbits are tilted
 * ellipses spread evenly between INNER and OUTER; outer planets move more
 * slowly, and start angles are spaced by the golden angle so planets never
 * bunch up however many there are.
 */

export const SCENE_W = 100
export const SCENE_H = 70
const INNER = 18
const OUTER = 47
const TILT = 0.45
const BASE_PERIOD = 60 // seconds for the innermost orbit
const GOLDEN_ANGLE = 137.508

const PALETTE = ['#9FB4FF', '#F2A7C3', '#8FE3CF', '#E9B98A', '#C9B6FF', '#F5E6B8', '#7FD1FF']
const SIZES = [26, 34, 22, 40, 30, 24]

export interface Orbit {
  rx: number
  ry: number
  /** Seconds per revolution. */
  period: number
  /** Radians. */
  start: number
  planet: Required<PlanetStyle>
}

export function layoutOrbits(styles: (PlanetStyle | undefined)[]): Orbit[] {
  const n = styles.length
  return styles.map((style, i) => {
    const rx = n === 1 ? (INNER + OUTER) / 2 : INNER + ((OUTER - INNER) * i) / (n - 1)
    return {
      rx,
      ry: rx * TILT,
      period: BASE_PERIOD * (rx / INNER) ** 1.25,
      start: ((-60 + i * GOLDEN_ANGLE) * Math.PI) / 180,
      planet: {
        color: style?.color ?? PALETTE[i % PALETTE.length],
        size: style?.size ?? SIZES[i % SIZES.length],
        moon: style?.moon ?? i % 4 === 1,
        ring: style?.ring ?? i % 4 === 3,
      },
    }
  })
}

/** Planet centre at time t, as percentages of the scene box. */
export function orbitPosition(o: Orbit, t: number): { left: number; top: number; front: boolean } {
  const a = o.start + (2 * Math.PI * t) / o.period
  const x = SCENE_W / 2 + o.rx * Math.cos(a)
  const y = SCENE_H / 2 + o.ry * Math.sin(a)
  return { left: (x / SCENE_W) * 100, top: (y / SCENE_H) * 100, front: Math.sin(a) > 0 }
}
