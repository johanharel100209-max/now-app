import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { leaderboard } from "@/lib/mock-data";

export default function LeaderboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-600">Classement</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Top des meilleurs photos</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au feed
          </Link>
        </div>

        <div className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
          {leaderboard.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between rounded-[22px] bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
                  #{index + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.badge}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900">{item.points}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
