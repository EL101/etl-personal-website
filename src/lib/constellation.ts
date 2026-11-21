import { seeded } from './random'

/**
 * Generates the Experience constellation for any number of entries.
 *
 * Coordinates: x runs 0–1000 across the field's width (rendered as x/10 %),
 * y is in px from the top of the field. Stars zig-zag left/right down the
 * page; each card sits on the outer side of its star, so the centre column
 * stays free for the linking lines and the faint "spur" stars.
 */

export type Side = 'left' | 'right'

export interface Point {
  x: number
  y: number
}

export interface StarNode extends Point {
  side: Side
}

export interface Segment {
  from: Point
  to: Point
}

export interface FaintStar extends Point {
  r: number
}

export interface ConstellationLayout {
  height: number
  nodes: StarNode[]
  /** Bright lines that join the stars, via one in-between star per pair. */
  links: Segment[]
  /** In-between stars on the bright lines. */
  joints: Point[]
  /** Dashed curve from the last star to the "next" star. */
  next?: { node: StarNode; control: Point }
  /** Faint decorative branches and the small stars at their ends. */
  spurs: Segment[]
  faint: FaintStar[]
}

const TOP = 90
const ROW_STEP = 240
const NEXT_GAP = 200
const BOTTOM_PAD = 220

const sideOf = (i: number): Side => (i % 2 === 0 ? 'left' : 'right')
const baseX = (side: Side, r: () => number) =>
  side === 'left' ? 415 + r() * 35 : 570 + r() * 35

export function layoutConstellation(count: number, withNext: boolean): ConstellationLayout {
  const nodes: StarNode[] = []
  for (let i = 0; i < count; i++) {
    const r = seeded(101 + i * 7919)
    const side = sideOf(i)
    const jitterY = i === 0 ? 0 : (r() - 0.5) * 28
    nodes.push({ side, x: baseX(side, r), y: TOP + i * ROW_STEP + jitterY })
  }

  const links: Segment[] = []
  const joints: Point[] = []
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i]
    const b = nodes[i + 1]
    const r = seeded(2003 + i * 104729)
    const joint = {
      x: a.x + (b.x - a.x) * (0.55 + r() * 0.12),
      y: a.y + (b.y - a.y) * (0.3 + r() * 0.08),
    }
    joints.push(joint)
    links.push({ from: a, to: joint }, { from: joint, to: b })
  }

  // Spurs branch toward the centre/opposite side, staying within ±75px of
  // their star so they never run into a neighbouring card.
  const spurs: Segment[] = []
  const faint: FaintStar[] = []
  nodes.forEach((node, i) => {
    const r = seeded(3001 + i * 15485863)
    if (r() > 0.8) return
    const dir = node.side === 'left' ? 1 : -1
    const hops = r() < 0.4 ? 2 : 1
    let p: Point = node
    for (let h = 0; h < hops; h++) {
      const q = {
        x: p.x + dir * (45 + r() * 85),
        y: Math.max(14, Math.min(node.y + 75, Math.max(node.y - 75, p.y + (r() - 0.5) * 150))),
      }
      spurs.push({ from: p, to: q })
      faint.push({ ...q, r: 1.6 + r() * 0.8 })
      p = q
    }
  })

  let next: ConstellationLayout['next']
  const last = nodes[nodes.length - 1]
  if (withNext) {
    const side = sideOf(nodes.length)
    const r = seeded(4007 + nodes.length)
    const node: StarNode = last
      ? { side, x: baseX(side, r), y: last.y + NEXT_GAP }
      : { side, x: baseX(side, r), y: TOP }
    const from = last ?? node
    next = {
      node,
      control: { x: from.x + (node.x - from.x) * 0.8, y: from.y + (node.y - from.y) * 0.2 },
    }
  }

  const bottom = next?.node.y ?? last?.y
  return {
    height: bottom === undefined ? 0 : bottom + BOTTOM_PAD,
    nodes,
    links,
    joints,
    next,
    spurs,
    faint,
  }
}
