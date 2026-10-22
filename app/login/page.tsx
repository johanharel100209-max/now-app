"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { signInUser, signUpUser } from "@/lib/social-store";

export default function LoginPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    city: "",
    bio: "",
  });
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        if (!form.email || !form.password) {
          throw new Error("Email et mot de passe requis.");
        }

        signInUser(form.email, form.password);
        setMessage("Connexion réussie. Vous pouvez maintenant publier.");
        window.location.href = "/";
        return;
      }

      if (!form.fullName || !form.email || !form.password || !form.username) {
        throw new Error("Tous les champs requis sont obligatoires.");
      }

      signUpUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        username: form.username,
        city: form.city || "Paris",
        bio: form.bio || "Nouveau membre NOW.",
      });

      setMessage("Compte créé ! Vous pouvez maintenant te connecter.");
      setMode("login");
      setForm({
        fullName: "",
        email: "",
        password: "",
        username: "",
        city: "",
        bio: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-lg rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-2xl font-black text-white">
            N
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-violet-600">NOW</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">
            {mode === "login" ? "Connexion" : "Créer un compte"}
          </h1>
        </div>

        <div className="space-y-4">
          {mode === "signup" && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Nom complet</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pseudo</label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  placeholder="jeanphoto"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ville</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  placeholder="Paris"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full resize-none bg-transparent text-sm text-slate-900 outline-none"
                  rows={3}
                  placeholder="Dis en quelques mots qui tu es"
                />
              </div>
            </>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              placeholder="tu@now.app"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer un compte"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
          >
            {mode === "login" ? "Créer un compte" : "J’ai déjà un compte"}
          </button>

          {error && <div className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</div>}
          {message && <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</div>}

          <Link href="/" className="block text-center text-sm font-semibold text-violet-600 hover:text-violet-700">
            Retour au feed
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
