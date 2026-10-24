import React from 'react';
import { proofBar } from '../data/portfolio';
import { CountUpStat } from './ui';

export const ProofBar: React.FC = () => {
  return (
    <section
      aria-label="Key highlights"
      className="border-y border-obsidian-700/80 bg-obsidian-900 text-ink"
    >
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-obsidian-700/80">
          {proofBar.map((item, idx) => (
            <div key={item.label} className={idx > 0 ? 'lg:pl-6' : ''}>
              <dd className="font-display text-2xl font-semibold tracking-tight text-gold-300 sm:text-3xl">
                <CountUpStat value={item.value} count={item.count} />
              </dd>
              <dt className="mt-1 text-sm font-medium text-ink">{item.label}</dt>
              {item.sub && <p className="mt-0.5 text-xs text-ink-muted">{item.sub}</p>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
