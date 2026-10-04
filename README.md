# NOW App

Une application sociale photo inspirée de BeReal, pensée pour des défis du jour, des mèmes, des défis nationaux et mondiaux, un système de points et un feed d'amis.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## Démarrage rapide

```bash
npm install
npm run dev
```

## Variables d'environnement

Crée un fichier `.env.local` avec :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Fonctionnalités MVP

- Feed social style Instagram
- Défis de l'heure
- Système de points
- Classement des amis
- Profil utilisateur
- Workflow de publication photo

## Structure

- `app/` : écrans de l'application
- `components/` : UI réutilisable
- `lib/` : utilitaires, données et clients Supabase

## Prochaines étapes

- Authentification Supabase
- Upload d'images avec storage
- Likes / commentaires / feed temps réel
- Défis nationaux et mondiaux
- Notifications et profil complet
