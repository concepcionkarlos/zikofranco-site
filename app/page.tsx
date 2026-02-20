/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
<Image
  src="/logo.png"
  alt="Ziko Franco Logo"
  width={900}
  height={900}
/>
import { useMemo, useState } from "react";

type BookingPayload = {
  name: string;
  email: string;
  cityVenue?: string;
  eventDate?: string;
  details?: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [form, setForm] = useState<BookingPayload>({
    name: "",
    email: "",
    cityVenue: "",
    eventDate: "",
    details: "",
  });

  const navItems = useMemo(
    () => [
      { label: "Biography", href: "#bio" },
      { label: "Music", href: "#music" },
      { label: "Media", href: "#media" },
      { label: "Booking", href: "#booking" },
    ],
    []
  );

  function scrollTo(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);

    if (!form.name.trim() || !form.email.trim()) {
      setErrMsg("Please enter your name and email.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          cityVenue: form.cityVenue?.trim() || null,
          eventDate: form.eventDate?.trim() || null,
          details: form.details?.trim() || null,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setErrMsg(data?.error || "Failed to send request. Please try again.");
        return;
      }

      setOkMsg("Request received. We’ll get back to you shortly.");
      setForm({ name: "", email: "", cityVenue: "", eventDate: "", details: "" });
    } catch (err) {
      setErrMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollTo("#top")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to top"
          >
            <span className="relative h-7 w-7">
              <Image
                src="/logo.png"
                alt="Ziko Franco"
                fill
                className="object-contain"
                priority
              />
            </span>
            <span className="text-sm font-semibold tracking-[0.18em]">ZIKO FRANCO</span>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((it) => (
              <button
                key={it.href}
                onClick={() => scrollTo(it.href)}
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                {it.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("#booking")}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-white/40"
          >
            Book the Show
          </button>
        </div>
      </header>

      {/* TOP ANCHOR */}
      <div id="top" className="pt-20" />

      {/* HERO */}
      <section className="relative">
        {/* subtle background glow */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/2 top-44 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5">
          {/* keep it centered and not too low */}
          <div className="flex min-h-[78vh] w-full flex-col items-center justify-center text-center">
            {/* LOGO (big, responsive, does NOT push everything down) */}
            <div className="relative mb-5 h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px] lg:h-[430px] lg:w-[430px]">
              <Image
                src="/logo.png"
                alt="Ziko Franco logo"
                fill
                priority
                className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
              />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              ZIKO FRANCO
            </h1>

            <p className="mt-3 text-sm text-zinc-200/90 sm:text-base">
              Energy. Elegance. Rock.
            </p>

            <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
              Miami, FL • 45–90 minute sets • Available nationwide
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => scrollTo("#media")}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
              >
                Watch Live
              </button>

              <button
                onClick={() => scrollTo("#booking")}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-white/45"
              >
                Book the Show
              </button>

              <button
                onClick={() => scrollTo("#music")}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/35 hover:text-white"
              >
                Listen
              </button>
            </div>

            <div className="mt-10 h-px w-full max-w-3xl bg-white/10" />
          </div>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section id="bio" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14">
          <h2 className="text-xl font-semibold tracking-tight">Biography</h2>

          <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-zinc-200/90">
            <p>
              Ziko Franco is a Miami-based funk-rock project built around energy, elegance, and modern
              rock attitude. Known for reinventing iconic songs with a signature groove, the band delivers
              45–90 minute sets designed for venues, private events, and festivals across the U.S.
            </p>
            <p>
              In addition to high-energy covers, <span className="font-semibold text-white">Ziko Franco also performs original music</span>,
              bringing a unique sound and identity to every stage.
            </p>
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14">
          <h2 className="text-xl font-semibold tracking-tight">Music</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Listen on your favorite platform:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Spotify", url: "#" },
              { name: "Apple Music", url: "#" },
              { name: "YouTube Music", url: "#" },
              { name: "SoundCloud", url: "#" },
              { name: "Bandcamp", url: "#" },
              { name: "Amazon Music", url: "#" },
            ].map((x) => (
              <a
                key={x.name}
                href={x.url}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/7"
              >
                {x.name} <span className="text-zinc-400">→</span>
              </a>
            ))}
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />
        </div>
      </section>

      {/* MEDIA */}
      <section id="media" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14">
          <h2 className="text-xl font-semibold tracking-tight">Media</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Live clips, performance reels, and highlights.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Replace the src with your real video links */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Ziko Franco Live Clip"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-4 py-3 text-sm text-zinc-300">Live Clip (replace link)</div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Ziko Franco Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-4 py-3 text-sm text-zinc-300">Performance Reel (replace link)</div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-6xl px-5 pb-20">
          <h2 className="text-xl font-semibold tracking-tight">Booking</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">
            Tell us your event details and we will respond with availability, pricing, and a clear estimate.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs text-zinc-300">Name *</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-300">Email *</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="you@email.com"
                    type="email"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-300">City / Venue</span>
                  <input
                    value={form.cityVenue}
                    onChange={(e) => setForm((s) => ({ ...s, cityVenue: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="Miami • The Corner Bar"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-300">Event Date</span>
                  <input
                    value={form.eventDate}
                    onChange={(e) => setForm((s) => ({ ...s, eventDate: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="YYYY-MM-DD"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-xs text-zinc-300">Details</span>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm((s) => ({ ...s, details: e.target.value }))}
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                  placeholder="Set length, music style, time, budget range, special requests..."
                />
              </label>

              {errMsg && (
                <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {errMsg}
                </div>
              )}
              {okMsg && (
                <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  {okMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Request Booking / Estimate"}
              </button>

              <p className="mt-3 text-xs text-zinc-400">
                This form will be stored as a client request in your database (Prisma) via <code>/api/booking</code>.
              </p>
            </form>

            {/* Contact + Social */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">Social & Contact</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Add your real links here. These can also be used by n8n automations later.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { name: "Instagram", url: "#" },
                  { name: "TikTok", url: "#" },
                  { name: "YouTube", url: "#" },
                  { name: "Facebook", url: "#" },
                  { name: "Email", url: "mailto:your@email.com" },
                  { name: "WhatsApp", url: "#" },
                ].map((x) => (
                  <a
                    key={x.name}
                    href={x.url}
                    className="rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-zinc-950/40"
                  >
                    {x.name} <span className="text-zinc-400">→</span>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-zinc-950/30 p-4">
                <p className="text-xs text-zinc-400">Next steps (when you are ready):</p>
                <ul className="mt-2 list-inside list-disc text-sm text-zinc-300">
                  <li>Replace platform links with real URLs.</li>
                  <li>Replace Media embeds with your YouTube/IG reels.</li>
                  <li>Create an admin page to view booking requests.</li>
                  <li>Connect n8n to email/WhatsApp for automatic replies.</li>
                </ul>
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-xs text-zinc-500">
            ©️ {new Date().getFullYear()} Ziko Franco. All rights reserved.
          </footer>
        </div>
      </section>
    </main>
  );
}