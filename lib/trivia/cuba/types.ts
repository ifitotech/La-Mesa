export type TriviaDifficulty = "easy" | "medium" | "hard";

export type TriviaCategory =
  | "frases_populares"
  | "clasicos_infancia"
  | "cultura_general"
  | "verdadero_falso"
  | "deportes"
  | "musica";

export interface TriviaQuestion {
  id: string;
  country: "CU";
  category: TriviaCategory;
  difficulty: TriviaDifficulty;
  type: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
