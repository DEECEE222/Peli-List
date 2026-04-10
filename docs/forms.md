# Formularios

## MovieForm

Formulario controlado con un estado por cada campo. Cada `input` y `select` tiene su propio `useState` y se actualiza con `onChange`.

### Validación

Se valida antes de enviar:
- El título no puede estar vacío
- El año debe ser un número válido

Si la validación falla se muestra un mensaje de error en rojo sin enviar la petición al servidor.

### Estados del formulario

- **Normal** — formulario disponible para rellenar
- **Error de validación** — mensaje en rojo, no se envía
- **Cargando** — botón desactivado con texto "Añadiendo..."
- **Error de red** — mensaje de error si el servidor falla
- **Éxito** — campos se limpian automáticamente
