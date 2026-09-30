import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import ProjectVisual from './ProjectVisual'
import { Reveal } from './Reveal'

interface Props {
  project: Project
  onOpen: (p: Project) => void
}

export default function ProjectCard({ project: p, onOpen }: Props) {
  return (
    <Reveal>
      <motion.button
        type="button"
        onClick={() => onOpen(p)}
        data-cursor="VIEW"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        aria-label={`View project ${p.name}`}
        className="group block w-full text-left"
      >
        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-black md:aspect-[16/9]">
          <motion.div
            className="h-full w-full"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <ProjectVisual variant={p.variant} src={p.image} alt={`${p.name} project visual`} />
          </motion.div>
          {/* subtle blue glow on hover */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 60% at 50% 100%, rgba(59,130,246,0.28), transparent)' }}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.6 }}
          />
          <span className="meta absolute left-4 top-4 text-white/80">{p.code}</span>
          {p.placeholder && (
            <span className="meta absolute right-4 top-4 border border-line bg-black/60 px-2 py-1 text-dim">PLACEHOLDER</span>
          )}
          {/* metadata slides in on hover */}
          <motion.dl
            className="meta absolute inset-x-4 bottom-4 hidden justify-between gap-4 text-white/85 md:flex"
            variants={{ rest: { opacity: 0, y: 12 }, hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
          >
            <div><dt className="opacity-50">TYPE</dt><dd>{p.type}</dd></div>
            <div><dt className="opacity-50">STACK</dt><dd>{p.stack.join(' / ').toUpperCase()}</dd></div>
            <div><dt className="opacity-50">STATUS</dt><dd>{p.status}</dd></div>
          </motion.dl>
        </div>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="min-w-0">
            <p className="meta text-dim">{p.number} — {p.category}</p>
            <motion.h3
              className="display mt-2 text-3xl md:text-5xl"
              variants={{ rest: { x: 0 }, hover: { x: 12 } }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {p.name}
            </motion.h3>
            <p className="mt-3 max-w-xl text-dim">{p.description}</p>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-6 md:block md:text-right">
            <p className="meta text-dim">{p.year}</p>
            <p className="meta u-link md:mt-3 inline-block group-hover:text-accent">VIEW PROJECT →</p>
          </div>
        </div>
      </motion.button>
    </Reveal>
  )
}
