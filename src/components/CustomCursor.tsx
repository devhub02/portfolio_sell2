import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMedia'

/**
 * Desktop-only cursor. Elements opt in via data-cursor="VIEW" | "OPEN ↗" | "hover".
 */
export default function CustomCursor() {
  const fine = useFinePointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [label, setLabel] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const visible = useRef(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!fine) return
    document.body.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible.current) { visible.current = true; setShown(true) }
    }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button')
      if (!el) { setHover(false); setLabel(null); return }
      const c = el.dataset.cursor
      setHover(true)
      setLabel(c && c !== 'hover' ? c : null)
    }
    const leave = () => { visible.current = false; setShown(false) }
    window.addEventListener('pointermove', move)
    document.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [fine, x, y])

  if (!fine) return null
  const size = label ? 84 : hover ? 44 : 8

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-white text-black mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: shown ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {label && <span className="meta !text-[0.6rem] !tracking-[0.12em] whitespace-nowrap">{label}</span>}
    </motion.div>
  )
}
