import type { Profile } from '../data/types'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { Sparkle } from './Sparkle'

const NAV = [
  ['education', 'Education'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['beyond-code', 'Beyond code'],
  ['contact', 'Contact'],
] as const

// Decorative stars around the portrait: [left %, top %, size %, colour, twinkle class]
// Kept to two small, still sparkles; add 'tw' or 'tw2' as the class to make one twinkle.
const PORTRAIT_STARS: [number, number, number, string, string][] = [
  [8, 14, 6, 'var(--accent)', ''],
  [78, 86, 4.5, '#FFFFFF', ''],
]
const PORTRAIT_DOTS: [number, number, number, string][] = [
  [95.5, 36, 14, '#9FB4FF'],
  [1, 52, 6, '#E8EAF6'],
  [30, 94, 4, '#C8D2FF'],
  [64, 1, 3, '#FFFFFF'],
]

export function Hero({ profile }: { profile: Profile }) {
  const { contact } = profile
  return (
    <div className="hero">
      <header className="site-header">
        <a href="#top" className="brand">
          <Sparkle size={20} fill="var(--accent)" />
          {profile.name}
        </a>
        <nav aria-label="Primary" className="site-nav">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero-body">
        <div className="portrait-wrap">
          <div className="portrait">
            <div className="portrait-ring portrait-ring--outer spin" aria-hidden="true" />
            <div className="portrait-ring portrait-ring--inner" aria-hidden="true" />
            <div className="portrait-photo">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name}/>
              ) : (
                <span>[Your photo]</span>
              )}
            </div>
            {PORTRAIT_STARS.map(([left, top, size, fill, cls], i) => (
              <Sparkle
                key={i}
                fill={fill}
                className={cls}
                size={`${size}%`}
                style={{ position: 'absolute', left: `${left}%`, top: `${top}%` }}
              />
            ))}
            {PORTRAIT_DOTS.map(([left, top, size, bg], i) => (
              <span
                key={i}
                aria-hidden="true"
                className="dot"
                style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, background: bg }}
              />
            ))}
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow eyebrow--wide">
            {profile.role} · {profile.city}
          </p>
          <h1>{profile.name}</h1>
          <div className="hero-bio">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="hero-actions">
            {contact.email && (
              <a href={`mailto:${contact.email}`} aria-label="Email" className="social social--sm">
                <MailIcon size={18} />
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} aria-label="LinkedIn" className="social social--sm" target="_blank" rel="noreferrer">
                <LinkedInIcon size={18} />
              </a>
            )}
            {contact.github && (
              <a href={contact.github} aria-label="GitHub" className="social social--sm" target="_blank" rel="noreferrer">
                <GitHubIcon size={20} />
              </a>
            )}
          </div>
        </div>
      </section>

      <a href="#education" className="scroll-cue">
        Scroll to explore ↓
      </a>
    </div>
  )
}
