import type { SkillGroup } from '@/types';

/**
 * One group per side of the work, in the same order the bio names them:
 * AI applications, full-stack web, Python automation, then language and
 * translation. Tools are only listed when a project or real work backs
 * them. The AI group's stack (LangChain, ChromaDB, watsonx.ai, Sentence
 * Transformers) is what Ihsan builds RAG with today, through IBM's
 * Coursera coursework.
 *
 * `brand` values are simple-icons slugs. Skills with no brand mark (a
 * technique or a language pair rather than a product) omit it and
 * render as text.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    category: 'AI Applications',
    icon: 'Sparkles',
    skills: [
      { name: 'RAG' },
      { name: 'Agentic AI' },
      { name: 'LangChain', brand: 'langchain' },
      { name: 'ChromaDB' },
      { name: 'IBM watsonx.ai' },
      { name: 'Sentence Transformers' },
      { name: 'Hugging Face', brand: 'huggingface' },
      { name: 'OpenRouter', brand: 'openrouter' },
      { name: 'Prompt engineering' },
    ],
  },
  {
    category: 'Full-Stack Web',
    icon: 'LayoutDashboard',
    skills: [
      { name: 'React', brand: 'react' },
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'Next.js', brand: 'nextdotjs' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
      { name: 'Vite', brand: 'vite' },
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'Cloudflare Workers', brand: 'cloudflare' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'Python & Automation',
    icon: 'Workflow',
    skills: [
      { name: 'Python', brand: 'python' },
      { name: 'Selenium', brand: 'selenium' },
      { name: 'pandas', brand: 'pandas' },
      { name: 'NumPy', brand: 'numpy' },
      { name: 'Pillow' },
      { name: 'pytest', brand: 'pytest' },
      { name: 'Scheduled jobs' },
      { name: 'Email pipelines' },
    ],
  },
  {
    category: 'Language & Translation',
    icon: 'Languages',
    skills: [
      { name: 'Arabic → Malay' },
      { name: 'Arabic → English' },
      { name: 'Arabic NLP' },
      { name: 'Arabic morphology' },
      { name: 'Tokenization' },
      { name: 'Corpus building' },
    ],
  },
];
