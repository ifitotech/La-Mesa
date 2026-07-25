export type GameNightMode = "solo" | "individual" | "teams";

export type GameNightParticipant = {
  id: string;
  name: string;
  score: number;
};

export type GameNightRound = {
  id: string;
  game: string;
  completedAt: string;
};

export type GameNightSession = {
  mode: GameNightMode;
  participants: GameNightParticipant[];
  triviaSeconds?: number;
  history?: GameNightRound[];
};

export const gameNightSessionKey = "la-mesa-game-night-session";

export function getGameNightSession(): GameNightSession | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(gameNightSessionKey);
    return saved ? JSON.parse(saved) as GameNightSession : null;
  } catch {
    return null;
  }
}

export function saveGameNightSession(session: GameNightSession) {
  window.localStorage.setItem(gameNightSessionKey, JSON.stringify(session));
}

export function clearGameNightSession() {
  window.localStorage.removeItem(gameNightSessionKey);
}

export function recordGameNightRound(session: GameNightSession, game: string): GameNightSession {
  const round: GameNightRound = {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${game}`,
    game,
    completedAt: new Date().toISOString(),
  };
  return { ...session, history: [...(session.history ?? []), round].slice(-12) };
}
