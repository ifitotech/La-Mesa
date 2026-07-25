export type HeadsUpWord = {
  word: string;
  hint: string;
  country?: string;
};

const sharedWords: HeadsUpWord[] = [
  { word: "Dominó", hint: "Juego de fichas muy popular en la mesa" },
  { word: "Salsa", hint: "Ritmo latino y también acompaña la comida" },
  { word: "Arepa", hint: "Comida redonda hecha de maíz" },
  { word: "Béisbol", hint: "Deporte de bate, pelota y bases" },
  { word: "Karaoke", hint: "Cantar una canción leyendo la letra" },
  { word: "Fiesta", hint: "Reunión para celebrar y bailar" },
  { word: "Abuela", hint: "Mamá de tu mamá o papá" },
  { word: "Plátano", hint: "Fruta muy usada en la cocina latina" },
  { word: "Maracas", hint: "Instrumento que se sacude" },
  { word: "Telenovela", hint: "Serie de televisión llena de drama" },
  { word: "Helado", hint: "Postre frío y dulce" },
  { word: "Avión", hint: "Medio de transporte que vuela" },
  { word: "Cumpleaños", hint: "Día en que se celebra haber nacido" },
  { word: "Micrófono", hint: "Objeto para amplificar la voz" },
  { word: "Ajedrez", hint: "Juego de estrategia con rey y reina" },
  { word: "Café", hint: "Bebida caliente que ayuda a despertar" },
  { word: "Playa", hint: "Lugar con arena junto al mar" },
  { word: "Película", hint: "Historia que se ve en el cine" },
  { word: "Pizza", hint: "Comida redonda con queso" },
  { word: "Selfie", hint: "Foto que una persona se toma a sí misma" },
];

const localWords: Record<string, HeadsUpWord[]> = {
  CU: [{ word: "Malecón", hint: "Avenida junto al mar en La Habana" }, { word: "Son", hint: "Género musical cubano" }],
  PR: [{ word: "Coquí", hint: "Pequeña rana símbolo de Puerto Rico" }, { word: "Boricua", hint: "Forma de referirse a una persona puertorriqueña" }],
  DO: [{ word: "Merengue", hint: "Ritmo bailable dominicano" }, { word: "Mangú", hint: "Plato dominicano de plátano majado" }],
  MX: [{ word: "Mariachi", hint: "Conjunto musical tradicional mexicano" }, { word: "Taco", hint: "Tortilla doblada con relleno" }],
  CO: [{ word: "Cumbia", hint: "Ritmo y baile tradicional colombiano" }, { word: "Bandeja paisa", hint: "Plato típico abundante de Colombia" }],
  VE: [{ word: "Joropo", hint: "Música y baile tradicional venezolano" }, { word: "Cachapa", hint: "Preparación venezolana de maíz" }],
  ES: [{ word: "Flamenco", hint: "Música y baile tradicional de España" }, { word: "Paella", hint: "Arroz típico español" }],
  US: [{ word: "Broadway", hint: "Zona neoyorquina famosa por sus teatros" }, { word: "Béisbol", hint: "Deporte muy popular en Estados Unidos" }],
};

export function getHeadsUpWords(country: string) {
  return [...sharedWords, ...(localWords[country] ?? [])].sort(() => Math.random() - 0.5);
}
