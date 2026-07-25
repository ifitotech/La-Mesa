import frasesPopulares from "./data/frases_populares.json";
import clasicosInfancia from "./data/clasicos_infancia.json";
import culturaGeneral from "./data/cultura_general.json";
import verdaderoFalso from "./data/verdadero_falso.json";
import deportes from "./data/deportes.json";
import musica from "./data/musica.json";
import type { TriviaCategory, TriviaQuestion } from "./types";

export const cubaTriviaByCategory: Record<TriviaCategory, TriviaQuestion[]> = {
  frases_populares: frasesPopulares as TriviaQuestion[],
  clasicos_infancia: clasicosInfancia as TriviaQuestion[],
  cultura_general: culturaGeneral as TriviaQuestion[],
  verdadero_falso: verdaderoFalso as TriviaQuestion[],
  deportes: deportes as TriviaQuestion[],
  musica: musica as TriviaQuestion[],
};

export const cubaTriviaQuestions: TriviaQuestion[] = Object.values(cubaTriviaByCategory).flat();

export function getCubaTriviaQuestions(category?: TriviaCategory, limit?: number): TriviaQuestion[] {
  const source = category ? cubaTriviaByCategory[category] : cubaTriviaQuestions;
  const ordered = [...source].sort((a, b) => a.id.localeCompare(b.id));
  return typeof limit === "number" ? ordered.slice(0, Math.max(0, limit)) : ordered;
}

export function isCorrectAnswer(question: TriviaQuestion, selectedAnswer: number): boolean {
  return question.correctAnswer === selectedAnswer;
}
