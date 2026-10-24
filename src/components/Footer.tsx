import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-obsidian-700/80 bg-obsidian-950 py-8 text-ink-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}, {profile.university}.
        </p>

        <a
          href="#top"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-obsidian-700 bg-obsidian-850 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-gold-300 transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};
