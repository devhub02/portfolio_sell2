import { lazy, Suspense, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/profile'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMedia'
import { hasWebGL } from '../hooks/useWebGL'
import HeroFallback from './HeroFallback'
import { Magnetic } from './Magnetic'

const ModelViewer = lazy(() => import('./ModelViewer'))

export default function Hero({ ready }: { ready: boolean }) {
  const mobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  const webgl = useMemo(() => hasWebGL(), [])
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const ease = [0.2, 0.7, 0.2, 1] as const
  const t = (d: number) => ({ duration: 1, delay: ready ? d : 0, ease })

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-8 md:px-10">
      {/* Huge name sits behind the model */}
      <motion.h1
        style={{ y, opacity: fade }}
        className="display pointer-events-none absolute inset-x-0 top-[13%] z-0 select-none px-6 text-center text-[13vw] leading-[0.95] md:top-[15%] md:text-[6.6vw]"
      >
        <span className="sr-only">DEVENDRA KUMAR — {profile.role}</span>
        <span aria-hidden className="block overflow-hidden md:inline-block md:pr-[0.25em]">
          <motion.span className="inline-block" initial={{ y: '105%' }} animate={ready ? { y: 0 } : {}} transition={t(0.1)}>DEVENDRA</motion.span>
        </span>
        <span aria-hidden className="block overflow-hidden md:inline-block">
          <motion.span className="inline-block" initial={{ y: '105%' }} animate={ready ? { y: 0 } : {}} transition={t(0.22)}>KUMAR</motion.span>
        </span>
      </motion.h1>

      {/* 3D stage */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.6, ease }}
      >
        {webgl ? (
          <Suspense fallback={null}><ModelViewer mobile={mobile} reduceMotion={reduce} /></Suspense>
        ) : (
          <div className="flex h-full items-center justify-center"><HeroFallback /></div>
        )}
      </motion.div>

      {/* Foreground copy */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none relative z-20 grid gap-8 md:grid-cols-[1.1fr_1fr_auto] md:items-end">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={t(0.5)} className="max-w-md">
          <p className="meta text-accent mb-3">{profile.role}</p>
          <p className="text-base text-dim md:text-lg">{profile.tagline}</p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={t(0.7)}
          className="meta hidden gap-x-6 gap-y-1.5 text-dim md:grid md:grid-cols-[auto_1fr] md:justify-self-center"
        >
          {profile.meta.map(([k, v]) => (
            <div key={k} className="contents"><dt className="opacity-60">{k}</dt><dd className="text-white">{v}</dd></div>
          ))}
        </motion.dl>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={t(0.9)} className="pointer-events-auto md:justify-self-end">
          <Magnetic>
            <a href="#contact" data-cursor="hover" className="meta inline-flex items-center gap-3 border border-line px-4 py-3 text-white transition-colors hover:border-accent">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(59,130,246,0.6)]" />
              AVAILABLE FOR SELECTED PROJECTS
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <p className="meta absolute bottom-3 right-6 z-20 hidden text-dim md:block md:right-10 md:bottom-auto md:top-24 [writing-mode:vertical-rl]">SCROLL ↓</p>
    </section>
  )
}
