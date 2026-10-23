export const challengeCards = [
  {
    id: "national",
    title: "Défi national du jour",
    description: "Trouve un objet rouge et captures-le dans le moment le plus spontané possible.",
    points: 120,
    scope: "National",
    timeLeft: "2h 13m",
    emoji: "🔴",
  },
  {
    id: "international",
    title: "Défi international du jour",
    description: "Participe à un défi mondial avec une idée créative, absurde et ultra visuelle.",
    points: 150,
    scope: "International",
    timeLeft: "5h 40m",
    emoji: "🌍",
  },
  {
    id: "challenge",
    title: "Le meilleur mème",
    description: "Crée un moment hilarant en photo qui ferait rire toute ta famille en 3 secondes.",
    points: 200,
    scope: "Amis",
    timeLeft: "1h 10m",
    emoji: "😂",
  },
  {
    id: "ville",
    title: "Mon lieu préféré",
    description: "Montre un endroit qui te ressemble le plus et qui raconte une histoire.",
    points: 90,
    scope: "Ville",
    timeLeft: "3h 45m",
    emoji: "📍",
  },
];

export const feedPosts = [
  {
    id: 1,
    user: "Lina",
    handle: "@lina.now",
    location: "Paris",
    points: 180,
    caption: "Quand tu trouves le rouge parfait au bon moment. #RedAlert #NOW",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    likes: 1450,
    comments: 98,
  },
  {
    id: 2,
    user: "Milo",
    handle: "@milo_s",
    location: "Lyon",
    points: 210,
    caption: "Mon café de la journée + le mème non officiel du challenge. #DailyChallenge",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    likes: 1980,
    comments: 134,
  },
  {
    id: 3,
    user: "Zoé",
    handle: "@zoephoto",
    location: "Marseille",
    points: 260,
    caption: "Le plus drôle de mon cercle. Une photo qui aurai été impossible sans ce défi. #MemeChallenge",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    likes: 2770,
    comments: 219,
  },
];

export const leaderboard = [
  { name: "Samira", points: 2480, badge: "Master du rouge" },
  { name: "Jules", points: 2360, badge: "Mème king" },
  { name: "Nina", points: 2210, badge: "Challenge queen" },
  { name: "Theo", points: 2040, badge: "Streak 8 jours" },
];

export const friends = [
  { name: "Lina", badge: "Rouge", points: 1820, streak: "8 jours" },
  { name: "Milo", badge: "Mème", points: 1740, streak: "7 jours" },
  { name: "Zoé", badge: "Viral", points: 1920, streak: "9 jours" },
  { name: "Rayan", badge: "Voyage", points: 1605, streak: "6 jours" },
];

