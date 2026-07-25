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
  const shuffled = [...source];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return typeof limit === "number" ? shuffled.slice(0, Math.max(0, limit)) : shuffled;
}

export function isCorrectAnswer(question: TriviaQuestion, selectedAnswer: number): boolean {
  return question.correctAnswer === selectedAnswer;
}
