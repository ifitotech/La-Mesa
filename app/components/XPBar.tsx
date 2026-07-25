type XPBarProps = {
  currentXP: number;
  requiredXP: number;
};

export default function XPBar({
  currentXP,
  requiredXP,
}: XPBarProps) {
  const percentage = Math.min(
    (currentXP / requiredXP) * 100,
    100
  );

  return (
    <div className="mt-6">
      <div className="mb-2 flex justify-between text-sm text-slate-400">
        <span>Experiencia</span>
        <span>
          {currentXP} / {requiredXP} XP
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-950/90 ring-1 ring-slate-700/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
