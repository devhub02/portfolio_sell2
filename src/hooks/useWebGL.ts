export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export const MODEL_URL = `${import.meta.env.BASE_URL}models/devendra.glb`

/** Resolves true only if a real GLB is served (dev/SPA fallbacks return HTML). */
export async function probeModel(): Promise<boolean> {
  try {
    const res = await fetch(MODEL_URL, { method: 'HEAD' })
    const type = res.headers.get('content-type') ?? ''
    return res.ok && !type.includes('text/html')
  } catch {
    return false
  }
}
