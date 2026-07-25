export type GameRoom = {
  players: unknown[];

  currentQuestion: number;

  answers: Record<string, number>;

  scores: Record<string, number>;
};
