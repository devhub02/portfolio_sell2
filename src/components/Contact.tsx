import { profile } from '../data/profile'
import { Magnetic } from './Magnetic'
import { Reveal, SectionLabel, SplitHeading } from './Reveal'

const external = { target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'OPEN ↗' } as const

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-32 md:px-10 md:py-48">
      <SectionLabel>05 / CONTACT</SectionLabel>
      <SplitHeading text="LET'S BUILD SOMETHING" className="display mt-6 text-[11vw] md:text-[8vw]" />
      <Reveal as="p" className="mt-10 max-w-md text-xl text-dim">Have an idea, product or experiment in mind?</Reveal>

      <Reveal className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-8">
        <Magnetic strength={0.25}>
          <a href={`mailto:${profile.email}`} data-cursor="hover" className="display inline-block border border-white px-8 py-5 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-black md:text-base">
            START A CONVERSATION →
          </a>
        </Magnetic>
        <a href={profile.links.github} {...external} className="meta u-link">VIEW GITHUB →</a>
        <a href={profile.links.linkedin} {...external} className="meta u-link">LINKEDIN →</a>
        <a href={profile.links.x} {...external} className="meta u-link">X →</a>
      </Reveal>
    </section>
  )
}
