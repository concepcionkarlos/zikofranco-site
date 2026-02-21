'use client';

/**
 * app/page.tsx
 * - Main website page (public)
 * - Includes Booking form that POSTs to /api/booking
 * - Responsive top nav (desktop + mobile hamburger)
 */

import { useMemo, useState, type FormEvent } from 'react';

const LINKS = {
  spotify: 'https://open.spotify.com/intl-es/artist/0xyaYBhWaHUExO14cfrdqL',
  appleMusic: 'https://music.apple.com/us/artist/zikopoly/1733674076?l=es-MX',
  youtube: 'https://youtube.com/@zikofranco6572?si=65LoHlxoB9YqgJzz',
  soundcloud: 'https://on.soundcloud.com/JtML242w1RrNaqUWBO',
};

type BookingPayload = {
  name: string;
  email: string;
  cityVenue?: string;
  eventDate?: string; // YYYY-MM-DD from <input type="date">
  details?: string;
  optIn?: boolean; // marketing opt-in
};

export default function Page() {
  // =========================
  // STATE
  // =========================

  // Mobile menu state (opens/closes dropdown on small screens)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Booking form state
  const [form, setForm] = useState<BookingPayload>({
    name: '',
    email: '',
    cityVenue: '',
    eventDate: '',
    details: '',
    optIn: false,
  });

  // Submit status state
  const [status, setStatus] = useState<
    | { type: 'idle' }
    | { type: 'loading' }
    | { type: 'ok'; msg: string }
    | { type: 'err'; msg: string }
  >({ type: 'idle' });

  // Footer year (memoized)
  const year = useMemo(() => new Date().getFullYear(), []);

  // =========================
  // SUBMIT HANDLER
  // =========================
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name?.trim() || !form.email?.trim()) {
      setStatus({ type: 'err', msg: 'Please enter your name and email.' });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Request failed');
      }

      setStatus({
        type: 'ok',
        msg: "Request received. We'll reply by email shortly.",
      });

      // Reset form after success
      setForm({
        name: '',
        email: '',
        cityVenue: '',
        eventDate: '',
        details: '',
        optIn: false,
      });
    } catch {
      setStatus({
        type: 'err',
        msg: 'Something went wrong. Please try again in a moment.',
      });
    }
  };

  return (
    <main className="min-h-screen text-zinc-100 bg-zinc-950">
      {/* =========================
          TOP NAV (PRO + MOBILE MENU)
          - Desktop: inline links + CTA + Admin
          - Mobile: Admin visible + hamburger menu
         ========================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* BRAND / LOGO (left) */}
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ziko Franco"
              width={100}
              height={100}
              className="h-10 w-10 object-contain"
              draggable={false}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">ZIKO FRANCO</div>
              <div className="text-xs text-zinc-400">Miami, FL</div>
            </div>
          </a>

          {/* DESKTOP NAV (>= sm) */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#bio" className="text-zinc-200 hover:text-white">
              Bio
            </a>
            <a href="#music" className="text-zinc-200 hover:text-white">
              Music
            </a>
            <a href="#booking" className="text-zinc-200 hover:text-white">
              Booking
            </a>

            {/* Primary CTA (desktop) */}
            <a
              href="#booking"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-white/40 whitespace-nowrap"
            >
              Book the Show
            </a>

            {/* Admin (desktop) */}
            <a
              href="/admin"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-white/40 whitespace-nowrap"
            >
              Admin
            </a>
          </nav>

          {/* MOBILE ACTIONS (< sm) */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Admin visible on mobile */}
            <a
              href="/admin"
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white hover:border-white/40 whitespace-nowrap"
            >
              Admin
            </a>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white hover:border-white/40"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-zinc-950/95">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="flex flex-col gap-3 text-sm">
                <a
                  href="#bio"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-200 hover:text-white"
                >
                  Bio
                </a>
                <a
                  href="#music"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-200 hover:text-white"
                >
                  Music
                </a>
                <a
                  href="#booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-200 hover:text-white"
                >
                  Booking
                </a>

                {/* Mobile CTA */}
                <a
                  href="#booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
                >
                  Book the Show
                </a>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:border-white/35"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================
          HERO
         ========================= */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center pt-10 pb-8 md:pt-12 md:pb-10">
            <img
              src="/logo.png"
              alt="Ziko Franco logo"
              width={1000}
              height={1000}
              className="w-[280px] md:w-[360px] lg:w-[420px] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              draggable={false}
            />

            <h1 className="-mt-2 text-center text-4xl font-bold tracking-[0.18em] text-zinc-100 md:text-6xl">
              ZIKO FRANCO
            </h1>

            <p className="mt-3 text-center text-sm text-zinc-300 md:text-base">
              Modern Funk Rock • Santana-style flavor • Rock power
            </p>

            <p className="mt-2 text-center text-xs text-zinc-400 md:text-sm">
              45–90 minute sets • Miami based • Available for U.S. tours
            </p>

            {/* Primary actions */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#booking"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              >
                Request Booking
              </a>

              <a
                href="#music"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:border-white/40"
              >
                Listen Now
              </a>

              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:border-white/40"
              >
                Watch on YouTube
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-4xl border-t border-white/10" />
        </div>
      </section>

      {/* =========================
          BIO
         ========================= */}
      <section id="bio" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h2 className="text-xl font-semibold">Biography</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-zinc-300">
          Ziko Franco is a Miami-based rock project led by Ziko as the main figure, backed by a tight band built for big
          stages. The sound blends modern rock power with a funk-forward groove and a Santana-inspired flavor—reimagining
          covers with a signature identity and progressively adding original songs.
        </p>
      </section>

      {/* =========================
          MUSIC
         ========================= */}
      <section id="music" className="mx-auto max-w-6xl px-4 pt-8 pb-10">
        <h2 className="text-xl font-semibold">Music</h2>
        <p className="mt-3 text-sm text-zinc-400">Listen on your preferred platform:</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={LINKS.spotify}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/35"
          >
            Spotify
          </a>
          <a
            href={LINKS.appleMusic}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/35"
          >
            Apple Music
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/35"
          >
            YouTube
          </a>
          <a
            href={LINKS.soundcloud}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/35"
          >
            SoundCloud
          </a>
        </div>

        <p className="mt-4 max-w-4xl text-sm text-zinc-400">
          Releases include reimagined covers and original tracks. Live sets feature recognizable songs performed with Ziko
          Franco’s signature groove and rock power.
        </p>
      </section>

      {/* =========================
          BOOKING (FORM)
         ========================= */}
      <section id="booking" className="mx-auto max-w-6xl px-4 pt-8 pb-14">
        <h2 className="text-xl font-semibold">Booking</h2>
        <p className="mt-3 text-sm text-zinc-400">
          Tell us your event details and we will respond with availability, pricing, and a clear estimate.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* FORM */}
          <div className="md:col-span-7">
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs text-zinc-300">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300">Email *</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder="you@email.com"
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300">City / Venue</label>
                  <input
                    value={form.cityVenue}
                    onChange={(e) => setForm((s) => ({ ...s, cityVenue: e.target.value }))}
                    placeholder="Miami • The Corner Bar"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300">Event Date</label>
                  {/* Calendar picker (easier for users than typing) */}
                  <input
                    value={form.eventDate}
                    onChange={(e) => setForm((s) => ({ ...s, eventDate: e.target.value }))}
                    type="date"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs text-zinc-300">Details</label>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm((s) => ({ ...s, details: e.target.value }))}
                  placeholder="Set length, music style, time, budget range, special requests..."
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                />
              </div>

              {/* Marketing opt-in (optional) */}
              <div className="mt-4 flex items-start gap-2">
                <input
                  id="optin"
                  type="checkbox"
                  checked={!!form.optIn}
                  onChange={(e) => setForm((s) => ({ ...s, optIn: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-950/40"
                />
                <label htmlFor="optin" className="text-sm text-zinc-200">
                  I want to receive updates, new shows, and merch by email.
                  <div className="text-xs text-zinc-400">You can unsubscribe anytime.</div>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
              >
                {status.type === 'loading' ? 'Sending…' : 'Request Booking / Estimate'}
              </button>

              {/* Professional note (no technical details) */}
              <p className="mt-3 text-xs text-zinc-400">
                Your request is received privately and reviewed by our team. We’ll reply by email with availability and pricing.
              </p>

              {/* Status messages */}
              {status.type === 'ok' && (
                <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                  {status.msg}
                </div>
              )}
              {status.type === 'err' && (
                <div className="mt-3 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200">
                  {status.msg}
                </div>
              )}
            </form>
          </div>

          {/* LINKS / CONTACT */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <h3 className="text-sm font-semibold">Official Links</h3>
              <p className="mt-2 text-sm text-zinc-400">Quick access:</p>

              <div className="mt-4 space-y-3 text-sm">
                <a className="block text-zinc-200 hover:text-white" href={LINKS.spotify} target="_blank" rel="noreferrer">
                  Spotify →
                </a>
                <a
                  className="block text-zinc-200 hover:text-white"
                  href={LINKS.appleMusic}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apple Music →
                </a>
                <a className="block text-zinc-200 hover:text-white" href={LINKS.youtube} target="_blank" rel="noreferrer">
                  YouTube →
                </a>
                <a
                  className="block text-zinc-200 hover:text-white"
                  href={LINKS.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                >
                  SoundCloud →
                </a>
              </div>

          
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
         ========================= */}
      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-zinc-500">
          ©️ {year} Ziko Franco. All rights reserved.
        </div>
      </footer>
    </main>
  );
}