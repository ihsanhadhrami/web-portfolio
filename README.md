# Portfolio v2

A production-ready personal portfolio for a modern web developer and digital
product engineer. Built with a dark-first, minimal aesthetic and a
data-driven architecture so content is trivial to maintain.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 6** — fast dev server and optimized builds
- **Tailwind CSS v4** — design tokens via CSS variables, dark-first theme
- **shadcn/ui** conventions — `cn`, `class-variance-authority`, Radix `Slot`
- **Framer Motion** — subtle, reduced-motion-aware animations
- **React Router 7** — code-split routes
- **Lucide** — icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server                     |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Lint the project with ESLint             |
| `npm run format`       | Format the project with Prettier         |
| `npm run typecheck`    | Type-check without emitting              |

## Project structure

```
src/
├── app/              App root, router, entry point
├── assets/           Static images, icons, logos
├── components/
│   ├── ui/           Reusable primitives (Button, Card, Badge, …)
│   ├── layout/       Navbar, Footer, ThemeProvider, RootLayout
│   ├── sections/     Composed page sections (Hero, ContactForm, …)
│   ├── cards/        Domain cards (ProjectCard, ServiceCard, …)
│   └── animations/   Motion wrappers (Reveal, Stagger)
├── constants/        Site-wide config (nav, socials, metadata)
├── data/             Content: projects, services, skills, testimonials…
├── hooks/            Reusable hooks (useTheme, useReducedMotion, …)
├── lib/              Utilities (cn, motion tokens, theme context)
├── pages/            Route-level pages
├── styles/           Global CSS and theme tokens
└── types/            Shared domain types
```

## Editing content

All content lives in `src/data/*` and `src/constants/site.ts`. The UI renders
entirely from these files — add or edit a project in `src/data/projects.ts`
and it appears everywhere automatically (home grid, projects page, detail
route, related work).

## Deployment (Netlify)

`netlify.toml` is preconfigured with the build command, publish directory,
SPA redirect, and sensible security headers. Push to a connected repository or
run `netlify deploy`.

Configure the contact form by setting `VITE_CONTACT_ENDPOINT` (see
`.env.example`). Without it, the form simulates a successful submission for
local development.
