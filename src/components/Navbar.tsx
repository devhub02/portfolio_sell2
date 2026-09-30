import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'

export default function Navbar({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between px-6 py-5 md:px-10 md:py-7"
    >
      <a href="#top" aria-label="Devendra Kumar — back to top" className="display text-lg tracking-widest" data-cursor="hover">
        {profile.short}
      </a>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex gap-10">
          {profile.nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="meta u-link" data-cursor="hover">{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="meta md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'CLOSE' : 'MENU'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-black px-6"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-6">
              {profile.nav.map((n, i) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)} className="display block text-5xl">
                    <span className="meta mr-4 text-accent">0{i + 2}</span>{n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
