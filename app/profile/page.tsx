import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="rounded-[30px] bg-slate-950 p-6 text-white shadow-soft">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-2xl font-black text-white">
                JM
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Profil</p>
                <h1 className="mt-1 text-3xl font-black">Jules Martin</h1>
                <p className="text-sm text-slate-300">@julesnow • 2.480 points</p>
              </div>
            </div>
            <Link href="/" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-violet-50">
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
            <div key={stat.label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-slate-900">Badges</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {['Meme Master', 'Rouge en direct', 'Voyageur', 'Le plus drôle'].map((badge) => (
                <span key={badge} className="rounded-full bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-700">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-slate-900">Objectifs</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Gagner 500 points cette semaine</li>
              <li>• 3 défis nationaux participés</li>
              <li>• Réaliser 2 vidéos de mème</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
