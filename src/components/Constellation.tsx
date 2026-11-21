import { useLayoutEffect, useMemo, useRef } from 'react'
import type { Experience } from '../data/types'
import { layoutConstellation, type Point } from '../lib/constellation'
import { SectionHeading } from './SectionHeading'
import { Sparkle } from './Sparkle'

const pct = (x: number) => `${x / 10}%`
const line = (a: Point, b: Point) => `M${a.x} ${a.y}L${b.x} ${b.y}`

/** Star size by position: the current role is largest, older ones shrink. */
const starSize = (i: number) => (i === 0 ? 34 : Math.max(20, 30 - i * 3))

/**
 * A wrapped line of text fills its whole container even when every line is
 * shorter, which leaves a gap beside right-aligned text. This narrows the
 * element to its widest line so a logo next to it sits flush against the words.
 */
function useShrinkWrap<T extends HTMLElement>(text: string) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.width = ''
      const range = document.createRange()
      range.selectNodeContents(el)
      const lines = Array.from(range.getClientRects())
      if (lines.length < 2) return // a single line already fits snugly
      el.style.width = `${Math.ceil(Math.max(...lines.map((r) => r.width))) + 1}px`
    }
    fit()
    void document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [text])
  return ref
}

/** Logo + company name; becomes a link to the company's site when `link` is set. */
function CompanyName({ company, logo, link }: Pick<Experience, 'company' | 'logo' | 'link'>) {
  const nameRef = useShrinkWrap<HTMLSpanElement>(company)
  const content = (
    <>
      {logo && (
        <span className="clogo">
          <img src={logo} alt="" />
        </span>
      )}
      <span ref={nameRef}>{company}</span>
    </>
  )
  return link ? (
    <a className="ctitle-row ctitle-link" href={link} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <span className="ctitle-row">{content}</span>
  )
}

interface Props {
  experiences: Experience[]
  nextUp?: string
}

export function Constellation({ experiences, nextUp }: Props) {
  const layout = useMemo(
    () => layoutConstellation(experiences.length, Boolean(nextUp)),
    [experiences.length, nextUp],
  )
  if (layout.height === 0) return null
  const { height, nodes, links, joints, next, spurs, faint } = layout

  return (
    <section id="experience" className="section section--rule experience">
      <SectionHeading numeral="II" title="Experience" />

      <div className="cfield" style={{ height }}>
        <div className="cdecor" aria-hidden="true">
          <svg viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" fill="none">
            {links.map((s, i) => (
              <path
                key={`l${i}`}
                className="cpl"
                style={{ animationDelay: `${-0.6 * i}s` }}
                d={line(s.from, s.to)}
              />
            ))}
            {spurs.map((s, i) => (
              <path key={`s${i}`} className="cspur" d={line(s.from, s.to)} />
            ))}
            {next && nodes.length > 0 && (
              <path
                className="cdrift"
                d={`M${nodes[nodes.length - 1].x} ${nodes[nodes.length - 1].y}Q${next.control.x} ${next.control.y} ${next.node.x} ${next.node.y}`}
              />
            )}
          </svg>
          {joints.map((p, i) => (
            <span key={`j${i}`} className="cjoint" style={{ left: pct(p.x), top: p.y }} />
          ))}
          {faint.map((p, i) => (
            <span
              key={`f${i}`}
              className={`cfaint ${i % 2 ? 'tw' : 'tw2'}`}
              style={{ left: pct(p.x), top: p.y, width: p.r * 2, height: p.r * 2 }}
            />
          ))}
        </div>

        <ol className="clist">
          {experiences.map((e, i) => {
            const node = nodes[i]
            const size = starSize(i)
            const current = i === 0
            return (
              <li
                key={`${e.company}-${e.start}-${i}`}
                className={`cnode cnode--${node.side}`}
                style={{ left: pct(node.x), top: node.y }}
              >
                {current && (
                  <>
                    <span className="chalo cpulse" aria-hidden="true" />
                    <span className="chalo cpulse2" aria-hidden="true" />
                  </>
                )}
                <Sparkle
                  size={size}
                  fill={current ? 'var(--accent)' : 'var(--ink)'}
                  className={`cstar ${current ? 'tw' : ''}`}
                  style={{ left: -size / 2, top: -size / 2 }}
                />
                <div className="ccard">
                  <p className={`date ${current ? 'date--accent' : ''}`}>
                    {e.start} — {e.end ?? 'Present'}
                  </p>
                  <h3 className="ctitle">
                    <CompanyName company={e.company} logo={e.logo} link={e.link} />
                  </h3>
                  <p className="crole">
                    {e.role}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                  <p className="ccopy">{e.description}</p>
                </div>
              </li>
            )
          })}

          {next && nextUp && (
            <li
              className={`cnode cnode--${next.node.side} cnode--next`}
              style={{ left: pct(next.node.x), top: next.node.y }}
            >
              <span className="cstar cstar--next" aria-hidden="true" />
              <div className="ccard">
                <p className="date">Next</p>
                <h3 className="italic">{nextUp}</h3>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>
  )
}
