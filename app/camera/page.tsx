'use client';

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      setMessage("Connexion réussie !");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage("Compte créé ! Vérifie ton email pour confirmer l'inscription.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de créer le compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-2xl font-black text-white">
            N
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-violet-600">NOW</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Connexion</h1>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              placeholder="tu@now.app"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Chargement..." : "Se connecter"}
            </button>

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full rounded-full bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-500 disabled:opacity-60"
            >
              Créer un compte
            </button>
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</div>
          )}

          {message && (
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</div>
          )}

          <Link href="/" className="block text-center text-sm font-semibold text-violet-600 hover:text-violet-700">
            Retour au feed
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
