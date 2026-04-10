# Arquitectura de la aplicación

## Estructura de componentes
App
├── BrowserRouter
│   └── MovieProvider (Context)
│       ├── Home (página principal)
│       │   ├── MovieForm (formulario de añadir)
│       │   ├── FilterBar (búsqueda y filtros)
│       │   └── MovieCard[] (tarjetas de películas)
│       └── NotFound (página 404)

## Componentes reutilizables

- **MovieCard** — tarjeta de película con título, año, género, estado, puntuación y botón de eliminar
- **MovieForm** — formulario controlado para añadir películas con validación
- **FilterBar** — buscador y selector de filtro por estado

## Gestión del estado

- **Estado local** — búsqueda y filtro en `Home` con `useState`
- **Estado global** — lista de películas compartida mediante Context API (`MovieContext`)
- **Estado de red** — gestionado con el tipo discriminado `NetworkState<T>` que representa loading, success y error

## Flujo de datos
Usuario → MovieForm → addMovie() → movieApi.create() → POST /api/movies
↓
movieService.create()
↓
Respuesta → MovieContext → MovieCard[]

## Backend — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/movies | Listar todas las películas |
| GET | /api/movies/:id | Obtener una película |
| POST | /api/movies | Crear película |
| PUT | /api/movies/:id | Actualizar película |
| DELETE | /api/movies/:id | Eliminar película |

## Persistencia

- Las películas se guardan en memoria en el servidor (array en `movie.service.ts`)
- Al recargar el servidor los datos se pierden — en producción se sustituiría por una base de datos
- El frontend no usa localStorage para los datos de películas — la API es la única fuente de verdad
