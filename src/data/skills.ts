export interface SkillCategory {
  id: string
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: '01',
    title: 'DEVELOPMENT',
    skills: ['JavaScript', 'TypeScript', 'React', 'React Native', 'HTML', 'CSS', 'Python', 'Node.js', 'Git', 'GitHub', 'REST APIs'],
  },
  {
    id: '02',
    title: 'ARTIFICIAL INTELLIGENCE',
    skills: ['ChatGPT', 'Claude', 'Gemini', 'Antigravity', 'Prompt Engineering', 'AI-assisted Development', 'AI Product Development'],
  },
  {
    id: '03',
    title: 'DESIGN',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'Motion Design', '3D Web', 'Adobe Software'],
  },
  {
    id: '04',
    title: 'CREATIVE TECHNOLOGY',
    skills: ['Three.js', 'React Three Fiber', 'GLB / GLTF', 'Web Animation', 'Interactive Experiences', 'Video Production & Editing'],
  },
  {
    id: '05',
    title: 'ENGINEERING',
    skills: ['Mechanical Design', 'CAD Drafting', 'SolidWorks 3D Modeling', 'MATLAB', 'Engineering Analysis', 'Product Development'],
  },
  {
    id: '06',
    title: 'PRODUCT & BUSINESS',
    skills: ['Project Management', 'Technical Analysis', 'System Design', 'Startup Vision', 'Business Model Development'],
  },
]
