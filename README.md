# FestiApp

Aplicación React (Vite) que consume una API REST simulada con JSON Server.
Recursos: `/artistas` y `/presentaciones` (relacionados por `artistaId`).

## Ejecución
1. `npm install`
2. `npm run api`  → API en http://localhost:3001
3. `npm run dev`  → App en http://localhost:5173

## Estructura
- `db.json`: datos de la API simulada
- `src/services/`: peticiones HTTP con fetch
- `src/components/`: componentes de interfaz
- `src/App.jsx`: estado (useState) y coordinación
