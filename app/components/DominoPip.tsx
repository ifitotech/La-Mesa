type Props = {
  value: number;
};

const dots: Record<number, [number, number][]> = {
  0: [],
  1: [[2, 2]],
  2: [
    [1, 1],
    [3, 3],
  ],
  3: [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  4: [
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3],
  ],
  5: [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3],
  ],
  6: [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
};

export default function DominoPip({ value }: Props) {
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-1">
      {dots[value].map(([r, c], i) => (
        <div
          key={i}
          className="flex items-center justify-center"
          style={{
            gridRow: r,
            gridColumn: c,
          }}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
        </div>
      ))}
    </div>
  );
}