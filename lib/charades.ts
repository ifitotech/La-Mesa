export type Charade = { category: "Películas" | "Acciones" | "Animales" | "Vida diaria"; prompt: string };

export const charades: Charade[] = [
  { category: "Películas", prompt: "Una película de superhéroes" },
  { category: "Películas", prompt: "Una película de terror" },
  { category: "Películas", prompt: "Una película romántica" },
  { category: "Películas", prompt: "Una película de piratas" },
  { category: "Acciones", prompt: "Bailar salsa" },
  { category: "Acciones", prompt: "Cocinar una receta difícil" },
  { category: "Acciones", prompt: "Ganar la lotería" },
  { category: "Acciones", prompt: "Buscar señal de internet" },
  { category: "Animales", prompt: "Un gato que no quiere bañarse" },
  { category: "Animales", prompt: "Un perro persiguiendo su cola" },
  { category: "Animales", prompt: "Un gallo despertando a todos" },
  { category: "Animales", prompt: "Un pez fuera del agua" },
  { category: "Vida diaria", prompt: "Perder las llaves" },
  { category: "Vida diaria", prompt: "Llegar tarde a una fiesta" },
  { category: "Vida diaria", prompt: "Intentar abrir un frasco" },
  { category: "Vida diaria", prompt: "Hacerse una selfie perfecta" },
];

export function getCharades(category = "random") {
  const source = category === "random" ? charades : charades.filter((item) => item.category === category);
  return [...source].sort(() => Math.random() - 0.5);
}
