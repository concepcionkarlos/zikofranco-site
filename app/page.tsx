// app/page.tsx
'use client';

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
  eventDate?: string;
  details?: string;
};

export default function Page() {
  const [form, setForm] = useState<BookingPayload>({
    name: '',
    email: '',
    cityVenue: '',
    eventDate: '',
    details: '',
  });

  const [status, setStatus] = useState<
    { type: 'idle' } | { type: 'loading' } | { type: 'ok'; msg: string } | { type: 'err'; msg: string }
  >({ type: 'idle' });

  const year = useMemo(() => new Date().getFullYear(), []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
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

      setStatus({ type: 'ok', msg: 'Request sent. We will get back to you shortly.' });
      setForm({ name: '', email: '', cityVenue: '', eventDate: '', details: '' });
    } catch {
      setStatus({
        type: 'err',
        msg: 'Something went wrong submitting the request. Please try again, or contact via YouTube/SoundCloud.',
      });
    }
  };

  return (
    <main className="min-h-screen text-zinc-100 bg-zinc-950">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            {/* SMALL LOGO (100x100 intrinsic, visual size controlled by CSS) */}
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

          <nav className="flex items-center gap-6 text-sm">
            <a href="#bio" className="text-zinc-200 hover:text-white">
              Bio
            </a>
            <a href="#music" className="text-zinc-200 hover:text-white">
              Music
            </a>
            <a href="#booking" className="text-zinc-200 hover:text-white">
              Booking
            </a>

            <a
              href="#booking"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-white/40"
            >
              Book the Show
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center pt-10 pb-8 md:pt-12 md:pb-10">
            {/* BIG LOGO (1000x1000 intrinsic, visually large) */}
            <img
              src="/logo.png"
              alt="Ziko Franco Logo"
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

            {/* PRO: Only 3 primary actions */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#booking"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              >
                Request Booking
              </a>

              {/* Listen should not duplicate platform links here — just scroll to Music section */}
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

      {/* BIO */}
      <section id="bio" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h2 className="text-xl font-semibold">Biography</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-zinc-300">
          Ziko Franco is a Miami-based rock project led by Ziko as the main figure, backed by a tight band built for big
          stages. The sound blends modern rock power with a funk-forward groove and a Santana-inspired flavor—reimagining
          covers with a signature identity and progressively adding original songs.
        </p>
      </section>

      {/* MUSIC (ONLY place for platform buttons) */}
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

      {/* BOOKING (FORM) */}
      <section id="booking" className="mx-auto max-w-6xl px-4 pt-8 pb-14">
        <h2 className="text-xl font-semibold">Booking</h2>
        <p className="mt-3 text-sm text-zinc-400">
          Tell us your event details and we will respond with availability, pricing, and a clear estimate.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Form */}
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
                  <input
                    value={form.eventDate}
                    onChange={(e) => setForm((s) => ({ ...s, eventDate: e.target.value }))}
                    placeholder="YYYY-MM-DD"
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

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
              >
                {status.type === 'loading' ? 'Sending…' : 'Request Booking / Estimate'}
              </button>

              <p className="mt-3 text-xs text-zinc-400">
                This form will be stored as a client request in your database (Prisma) via <code>/api/booking</code>.
              </p>

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

          {/* Social & Contact (PRO: keep it, but make it lighter — not more big buttons) */}
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

              <div className="mt-5 rounded-xl border border-white/10 bg-zinc-950/30 p-4 text-xs text-zinc-400">
                Tip: If you later use a real booking link (Google Form / Typeform / Calendly), you can add it here without
                changing the layout.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-zinc-500">
          ©️ {year} Ziko Franco. All rights reserved.
        </div>
      </footer>
    </main>
  );
}