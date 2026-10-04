# NOW App

Une application de type BeReal / Instagram social orientée défis photo, points et feed d'amis.

## Concept

- Défis quotidiens, nationaux et mondiaux
- Photos spontanées avec thème précis
- Système de points et classement
- Feed d'amis, feed global, questionnaires humoristiques
- Expérience mobile-first et très visuelle

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase (auth + storage + database)

## Démarrage rapide

```bash
npm install
npm run dev
```

Puis ouvrez : http://localhost:3000

## Variables d'environnement

Crée un fichier `.env.local` avec :

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Structure du projet

- `app/` : pages et layout
- `components/` : composants UI
- `lib/` : données mock et utilitaires

## MVP inclus

- Landing / feed principal
- Défis du jour
- Classement des points
- Liste d'amis
- Profil utilisateur
- Section challenge photo

## Prochaines étapes

- Intégration Supabase Auth
- Upload de photos
- Likes / commentaires / feed temps réel
- Défis nationaux et mondiaux
- Notifications push
