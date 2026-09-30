import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, PerformanceMonitor, useGLTF, Bounds } from '@react-three/drei'
import * as THREE from 'three'
import { MODEL_URL, probeModel } from '../hooks/useWebGL'

interface Props {
  mobile: boolean
  reduceMotion: boolean
}

/* ---------- Model sources ---------- */

/** Your GLB. Auto-centred and scaled to a fixed height so any export fits the frame. */
function GlbModel() {
  const { scene } = useGLTF(MODEL_URL)
  const fitted = useMemo(() => {
    const s = scene.clone(true)
    const box = new THREE.Box3().setFromObject(s)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const k = 3.2 / Math.max(size.y, 0.001)
    s.scale.setScalar(k)
    s.position.set(-center.x * k, -center.y * k, -center.z * k)
    s.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) { m.castShadow = true; m.receiveShadow = true }
    })
    return s
  }, [scene])
  return <primitive object={fitted} />
}

/** Placeholder bust used until public/models/devendra.glb exists. */
function ProceduralBust() {
  const body = useMemo(() => {
    const pts = [
      [0, -1.7], [0.95, -1.7], [1.2, -1.4], [1.28, -1.05], [1.0, -0.82], [0.4, -0.7], [0.27, -0.45], [0.25, -0.2], [0, -0.2],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(pts, 32, 0, Math.PI * 2)
  }, [])
  return (
    <group position={[0, 0.25, 0]} scale={0.9}>
      <mesh geometry={body} scale={[1.1, 1, 0.6]} castShadow>
        <meshStandardMaterial color="#0a0a0c" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh geometry={body} scale={[1.115, 1.005, 0.61]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, 0.3, 0.02]} scale={[0.6, 0.76, 0.66]} castShadow>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial color="#0c0c10" roughness={0.3} metalness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.3, 0.02]} scale={[0.615, 0.775, 0.675]}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

/* ---------- Scene pieces ---------- */

function Particles({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 3
      const t = Math.random() * Math.PI * 2
      a[i * 3] = Math.cos(t) * r
      a[i * 3 + 1] = (Math.random() - 0.5) * 6
      a[i * 3 + 2] = Math.sin(t) * r * 0.6 - 0.5
    }
    return a
  }, [count])
  useFrame((_, dt) => {
    if (!ref.current || still) return
    ref.current.rotation.y += dt * 0.03
    ref.current.position.y = Math.sin(performance.now() / 4000) * 0.08
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#9db8ff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Rig({ children, still }: { children: ReactNode; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  const spin = useRef(0)
  useFrame((state, dt) => {
    if (!g.current) return
    if (!still) spin.current += dt * 0.18
    const { x, y } = state.pointer
    // slow auto-rotation, swaying, plus subtle pointer response
    const targetY = Math.sin(spin.current) * 0.55 + x * 0.35
    const targetX = -y * 0.12
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, targetY, 3, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, targetX, 3, dt)
    // subtle camera drift
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x * 0.35, 2, dt)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.2 + y * 0.15, 2, dt)
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <group position={[0, -0.25, 0]} scale={0.78}>
      <group ref={g}>{children}</group>
    </group>
  )
}

function Scene({ mobile, still, hasGlb }: { mobile: boolean; still: boolean; hasGlb: boolean }) {
  const [low, setLow] = useState(false)
  const lite = mobile || low
  return (
    <>
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} castShadow={!lite} />
      {/* blue rim lights */}
      <pointLight position={[-4, 1.5, -2]} intensity={lite ? 18 : 40} color="#3b82f6" distance={12} />
      <pointLight position={[4, -0.5, -3]} intensity={lite ? 10 : 22} color="#8fb0ff" distance={12} />
      {!lite && <spotLight position={[0, 5, -3]} angle={0.5} penumbra={1} intensity={30} color="#ffffff" />}
      <Rig still={still}>
        <Suspense fallback={null}>
          {hasGlb ? (
            <ModelBoundary fallback={<ProceduralBust />}>
              <Bounds fit clip observe margin={1.1}><GlbModel /></Bounds>
            </ModelBoundary>
          ) : (
            <ProceduralBust />
          )}
        </Suspense>
      </Rig>
      <Particles count={lite ? 90 : 320} still={still} />
      {!lite && <ContactShadows position={[0, -1.7, 0]} opacity={0.5} scale={9} blur={3} far={3} color="#000" />}
    </>
  )
}

/* ---------- Public component ---------- */

export default function ModelViewer({ mobile, reduceMotion }: Props) {
  const [hasGlb, setHasGlb] = useState<boolean | null>(null)
  useEffect(() => { probeModel().then(setHasGlb) }, [])

  return (
    <Canvas
      shadows={!mobile}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.2, mobile ? 6.4 : 5.2], fov: 38 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden
    >
      {hasGlb !== null && <Scene mobile={mobile} still={reduceMotion} hasGlb={hasGlb} />}
    </Canvas>
  )
}
