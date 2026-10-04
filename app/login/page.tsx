export type Challenge = {
  id: string;
  title: string;
  description: string;
  type: "national" | "global" | "friends";
  points: number;
  endsAt: string;
};

export type SocialPost = {
  id: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export type Profile = {
  id: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  points: number;
  streak: number;
};
