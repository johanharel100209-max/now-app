import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function CameraPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Défi</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Publier une photo</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au feed
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-slate-200 bg-slate-950 p-4 shadow-soft">
            <div className="flex h-[480px] items-center justify-center rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_rgba(15,23,42,0.8))] text-7xl">
              📸
            </div>
          </div>

          <div className="space-y-4 rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="rounded-2xl bg-violet-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-600">Défi du jour</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Quelque chose de rouge</h2>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Légende</label>
              <textarea rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none" placeholder="Écris une légende hilarante..." />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Ouvrir la galerie
              </button>
              <button className="rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500">
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

