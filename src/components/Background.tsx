import { motion, useScroll, useSpring } from 'framer-motion'

/** Fixed ambient layers (grid, glow, noise) + scroll progress bar. */
export default function Background() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid" />
        <div
          className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.13), transparent)' }}
        />
        <div className="absolute inset-0 bg-noise" />
      </div>
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-accent"
        style={{ scaleX }}
      />
    </>
  )
}
