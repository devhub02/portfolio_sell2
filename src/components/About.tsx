import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, SectionLabel, SplitHeading } from './Reveal'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="about" ref={ref} className="relative px-6 py-32 md:px-10 md:py-48">
      <SectionLabel>03 / PROFILE</SectionLabel>
      <SplitHeading text="ENGINEERING + AI + DESIGN" className="display mt-6 max-w-5xl text-[10vw] md:text-[6vw]" />

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1fr_1fr] md:gap-24">
        <motion.div style={{ y }} className="space-y-8">
          <Reveal as="p" className="text-2xl leading-snug md:text-3xl">
            I'm a Mechanical Engineering student and developer exploring the intersection of software engineering, artificial intelligence, product design and creative technology.
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-lg text-dim">
            I enjoy turning ideas into working digital products — from AI-powered applications and modern web interfaces to experimental 3D experiences.
          </Reveal>
        </motion.div>

        <Reveal delay={0.15}>
          <dl className="meta divide-y divide-line border-y border-line">
            {[
              ['BASE', 'GAYA, INDIA'],
              ['EDUCATION', 'B.TECH MECHANICAL ENGINEERING — PURNEA COLLEGE OF ENGINEERING'],
              ['NOW', 'PRODUCT DEVELOPMENT @ TRIPG'],
              ['INTERESTS', 'AI / PRODUCT / STARTUPS / 3D WEB'],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4"><dt className="text-dim">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
