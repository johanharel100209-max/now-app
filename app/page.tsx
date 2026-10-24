"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { FeedCard } from "@/components/feed-card";
import { challengeCards } from "@/lib/mock-data";
import { ensureSeedData, getCurrentUser, getFeedPosts, getUsers } from "@/lib/social-store";

const categories = [
  { id: "all", label: "Tout", icon: "✦" },
  { id: "points", label: "Points", icon: "⚡" },
  { id: "challenge", label: "Défis", icon: "🏆" },
  { id: "monde", label: "Monde", icon: "🌍" },
  { id: "amis", label: "Amis", icon: "👥" },
];

const worldPins = [
  { country: "France", x: 50, y: 38, count: 12 },
  { country: "Japon", x: 82, y: 33, count: 9 },
  { country: "Brésil", x: 34, y: 72, count: 7 },
  { country: "USA", x: 20, y: 41, count: 11 },
  { country: "Maroc", x: 48, y: 52, count: 6 },
  { country: "Australie", x: 86, y: 76, count: 8 },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    ensureSeedData();
    setUsers(getUsers());
    setPosts(getFeedPosts());
    setCurrentUser(getCurrentUser());
  }, []);

  const leaderboard = useMemo(() => {
    return [...users].sort((a, b) => b.points - a.points).slice(0, 3);
  }, [users]);

  const featuredPosts = useMemo(() => posts.slice(0, 3), [posts]);

  return (
    <AppShell>
      <div className="space-y-8 pb-10">
        <section className="relative overflow-hidden rounded-[36px] border border-violet-500/20 bg-slate-950 p-6 shadow-[0_30px_80px_rgba(76,29,149,0.35)] md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.30),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.20),transparent_32%),linear-gradient(135deg,#0f172a,#111827_42%,#1e1b4b)]" />
          <div className="relative grid gap-6 xl:grid-cols-[1.4fr_0.8fr] xl:items-end">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-100">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                NOW • défi du jour
              </div>

              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-black leading-none tracking-[-0.08em] text-white md:text-6xl">
                  Capture l’instant.<br />
                  <span className="text-violet-300">Gagne le monde.</span>
                </h1>
                <p className="max-w-lg text-sm text-slate-300 md:text-base">
                  Publie des moments spontanés, participe à des défis viraux et grimpe dans le classement mondial.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/camera" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-violet-50">
                  + Publier mon moment
                </Link>
                <Link href="/challenge" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Voir les défis
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Score</p>
                <p className="mt-3 text-3xl font-black text-white">{currentUser?.points ?? 2480}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Série</p>
                <p className="mt-3 text-3xl font-black text-white">{currentUser?.streak ?? 9}j</p>
              </div>
              <div className="rounded-[24px] border border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-pink-500/20 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-violet-100">Global</p>
                <p className="mt-3 text-3xl font-black text-white">#12</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Points", value: currentUser?.points ?? 2480, accent: "violet" },
            { label: "Défis", value: "18", accent: "orange" },
            { label: "Pays", value: "12", accent: "sky" },
            { label: "Médias", value: "208", accent: "emerald" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-violet-600">Explore</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Catégories</h2>
            </div>
            <Link href="/challenge" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
              Voir tout
            </Link>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    selectedCategory === category.id
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            {selectedCategory === "monde" && (
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-sky-100 via-indigo-50 to-violet-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-sky-600">Carte mondiale</p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">Défis live partout</h3>
                    </div>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-sky-700">12 pays</span>
                  </div>

                  <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_23%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.18),transparent_25%),linear-gradient(135deg,#dbeafe,#eef2ff_40%,#f5f3ff)]">
                    <div className="absolute inset-0 opacity-30">
                      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                        <path d="M16 28L28 22L34 19L39 22L44 18L51 21L58 18L63 22L70 28L73 33L67 39L62 44L58 52L50 58L42 55L35 48L24 40L18 32Z" fill="rgba(148,163,184,0.75)" />
                        <path d="M70 33L76 31L82 35L86 40L84 46L78 49L71 47L68 42L70 33Z" fill="rgba(148,163,184,0.75)" />
                        <path d="M36 60L44 68L51 76L48 84L39 80L29 69L31 63Z" fill="rgba(148,163,184,0.75)" />
                        <path d="M76 68L84 72L90 79L86 87L79 83L73 76Z" fill="rgba(148,163,184,0.75)" />
                      </svg>
                    </div>

                    {worldPins.map((pin) => (
                      <div
                        key={pin.country}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      >
                        <div className="flex -translate-y-3 flex-col items-center gap-1">
                          <span className="rounded-full border-2 border-white bg-violet-600 px-2 py-1 text-[10px] font-black text-white shadow-lg">
                            {pin.count}
                          </span>
                          <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
                            {pin.country}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {challengeCards.map((challenge) => (
                    <Link
                      key={challenge.id}
                      href="/challenge"
                      className="block rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-violet-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">
                          {challenge.scope}
                        </span>
                        <span className="text-sm font-black text-violet-700">+{challenge.points}</span>
                      </div>
                      <h4 className="mt-3 text-lg font-black text-slate-900">{challenge.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{challenge.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        <span>{challenge.emoji}</span>
                        <span>{challenge.timeLeft}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory !== "monde" && (
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <div className="rounded-[28px] bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-5 text-white shadow-[0_20px_40px_rgba(168,85,247,0.25)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-violet-100">Défi du jour</p>
                    <h3 className="mt-3 text-2xl font-black">{challengeCards[0].title}</h3>
                    <p className="mt-2 text-sm text-violet-50">{challengeCards[0].description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="rounded-full bg-white/15 px-2.5 py-1">{challengeCards[0].scope}</span>
                      <span className="font-bold">+{challengeCards[0].points} pts</span>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {featuredPosts.map((post) => (
                      <div key={post.id} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                        <img src={post.image} alt={post.caption} className="h-28 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{user.fullName.split(" ")[0]}</p>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{index === 0 ? "Master" : index === 1 ? "Viral" : "Streak"}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-900">{user.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-violet-600">Tendances</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Défis du jour</h2>
              </div>
              <Link href="/challenge" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                Voir tout
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {challengeCards.slice(0, 4).map((challenge) => (
                <div key={challenge.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-4 text-white">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                      {challenge.scope}
                    </span>
                    <span className="text-sm font-bold">+{challenge.points} pts</span>
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-slate-900">{challenge.title}</h3>
                      <span className="text-2xl">{challenge.emoji}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{challenge.description}</p>
                    <div className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3 text-sm text-slate-700">
                      <span>Temps restant</span>
                      <strong className="font-bold text-slate-900">{challenge.timeLeft}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-violet-600">Monde</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Top pays</h3>
              </div>
              <Link href="/world" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                Voir
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { country: "France", score: 98 },
                { country: "Japon", score: 97 },
                { country: "Brésil", score: 95 },
                { country: "USA", score: 92 },
              ].map((item, index) => (
                <div key={item.country} className="flex items-center justify-between rounded-[20px] bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                      #{index + 1}
                    </div>
                    <span className="font-bold text-slate-800">{item.country}</span>
                  </div>
                  <span className="text-sm font-black text-violet-700">{item.score}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-violet-600">Feed</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Feed du moment</h2>
            </div>
            <Link href="/world" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
              Voir le monde
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <FeedCard
                key={post.id}
                id={post.id}
                user={post.userName}
                handle={post.userHandle}
                location={post.location}
                points={post.points}
                caption={post.caption}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
                mediaType={post.mediaType ?? "image"}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
