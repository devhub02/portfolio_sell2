export type VisualVariant = 'route' | 'nodes' | 'interface' | 'mechanism' | 'orbit'

export interface Project {
  id: string
  number: string
  code: string
  name: string
  category: string
  year: string
  type: string
  stack: string[]
  status: string
  description: string
  features?: string[]
  variant: VisualVariant
  featured?: boolean
  /** Set true for slots that hold no real project yet. */
  placeholder?: boolean
  /** Optional real media: place files in src/assets and import, or use public/ paths. */
  image?: string
  link?: { label: string; href: string }
  detail: {
    overview: string
    problem: string
    solution: string
    process: string
    result: string
  }
}

const placeholderDetail = (what: string) => ({
  overview: `Reserved slot for ${what}. Replace this entry in src/data/projects.ts with a real project.`,
  problem: 'To be documented.',
  solution: 'To be documented.',
  process: 'To be documented.',
  result: 'To be documented.',
})

export const projects: Project[] = [
  {
    id: 'tripg',
    number: '01',
    code: 'TG-01',
    name: 'TRIPG',
    category: 'AI TRAVEL PLATFORM',
    year: '2026',
    type: 'AI PRODUCT',
    stack: ['React', 'TypeScript', 'AI'],
    status: 'BUILDING',
    featured: true,
    description:
      'An AI-powered travel planning and budget optimization platform designed to bring trip planning, destination discovery, route planning and intelligent travel assistance into one experience.',
    features: [
      'AI TRIP PLANNING',
      'SMART BUDGET ESTIMATION',
      'ROUTE PLANNING',
      'DESTINATION DISCOVERY',
      'HOTEL RECOMMENDATIONS',
      'AI TRAVEL ASSISTANT',
      'VOICE AI',
    ],
    variant: 'route',
    detail: {
      overview:
        'TripG is a technology-driven travel product from Gaya. I contribute across product vision, startup business model, UI/UX, technical analysis and software development.',
      problem:
        'Planning a trip means juggling itineraries, budgets, maps, stays and recommendations across many disconnected tools.',
      solution:
        'One experience where an AI assistant plans the trip, estimates and optimizes the budget, lays out routes, surfaces destinations and hotels, and can be spoken to.',
      process:
        'Product planning and vision → business model → UI/UX in Figma → React + TypeScript implementation with AI-assisted development.',
      result: 'In active development. Status: BUILDING.',
    },
  },
  {
    id: 'ai-tools',
    number: '02',
    code: 'AI-02',
    name: 'AI / DEVELOPER TOOLS',
    category: 'AI EXPERIMENTS',
    year: '2026',
    type: 'PLACEHOLDER',
    stack: ['AI', 'Automation'],
    status: 'SLOT OPEN',
    placeholder: true,
    description: 'AI-powered experiments, automation tools, developer utilities and intelligent interfaces.',
    variant: 'nodes',
    detail: placeholderDetail('AI and developer-tool projects'),
  },
  {
    id: 'ui-ux',
    number: '03',
    code: 'UX-03',
    name: 'UI / UX EXPERIMENTS',
    category: 'INTERFACE DESIGN',
    year: '2026',
    type: 'PLACEHOLDER',
    stack: ['Figma', 'React'],
    status: 'SLOT OPEN',
    placeholder: true,
    description: 'Interactive interfaces, prototypes and motion experiments.',
    variant: 'interface',
    detail: placeholderDetail('UI/UX prototypes'),
  },
  {
    id: 'engineering',
    number: '04',
    code: 'EN-04',
    name: 'ENGINEERING / ROBOTICS',
    category: 'MECHANICAL + AUTOMATION',
    year: '2026',
    type: 'PLACEHOLDER',
    stack: ['SolidWorks', 'MATLAB'],
    status: 'SLOT OPEN',
    placeholder: true,
    description: 'Technical projects involving engineering, simulation, robotics or automation.',
    variant: 'mechanism',
    detail: placeholderDetail('engineering and robotics projects'),
  },
  {
    id: 'creative',
    number: '05',
    code: 'CR-05',
    name: 'CREATIVE EXPERIMENTS',
    category: '3D + MOTION',
    year: '2026',
    type: 'PLACEHOLDER',
    stack: ['Three.js', 'R3F'],
    status: 'SLOT OPEN',
    placeholder: true,
    description: '3D, animation, visual experiments and experimental web experiences.',
    variant: 'orbit',
    detail: placeholderDetail('3D and creative experiments'),
  },
]
