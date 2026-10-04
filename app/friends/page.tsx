import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { friends } from "@/lib/mock-data";

export default function FriendsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-600">Amis</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Ton cercle social</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au feed
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {friends.map((friend) => (
            <div key={friend.name} className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-black text-white">
                  {friend.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">{friend.name}</h2>
                  <p className="text-xs text-slate-500">{friend.badge}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-2.5">
                  <span>Points</span>
                  <strong className="font-bold text-slate-900">{friend.points}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-2.5">
                  <span>Défis</span>
                  <strong className="font-bold text-slate-900">{friend.streak}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-2.5">
                  <span>Statut</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                    actif
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
                Voir profil
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
