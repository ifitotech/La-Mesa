export type CouplesQuestion = {
  id: string;
  category: "Conexión" | "Recuerdos" | "Risas" | "Sueños";
  prompt: string;
};

export const couplesQuestions: CouplesQuestion[] = [
  { id: "connection-1", category: "Conexión", prompt: "¿Qué pequeño detalle te hace sentir más querido/a?" },
  { id: "connection-2", category: "Conexión", prompt: "¿Qué admiras de la otra persona que quizá no dices con frecuencia?" },
  { id: "connection-3", category: "Conexión", prompt: "¿Qué actividad sencilla les gustaría hacer más juntos?" },
  { id: "memories-1", category: "Recuerdos", prompt: "¿Cuál ha sido su momento más divertido juntos hasta ahora?" },
  { id: "memories-2", category: "Recuerdos", prompt: "¿Qué canción te recuerda a ustedes y por qué?" },
  { id: "memories-3", category: "Recuerdos", prompt: "¿Qué comida, lugar u olor te trae un recuerdo bonito de la relación?" },
  { id: "fun-1", category: "Risas", prompt: "Si fueran un equipo en un programa de concursos, ¿qué nombre tendrían?" },
  { id: "fun-2", category: "Risas", prompt: "¿Qué superpoder sería más útil para ustedes en una Game Night?" },
  { id: "fun-3", category: "Risas", prompt: "¿Qué hábito gracioso de la otra persona ya conoces demasiado bien?" },
  { id: "dreams-1", category: "Sueños", prompt: "¿Qué plan les ilusiona hacer juntos este año?" },
  { id: "dreams-2", category: "Sueños", prompt: "Si pudieran viajar mañana, ¿a dónde irían y qué harían primero?" },
  { id: "dreams-3", category: "Sueños", prompt: "¿Qué tradición propia les gustaría crear como pareja?" },
];

export function getCouplesQuestions(category = "random") {
  const source = category === "random"
    ? couplesQuestions
    : couplesQuestions.filter((question) => question.category === category);

  return [...source].sort(() => Math.random() - 0.5);
}
