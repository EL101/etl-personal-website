import type { Profile } from '../data/types'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Sparkle } from './Sparkle'

const YEAR = new Date().getFullYear()

export function Contact({ profile }: { profile: Profile }) {
  const { contact } = profile
  return (
    <footer id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-top">
          <div className="contact-lead">
            <p className="eyebrow">VI</p>
            <h2>
              Let's
              <br />
              <span className="italic muted">connect.</span>
            </h2>
            <p className="contact-blurb">{contact.blurb}</p>
          </div>

          <div className="contact-details">
            {contact.email && (
              <div className="contact-item">
                <p className="label">Email</p>
                <a href={`mailto:${contact.email}`} className="contact-link">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="contact-item">
                <p className="label">Phone</p>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="contact-link">
                  {contact.phone}
                </a>
              </div>
            )}
            <div className="socials">
              {contact.linkedin && (
                <a href={contact.linkedin} aria-label="LinkedIn" className="social" target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                </a>
              )}
              {contact.github && (
                <a href={contact.github} aria-label="GitHub" className="social" target="_blank" rel="noreferrer">
                  <GitHubIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="contact-bottom">
          <p>
            <Sparkle size={12} fill="var(--accent)" className="tw" />© {YEAR} {profile.name}
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
