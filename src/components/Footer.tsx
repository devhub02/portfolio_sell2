import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 md:px-10">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div>
          <p className="display text-xl">{profile.name}</p>
          <p className="meta mt-3 text-dim">{profile.role}</p>
        </div>
        <p className="meta text-dim">DESIGNED + BUILT WITH<br /><span className="text-white">CODE / AI / CURIOSITY</span></p>
      </div>
      <div className="meta mt-10 flex justify-between text-dim">
        <span>© 2026 DEVENDRA KUMAR</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
