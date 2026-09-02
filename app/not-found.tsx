import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { SafeImage } from "@/components/safe-image";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-forest-deep)] text-white">
        <SafeImage
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          unoptimized
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-lime)]">
            Off the trail
          </p>
          <h1 className="display-hed mt-3 text-[clamp(3rem,10vw,7rem)]">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-white/75">
            This route doesn&rsquo;t exist — but the journeys do. Let&rsquo;s get you back on the map.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded bg-[var(--color-moss)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-moss-dark)]"
            >
              Back to home
            </Link>
            <Link
              href="/journeys"
              className="inline-flex items-center rounded border border-white/40 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
            >
              Browse journeys
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
