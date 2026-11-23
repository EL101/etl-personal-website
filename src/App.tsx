import { Constellation } from './components/Constellation'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { Hobbies } from './components/Hobbies'
import { Skills } from './components/Skills'
import { SolarSystem } from './components/SolarSystem'
import { profile } from './data/profile'

function App() {
  return (
    <div id="top" className="sky">
      {/* id="top" is on the outermost element so "Back to top" lands at scroll 0 */}
      <div className="container">
        <Hero profile={profile} />
        <Education entries={profile.education} />
        <Constellation experiences={profile.experiences} nextUp={profile.nextUp} />
      </div>
      <SolarSystem projects={profile.projects} />
      <div className="container">
        <Skills groups={profile.skills} />
        <Hobbies items={profile.hobbies} />
      </div>
      <Contact profile={profile} />
    </div>
  )
}

export default App
