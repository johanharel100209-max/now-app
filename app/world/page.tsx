"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getFeedPosts } from "@/lib/social-store";

const worldPins = [
  { country: "France", x: 49, y: 38 },
  { country: "Japon", x: 83, y: 35 },
  { country: "Brésil", x: 33, y: 72 },
  { country: "USA", x: 20, y: 42 },
  { country: "Afrique", x: 53, y: 58 },
  { country: "Australie", x: 85, y: 76 },
];

const themes = ["all", "street", "japonais", "danse", "food", "sport", "mode"];

export default function WorldPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");

  useEffect(() => {
    setPosts(getFeedPosts());
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const countryMatch = selectedCountry === "all" || post.country === selectedCountry;
      const themeMatch = selectedTheme === "all" || (post.theme ?? "street").toLowerCase() === selectedTheme.toLowerCase();
      return countryMatch && themeMatch;
    });
  }, [posts, selectedCountry, selectedTheme]);

  const topCountries = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      const country = post.country ?? "Monde";
      map.set(country, (map.get(country) ?? 0) + (post.trendScore ?? 80));
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [posts]);

  return (
    <AppShell>
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600">Monde</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Défis globaux</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au feed
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sky-600">Carte mondiale</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Trending by region</h2>
              </div>
              <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">{filteredPosts.length} posts</div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-sky-100 via-indigo-50 to-violet-50 p-4">
              <div className="relative h-[300px] w-full rounded-[24px] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_23%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.18),transparent_25%),linear-gradient(135deg,#dbeafe,#eef2ff_40%,#f5f3ff)]">
                <div className="absolute inset-0 opacity-25">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path d="M16 28L28 22L34 19L39 22L44 18L51 21L58 18L63 22L70 28L73 33L67 39L62 44L58 52L50 58L42 55L35 48L24 40L18 32Z" fill="rgba(148,163,184,0.7)" />
                    <path d="M70 33L76 31L82 35L86 40L84 46L78 49L71 47L68 42L70 33Z" fill="rgba(148,163,184,0.7)" />
                    <path d="M36 60L44 68L51 76L48 84L39 80L29 69L31 63Z" fill="rgba(148,163,184,0.7)" />
                    <path d="M76 68L84 72L90 79L86 87L79 83L73 76Z" fill="rgba(148,163,184,0.7)" />
                  </svg>
                </div>

                {worldPins.map((pin) => (
                  <button
                    key={pin.country}
                    type="button"
                    onClick={() => setSelectedCountry(pin.country === "Afrique" ? "France" : pin.country === "USA" ? "France" : pin.country)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-violet-600 p-2 shadow-lg transition ${
                      selectedCountry === pin.country || selectedCountry === "all" ? "scale-110" : "opacity-80"
                    }`}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    title={pin.country}
                  >
                    <span className="block h-2.5 w-2.5 rounded-full bg-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.2em] text-violet-600">Filtres</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Pays & thèmes</h3>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pays</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none"
                  >
                    <option value="all">Monde entier</option>
                    <option value="France">France</option>
                    <option value="Japon">Japon</option>
                    <option value="Brésil">Brésil</option>
                    <option value="USA">USA</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Thème</label>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setSelectedTheme(theme)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${
                          selectedTheme === theme ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {theme === "all" ? "Tous" : theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.2em] text-violet-600">Top pays</p>
              <div className="mt-4 space-y-3">
                {topCountries.map(([country, score], index) => (
                  <div key={country} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                        #{index + 1}
                      </div>
                      <span className="font-bold text-slate-800">{country}</span>
                    </div>
                    <span className="text-sm font-black text-violet-700">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Posts mondiaux</h2>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Tendance du moment
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {filteredPosts.slice(0, 6).map((post) => (
              <article key={post.id} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-soft">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-black text-white">
                      {post.userName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{post.userName}</p>
                      <p className="text-xs text-slate-500">{post.country} • {post.theme}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-bold text-violet-700">+{post.points} pts</span>
                </div>

                {post.mediaType === "video" ? (
                  <video src={post.image} controls playsInline className="h-72 w-full object-cover bg-slate-900" />
                ) : (
                  <img src={post.image} alt={post.caption} className="h-72 w-full object-cover" />
                )}

                <div className="space-y-3 p-4">
                  <p className="text-sm leading-6 text-slate-700">{post.caption}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>💜 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>⚡ {post.trendScore ?? 80}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

