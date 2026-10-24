# Dellon Alexander — Personal Portfolio Website

Static portfolio website for **Dellon Alexander** (Financial Management undergraduate at Universitas Tarumanagara), positioned for **Credit Analyst** roles at banks.

Built with **Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + Radix UI Dialog**.

---

## 1. Run Locally & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Type-check and build production static bundle (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## 2. How to Customise Content (Single Data File)

**All text, stats, biography, projects, experience, skills, and contact details live in one file:**

👉 [`src/data/portfolio.ts`](src/data/portfolio.ts)

You never need to edit React components to update your content.

### Filling in `[ADD: ...]` Placeholders
Search `src/data/portfolio.ts` for `[ADD:` and replace each placeholder with your final text.

### Adding a New Project
Append an object to the `projects` array in `src/data/portfolio.ts`:

```ts
{
  slug: 'new-project-slug',
  title: 'Your Exact Project Title',
  category: 'Credit Analysis',
  featured: false,
  period: 'Oct 2026',
  tags: ['Financial Ratios', 'Cash Flow', 'Credit Risk'],
  highlight: {
    value: 'AAA',
    label: 'Internal Credit Rating',
    chip: 'INVESTMENT GRADE',
  },
  stats: [
    { label: 'DSCR', value: '2.4x' },
    { label: 'Net Debt / EBITDA', value: '0.8x' },
  ],
  summary: [
    {
      label: 'Background',
      paragraphs: ['Your exact background text...'],
    },
    {
      label: 'Result',
      paragraphs: ['Your exact result text...'],
    },
  ],
  cardPreview: 'Result',
  detail: {
    label: 'Detail',
    intro: ['Your methodology overview...'],
    stepsLabel: 'Steps',
    steps: ['Step 1...', 'Step 2...'],
  },
  artifacts: [
    { label: 'Download Credit Memo (PDF)', href: '/credit-memo.pdf' },
  ],
}
```

### Replacing Your Photo & CV PDF
1. **CV PDF**: Replace [`public/cv.pdf`](public/cv.pdf) with your real resume PDF (keep the filename `cv.pdf`).
2. **Portrait Photo**: Place your photo in `public/photo.webp` and set `photo: '/photo.webp'` inside `profile` in `src/data/portfolio.ts`.

---

## 3. Design System

Defined in [`src/index.css`](src/index.css):

- **Mood**: Quiet institutional luxury (private-bank research memo aesthetic).
- **Colour Tokens**:
  - `--color-navy-950`: `#07111f` / `--color-navy-900`: `#0b1b33` (deep navy authority surfaces)
  - `--color-ivory-50`: `#fcfaf5` / `--color-ivory-100`: `#f7f4ec` (warm editorial reading surfaces)
  - `--color-ink`: `#0f1a2b` / `--color-ink-muted`: `#44506a` (WCAG AA+ body text)
  - `--color-gold-400`: `#c9a96e` (accent on navy) / `--color-gold-700`: `#7e602e` (accent on ivory)
- **Typography**:
  - Display serif: `Fraunces Variable` (`--font-display`)
  - Body & tabular figures: `Inter Variable` (`--font-sans`, `font-variant-numeric: tabular-nums`)
- **Motion**:
  - 200–550ms ease-out transitions, SVG chart path draw, tabular number count-up, cursor-following gold card spotlight.
  - Respects `prefers-reduced-motion: reduce`.

---

## 4. Deployment

The build output (`dist/`) is 100% static and ready for zero-config deployment:

- **Vercel**: Import repository → Framework Preset: `Vite` → Build command: `npm run build` → Output directory: `dist`.
- **Netlify**: Import repository → Build command: `npm run build` → Publish directory: `dist`.
- **GitHub Pages**: Set `base: '/<repo-name>/'` in `vite.config.ts`, run `npm run build`, and deploy the `dist/` folder via GitHub Actions (`actions/deploy-pages`).
