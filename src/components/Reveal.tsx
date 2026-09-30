import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'li'
}

/** Blur-to-sharp rise, triggered once on scroll into view. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  )
}

/** Word-by-word masked heading reveal. The observer lives on the heading, not the clipped words. */
export function SplitHeading({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h2
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.07 }}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="meta text-accent flex items-center gap-3">
        <span className="h-px w-8 bg-accent/60" />
        {children}
      </p>
    </Reveal>
  )
}
