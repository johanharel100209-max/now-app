export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  city: string;
  avatarColor: string;
  points: number;
  streak: number;
  createdAt: string;
};

export type MediaType = "image" | "video";

export type PostItem = {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  location: string;
  caption: string;
  image: string;
  category: string;
  mediaType?: MediaType;
  country?: string;
  theme?: string;
  trendScore?: number;
  likes: number;
  comments: number;
  points: number;
  createdAt: string;
};

const USERS_KEY = "now_users";
const POSTS_KEY = "now_posts";
const ACTIVE_USER_KEY = "now_active_user";

const fallbackUsers: UserProfile[] = [
  {
    id: "user-lina",
    fullName: "Lina Moreau",
    email: "lina@now.app",
    password: "123456",
    username: "@lina.now",
    bio: "Photographe du moment, fan de défis colorés.",
    city: "Paris",
    avatarColor: "from-violet-500 to-pink-500",
    points: 1820,
    streak: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-milo",
    fullName: "Milo Kher",
    email: "milo@now.app",
    password: "123456",
    username: "@milo_s",
    bio: "Mème, café et challenge du jour.",
    city: "Lyon",
    avatarColor: "from-cyan-500 to-blue-500",
    points: 1740,
    streak: 7,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-zoe",
    fullName: "Zoé Martin",
    email: "zoe@now.app",
    password: "123456",
    username: "@zoephoto",
    bio: "Toujours à la recherche de la photo qui casse la routine.",
    city: "Marseille",
    avatarColor: "from-emerald-400 to-teal-500",
    points: 1920,
    streak: 9,
    createdAt: new Date().toISOString(),
  },
];

const fallbackPosts: PostItem[] = [
  {
    id: "post-1",
    userId: "user-lina",
    userName: "Lina Moreau",
    userHandle: "@lina.now",
    location: "Paris",
    caption: "Quand tu trouves le rouge parfait au bon moment. #RedAlert #NOW",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    category: "national",
    mediaType: "image",
    country: "France",
    theme: "street",
    trendScore: 98,
    likes: 1450,
    comments: 98,
    points: 180,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-2",
    userId: "user-milo",
    userName: "Milo Kher",
    userHandle: "@milo_s",
    location: "Lyon",
    caption: "Mon café de la journée + le mème non officiel du challenge.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    category: "international",
    mediaType: "image",
    country: "France",
    theme: "food",
    trendScore: 94,
    likes: 1980,
    comments: 134,
    points: 210,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-3",
    userId: "user-zoe",
    userName: "Zoé Martin",
    userHandle: "@zoephoto",
    location: "Marseille",
    caption: "Le plus drôle de mon cercle. Une photo qui aurait été impossible sans ce défi.",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    category: "publie",
    mediaType: "image",
    country: "France",
    theme: "danse",
    trendScore: 90,
    likes: 2770,
    comments: 219,
    points: 260,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-4",
    userId: "user-lina",
    userName: "Lina Moreau",
    userHandle: "@lina.now",
    location: "Tokyo",
    caption: "Tokyo night energy. Un peu de japonais, un peu de lumière, beaucoup de vibe.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    category: "international",
    mediaType: "image",
    country: "Japon",
    theme: "japonais",
    trendScore: 97,
    likes: 984,
    comments: 52,
    points: 170,
    createdAt: new Date().toISOString(),
  },
];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeedData() {
  const users = readStorage<UserProfile[]>(USERS_KEY, fallbackUsers);
  const posts = readStorage<PostItem[]>(POSTS_KEY, fallbackPosts);

  if (!users.length) writeStorage(USERS_KEY, fallbackUsers);
  if (!posts.length) writeStorage(POSTS_KEY, fallbackPosts);

  return {
    users: readStorage(USERS_KEY, fallbackUsers),
    posts: readStorage(POSTS_KEY, fallbackPosts),
  };
}

export function getUsers(): UserProfile[] {
  return readStorage<UserProfile[]>(USERS_KEY, fallbackUsers);
}

export function getPosts(): PostItem[] {
  return readStorage<PostItem[]>(POSTS_KEY, fallbackPosts);
}

export function setActiveUser(userId: string | null) {
  if (typeof window === "undefined") return;
  if (userId) {
    window.localStorage.setItem(ACTIVE_USER_KEY, userId);
    return;
  }
  window.localStorage.removeItem(ACTIVE_USER_KEY);
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const activeId = window.localStorage.getItem(ACTIVE_USER_KEY);
  if (!activeId) return null;
  return getUsers().find((user) => user.id === activeId) ?? null;
}

export function signUpUser(input: {
  fullName: string;
  email: string;
  password: string;
  username: string;
  city?: string;
  bio?: string;
}) {
  const users = getUsers();
  const emailExists = users.some((user) => user.email.toLowerCase() === input.email.toLowerCase());

  if (emailExists) {
    throw new Error("Un compte avec cet email existe déjà.");
  }

  const normalizedUsername = input.username.startsWith("@") ? input.username : `@${input.username}`;

  const newUser: UserProfile = {
    id: `user-${Date.now()}`,
    fullName: input.fullName,
    email: input.email,
    password: input.password,
    username: normalizedUsername,
    bio: input.bio ?? "Nouvel utilisateur NOW.",
    city: input.city ?? "Paris",
    avatarColor: [
      "from-violet-500 to-pink-500",
      "from-amber-400 to-orange-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-400 to-teal-500",
      "from-fuchsia-500 to-pink-500",
    ][Math.floor(Math.random() * 5)],
    points: 1200,
    streak: 1,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeStorage(USERS_KEY, users);
  setActiveUser(newUser.id);

  return newUser;
}

export function signInUser(email: string, password: string) {
  const users = getUsers();
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
  );

  if (!user) {
    throw new Error("Identifiants incorrects.");
  }

  setActiveUser(user.id);
  return user;
}

export function createPost(input: {
  userId: string;
  caption: string;
  image: string;
  category: string;
  location: string;
  mediaType?: MediaType;
  country?: string;
  theme?: string;
  trendScore?: number;
}) {
  const users = getUsers();
  const user = users.find((item) => item.id === input.userId);
  if (!user) throw new Error("Utilisateur introuvable.");

  const posts = getPosts();
  const newPost: PostItem = {
    id: `post-${Date.now()}`,
    userId: input.userId,
    userName: user.fullName,
    userHandle: user.username,
    location: input.location || user.city,
    caption: input.caption,
    image: input.image,
    category: input.category,
    mediaType: input.mediaType ?? "image",
    country: input.country ?? user.city || "France",
    theme: input.theme ?? "street",
    trendScore: input.trendScore ?? 80,
    likes: 0,
    comments: 0,
    points: 100,
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  writeStorage(POSTS_KEY, posts);

  user.points += 100;
  user.streak += 1;
  writeStorage(USERS_KEY, users);

  return newPost;
}

export function getFeedPosts() {
  const posts = getPosts();
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCurrentUserPosts() {
  const user = getCurrentUser();
  if (!user) return [];
  return getFeedPosts().filter((post) => post.userId === user.id);
}

export function logoutUser() {
  setActiveUser(null);
}

export function buildProfileSummary(user: UserProfile | null) {
  if (!user) return null;
  return {
    initials: user.fullName
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    postsCount: getCurrentUserPosts().length,
    level: user.points >= 2000 ? "Master" : user.points >= 1500 ? "Expert" : "Nouveau",
  };
}

