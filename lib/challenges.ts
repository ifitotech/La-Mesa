export type Challenge = { category: "Risas" | "Equipo" | "Creatividad"; prompt: string };

export const challenges: Challenge[] = [
  { category: "Risas", prompt: "Imita a un personaje famoso hasta que alguien lo adivine." },
  { category: "Risas", prompt: "Cuenta una anécdota graciosa en menos de 30 segundos." },
  { category: "Risas", prompt: "Haz una cara de sorpresa y manténla cinco segundos." },
  { category: "Risas", prompt: "Habla como presentador de televisión durante la próxima ronda." },
  { category: "Equipo", prompt: "Elige a alguien: inventen juntos un saludo secreto." },
  { category: "Equipo", prompt: "Con tu equipo, nombren cinco comidas favoritas en diez segundos." },
  { category: "Equipo", prompt: "Dile a alguien del grupo una cualidad que aprecias." },
  { category: "Equipo", prompt: "Todos votan por la canción que debería sonar ahora." },
  { category: "Creatividad", prompt: "Inventa el nombre de una película sobre esta Game Night." },
  { category: "Creatividad", prompt: "Crea un eslogan para La Mesa usando tres palabras." },
  { category: "Creatividad", prompt: "Describe una receta imposible con total seriedad." },
  { category: "Creatividad", prompt: "Dibuja un animal con los ojos cerrados y deja que adivinen cuál es." },
];

export function getChallenges(category = "random") {
  const source = category === "random" ? challenges : challenges.filter((challenge) => challenge.category === category);
  return [...source].sort(() => Math.random() - 0.5);
}
