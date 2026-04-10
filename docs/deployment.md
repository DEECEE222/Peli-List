# Despliegue

## Frontend — Vercel

1. Conectar el repositorio de GitHub con Vercel
2. Vercel detecta automáticamente que es un proyecto Vite
3. Configurar la variable de entorno `VITE_API_URL` con la URL del backend en producción
4. Cada push a `main` redespliega automáticamente

## Backend — Railway

1. Crear cuenta en https://railway.app
2. New Project → Deploy from GitHub repo
3. Seleccionar el repositorio y la carpeta `server/`
4. Configurar variables de entorno: `PORT`, `NODE_ENV`, `FRONTEND_URL`
5. Build command: `npm run build`
6. Start command: `npm start`

## Notas

- El backend guarda datos en memoria — se pierden al reiniciar el servidor
- Para producción real se necesitaría una base de datos persistente
