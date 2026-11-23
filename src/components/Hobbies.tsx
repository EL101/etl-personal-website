import { useState } from 'react'
import type { Hobby, Photo } from '../data/types'
import { SectionHeading } from './SectionHeading'

const toPhoto = (p: string | Photo): Photo => (typeof p === 'string' ? { src: p } : p)

/** Main photo at its natural shape, plus thumbnails to switch when there are several. */
function PhotoGallery({ name, photos }: { name: string; photos: Photo[] }) {
  const [active, setActive] = useState(0)
  const index = Math.min(active, photos.length - 1)
  const current = photos[index]

  return (
    <div className="hobby-photos">
      <img
        key={current.src}
        className="hobby-photo"
        src={current.src}
        alt={current.alt ?? `${name} photo ${index + 1}`}
      />
      {photos.length > 1 && (
        <div className="hobby-thumbs">
          {photos.map((p, i) => (
            <button
              key={`${p.src}-${i}`}
              type="button"
              className="hobby-thumb"
              aria-label={`Show ${name} photo ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => setActive(i)}
            >
              <img src={p.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * One row per hobby: photos on one side, writing on the other, swapping sides
 * each row. A dashed line with a star links consecutive rows.
 */
export function Hobbies({ items }: { items: Hobby[] }) {
  if (items.length === 0) return null
  return (
    <section id="hobbies" className="section section--rule hobbies-section">
      <SectionHeading numeral="V" title="Hobbies" align="center" />
      <ul className="hobbies">
        {items.map((it, i) => {
          const photos = (it.photos ?? []).map(toPhoto)
          const classes = [
            'hobby',
            i % 2 === 1 ? 'hobby--flip' : '',
            photos.length === 0 ? 'hobby--text-only' : '',
          ].join(' ')
          return (
            <li key={`${it.name}-${i}`} className={classes}>
              {photos.length > 0 && <PhotoGallery name={it.name} photos={photos} />}
              <div className="hobby-text">
                <p className="hobby-meta">
                  {String(i + 1).padStart(2, '0')}
                  {it.meta ? ` · ${it.meta}` : ''}
                </p>
                <h3>{it.name}</h3>
                {it.text?.map((para, j) => (
                  <p key={j} className="hobby-para">
                    {para}
                  </p>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
