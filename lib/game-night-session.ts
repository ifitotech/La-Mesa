export type GameNightMode = "individual" | "teams";

export type GameNightParticipant = {
  id: string;
  name: string;
  score: number;
};

export type GameNightSession = {
  mode: GameNightMode;
  participants: GameNightParticipant[];
  triviaSeconds?: number;
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
