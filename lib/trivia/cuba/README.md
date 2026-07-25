# La Mesa — Trivia de Cuba

Paquete inicial con **600 preguntas originales**:

- 100 Frases populares
- 100 Clásicos de la infancia
- 100 Cultura general
- 100 Verdadero o falso
- 100 Deportes
- 100 Música

## Integración

Copia la carpeta al proyecto y habilita `resolveJsonModule` en `tsconfig.json`.

```ts
import { getCubaTriviaQuestions } from "./trivia/cuba";
const ronda = getCubaTriviaQuestions("musica", 10);
```

Cada pregunta incluye `id`, país, categoría, dificultad, tipo, opciones, índice correcto y explicación.

Estas preguntas son originales para La Mesa y no copian Cubanómetro. Conviene hacer una revisión editorial cubana antes de publicación comercial para ajustar regionalismos y matices generacionales.
