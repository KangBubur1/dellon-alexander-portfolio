import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, FileDown, Mail, MapPin } from 'lucide-react';
import { contact, profile } from '../data/portfolio';

export const ContactSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement('input');
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-obsidian-700/80 bg-obsidian-900 py-20 text-ink sm:py-26"
    >
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-obsidian-700 bg-obsidian-850/95 p-8 shadow-2xl shadow-black/50 sm:p-12"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-3.5 py-1 text-xs font-semibold text-gold-300">
              <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
              {contact.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          <h2
            id="contact-heading"
            className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {contact.title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {contact.line}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {/* Email mailto link */}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gold-400 px-5 py-3 text-sm font-semibold text-obsidian-950 transition-colors hover:bg-gold-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{profile.email}</span>
            </a>

            {/* Copy-to-clipboard button with toast feedback */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-950 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-gold-300" aria-hidden="true" />
                  <span className="text-gold-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  <span>Copy email</span>
                </>
              )}
            </button>

            {/* LinkedIn */}
            <a
              href={profile.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-950 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
            >
              <span>{profile.linkedin.label}</span>
              <ArrowUpRight className="h-4 w-4 text-gold-400" aria-hidden="true" />
            </a>

            {/* CV Download */}
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-950 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-gold-400/50 hover:bg-obsidian-800"
            >
              <FileDown className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Live region toast for screen readers */}
          <div aria-live="polite" className="sr-only">
            {copied ? `Email ${profile.email} copied to clipboard.` : ''}
          </div>
        </motion.div>
      </div>

      {/* Floating Toast Notification */}
      {copied && (
        <div
          role="status"
          className="fixed right-6 bottom-6 z-50 flex items-center gap-2.5 rounded-xl border border-gold-400/45 bg-obsidian-950 px-4 py-3 text-sm font-medium text-ink shadow-2xl"
        >
          <Check className="h-4 w-4 text-gold-300" aria-hidden="true" />
          <span>Copied {profile.email} to clipboard</span>
        </div>
      )}
    </section>
  );
};
