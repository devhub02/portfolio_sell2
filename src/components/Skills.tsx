import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { SectionLabel, SplitHeading, Reveal } from './Reveal'

export default function Skills() {
  const [open, setOpen] = useState<string | null>(skillCategories[0].id)

  return (
    <section id="skills" className="px-6 py-32 md:px-10 md:py-48">
      <SectionLabel>03.1 / SKILL MATRIX</SectionLabel>
      <SplitHeading text="SKILL MATRIX" className="display mt-6 text-[10vw] md:text-[6vw]" />

      <ul className="mt-16 border-t border-line">
        {skillCategories.map((c, i) => {
          const isOpen = open === c.id
          return (
            <Reveal as="li" key={c.id} delay={i * 0.04} className="border-b border-line">
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                  aria-controls={`skill-${c.id}`}
                  data-cursor="hover"
                  className="group flex w-full items-baseline gap-4 py-6 text-left md:gap-10 md:py-8"
                >
                  <span className="meta text-accent">{c.id}</span>
                  <span className={`display flex-1 text-xl transition-colors md:text-4xl ${isOpen ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>
                    {c.title}
                  </span>
                  <span className="meta text-dim">{String(c.skills.length).padStart(2, '0')}</span>
                  <span className="meta w-4 text-center">{isOpen ? '−' : '+'}</span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`skill-${c.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-wrap gap-2 pb-8 md:pl-[4.5rem]">
                      {c.skills.map((s, k) => (
                        <motion.li
                          key={s}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: k * 0.035 }}
                          className="meta border border-line px-3 py-2 transition-colors hover:border-accent hover:text-accent"
                        >
                          {s}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
