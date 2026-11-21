import type { Skill, SkillGroup } from '../data/types'
import { SectionHeading } from './SectionHeading'

const toSkill = (item: string | Skill): Skill => (typeof item === 'string' ? { name: item } : item)

export function Skills({ groups }: { groups: SkillGroup[] }) {
  if (groups.length === 0) return null
  return (
    <section id="skills" className="section skills">
      <SectionHeading numeral="IV" title="Skills" italic />
      <div className="skill-rows">
        {groups.map((g, i) => (
          <div key={g.title} className="skill-row">
            <div className="skill-row-label">
              <span className="skill-row-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{g.title}</h3>
            </div>
            <ul className="skill-cards" aria-label={g.title}>
              {g.items.map(toSkill).map((s, j) => (
                <li key={`${s.name}-${j}`} className="skill-card">
                  {s.logo && <img src={s.logo} alt="" className="skill-logo" />}
                  <span className="skill-name">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
