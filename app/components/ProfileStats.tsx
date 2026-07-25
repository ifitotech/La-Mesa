type Props = {
  gamesPlayed: number;
  wins: number;
  losses: number;
  trophies: number;
};

export default function ProfileStats({
  gamesPlayed,
  wins,
  losses,
  trophies,
}: Props) {
  const winRate =
    gamesPlayed === 0
      ? 0
      : Math.round((wins / gamesPlayed) * 100);

  const cards = [
    {
      title: "Partidas",
      value: gamesPlayed,
    },
    {
      title: "Victorias",
      value: wins,
    },
    {
      title: "Derrotas",
      value: losses,
    },
    {
      title: "Win Rate",
      value: `${winRate}%`,
    },
    {
      title: "Trofeos",
      value: trophies,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-blue-500"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}