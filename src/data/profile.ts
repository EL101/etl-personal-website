import type { Profile } from './types'

/**
 * All of the site's content lives here.
 *
 * - Add an experience: push another object into `experiences` (most recent first).
 *   The constellation grows by one star and re-links itself.
 * - Add a project: push another object into `projects`.
 *   The solar system gains another orbit and planet.
 *
 * Replace every [bracketed] placeholder with your own details.
 */
export const profile: Profile = {
  name: 'Ethan Liu',
  role: 'CS @ Cornell',
  city: 'New York, NY',
  bio: [
    "I'm an aspiring software engineer interested in AI, full-stack development, and solving hard problems",
    "Outside of that, I also love playing the trumpet and going to the gym!",
  ],
  photo: '/profile.jpeg',

  education: [
    { 
      school: 'Cornell University', 
      logo: '/logos/cornell.webp', 
      degree: 'B.S. in Computer Science', 
      start: 'Aug 2025', 
      end: 'Present',
      gpa: '4.13',
      coursework: [
        'Honors Object-Oriented Design and Data Structures',
        'Functional Programming',
        'Machine Learning',
        'Linear Algebra',
        'Computer System Organization and Programming',
        
      ]
    },
  ],

  experiences: [
    {
      role: 'Teaching Assistant',
      company: 'Cornell Bowers CIS',
      link: 'https://www.cs.cornell.edu/courses/cs2112/2026fa/?info',
      logo: '/logos/cornell_bowers.jpeg',
      location: 'Ithaca, NY',
      start: 'Aug 2026',
      description: 'CS 2112: Honors Object-Oriented Design and Data Structures',
    },
    {
      role: 'Software Engineer Intern',
      company: 'Hyphenate AI',
      logo: '/logos/hyphenate.jpeg',
      link: 'https://hyphenate.ai/',
      location: 'New York, NY',
      start: 'Jun 2026',
      end: 'Nov 2026',
      description: 'Autonomous finance software - worked on the close module team',
    },
    {
      role: 'Junior Engineer Intern',
      company: 'Shifting Waters Leadership Institute (SWLI)',
      location: 'Remote',
      logo: '/logos/swli.jpeg',
      link: 'https://swli.org',
      start: 'May 2026',
      end: 'Jun 2026',
      description: "Redesigned the company's internal platform",
    },
  ],

  // nextUp: 'to be decided...',

  projects: [
    {
      name: 'Trumpet Trainer',
      year: '2026',
      description: 'A practice app for trumpet players, with music generation and live feedback',
      tech: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Firebase'],
      links: [
        { label: 'Live', href: 'https://trumpettrainer.vercel.app/' },
        { label: 'Source', href: 'https://github.com/EL101/trumpet-trainer' },
      ],
      image: '/projects/trumpet_trainer.png',
      imageAlt: 'Trumpet trainer landing page',
      icon: '/projects/trumpet_trainer_icon.svg'
    },
    {
      name: 'Critter World',
      year: '2025',
      description: 'A critter simulator built in CS 2112, built with 2 other people',
      tech: ['Java', 'JavaFX', 'Spark', 'Gson'],
      links: [
        {label: 'Demo', href: 'https://drive.google.com/file/d/1e_gTRRLz1gVjAqprA8WnM6X7f90X6SJe/view'},
        {label: 'Overview', href: 'https://github.com/EL101/critter-world-public'},
      ],
      image: '/projects/critter_world.png',
      imageAlt: 'Critter World GUI',
      icon: '/projects/critter_world_icon.svg'
    },
    {
      name: 'Doogle Gocs',
      year: '2026',
      description: 'An OCaml text editor built in CS 3110, built with 3 other people',
      tech: ['OCaml', 'LablGtk3'],
      links: [
        {label: 'Demo', href: 'https://www.youtube.com/watch?v=_j3ZDms2iPw'},
        {label: 'Source', href: 'https://github.com/EL101/ocaml-text-editor'}
      ],
      image: '/projects/doogle_gocs.jpg',
      imageAlt: 'Doogle Gocs editor with a formatted numbered list',
      icon: '/projects/doogle_gocs_icon.svg'
    },
  ],

  skills: [
    {
      title: 'Languages',
      items: [
        { name: 'Python', logo: '/skills/python.svg' },
        { name: 'TypeScript', logo: '/skills/typescript.svg' },
        { name: 'JavaScript', logo: '/skills/javascript.svg' },
        { name: 'Java', logo: '/skills/java.svg' },
        { name: 'C', logo: '/skills/c.svg' },
        { name: 'C++', logo: '/skills/cplusplus.svg' },
        { name: 'SQL', logo: '/skills/sql.svg' },
        { name: 'OCaml', logo: '/skills/ocaml.svg' },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      items: [
        { name: 'React', logo: '/skills/react.svg' },
        { name: 'Node.js', logo: '/skills/nodejs.svg' },
        { name: 'Express', logo: '/skills/express.svg' },
        { name: 'FastAPI', logo: '/skills/fastapi.svg' },
        { name: 'Prisma', logo: '/skills/prisma.svg' },
        { name: 'JUnit', logo: '/skills/junit.svg' },
      ],
    },
    {
      title: 'Infrastructure & Tools',
      items: [
        { name: 'PostgreSQL', logo: '/skills/postgresql.svg' },
        { name: 'Temporal', logo: '/skills/temporal.svg' },
        { name: 'Docker', logo: '/skills/docker.svg' },
        { name: 'Linux', logo: '/skills/linux.svg' },
        { name: 'Git', logo: '/skills/git.svg' },
        { name: 'CI/CD', logo: '/skills/github.svg' },
        { name: 'Claude API', logo: '/skills/claude.svg' },
        { name: 'Claude Code', logo: '/skills/claude.svg' },
      ],
    },
  ],

  beyondCode: [
    { 
      name: 'Trumpet',
      photos: [
        '/interests/trumpet_playing.png'
      ],
      text: [
        "I've been playing the trumpet ever since 6th grade! I enjoyed it so much that I continued playing in high school and now in college, where I play in the marching band (pictured here)."
      ]
    },
    { 
      name: 'Exploring',
      text: [
        "I love exploring new places, especially ones filled with nature. Here are some pictures of places I've been!"
      ]
    },
    { 
      name: 'Gym',
      text: [
        "I started working out here and there during COVID by doing calisthenics at home, and first stepped foot in a commercial gym at the end of my senior year of high school. Now I regularly go and really enjoy it1"
      ]
    },
  ],

  contact: {
    blurb: "If you're hiring interns, I'd love to chat!",
    email: 'eliu3152@gmail.com',
    linkedin: 'https://www.linkedin.com/in/etl-ethanliu',
    github: 'https://github.com/EL101',
  },
}
