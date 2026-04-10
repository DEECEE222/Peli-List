# API — Peli-List

Base URL: `http://localhost:3001/api`

## GET /movies

Devuelve todas las películas.

**Respuesta 200:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Interstellar",
      "year": 2014,
      "genre": "ciencia-ficcion",
      "status": "vista",
      "rating": 9,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## POST /movies

Crea una nueva película.

**Body:**
```json
{
  "title": "Inception",
  "year": 2010,
  "genre": "ciencia-ficcion",
  "status": "pendiente",
  "rating": 9,
  "notes": "Hay que verla con atención"
}
```

**Respuesta 201:** la película creada con `id` y `createdAt`.
**Respuesta 400:** datos inválidos con detalles de validación.

## PUT /movies/:id

Actualiza una película. Todos los campos son opcionales.

**Respuesta 200:** la película actualizada.
**Respuesta 404:** película no encontrada.

## DELETE /movies/:id

Elimina una película.

**Respuesta 204:** sin cuerpo.
**Respuesta 404:** película no encontrada.
