type ChallengeCardProps = {
  title: string;
  description: string;
  points: number;
  scope: string;
  timeLeft: string;
  emoji: string;
};

export function ChallengeCard({ title, description, points, scope, timeLeft, emoji }: ChallengeCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-4 text-white">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
          {scope}
        </span>
        <span className="text-sm font-bold">+{points} pts</span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <span className="text-2xl">{emoji}</span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{description}</p>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm">
          <span className="text-slate-500">Temps restant</span>
          <strong className="font-bold text-slate-900">{timeLeft}</strong>
        </div>
      </div>
    </article>
  );
}
