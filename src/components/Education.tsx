import type { Education as EducationEntry } from '../data/types'
import { SectionHeading } from './SectionHeading'
import { Sparkle } from './Sparkle'

function Moon({ crescent }: { crescent: boolean }) {
  return crescent ? (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24">
      <path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 1 1 15 3z" fill="var(--accent)" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="var(--ink)" strokeWidth="1.2" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="var(--ink)" />
    </svg>
  )
}

export function Education({ entries }: { entries: EducationEntry[] }) {
  if (entries.length === 0) return null
  return (
    <section id="education" className="section section--rule section--center education">
      <SectionHeading numeral="I" title="Education" align="center" />
      <div className="education-list">
        {entries.map((e, i) => (
          <div
            key={`${e.school}-${i}`}
            className={`education-item ${e.coursework?.length ? 'education-item--wide' : ''}`}
          >
            {e.logo ? (
              <span className="education-logo">
                <img src={e.logo} alt="" />
              </span>
            ) : (
              <Moon crescent={i === 0} />
            )}
            <p className={`date ${i === 0 ? 'date--accent' : ''}`}>
              {e.start} — {e.end ?? 'Present'}
            </p>
            <h3>{e.school}</h3>
            <p className="body">{e.degree}</p>
            {e.gpa && <p className="body">GPA: {e.gpa}</p>}
            {e.coursework && e.coursework.length > 0 && (
              <div className="coursework">
                <p className="coursework-label">Relevant Coursework</p>
                <ul className="coursework-list">
                  {e.coursework.map((course, j) => (
                    <li key={`${course}-${j}`}>
                      <Sparkle size={14} fill="var(--accent)" />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
