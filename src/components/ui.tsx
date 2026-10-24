import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { Stat } from '../data/portfolio';

/**
 * Renders any text that contains `[ADD: ...]` tokens as a styled dashed
 * placeholder chip so the owner can immediately spot missing fields.
 */
export const SmartText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const parts = text.split(/(\[ADD:[^\]]+\])/g);
  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.startsWith('[ADD:') && part.endsWith(']') ? (
          <span key={idx} className="placeholder-chip">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </span>
  );
};

/**
 * Highlights exact phrases (from `highlights`) inside a locked paragraph
 * without altering a single character of the original text.
 */
export const HighlightedParagraph: React.FC<{
  text: string;
  highlights: string[];
  className?: string;
}> = ({ text, highlights, className }) => {
  if (!highlights.length) return <p className={className}>{text}</p>;

  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');
  const segments = text.split(regex);

  return (
    <p className={className}>
      {segments.map((seg, i) =>
        highlights.includes(seg) ? (
          <span
            key={i}
            className="font-medium text-gold-300 underline decoration-gold-400/50 decoration-1 underline-offset-4"
          >
            {seg}
          </span>
        ) : (
          <React.Fragment key={i}>{seg}</React.Fragment>
        )
      )}
    </p>
  );
};

/**
 * Highlights financial figures and key terms that already exist inside a
 * project summary or step paragraph without changing any words or numbers.
 */
export const EmphasizedProjectParagraph: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className }) => {
  const tokenRegex =
    /(\$CMRY|Rp6\.38 trillion|Rp10\.72 trillion|CAGR 18\.91%|Rp3\.78 trillion|Rp427 million|2026E - 2030E|2026E – 2030E|2022–2025|2026–2030|1\.5%|8\.9%|8\.50%|4\.0%|Rp4,984|Rp4,210|\+18\.39%|BUY)/g;
  const parts = text.split(tokenRegex);

  return (
    <p className={className}>
      {parts.map((part, idx) => {
        if (part === 'BUY') {
          return (
            <span
              key={idx}
              className="inline-flex items-center rounded border border-gold-400/45 bg-gold-400/15 px-1.5 py-0.5 text-xs font-semibold tracking-wider text-gold-300 tabular"
            >
              {part}
            </span>
          );
        }
        if (tokenRegex.test(part)) {
          tokenRegex.lastIndex = 0;
          return (
            <strong key={idx} className="font-semibold text-gold-300 tabular">
              {part}
            </strong>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </p>
  );
};

/**
 * Count-up numeric display that animates once when scrolled into view and
 * respects `prefers-reduced-motion`. Falls back to the exact string value.
 */
export const CountUpStat: React.FC<{
  value: string;
  count?: Stat['count'];
  className?: string;
}> = ({ value, count, className }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!count || prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const duration = 650;
    const start = performance.now();
    const decimals = count.decimals ?? 0;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = count.to * eased;

      if (progress < 1) {
        const formatted = current.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        setDisplay(`${count.prefix ?? ''}${formatted}${count.suffix ?? ''}`);
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [count, inView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={`tabular ${className ?? ''}`}>
      {display}
    </span>
  );
};

export const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  intro?: string;
}> = ({ eyebrow, title, intro }) => (
  <div className="max-w-2xl">
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
      <span className="h-px w-7 bg-gold-400/70" aria-hidden="true" />
      <span>{eyebrow}</span>
    </div>
    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
      {title}
    </h2>
    {intro && <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>}
  </div>
);
