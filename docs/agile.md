# Metodologías de desarrollo

## Agile

Agile es una filosofía de desarrollo de software que prioriza la entrega continua de valor, la colaboración con el cliente y la capacidad de adaptarse a cambios. Su objetivo principal es reducir el riesgo entregando software funcional en ciclos cortos en lugar de esperar a tener el producto completo.

En lugar de planificar todo al principio y ejecutar en una sola entrega, Agile propone trabajar en iteraciones, revisar constantemente lo que se está construyendo y ajustar según el feedback.

## Scrum

Scrum es un framework Agile que organiza el trabajo en sprints — ciclos de desarrollo de duración fija (normalmente 1-4 semanas). Al final de cada sprint se entrega una versión funcional del producto.

### Conceptos principales

**Roles:**
- **Product Owner** — define qué hay que construir y prioriza el backlog
- **Scrum Master** — facilita el proceso y elimina obstáculos
- **Development Team** — construye el producto

**Artefactos:**
- **Product Backlog** — lista priorizada de todo lo que hay que hacer
- **Sprint Backlog** — tareas seleccionadas para el sprint actual
- **Incremento** — versión funcional entregada al final del sprint

**Eventos:**
- **Sprint Planning** — reunión para planificar el sprint
- **Daily Scrum** — reunión diaria de 15 minutos
- **Sprint Review** — demostración del trabajo completado
- **Retrospectiva** — reflexión sobre el proceso para mejorarlo

## Kanban

Kanban es un método visual para gestionar el flujo de trabajo. En lugar de sprints con duración fija, el trabajo fluye de forma continua a través de columnas que representan estados: Backlog, En progreso, Revisión, Hecho.

El principio fundamental es limitar el trabajo en progreso (WIP) para evitar cuellos de botella y mantener un flujo constante.

## Diferencias entre Scrum y Kanban

| Aspecto | Scrum | Kanban |
|---|---|---|
| Estructura | Sprints con duración fija | Flujo continuo |
| Roles | Product Owner, Scrum Master, Team | No define roles específicos |
| Cambios | Solo entre sprints | En cualquier momento |
| Métricas | Velocidad del equipo | Tiempo de ciclo |
| Reuniones | Planificadas y fijas | No obligatorias |

## Cuándo usar cada una

**Scrum** es más adecuado cuando el proyecto tiene requisitos que cambian entre entregas, el equipo necesita estructura clara y hay un cliente que revisa el producto periódicamente. Es ideal para productos nuevos en desarrollo activo.

**Kanban** es más adecuado cuando el trabajo es continuo y variado (soporte, mantenimiento, bugs), no hay fechas de entrega fijas o el equipo es pequeño y no necesita la estructura de Scrum.

En este proyecto se ha usado Kanban con Trello porque el desarrollo es individual y el trabajo fluye de forma continua sin necesidad de sprints formales.
