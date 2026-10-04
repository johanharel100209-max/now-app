import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Défis", href: "/challenge" },
  { label: "Amis", href: "/friends" },
  { label: "Classement", href: "/leaderboard" },
  { label: "Profil", href: "/profile" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-[28px] border border-slate-200 bg-white/80 px-4 py-3 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-lg font-black text-white">
                  N
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Social photo</p>
                  <h2 className="text-xl font-black text-slate-900">NOW</h2>
                </div>
              </div>
              <Link href="/camera" className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white lg:hidden">
                + Photo
              </Link>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                🔔 3
              </button>
              <Link href="/camera" className="rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
                + Défi
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
