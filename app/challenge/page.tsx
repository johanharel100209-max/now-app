"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { challengeCards } from "@/lib/mock-data";
import { getFeedPosts } from "@/lib/social-store";

export default function ChallengePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts(getFeedPosts());
  }, []);

  const getChallengeGallery = (challengeId: string) => {
    return posts.filter((post: any) => post.category === challengeId).slice(0, 4);
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        <div className="rounded-[32px] border border-violet-500/20 bg-slate-950 p-6 text-white shadow-[0_28px_60px_rgba(76,29,149,0.25)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-200">Défis</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.08em] text-white">Défis photo du moment</h1>
            </div>
            <Link href="/" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Retour au feed
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challengeCards.map((challenge) => {
            const gallery = getChallengeGallery(challenge.id ?? challenge.scope.toLowerCase());

            return (
              <article key={challenge.title} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
                <div className="h-36 bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
                      {challenge.scope}
                    </span>
                    <span className="text-sm font-semibold">+{challenge.points} pts</span>
                  </div>
                  <div className="mt-8 text-3xl font-black">{challenge.emoji}</div>
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Défi</p>
                    <h2 className="mt-2 text-xl font-black text-slate-900">{challenge.title}</h2>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{challenge.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {gallery.length > 0 ? (
                      gallery.map((post: any) => (
                        <img
                          key={post.id}
                          src={post.image}
                          alt={post.caption}
                          className="h-20 w-full rounded-2xl object-cover"
                        />
                      ))
                    ) : (
                      <div className="col-span-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-xs text-slate-500">
                        Aucune photo publiée pour ce défi pour le moment.
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3 text-sm text-slate-700">
                    <span>Temps restant</span>
                    <strong className="font-bold text-slate-900">{challenge.timeLeft}</strong>
                  </div>
                  <button className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Participer
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

