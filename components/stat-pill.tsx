type FriendCardProps = {
  name: string;
  badge: string;
  points: number;
  streak: string;
};

export function FriendCard({ name, badge, points, streak }: FriendCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white">
          {name.slice(0, 2).toUpperCase()}
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-violet-700">
          {badge}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-slate-900">{name}</h3>
      <div className="mt-3 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Points</span>
          <strong className="font-bold text-slate-900">{points}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Streak</span>
          <strong className="font-bold text-slate-900">{streak}</strong>
        </div>
      </div>
    </div>
  );
}
