export type CountryProfile = { code: string; name: string; flag: string; greeting: string; accent: string; triviaName: string; language: "es" | "en" };

export const countryProfiles: CountryProfile[] = [
  { code: "CU", name: "Cuba", flag: "🇨🇺", greeting: "¿Qué bolá?", accent: "from-blue-500 to-red-500", triviaName: "Trivia Cubano", language: "es" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷", greeting: "¿Qué es la que hay?", accent: "from-red-500 to-blue-600", triviaName: "Trivia Boricua", language: "es" },
  { code: "DO", name: "República Dominicana", flag: "🇩🇴", greeting: "¿Qué lo qué?", accent: "from-blue-500 to-red-500", triviaName: "Trivia Dominicano", language: "es" },
  { code: "MX", name: "México", flag: "🇲🇽", greeting: "¿Qué onda?", accent: "from-emerald-500 to-red-500", triviaName: "Trivia Mexicano", language: "es" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", greeting: "¡Quiubo!", accent: "from-yellow-400 to-blue-600", triviaName: "Trivia Colombiano", language: "es" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", greeting: "¿Cómo estás, pana?", accent: "from-yellow-400 to-blue-600", triviaName: "Trivia Venezolano", language: "es" },
  { code: "US", name: "United States", flag: "🇺🇸", greeting: "Welcome to La Mesa", accent: "from-blue-600 to-red-500", triviaName: "American Trivia", language: "en" },
  { code: "ES", name: "España", flag: "🇪🇸", greeting: "¿Qué tal?", accent: "from-red-500 to-amber-400", triviaName: "Trivia Español", language: "es" },
];

export function getCountryProfile(code?: string): CountryProfile { return countryProfiles.find((country) => country.code === code) ?? countryProfiles[0]; }
