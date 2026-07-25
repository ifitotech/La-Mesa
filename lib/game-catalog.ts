import {
  Brain,
  BookOpen,
  Crown,
  Dices,
  Grid3X3,
  Hand,
  Heart,
  Layers3,
  Flame,
  Theater,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type GameId =
  | "trivia"
  | "domino"
  | "heads-up"
  | "bingo"
  | "parchis"
  | "cards"
  | "couples"
  | "memory"
  | "charades"
  | "challenges"
  | "bible";

export type GameDefinition = {
  id: GameId;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  status: "available" | "beta" | "coming-soon";
  gameNight: boolean;
  icon: LucideIcon;
  accent: string;
};

export const gameCatalog: GameDefinition[] = [
  {
    id: "trivia",
    name: "Trivia local",
    description: "Preguntas de cultura, música, comida y tradiciones de tu país.",
    minPlayers: 1,
    maxPlayers: 8,
    status: "available",
    gameNight: true,
    icon: Brain,
    accent: "from-violet-600 to-fuchsia-600",
  },
  {
    id: "bible",
    name: "Trivia Bíblica",
    description: "Preguntas para compartir, aprender y disfrutar en familia.",
    minPlayers: 1,
    maxPlayers: 12,
    status: "beta",
    gameNight: false,
    icon: BookOpen,
    accent: "from-amber-500 to-orange-700",
  },
  {
    id: "domino",
    name: "Dominó",
    description: "El clásico de la mesa, preparado para partidas con amigos.",
    minPlayers: 2,
    maxPlayers: 4,
    status: "beta",
    gameNight: true,
    icon: Grid3X3,
    accent: "from-cyan-600 to-blue-600",
  },
  {
    id: "heads-up",
    name: "Heads Up",
    description: "Pistas, risas y palabras locales para toda la sala.",
    minPlayers: 2,
    maxPlayers: 12,
    status: "beta",
    gameNight: false,
    icon: Hand,
    accent: "from-orange-500 to-rose-500",
  },
  {
    id: "bingo",
    name: "Bingo",
    description: "Un favorito familiar para jugar juntos desde cualquier lugar.",
    minPlayers: 2,
    maxPlayers: 20,
    status: "available",
    gameNight: false,
    icon: Trophy,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "parchis",
    name: "Parchís",
    description: "Carreras, estrategia y revancha para la próxima Game Night.",
    minPlayers: 2,
    maxPlayers: 4,
    status: "beta",
    gameNight: false,
    icon: Dices,
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "cards",
    name: "Blackjack 21",
    description: "Blackjack clásico contra el crupier, sin apuestas y con reglas reales.",
    minPlayers: 1,
    maxPlayers: 1,
    status: "available",
    gameNight: false,
    icon: Crown,
    accent: "from-pink-500 to-rose-600",
  },
  {
    id: "couples",
    name: "Entre nosotros",
    description: "Preguntas para parejas: recuerdos, risas, conexión y planes compartidos.",
    minPlayers: 2,
    maxPlayers: 2,
    status: "beta",
    gameNight: false,
    icon: Heart,
    accent: "from-rose-500 to-pink-600",
  },
  {
    id: "memory",
    name: "Memoria",
    description: "Encuentra las parejas de cartas antes de que se acabe la ronda.",
    minPlayers: 1,
    maxPlayers: 6,
    status: "available",
    gameNight: false,
    icon: Layers3,
    accent: "from-sky-500 to-indigo-600",
  },
  {
    id: "charades",
    name: "Mímica",
    description: "Actúa, adivina y ríete con retos para toda la familia.",
    minPlayers: 2,
    maxPlayers: 12,
    status: "beta",
    gameNight: false,
    icon: Theater,
    accent: "from-amber-500 to-rose-600",
  },
  {
    id: "challenges",
    name: "Retos",
    description: "Cartas rápidas para romper el hielo y animar la Game Night.",
    minPlayers: 2,
    maxPlayers: 12,
    status: "beta",
    gameNight: false,
    icon: Flame,
    accent: "from-fuchsia-500 to-rose-600",
  },
];

export function getGameDefinition(gameId: GameId): GameDefinition {
  const game = gameCatalog.find(({ id }) => id === gameId);

  if (!game) {
    throw new Error("Juego no encontrado.");
  }

  return game;
}

// The United States catalog is curated separately. Do not add games here
// unless its dedicated catalog has been approved.
export function isGameEnabledForCountry(gameId: GameId, countryCode: string) {
  return countryCode !== "US" || gameId !== "parchis";
}

export function isGameAvailableOnline(gameId: GameId) {
  return gameId === "trivia";
}

const englishGameCopy: Record<GameId, { name: string; description: string }> = {
  trivia: { name: "Local Trivia", description: "Culture, music, food, and traditions from your selected country." },
  bible: { name: "Bible Quiz", description: "Questions to learn, share, and enjoy with family." },
  domino: { name: "Dominoes", description: "The table classic, ready for games with friends." },
  "heads-up": { name: "Heads Up", description: "Clues, laughs, and local words for everyone." },
  bingo: { name: "Bingo", description: "A family favorite to play together." },
  parchis: { name: "Parcheesi", description: "Racing, strategy, and rematches for your next game night." },
  cards: { name: "Blackjack 21", description: "Classic blackjack against the dealer, with no betting and real rules." },
  couples: { name: "Between Us", description: "Questions for couples: memories, laughter, connection, and shared plans." },
  memory: { name: "Memory", description: "Find the matching cards before the round is over." },
  charades: { name: "Charades", description: "Act, guess, and laugh together with the whole family." },
  challenges: { name: "Challenges", description: "Quick cards to break the ice and energize game night." },
};

export function getGameCopy(game: GameDefinition, english: boolean) { return english ? englishGameCopy[game.id] : { name: game.name, description: game.description }; }
