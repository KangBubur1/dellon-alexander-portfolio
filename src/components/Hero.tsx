import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileDown, MapPin, TrendingUp } from 'lucide-react';
import { hero, profile } from '../data/portfolio';
import { CountUpStat } from './ui';

export const Hero: React.FC<{ onOpenFeatured: () => void }> = ({ onOpenFeatured }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden bg-obsidian-950 pt-28 pb-18 text-ink sm:pt-34 sm:pb-24"
    >
      {/* Subtle architectural grid & soft champagne radial glow */}
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-36 right-1/4 h-112 w-112 rounded-full bg-gold-400/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left column: 6-second clarity */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-gold-300">
                <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
                {profile.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                {profile.location}
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {profile.name} · {hero.eyebrow}
            </p>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              {hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={hero.primaryCta.href}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-obsidian-950 shadow-sm transition-all hover:bg-gold-300"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-850 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
              >
                <FileDown className="h-4 w-4 text-gold-400" aria-hidden="true" />
                <span>{hero.secondaryCta.label}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-12 items-center px-3 py-3 text-sm font-medium text-ink-muted underline decoration-gold-400/50 underline-offset-4 transition-colors hover:text-gold-300"
              >
                Get in touch →
              </a>
            </div>
          </motion.div>

          {/* Right column: Analyst Research Brief card with thin-line valuation chart */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-obsidian-700 bg-obsidian-850/95 p-6 shadow-2xl shadow-black/60 backdrop-blur-sm sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-obsidian-700 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                    {hero.snapshot.title}
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-xl font-semibold text-ink">
                      {hero.snapshot.ticker}
                    </span>
                    <span className="text-xs text-ink-muted">{hero.snapshot.company}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-gold-400/45 bg-gold-400/15 px-2.5 py-1 text-xs font-semibold tracking-wider text-gold-300">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {hero.snapshot.verdict}
                </span>
              </div>

              {/* Thin-line SVG illustration: Revenue trajectory FY22A -> FY25A -> FY30E */}
              <div className="mt-4 rounded-xl border border-obsidian-700 bg-obsidian-950/90 p-4">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>Revenue trajectory (2022A – 2030E)</span>
                  <span className="font-medium text-gold-300 tabular"> Rp6.38T → Rp20.92T</span>
                </div>
                <svg
                  viewBox="0 0 320 76"
                  className="mt-2 h-16 w-full overflow-visible"
                  role="img"
                  aria-label="Revenue growth line from Rp6,378,348 million in 2022A to Rp10,724,003 million in 2025A and projected Rp20,918,681 million in 2030E"
                >
                  <defs>
                    <linearGradient id="cmryArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e2b86b" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#e2b86b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="8"
                    y1="62"
                    x2="312"
                    y2="62"
                    stroke="rgba(148,163,184,0.16)"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="8"
                    y1="16"
                    x2="312"
                    y2="16"
                    stroke="rgba(148,163,184,0.16)"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 12 60 C 60 54, 110 46, 150 39 C 205 29, 260 20, 308 12 L 308 66 L 12 66 Z"
                    fill="url(#cmryArea)"
                  />
                  <motion.path
                    d="M 12 60 C 60 54, 110 46, 150 39 C 205 29, 260 20, 308 12"
                    fill="none"
                    stroke="#e2b86b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                  <circle cx="12" cy="60" r="3.5" fill="#07090e" stroke="#e2b86b" strokeWidth="2" />
                  <circle cx="150" cy="39" r="3.5" fill="#07090e" stroke="#e2b86b" strokeWidth="2" />
                  <circle cx="308" cy="12" r="4" fill="#e2b86b" />
                </svg>
                <div className="mt-1 flex justify-between text-[11px] text-ink-muted tabular">
                  <span>2022A: Rp6.38T</span>
                  <span>2025A: Rp10.72T</span>
                  <span>2030E: Rp20.92T</span>
                </div>
              </div>

              {/* DCF output rows */}
              <dl className="mt-4 divide-y divide-obsidian-700/80">
                {hero.snapshot.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
                    <dt className="text-ink-muted">{row.label}</dt>
                    <dd className="font-display text-base font-semibold text-ink">
                      <CountUpStat value={row.value} count={row.count} />
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex items-center justify-between border-t border-obsidian-700 pt-4 text-xs text-ink-muted">
                <span className="tabular">{hero.snapshot.footnote}</span>
                <button
                  type="button"
                  onClick={onOpenFeatured}
                  className="inline-flex shrink-0 items-center gap-1 font-semibold text-gold-300 transition-colors hover:text-gold-400"
                >
                  <span>Full 5-step model</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
