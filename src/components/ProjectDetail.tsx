import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import ProjectVisual from './ProjectVisual'

const ease = [0.76, 0, 0.24, 1] as const
const out = [0.2, 0.7, 0.2, 1] as const

/** Full-screen project view. Sequence: black → number → title → image → content. */
export default function ProjectDetail({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => closeRef.current?.focus(), 500)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [onClose])

  const rows: [string, string][] = [
    ['OVERVIEW', p.detail.overview],
    ['PROBLEM', p.detail.problem],
    ['SOLUTION', p.detail.solution],
    ['PROCESS', p.detail.process],
    ['RESULT', p.detail.result],
  ]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} project details`}
      className="fixed inset-0 z-[80] overflow-y-auto bg-black"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="flex items-center justify-between">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="meta text-dim">
            PROJECT {p.number} // {p.code}
          </motion.p>
          <button ref={closeRef} onClick={onClose} data-cursor="hover" className="meta u-link">CLOSE ✕</button>
        </div>

        <div className="pt-16 md:pt-28">
          <motion.p
            initial={{ opacity: 0, filter: 'blur(12px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="display text-[26vw] leading-none text-white/10 md:text-[16vw]"
          >
            {p.number}
          </motion.p>
          <h2 className="display -mt-[6vw] overflow-hidden pb-2 text-[11vw] md:text-[7vw]">
            <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: out }}>
              {p.name}
            </motion.span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="meta mt-4 text-accent">
            {p.category} — {p.year}
          </motion.p>
        </div>

        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', filter: 'blur(14px)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)' }}
          transition={{ delay: 0.75, duration: 0.9, ease: out }}
          className="mt-14 aspect-[16/9] overflow-hidden border border-line"
        >
          <ProjectVisual variant={p.variant} src={p.image} alt={`${p.name} project visual`} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: out }} className="pb-32 pt-16">
          <dl className="meta grid gap-6 border-y border-line py-6 sm:grid-cols-3">
            <div><dt className="text-dim">TECHNOLOGY</dt><dd className="mt-1">{p.stack.join(' / ').toUpperCase()}</dd></div>
            <div><dt className="text-dim">TYPE</dt><dd className="mt-1">{p.type}</dd></div>
            <div><dt className="text-dim">STATUS</dt><dd className="mt-1">{p.status}</dd></div>
          </dl>

          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_2fr]">
              <h3 className="meta text-accent">{k}</h3>
              <p className="max-w-2xl text-lg text-dim">{v}</p>
            </div>
          ))}

          {p.features && (
            <div className="grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_2fr]">
              <h3 className="meta text-accent">FEATURES</h3>
              <ul className="meta grid gap-2 sm:grid-cols-2">{p.features.map((f) => <li key={f}>— {f}</li>)}</ul>
            </div>
          )}

          <div className="grid gap-4 py-8 md:grid-cols-[1fr_2fr]">
            <h3 className="meta text-accent">LINK</h3>
            {p.link ? (
              <a href={p.link.href} target="_blank" rel="noopener noreferrer" data-cursor="OPEN ↗" className="meta u-link w-fit">{p.link.label} ↗</a>
            ) : (
              <p className="meta text-dim">NOT PUBLIC YET</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
