'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ChallengeCard } from "@/components/challenge-card";
import { FeedCard } from "@/components/feed-card";
import { FriendCard } from "@/components/friend-card";
import { StatPill } from "@/components/stat-pill";
import { ensureSeedData, getCurrentUser, getFeedPosts, getUsers } from "@/lib/social-store";

const categories = [
  { id: "points", label: "Points", icon: "⚡", accent: "from-violet-600 to-fuchsia-500" },
  { id: "challenge", label: "Challenge", icon: "🏆", accent: "from-orange-400 to-amber-500" },
  { id: "discussion", label: "Discussion", icon: "💬", accent: "from-cyan-500 to-blue-500" },
  { id: "amis", label: "Amis", icon: "👥", accent: "from-emerald-500 to-teal-500" },
  { id: "publie", label: "Publie", icon: "📸", accent: "from-pink-500 to-rose-500" },
];

const dailyChallenges = [
  {
    id: "national",
    label: "Défi national du jour",
    title: "Quelque chose de rouge",
    description: "Trouve un objet rouge et captures-le dans le moment le plus spontané possible.",
    points: 120,
    scope: "National",
    timeLeft: "2h 13m",
    emoji: "🔴",
  },
  {
    id: "international",
    label: "Défi international du jour",
    title: "Mélange absurde",
    description: "Prenez une photo qui mélange un objet du quotidien avec une tenue totalement improbable.",
    points: 150,
    scope: "International",
    timeLeft: "5h 40m",
    emoji: "🌍",
  },
];

const discussionThreads = [
  { user: "Lina", text: "Le défi rouge est trop fun ce matin 😄", time: "2 min" },
  { user: "Milo", text: "J’ai trouvé la meilleure pose pour le challenge #Meme", time: "9 min" },
  { user: "Zoé", text: "Votez pour ma photo du jour avant 18h", time: "18 min" },
  { user: "Rayan", text: "Qui a le meilleur concept du moment ?", time: "31 min" },
];

const challengeCards = [
  {
    title: "Quelque chose de rouge",
    description: "Trouve un objet rouge et captures-le dans le moment le plus spontané possible.",
    points: 120,
    scope: "National",
    timeLeft: "2h 13m",
    emoji: "🔴",
  },
  {
    title: "Mélange absurde",
    description: "Prenez une photo qui mélange un objet du quotidien avec une tenue totalement improbable.",
    points: 150,
    scope: "Monde",
    timeLeft: "5h 40m",
    emoji: "🧢",
  },
  {
    title: "Le meilleur mème",
    description: "Crée un moment hilarant en photo qui ferait rire toute ta famille en 3 secondes.",
    points: 200,
    scope: "Amis",
    timeLeft: "1h 10m",
    emoji: "😂",
  },
  {
    title: "Mon lieu préféré",
    description: "Montre un endroit qui te ressemble le plus et qui raconte une histoire.",
    points: 90,
    scope: "Ville",
    timeLeft: "3h 45m",
    emoji: "📍",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("points");
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    ensureSeedData();
    setUsers(getUsers());
    setPosts(getFeedPosts());
    setCurrentUser(getCurrentUser());
  }, []);

  const leaderboard = useMemo(() => {
    return [...users]
      .sort((a, b) => b.points - a.points)
      .slice(0, 4)
      .map((u, index) => ({
        name: u.fullName.split(" ")[0],
        points: u.points,
        badge: index === 0 ? "Master du rouge" : index === 1 ? "Mème king" : index === 2 ? "Challenge queen" : "Streak",
      }));
  }, [users]);

  const friends = useMemo(() => {
    return users.slice(0, 4).map((user) => ({
      name: user.fullName.split(" ")[0],
      badge: user.city,
      points: user.points,
      streak: `${user.streak} jours`,
    }));
  }, [users]);

  const challengeGallery = useMemo(() => {
    return dailyChallenges.map((challenge) => ({
      ...challenge,
      shots: posts.filter((post: any) => post.category === challenge.id).slice(0, 3),
    }));
  }, [posts]);

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "points":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-slate-900 p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200">Score total</p>
              <p className="mt-3 text-3xl font-black">{currentUser?.points ?? 2480}</p>
              <p className="mt-2 text-sm text-slate-300">+180 aujourd’hui</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Badge</p>
              <p className="mt-3 text-2xl font-black text-slate-900">Master rouge</p>
              <p className="mt-2 text-sm text-slate-500">{users.length * 3} badges actifs</p>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-[1px] shadow-[0_18px_45px_rgba(168,85,247,0.25)]">
              <div className="h-full rounded-[23px] bg-slate-950/90 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200">Streak</p>
                <p className="mt-3 text-3xl font-black">{currentUser?.streak ?? 9} jours</p>
                <p className="mt-2 text-sm text-slate-300">Tu es dans le top 5</p>
              </div>
            </div>
          </div>
        );
      case "challenge":
        return (
          <div className="space-y-5">
            {challengeGallery.map((challenge) => (
              <div key={challenge.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-4 text-white">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-violet-100">{challenge.label}</p>
                    <h3 className="mt-2 text-xl font-black">{challenge.title}</h3>
                  </div>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-sm font-bold">+{challenge.points} pts</span>
                </div>

                <div className="space-y-4 p-4">
                  <p className="text-sm leading-6 text-slate-600">{challenge.description}</p>

                  <div className="grid gap-2 sm:grid-cols-3">
                    {challenge.shots.length > 0 ? (
                      challenge.shots.map((post: any) => (
                        <img
                          key={post.id}
                          src={post.image}
                          alt={post.caption}
                          className="h-24 w-full rounded-2xl object-cover"
                        />
                      ))
                    ) : (
                      <div className="col-span-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-500">
                        Aucune photo publiée pour ce défi pour le moment.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "discussion":
        return (
          <div className="space-y-3">
            {discussionThreads.map((thread) => (
              <div key={thread.user} className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_10px_24px_rgba(15,23,42,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 font-black text-sm text-white">
                    {thread.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{thread.user}</p>
                    <p className="text-sm text-slate-600">{thread.text}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-medium text-slate-400">{thread.time}</span>
              </div>
            ))}
          </div>
        );
      case "amis":
        return (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.name} {...friend} />
            ))}
          </div>
        );
      case "publie":
        return (
          <div className="rounded-[28px] border border-dashed border-violet-300 bg-violet-50 p-5 text-center shadow-[0_12px_30px_rgba(147,51,234,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Défi du jour</p>
            <h3 className="mt-3 text-2xl font-black text-slate-900">Publie ta meilleure photo</h3>
            <p className="mt-2 text-sm text-slate-600">Tu as 1h pour envoyer ta meilleure prise et récolter des points.</p>
            <Link href="/camera" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
              + Publier maintenant
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 pb-24 md:pb-10">
        <section className="rounded-[34px] border border-violet-500/20 bg-slate-950 p-5 text-white shadow-[0_25px_60px_rgba(76,29,149,0.35)] md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Défi du jour actif
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] md:text-5xl xl:text-6xl">
                Prends une photo. Gagne des points. <span className="text-violet-300">Fais rire le monde.</span>
              </h1>

              <p className="max-w-lg text-sm text-slate-300 md:text-base">
                NOW est une app sociale photo inspirée de BeReal pour des défis drôles, spontanés et ultra visuels. Publie, vote, rivalise et deviens le roi du moment.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/camera" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-violet-50">
                  + Publier ma photo
                </Link>
                <Link href="/challenge" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Voir les défis
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-lg gap-3 sm:grid-cols-3">
              <StatPill label="Points" value={String(currentUser?.points ?? 2480)} accent="violet" />
              <StatPill label="Défis" value="18" accent="coral" />
              <StatPill label="Streak" value={`${currentUser?.streak ?? 9} jours`} accent="emerald" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Accueil</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Catégories</h2>
            </div>
            <Link href="/challenge" className="text-sm font-semibold text-violet-600 transition hover:text-violet-700">
              Voir tout
            </Link>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                    activeCategory === category.id
                      ? `border-transparent bg-gradient-to-r ${category.accent} text-white shadow-[0_12px_30px_rgba(168,85,247,0.25)]`
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="mt-5">{renderCategoryContent()}</div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Story</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">À l’instant</h2>
            </div>
            <Link href="/friends" className="text-sm font-semibold text-violet-600 transition hover:text-violet-700">
              Voir mes amis
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {users.slice(0, 6).map((user) => (
              <div key={user.id} className="min-w-[88px] text-center">
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${user.avatarColor} p-[2px]`}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white">
                    {user.fullName
                      .split(" ")
                      .slice(0, 2)
                      .map((part: string) => part[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                </div>
                <p className="mt-2 text-xs font-medium text-slate-600">{user.fullName.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">Défis du jour</h2>
              <Link href="/challenge" className="text-sm font-semibold text-violet-600 transition hover:text-violet-700">
                Voir tout
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {challengeCards.map((challenge) => (
                <ChallengeCard key={challenge.title} {...challenge} />
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Classement</h3>
              <Link href="/leaderboard" className="text-sm font-semibold text-violet-600 transition hover:text-violet-700">
                Voir
              </Link>
            </div>
            <div className="space-y-3">
              {leaderboard.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{item.points}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">pts</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Feed de tes amis</h2>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Derniers uploads
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {posts.map((post) => (
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
              />
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Tes amis</h2>
            <Link href="/friends" className="text-sm font-semibold text-violet-600 transition hover:text-violet-700">
              Tout voir
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.name} {...friend} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

