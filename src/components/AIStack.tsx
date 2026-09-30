import { motion } from 'framer-motion'
import { aiTools } from '../data/profile'
import { Reveal, SectionLabel, SplitHeading } from './Reveal'

const center = { x: 50, y: 52 }

export default function AIStack() {
  return (
    <section id="ai" className="px-6 py-32 md:px-10 md:py-48">
      <SectionLabel>04 / AI STACK</SectionLabel>
      <SplitHeading text="I BUILD WITH AI" className="display mt-6 text-[10vw] md:text-[6vw]" />

      <div className="relative mx-auto mt-16 aspect-[4/3] w-full max-w-5xl md:aspect-[16/8]" role="img" aria-label="Diagram: ChatGPT, Claude, Gemini, Antigravity and Figma connected to Devendra's workflow">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {aiTools.map((t, i) => (
            <motion.line
              key={t.name}
              x1={center.x} y1={center.y} x2={t.x} y2={t.y}
              stroke="rgba(59,130,246,0.55)" strokeWidth="1" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.12 }}
            />
          ))}
          {aiTools.slice(0, -1).map((t, i) => {
            const n = aiTools[i + 1]
            return <line key={`c${i}`} x1={t.x} y1={t.y} x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" />
          })}
        </svg>

        <div className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-black md:h-24 md:w-24" style={{ left: `${center.x}%`, top: `${center.y}%` }}>
          <span className="display text-lg md:text-2xl">DK</span>
          <span aria-hidden className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.35)]" />
        </div>

        {aiTools.map((t, i) => (
          <motion.div
            key={t.name}
            className="meta absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-line bg-black px-3 py-2 md:px-5 md:py-3"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />{t.name}
          </motion.div>
        ))}
      </div>

      <Reveal as="p" className="mx-auto mt-16 max-w-2xl text-center text-xl text-dim md:text-2xl">
        AI is not just a tool in my workflow — it is part of how I research, design, prototype and build.
      </Reveal>
    </section>
  )
}
