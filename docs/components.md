# Documentación de componentes

## MovieCard

Muestra la información de una película en una tarjeta.

**Props:**
- `movie: Movie` — objeto película completo
- `onDelete: (id: string) => void` — callback para eliminar

**Características:**
- Badge de color según el estado (verde=vista, amarillo=pendiente, morado=favorita)
- Muestra puntuación y notas si existen
- Botón de eliminar con color rojo al hacer hover

---

## MovieForm

Formulario controlado para añadir nuevas películas.

**Props:**
- `onSubmit: (input: CreateMovieInput) => Promise<void>` — callback async

**Validaciones:**
- Título obligatorio y no vacío
- Año debe ser un número válido
- Muestra mensaje de error si la validación falla
- Muestra estado de carga mientras se envía

---

## FilterBar

Barra de búsqueda y filtro por estado.

**Props:**
- `search: string` — valor actual del buscador
- `onSearch: (v: string) => void` — callback al escribir
- `statusFilter: Status | 'all'` — filtro activo
- `onStatusFilter: (v: Status | 'all') => void` — callback al cambiar filtro
