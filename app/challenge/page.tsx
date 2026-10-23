'use client';

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-600">Défis</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Défis photo du moment</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au feed
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {challengeCards.map((challenge) => {
            const gallery = getChallengeGallery(challenge.id ?? challenge.scope.toLowerCase());

            return (
              <div key={challenge.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
                <div className="h-36 bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
                      {challenge.scope}
                    </span>
                    <span className="text-sm font-semibold">+{challenge.points} pts</span>
                  </div>
                  <div className="mt-8 text-2xl font-black">{challenge.emoji}</div>
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Défi</p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900">{challenge.title}</h2>
                  </div>
                  <p className="text-sm text-slate-600">{challenge.description}</p>

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
                        Aucune photo publiée pour ce défi
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    <span>Temps restant</span>
                    <strong className="font-bold text-slate-900">{challenge.timeLeft}</strong>
                  </div>
                  <button className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                    Participer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

