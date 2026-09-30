import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { timeline } from '../data/profile'
import { Reveal, SectionLabel } from './Reveal'

export default function Timeline() {
  const [open, setOpen] = useState(timeline.length - 1)
  return (
    <section aria-label="Journey" className="px-6 pb-32 md:px-10 md:pb-48">
      <SectionLabel>04.1 / JOURNEY</SectionLabel>
      <ol className="relative mt-12 border-l border-line pl-6 md:pl-12">
        {timeline.map((t, i) => {
          const isOpen = open === i
          return (
            <Reveal as="li" key={t.year} className="relative pb-10 last:pb-0">
              <span aria-hidden className={`absolute -left-[1.85rem] top-3 h-2 w-2 rounded-full md:-left-[3.35rem] ${isOpen ? 'bg-accent shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-white/40'}`} />
              <button
                onClick={() => setOpen(i)}
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(i)}
                aria-expanded={isOpen}
                data-cursor="hover"
                className="text-left"
              >
                <span className="meta text-accent">{t.year}</span>
                <span className={`display mt-1 block text-2xl transition-colors md:text-4xl ${isOpen ? 'text-white' : 'text-white/45'}`}>{t.title}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl overflow-hidden pt-3 text-dim"
                  >
                    {t.body}
                  </motion.p>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}
