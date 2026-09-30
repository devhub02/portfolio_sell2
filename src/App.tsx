import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Project } from './data/projects'
import { hasWebGL } from './hooks/useWebGL'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ProjectShowcase from './components/ProjectShowcase'
import ProjectDetail from './components/ProjectDetail'
import About from './components/About'
import Skills from './components/Skills'
import AIStack from './components/AIStack'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState<Project | null>(null)
  const done = useCallback(() => setReady(true), [])
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <a href="#work" className="skip-link">Skip to content</a>
      <Background />
      <CustomCursor />
      <AnimatePresence>{!ready && <Loader key="loader" onDone={done} canRender3D={hasWebGL()} />}</AnimatePresence>
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <ProjectShowcase onOpen={setActive} />
        <About />
        <Skills />
        <AIStack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>{active && <ProjectDetail key={active.id} project={active} onClose={close} />}</AnimatePresence>
    </>
  )
}
