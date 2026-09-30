import { projects, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import { Reveal, SectionLabel, SplitHeading } from './Reveal'

export default function ProjectShowcase({ onOpen }: { onOpen: (p: Project) => void }) {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" aria-labelledby="work-h" className="px-6 py-32 md:px-10 md:py-48">
      <SectionLabel>02 / SELECTED WORK</SectionLabel>
      <SplitHeading text="THINGS I'VE BUILT" className="display mt-6 text-[11vw] md:text-[7vw]" />
      <span id="work-h" className="sr-only">Selected work</span>

      {/* Featured: TRIPG */}
      <div className="mt-20 md:mt-28">
        <ProjectCard project={featured} onOpen={onOpen} />
        <div className="mt-10 grid gap-10 border-t border-line pt-8 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <dl className="meta space-y-2">
              {[['PROJECT', featured.code], ['TYPE', featured.type], ['STACK', featured.stack.join(' / ').toUpperCase()], ['STATUS', featured.status]].map(([k, v]) => (
                <div key={k} className="flex gap-6"><dt className="w-20 text-dim">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="meta grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {featured.features?.map((f, i) => (
                <li key={f} className="flex gap-3 border-b border-line pb-3"><span className="text-accent">{String(i + 1).padStart(2, '0')}</span>{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Other slots */}
      <div className="mt-32 grid gap-x-10 gap-y-24 md:mt-48 md:grid-cols-2">
        {rest.map((p, i) => (
          <div key={p.id} className={i % 2 ? 'md:mt-32' : ''}>
            <ProjectCard project={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  )
}
