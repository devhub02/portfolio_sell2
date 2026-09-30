/** Static silhouette shown when WebGL is unavailable. Swap for a real portrait if desired. */
export default function HeroFallback() {
  return (
    <svg viewBox="0 0 400 500" className="h-full max-h-[80vh] w-auto opacity-90" role="img" aria-label="Portrait silhouette of Devendra Kumar">
      <defs>
        <radialGradient id="hf" cx="50%" cy="35%" r="60%">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#hf)" />
      <ellipse cx="200" cy="190" rx="70" ry="88" fill="#0b0b0f" stroke="#fff" strokeOpacity="0.4" />
      <path d="M40 500 C50 360 130 320 200 320 C270 320 350 360 360 500 Z" fill="#0b0b0f" stroke="#fff" strokeOpacity="0.4" />
    </svg>
  )
}
