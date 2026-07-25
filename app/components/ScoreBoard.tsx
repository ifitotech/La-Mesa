import { Player } from "@/services/player";

type Props = {
  players: Player[];
  scores: Record<string, number>;
};

export default function ScoreBoard({
  players,
  scores,
}: Props) {
  const ranking = [...players].sort(
    (a, b) =>
      (scores[b.uid] ?? 0) -
      (scores[a.uid] ?? 0)
  );

  return (
    <div className="space-y-3">

      {ranking.map((player, index) => (
        <div
          key={player.uid}
          className="flex items-center justify-between rounded-xl bg-slate-900 p-4"
        >
          <span>
            #{index + 1} {player.displayName}
          </span>

          <span>
            {scores[player.uid] ?? 0}
          </span>
        </div>
      ))}

    </div>
  );
}