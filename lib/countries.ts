export type Country = {
  code: string;
  name: string;
  flag: string;
  greeting: string;
  color: string;
};

export const countries: Country[] = [
  {
    code: "CU",
    name: "Cuba",
    flag: "🇨🇺",
    greeting: "¿Qué bolá, asere?",
    color: "#2563eb",
  },
  {
    code: "DO",
    name: "República Dominicana",
    flag: "🇩🇴",
    greeting: "¿Qué lo qué?",
    color: "#dc2626",
  },
  {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    greeting: "¿Qué onda?",
    color: "#16a34a",
  },
  {
    code: "PR",
    name: "Puerto Rico",
    flag: "🇵🇷",
    greeting: "¿Qué es la que hay?",
    color: "#7c3aed",
  },
  {
    code: "US",
    name: "Estados Unidos",
    flag: "🇺🇸",
    greeting: "Welcome!",
    color: "#1d4ed8",
  },
];