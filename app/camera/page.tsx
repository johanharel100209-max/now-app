import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function LoginPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-2xl font-black text-white">
            N
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-violet-600">NOW</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Connexion</h1>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</label>
            <input className="w-full bg-transparent text-sm text-slate-900 outline-none" placeholder="tu@now.app" />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Mot de passe</label>
            <input type="password" className="w-full bg-transparent text-sm text-slate-900 outline-none" placeholder="••••••••" />
          </div>

          <button className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
            Se connecter
          </button>

          <Link href="/" className="block text-center text-sm font-semibold text-violet-600 hover:text-violet-700">
            Retour au feed
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
