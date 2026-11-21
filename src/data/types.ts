export interface Education {
  school: string
  /**
   * Optional school logo, shown in place of the moon icon. Put it in
   * `public/logos/` and reference it as "/logos/cornell.png". Square images work best.
   */
  logo?: string
  degree: string
  start: string
  end?: string
  /** Shown on its own line as "GPA: <gpa>", e.g. '3.9 / 4.0'. */
  gpa?: string
  /** Courses shown as asteroids drifting along a belt under the school. */
  coursework?: string[]
}

export interface Experience {
  role: string
  company: string
  /**
   * Optional company logo shown next to the company name. Put the image in
   * `public/logos/` and reference it from the site root, e.g. "/logos/acme.png".
   * Square images (PNG/SVG, transparent background) look best.
   */
  logo?: string
  /** Optional company website; makes the company name and logo a link. */
  link?: string
  location?: string
  start: string
  /** Leave out for a current role; it shows as "Present". */
  end?: string
  description: string
}

export interface ProjectLink {
  label: string
  href: string
}

/** Optional look for a project's planet. Anything left out is picked automatically. */
export interface PlanetStyle {
  color?: string
  /** Diameter in px. */
  size?: number
  moon?: boolean
  ring?: boolean
}

export interface Project {
  name: string
  year?: string
  description: string
  tech: string[]
  links?: ProjectLink[]
  /**
   * Optional sneak-peek screenshot shown at the top of the project card.
   * Put it in `public/projects/` and reference it as "/projects/foo.png".
   * Shown at 16:10 and cropped to fit, so a 1600×1000 (or similar) image works best.
   */
  image?: string
  /** Describes the screenshot for screen readers; defaults to "<name> preview". */
  imageAlt?: string
  /**
   * Optional icon (e.g. the project's favicon) that becomes the planet's
   * surface, cropped to a circle. Square images with the artwork centred work
   * best, e.g. "/projects/foo-icon.png".
   */
  icon?: string
  planet?: PlanetStyle
}

export interface Skill {
  name: string
  /**
   * Optional logo shown above the name. Put it in `public/skills/` and
   * reference it as "/skills/react.svg". Light or colourful versions read
   * best on the dark cards; square icons with transparent backgrounds work best.
   */
  logo?: string
}

export interface SkillGroup {
  title: string
  /** A plain string is shorthand for a skill with no logo. */
  items: (string | Skill)[]
}

export interface Photo {
  src: string
  /** Describes the photo for screen readers; defaults to "<hobby> photo N". */
  alt?: string
}

/** Something you do outside of code: one row in the "Beyond code" section. */
export interface Interest {
  name: string
  /** Optional small line above the name, e.g. 'Since 2014'. */
  meta?: string
  /**
   * Photos for this hobby. Put them in `public/interests/` and reference them
   * as "/interests/trumpet.jpg". The first is shown large; with more than one,
   * thumbnails appear underneath to switch between them. A plain string is
   * shorthand for a photo with no alt text.
   */
  photos?: (string | Photo)[]
  /** The writing, one string per paragraph. */
  text?: string[]
}

export interface Contact {
  blurb: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
}

export interface Profile {
  name: string
  role: string
  city: string
  bio: string[]
  /** Path or URL to a photo, e.g. "/me.jpg" in the public folder. */
  photo?: string
  education: Education[]
  /** Most recent first. Each one becomes a star in the constellation. */
  experiences: Experience[]
  /** Optional dashed "next" star at the end of the constellation. */
  nextUp?: string
  /** Each one becomes a planet; the first is the innermost orbit. */
  projects: Project[]
  skills: SkillGroup[]
  /** Hobbies and interests; the section is hidden when empty. */
  beyondCode: Interest[]
  contact: Contact
}
