import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        <div className="rounded-[34px] border border-violet-500/20 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(76,29,149,0.3)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-2xl font-black text-white">
                JM
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200">Profil</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">Jules Martin</h1>
                <p className="text-sm text-slate-300">@julesnow • 2.480 points</p>
              </div>
            </div>
            <Link href="/" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-violet-50">
              Retour au feed
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Défis complétés", value: "18" },
            { label: "Photos publiées", value: "72" },
            { label: "Série active", value: "9 jours" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
            <h2 className="text-2xl font-black text-slate-900">Badges</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {['Meme Master', 'Rouge en direct', 'Voyageur', 'Le plus drôle', 'Street hunter', 'Top 5'].map((badge) => (
                <span key={badge} className="rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-3 py-2 text-sm font-semibold text-violet-700">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
            <h2 className="text-2xl font-black text-slate-900">Objectifs</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Gagner 500 points cette semaine</li>
              <li>• 3 défis nationaux participés</li>
              <li>• Réaliser 2 vidéos de mème</li>
              <li>• Rester dans le top 10 mondial</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

