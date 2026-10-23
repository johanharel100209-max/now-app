"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { buildProfileSummary, createPost, getCurrentUser, getCurrentUserPosts, getFeedPosts } from "@/lib/social-store";

export default function CameraPage() {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("Paris");
  const [category, setCategory] = useState("national");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  );
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      window.location.href = "/login";
      return;
    }
    setUser(current);
    setPosts(getCurrentUserPosts());
  }, []);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Le fichier sélectionné n'est pas une image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        setImage(result);
        setError("");
        setMessage("Photo prête à être publiée.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!user) {
      setError("Connecte-toi avant de publier.");
      return;
    }

    if (!caption.trim()) {
      setError("Ajoute une légende à ta photo.");
      return;
    }

    createPost({
      userId: user.id,
      caption,
      image,
      category,
      location,
    });

    setMessage("Photo publiée avec succès !");
    setCaption("");
    setPosts(getFeedPosts());
  };

  const profileSummary = buildProfileSummary(user);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[30px] bg-slate-950 p-6 text-white shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-xl font-black text-white">
                {profileSummary?.initials ?? "TO"}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-violet-200">Profil</p>
                <h1 className="mt-1 text-3xl font-black">{user?.fullName ?? "Ton profil"}</h1>
                <p className="text-sm text-slate-300">{user?.username ?? "@user.now"} • {user?.points ?? 0} points</p>
              </div>
            </div>
            <Link href="/" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-violet-50">
              Retour au feed
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-2xl font-black text-slate-900">Publier une photo</h2>

            <div className="mt-5 space-y-4">
              <div className="overflow-hidden rounded-[26px] border border-slate-200">
                <img src={image} alt="Preview" className="h-80 w-full object-cover" />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex cursor-pointer items-center justify-center rounded-full bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500">
                  <span>Prendre une photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageSelection}
                    className="hidden"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                  <span>Choisir une image</span>
                  <input type="file" accept="image/*" onChange={handleImageSelection} className="hidden" />
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  URL image
                </label>
                <input
                  value={image.startsWith("data:image") ? "" : image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Légende
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  className="w-full resize-none bg-transparent text-sm text-slate-900 outline-none"
                  placeholder="Décris ton moment..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Ville
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Catégorie du défi
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  >
                    <option value="national">Défi national du jour</option>
                    <option value="international">Défi international du jour</option>
                    <option value="challenge">Challenge général</option>
                    <option value="points">Points</option>
                    <option value="discussion">Discussion</option>
                    <option value="amis">Amis</option>
                    <option value="publie">Publie</option>
                  </select>
                </div>
              </div>

              {error && <div className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</div>}
              {message && <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</div>}

              <button
                onClick={handlePublish}
                className="w-full rounded-full bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500"
              >
                Publier ma photo
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-black text-slate-900">Statut du profil</h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Niveau</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{profileSummary?.level ?? "Nouveau"}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Photos</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{posts.length}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Série</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{user?.streak ?? 1} jours</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-black text-slate-900">À venir</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Défis du jour plus poussés</li>
                <li>• Commentaires en temps réel</li>
                <li>• Followers et amis</li>
                <li>• Leaderboard complet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

