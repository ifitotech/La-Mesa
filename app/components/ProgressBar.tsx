type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({
  current,
  total,
}: Props) {
  const width =
    ((current + 1) / total) * 100;

  return (
    <div className="h-3 rounded-full bg-slate-800">

      <div
        style={{ width: `${width}%` }}
        className="h-3 rounded-full bg-green-500 transition-all duration-500"
      />

    </div>
  );
}