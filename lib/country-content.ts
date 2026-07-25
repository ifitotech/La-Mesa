export type LocalizedTriviaQuestion = {
  id: string;
  country: string;
  category: string;
  question: string;
  options: string[];
  answer: number;
};

import {
  getCubaTriviaQuestions,
} from "@/lib/trivia/cuba";
import type { TriviaCategory as CubaTriviaCategory } from "@/lib/trivia/cuba/types";

const cubaCategoryLabels: Record<CubaTriviaCategory, string> = {
  frases_populares: "Frases populares",
  clasicos_infancia: "Clásicos de la infancia",
  cultura_general: "Cultura cubana",
  verdadero_falso: "Verdadero o falso",
  deportes: "Deportes cubanos",
  musica: "Música cubana",
};

function getCubanTrivia(category = RANDOM_CATEGORY) {
  const rawCategory = Object.entries(cubaCategoryLabels).find(([, label]) => label === category)?.[0] as CubaTriviaCategory | undefined;
  return getCubaTriviaQuestions(rawCategory).map((question) => ({
    id: question.id,
    country: question.country,
    category: cubaCategoryLabels[question.category],
    question: question.question,
    options: question.options,
    answer: question.correctAnswer,
  }));
}

const countryQuestions: Record<string, LocalizedTriviaQuestion[]> = {
  CU: [
    {
      id: "cu-1",
      country: "CU",
      category: "Cultura cubana",
      question: "¿Cuál es la capital de Cuba?",
      options: ["Santiago de Cuba", "La Habana", "Camagüey", "Santa Clara"],
      answer: 1,
    },
    {
      id: "cu-2",
      country: "CU",
      category: "Música",
      question: "¿Qué género musical cubano es una raíz importante de la salsa?",
      options: ["Son cubano", "Tango", "Merengue", "Flamenco"],
      answer: 0,
    },
  ],
  MX: [
    {
      id: "mx-1",
      country: "MX",
      category: "Cultura mexicana",
      question: "¿Qué flor es un símbolo tradicional del Día de Muertos?",
      options: ["Rosa", "Cempasúchil", "Orquídea", "Margarita"],
      answer: 1,
    },
  ],
  DO: [
    {
      id: "do-1",
      country: "DO",
      category: "Música",
      question: "¿Cuál es uno de los ritmos más representativos de República Dominicana?",
      options: ["Merengue", "Bolero", "Cumbia", "Joropo"],
      answer: 0,
    },
  ],
  PR: [
    {
      id: "pr-1",
      country: "PR",
      category: "Geografía",
      question: "¿Cuál es la capital de Puerto Rico?",
      options: ["Ponce", "Mayagüez", "San Juan", "Arecibo"],
      answer: 2,
    },
  ],
  CO: [
    {
      id: "co-1",
      country: "CO",
      category: "Cultura colombiana",
      question: "¿Cuál es la capital de Colombia?",
      options: ["Medellín", "Cali", "Bogotá", "Cartagena"],
      answer: 2,
    },
  ],
  VE: [
    {
      id: "ve-1",
      country: "VE",
      category: "Geografía venezolana",
      question: "¿Cuál es la capital de Venezuela?",
      options: ["Maracaibo", "Caracas", "Valencia", "Mérida"],
      answer: 1,
    },
  ],
  ES: [
    {
      id: "es-1",
      country: "ES",
      category: "Cultura española",
      question: "¿Cuál es la capital de España?",
      options: ["Barcelona", "Sevilla", "Madrid", "Valencia"],
      answer: 2,
    },
  ],
  US: [
    {
      id: "us-1",
      country: "US",
      category: "Latinos en Estados Unidos",
      question: "¿Qué idioma se habla junto al inglés en muchas comunidades latinas de Estados Unidos?",
      options: ["Alemán", "Español", "Japonés", "Italiano"],
      answer: 1,
    },
  ],
};

const generalQuestions: LocalizedTriviaQuestion[] = [
  {
    id: "general-1",
    country: "general",
    category: "Latinoamérica",
    question: "¿Qué idioma comparten la mayoría de los países de Latinoamérica?",
    options: ["Portugués", "Español", "Francés", "Italiano"],
    answer: 1,
  },
  {
    id: "general-2",
    country: "general",
    category: "Game Night",
    question: "¿Qué hace especial una Game Night?",
    options: ["Jugar y compartir", "Jugar en silencio", "No hablar", "Solo mirar"],
    answer: 0,
  },
  {
    id: "general-3",
    country: "general",
    category: "Geografía",
    question: "¿Qué océano baña gran parte de la costa occidental de América?",
    options: ["Atlántico", "Pacífico", "Índico", "Ártico"],
    answer: 1,
  },
  {
    id: "general-4",
    country: "general",
    category: "Cultura",
    question: "¿Qué se busca principalmente en una reunión de juegos?",
    options: ["Compartir", "Trabajar", "Dormir", "Competir sin hablar"],
    answer: 0,
  },
  {
    id: "general-5",
    country: "general",
    category: "Música",
    question: "¿Cuántas cuerdas tiene una guitarra clásica?",
    options: ["Cuatro", "Cinco", "Seis", "Ocho"],
    answer: 2,
  },
  {
    id: "general-6",
    country: "general",
    category: "Comida",
    question: "¿Cuál de estos ingredientes es una legumbre?",
    options: ["Arroz", "Frijol", "Maíz", "Plátano"],
    answer: 1,
  },
  {
    id: "general-7",
    country: "general",
    category: "Deportes",
    question: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
    options: ["7", "9", "11", "12"],
    answer: 2,
  },
  {
    id: "general-8",
    country: "general",
    category: "Juegos",
    question: "En dominó, ¿qué se busca al colocar una ficha?",
    options: ["Que encaje con la mesa", "Que sea la más bonita", "Que tenga más puntos", "Que sea doble"],
    answer: 0,
  },
  {
    id: "general-9",
    country: "general",
    category: "Refranes",
    question: "Completa el refrán: “Más vale pájaro en mano que…”",
    options: ["cien volando", "un gato dormido", "nada en la mesa", "dos amigos"],
    answer: 0,
  },
  {
    id: "general-10",
    country: "general",
    category: "Refranes",
    question: "¿Qué significa “Camarón que se duerme se lo lleva la corriente”?",
    options: ["Hay que descansar", "Hay que estar atento", "Hay que nadar", "Hay que comer mariscos"],
    answer: 1,
  },
  {
    id: "general-11",
    country: "general",
    category: "Frases populares",
    question: "¿Qué expresa normalmente la frase “estar en las nubes”?",
    options: ["Estar distraído", "Tener frío", "Volar", "Estar de viaje"],
    answer: 0,
  },
  {
    id: "general-12",
    country: "general",
    category: "Música",
    question: "¿Qué instrumento tiene teclas blancas y negras?",
    options: ["Tambor", "Piano", "Maracas", "Trompeta"],
    answer: 1,
  },
  {
    id: "general-13",
    country: "general",
    category: "Cívica",
    question: "¿Qué poder del Estado suele crear las leyes?",
    options: ["Legislativo", "Judicial", "Deportivo", "Musical"],
    answer: 0,
  },
  {
    id: "general-14",
    country: "general",
    category: "Deportes",
    question: "¿En qué deporte se usa una canasta y un balón?",
    options: ["Béisbol", "Baloncesto", "Tenis", "Natación"],
    answer: 1,
  },
  {
    id: "general-15",
    country: "general",
    category: "Familia",
    question: "¿Cuál es una buena regla para una Game Night familiar?",
    options: ["Respetar a todos", "No explicar las reglas", "Ocultar el juego", "No celebrar"],
    answer: 0,
  },
];

export const RANDOM_CATEGORY = "random";

export function getTriviaCategories(country: string) {
  if (country === "CU") {
    return [RANDOM_CATEGORY, ...Object.values(cubaCategoryLabels)];
  }

  const categories = new Set(
    [...(countryQuestions[country] ?? []), ...generalQuestions]
      .map((question) => question.category)
  );

  return [RANDOM_CATEGORY, ...Array.from(categories).sort((a, b) => a.localeCompare(b, "es"))];
}

export function getLocalizedTrivia(
  country: string,
  amount = 10,
  category = RANDOM_CATEGORY
) {
  if (country === "CU") {
    return getCubanTrivia(category).slice(0, amount);
  }

  const localized = countryQuestions[country] ?? [];
  const questions = [...localized, ...generalQuestions]
    .filter((question) => category === RANDOM_CATEGORY || question.category === category)
    .sort(() => Math.random() - 0.5);

  return questions.slice(0, Math.min(amount, questions.length));
}
