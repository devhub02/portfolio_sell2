import type { VisualVariant } from '../data/projects'

const S = 'rgba(255,255,255,0.55)'
const F = 'rgba(255,255,255,0.14)'
const B = '#3b82f6'

/** Generative line-art used until real screenshots/video are provided. */
export default function ProjectVisual({ variant, src, alt }: { variant: VisualVariant; src?: string; alt: string }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />

  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={alt}>
      <rect width="800" height="500" fill="#050508" />
      <g fill="none" stroke={F} strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" />)}
        {Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} />)}
      </g>
      {variant === 'route' && (
        <g fill="none" strokeLinecap="round">
          <path d="M90 390 C 200 300, 250 380, 360 260 S 560 300, 700 110" stroke={B} strokeWidth="2" strokeDasharray="6 8" />
          <path d="M60 140 C 220 190, 330 90, 470 170 S 640 400, 740 360" stroke={S} strokeWidth="1" />
          {[[90, 390], [360, 260], [700, 110]].map(([x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="14" stroke={B} strokeOpacity="0.4" /><circle cx={x} cy={y} r="4" fill="#fff" stroke="none" /></g>
          ))}
          <circle cx="470" cy="170" r="3" fill={B} stroke="none" />
        </g>
      )}
      {variant === 'nodes' && (
        <g stroke={S} fill="none">
          {[[150, 250, 400, 120], [150, 250, 400, 380], [400, 120, 650, 250], [400, 380, 650, 250], [400, 120, 400, 380]].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} strokeOpacity="0.5" />
          ))}
          {[[150, 250], [400, 120], [400, 380], [650, 250]].map(([x, y], i) => (
            <rect key={i} x={x - 22} y={y - 22} width="44" height="44" stroke={i === 1 ? B : S} />
          ))}
        </g>
      )}
      {variant === 'interface' && (
        <g fill="none" stroke={S}>
          <rect x="160" y="80" width="480" height="340" />
          <line x1="160" y1="120" x2="640" y2="120" />
          <rect x="190" y="150" width="140" height="240" stroke={F} />
          <rect x="350" y="150" width="260" height="90" stroke={B} strokeOpacity="0.7" />
          <rect x="350" y="260" width="120" height="130" stroke={F} />
          <rect x="490" y="260" width="120" height="130" stroke={F} />
          <circle cx="186" cy="100" r="4" fill={S} stroke="none" />
        </g>
      )}
      {variant === 'mechanism' && (
        <g fill="none" stroke={S}>
          <circle cx="300" cy="250" r="110" strokeDasharray="4 6" />
          <circle cx="300" cy="250" r="70" />
          <circle cx="300" cy="250" r="14" fill="#fff" stroke="none" />
          <circle cx="520" cy="250" r="70" stroke={B} strokeOpacity="0.8" strokeDasharray="4 6" />
          <circle cx="520" cy="250" r="34" />
          <line x1="300" y1="250" x2="520" y2="250" strokeOpacity="0.4" />
        </g>
      )}
      {variant === 'orbit' && (
        <g fill="none" stroke={S}>
          {[0, 60, 120].map((r) => <ellipse key={r} cx="400" cy="250" rx="210" ry="70" transform={`rotate(${r} 400 250)`} stroke={r === 60 ? B : S} strokeOpacity={r === 60 ? 0.9 : 0.4} />)}
          <circle cx="400" cy="250" r="22" fill="#fff" stroke="none" />
        </g>
      )}
    </svg>
  )
}
