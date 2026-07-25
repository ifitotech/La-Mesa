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
  status: "available" | "coming-soon";
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
    status: "available",
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
    status: "available",
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
    status: "available",
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
    status: "coming-soon",
    gameNight: true,
    icon: Dices,
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "cards",
    name: "Cartas",
    description: "Una colección de juegos de cartas para cada tipo de reunión.",
    minPlayers: 2,
    maxPlayers: 6,
    status: "coming-soon",
    gameNight: true,
    icon: Crown,
    accent: "from-pink-500 to-rose-600",
  },
  {
    id: "couples",
    name: "Entre nosotros",
    description: "Preguntas para parejas: recuerdos, risas, conexión y planes compartidos.",
    minPlayers: 2,
    maxPlayers: 2,
    status: "available",
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
    status: "available",
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
    status: "available",
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
