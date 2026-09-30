import { marquee } from '../data/profile'

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {marquee.map((m) => (
        <li key={m} className="display flex items-center whitespace-nowrap px-8 text-4xl text-white/85 md:text-6xl">
          {m}<span className="ml-16 text-2xl text-accent">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden border-y border-line py-8" aria-label="Technical focus areas">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  )
}
