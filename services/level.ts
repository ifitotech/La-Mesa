export type LevelInfo = {
  level: number;
  requiredXP: number;
  title: string;
};

const LEVELS: LevelInfo[] = [
  {
    level: 1,
    requiredXP: 100,
    title: "Novato",
  },
  {
    level: 2,
    requiredXP: 250,
    title: "Aprendiz",
  },
  {
    level: 3,
    requiredXP: 450,
    title: "Competidor",
  },
  {
    level: 4,
    requiredXP: 700,
    title: "Experto",
  },
  {
    level: 5,
    requiredXP: 1000,
    title: "Maestro",
  },
  {
    level: 6,
    requiredXP: 1400,
    title: "Leyenda",
  },
];

export function getLevelInfo(level: number): LevelInfo {
  const info = LEVELS.find((item) => item.level === level);

  return (
    info ??
    {
      level,
      requiredXP: level * 250,
      title: "Leyenda",
    }
  );
}

export function getLevelForXP(xp: number): number {
  const knownLevel = [...LEVELS].reverse().find((item) => xp >= item.requiredXP);
  if (knownLevel) return knownLevel.level;
  return 1;
}
