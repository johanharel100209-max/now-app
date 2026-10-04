type StatPillProps = {
  label: string;
  value: string;
  accent: "violet" | "coral" | "emerald";
};

const accentMap = {
  violet: "bg-violet-500/20 text-violet-100 border-violet-300/20",
  coral: "bg-rose-500/20 text-rose-100 border-rose-300/20",
  emerald: "bg-emerald-500/20 text-emerald-100 border-emerald-300/20",
};

export function StatPill({ label, value, accent }: StatPillProps) {
  return (
    <div className={`rounded-2xl border p-3 ${accentMap[accent]}`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/75">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
