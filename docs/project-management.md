# Gestión del proyecto

## Tablero Trello

El proyecto se organiza con un tablero Kanban en Trello con las siguientes columnas:

- **Backlog** — todas las funcionalidades planificadas
- **Todo** — tareas listas para empezar
- **In Progress** — en desarrollo activo
- **Review** — completadas, pendientes de verificar
- **Done** — finalizadas

## Organización del trabajo

Cada funcionalidad principal se divide en subtareas técnicas. Por ejemplo, "Añadir película" se divide en: diseño del formulario, validación de campos, endpoint POST en el servidor, integración frontend-backend y prueba manual.

Se hacen commits frecuentes con mensajes descriptivos siguiendo el formato `tipo: descripción` (feat, fix, docs, refactor).

## Decisiones tomadas

- Se usa Kanban en lugar de Scrum porque el proyecto es individual y el trabajo fluye de forma continua
- El backend y el frontend están en el mismo repositorio para simplificar el despliegue
- Los datos se guardan en memoria en el servidor con películas de ejemplo precargadas
