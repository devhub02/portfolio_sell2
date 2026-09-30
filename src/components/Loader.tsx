import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { probeModel } from '../hooks/useWebGL'

const STEPS = ['INITIALIZING EXPERIENCE', 'LOADING 01', 'SYSTEM READY']

/**
 * Loads real assets (fonts, model probe, 3D chunk) and reports progress.
 * Minimum display is short so it never feels like a wait.
 */
export default function Loader({ onDone, canRender3D }: { onDone: () => void; canRender3D: boolean }) {
  const [target, setTarget] = useState(0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let done = 0
    const total = canRender3D ? 3 : 1
    const tick = () => { done += 1; setTarget(Math.round((done / total) * 100)) }
    const tasks: Promise<unknown>[] = [document.fonts.ready.then(tick)]
    if (canRender3D) {
      tasks.push(import('./ModelViewer').then(tick), probeModel().then(tick))
    }
    const min = new Promise((r) => setTimeout(r, 1300))
    const max = new Promise((r) => setTimeout(r, 5000))
    Promise.race([Promise.all([...tasks, min]), max]).then(() => { setTarget(100) })
  }, [canRender3D])

  useEffect(() => {
    const id = setInterval(() => setShown((s) => (s < target ? Math.min(s + 2, target) : s)), 16)
    return () => clearInterval(id)
  }, [target])

  useEffect(() => {
    if (shown >= 100) {
      const t = setTimeout(onDone, 350)
      return () => clearTimeout(t)
    }
  }, [shown, onDone])

  const step = shown < 40 ? 0 : shown < 100 ? 1 : 2

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 md:p-10"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <p className="meta text-dim">DK // PORTFOLIO 2026</p>
      <div>
        <p className="meta text-accent mb-4">{STEPS[step]}</p>
        <p className="display text-[22vw] md:text-[14vw] tabular-nums">{String(shown).padStart(2, '0')}<span className="text-dim text-[0.3em]">%</span></p>
      </div>
      <div className="h-px w-full bg-line">
        <div className="h-px bg-white transition-[width] duration-100" style={{ width: `${shown}%` }} />
      </div>
    </motion.div>
  )
}
