type FeedCardProps = {
  id: number;
  user: string;
  handle: string;
  location: string;
  points: number;
  caption: string;
  image: string;
  likes: number;
  comments: number;
};

export function FeedCard({ user, handle, location, points, caption, image, likes, comments }: FeedCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-black text-white">
            {user.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900">{user}</p>
            <p className="text-xs text-slate-500">{handle} • {location}</p>
          </div>
        </div>
        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">+{points} pts</span>
      </div>

      <img src={image} alt={caption} className="h-72 w-full object-cover" />

      <div className="space-y-3 p-4">
        <p className="text-sm leading-6 text-slate-700">{caption}</p>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>💜 {likes}</span>
          <span>💬 {comments}</span>
          <span>⚡ Défi validé</span>
        </div>
      </div>
    </article>
  );
}
