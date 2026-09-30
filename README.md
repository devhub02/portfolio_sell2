# DEVENDRA KUMAR — Cinematic Developer Portfolio

**AI Developer // Creative Technologist.** A dark, cinematic portfolio built around a 3D hero, scroll-driven motion and technical typography.

> I build digital experiences where code, AI and design meet.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (page transitions, scroll and reveal animation)
- Three.js, React Three Fiber, Drei (3D hero)
- Orbitron, Space Grotesk, JetBrains Mono (self-hosted via Fontsource)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requires Node 20+.

## Adding your 3D model

Put your GLB at `public/models/devendra.glb`. The hero detects it automatically, then centres and scales it to fit. Until the file exists, a procedural placeholder bust is shown.

Optimise it first (target under 3 MB):

```bash
npx gltf-transform optimize devendra.glb devendra.glb --compress draco --texture-compress webp
```

If WebGL is unavailable, a static silhouette is shown instead (`src/components/HeroFallback.tsx`).

## Editing content

All content lives in `src/data/`, so no component changes are needed.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, role, email, GitHub / LinkedIn / X links, hero metadata, marquee words, journey timeline, AI tool nodes |
| `projects.ts` | Project cards and detail pages. Set `image` to real media and `placeholder: false` (or remove it) per project |
| `skills.ts` | Skill Matrix categories and skills |

Social links are shown as labelled buttons (VIEW GITHUB →, LINKEDIN →, X →), never as raw URLs.

## Project structure

```text
src/
  components/   Hero, ModelViewer, ProjectShowcase, ProjectCard, ProjectDetail,
                About, Skills, AIStack, Timeline, Contact, Footer, Navbar,
                CustomCursor, Loader, Marquee, Background, Reveal, Magnetic
  data/         profile.ts, projects.ts, skills.ts
  hooks/        useMedia.ts, useWebGL.ts
  App.tsx
public/models/  devendra.glb goes here
```

## Performance and accessibility

- The 3D viewer is lazy-loaded in its own chunk and starts after the loader.
- Fewer particles, no shadows and a lower pixel ratio on mobile, and an automatic quality drop when the frame rate falls.
- Custom cursor is desktop (fine pointer) only.
- `prefers-reduced-motion` is respected: rotation, marquee and transitions are toned down.
- Semantic landmarks, keyboard navigation, visible focus states, a skip link, and Esc to close the project view.

## Deploying

`npm run build` outputs a static site in `dist/`. Host it on Vercel, Netlify, GitHub Pages or Cloudflare Pages. For a sub-path deployment, set `base` in `vite.config.ts`.

## Contact

Devendra Kumar — Gaya, India · [GitHub](https://github.com/devhub02) · [LinkedIn](https://www.linkedin.com/in/devhub02/) · [X](https://x.com/devhub02)
