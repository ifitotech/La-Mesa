import { levels } from "./levels";

export function getLevelTitle(level: number) {
  const index = Math.floor(level / 10);

  return levels[Math.min(index, levels.length - 1)];
}