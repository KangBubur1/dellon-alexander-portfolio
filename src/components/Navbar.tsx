import React, { useEffect, useState } from 'react';
import { FileDown, Menu, X } from 'lucide-react';
import { nav, profile } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-obsidian-700/80 bg-obsidian-950/88 backdrop-blur-xl shadow-lg shadow-black/40'
          : 'bg-obsidian-950/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-3 text-ink"
          aria-label={`${profile.name} — Back to top`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-400/40 bg-obsidian-850 font-display text-sm font-semibold tracking-wider text-gold-300 transition-colors group-hover:border-gold-300">
            {profile.initials}
          </span>
          <div className="flex flex-col">
            <span className="font-display text-base font-medium tracking-tight text-ink">
              {profile.name}
            </span>
            <span className="text-[11px] tracking-wide text-ink-muted">
              {profile.targetRole}
            </span>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-gold-300'
                    : 'text-ink-muted hover:bg-obsidian-850 hover:text-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-400"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-obsidian-700 bg-obsidian-850 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
          >
            <FileDown className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            <span>CV</span>
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-lg bg-gold-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-obsidian-950 transition-all hover:bg-gold-300"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-sheet"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-obsidian-700 bg-obsidian-850 text-ink hover:bg-obsidian-800 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-sheet"
          className="border-t border-obsidian-700 bg-obsidian-950 px-5 pt-3 pb-6 shadow-2xl md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-11 items-center rounded-lg px-3 text-base font-medium ${
                  activeId === item.id
                    ? 'bg-obsidian-850 text-gold-300'
                    : 'text-ink hover:bg-obsidian-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-obsidian-700 pt-4">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-obsidian-700 bg-obsidian-850 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink"
            >
              <FileDown className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <span>Download CV</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-400 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian-950"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
