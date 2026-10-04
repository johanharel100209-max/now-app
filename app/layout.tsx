import Link from "next/link";
import { challengeCards, feedPosts, leaderboard, friends } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { ChallengeCard } from "@/components/challenge-card";
import { FeedCard } from "@/components/feed-card";
import { FriendCard } from "@/components/friend-card";
import { StatPill } from "@/components/stat-pill";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-hero-glow border border-white/10 bg-slate-950 p-6 text-white shadow-soft md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-violet-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Défi du jour actif
              </div>

              <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                Prends une photo. Gagne des points. Fais rire le monde.
              </h1>

              <p className="max-w-lg text-sm text-slate-300 md:text-base">
                NOW te pousse à capturer des moments spontanés, drôles et originaux autour de défis globaux, nationaux et de ton cercle d’amis.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/challenge"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-violet-50"
                >
                  Participer au défi
                </Link>
                <Link
                  href="/friends"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Voir mes amis
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-md gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <StatPill label="Points" value="2,480" accent="violet" />
              <StatPill label="Défis" value="18" accent="coral" />
              <StatPill label="Streak" value="9 jours" accent="emerald" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Défis du jour</h2>
              <Link href="/challenge" className="text-sm font-medium text-violet-600 hover:text-violet-700">
                Voir tout
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {challengeCards.map((challenge) => (
                <ChallengeCard key={challenge.title} {...challenge} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Classement</h3>
            <div className="space-y-3">
              {leaderboard.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{item.points}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">pts</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/leaderboard" className="mt-3 block text-center text-sm font-semibold text-violet-600 hover:text-violet-700">
              Voir le classement complet
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Feed de tes amis</h2>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Derniers uploads
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {feedPosts.map((post) => (
              <FeedCard key={post.id} {...post} />
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Tes amis</h2>
            <Link href="/friends" className="text-sm font-medium text-violet-600 hover:text-violet-700">
              Tous les amis
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.name} {...friend} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
