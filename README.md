# La Mesa · Game Night

Aplicación de juegos sociales creada con Next.js y Firebase. Incluye Game
Night local, partidas online, perfiles, amigos, clasificación, tienda y
recompensas.

## Desarrollo local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env.local` y completa las seis variables
   `NEXT_PUBLIC_FIREBASE_*` desde Firebase Console → Configuración del proyecto
   → Tus apps → App web.

3. Inicia la aplicación:

   ```bash
   npm run dev
   ```

4. Abre `http://localhost:3000`.

## Firebase

Antes de probar cuentas reales:

- Habilita Email/Password y Google en Authentication → Métodos de acceso.
- Agrega el dominio de Vercel en Authentication → Dominios autorizados.
- Publica `firestore.rules`, `firestore.indexes.json` y `storage.rules`.

Con Firebase CLI:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## Vercel

Agrega las variables de `.env.example` en Settings → Environment Variables
para Production y Preview. Después crea un nuevo deployment para que Next.js
incorpore los valores públicos durante la compilación.

## Verificación

```bash
npm run lint
npm test -- --run
npm run build
```

Los identificadores de AdSense son opcionales. No son necesarios para probar
los juegos o Firebase.
