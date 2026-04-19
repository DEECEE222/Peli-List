# Peli-List 🎬

Aplicación fullstack para gestionar tu lista personal de películas. Añade, filtra y organiza las películas que has visto, tienes pendientes o son tus favoritas.

## Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS + Vite
- **Backend:** Node.js + Express + TypeScript + Zod
- **Organización:** Trello (Kanban)

## Funcionalidades

- Añadir películas con título, año, género, estado y puntuación
- Filtrar por estado (vista, pendiente, favorita)
- Buscar por título en tiempo real
- Eliminar películas
- API REST con validación

## Instalación

```bash
# Frontend
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
```

## Estructura
Peli-List/
├── src/
│   ├── api/          # Cliente de API tipado
│   ├── components/   # Componentes reutilizables
│   ├── context/      # Context API
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Páginas
│   ├── types/        # Tipos TypeScript
│   └── utils/        # Utilidades
├── server/           # Backend Express
└── docs/             # Documentación

## Documentación

- [Idea del proyecto](docs/idea.md)
- [Arquitectura](docs/design.md)
- [API](docs/api.md)
- [Componentes](docs/components.md)
- [Hooks](docs/hooks.md)
- [Metodologías Agile](docs/agile.md)
- [Tablero Trello](https://trello.com/b/BAc7hq1U/peli-list)

## URLs en producción

- **Frontend:** https://peli-list.vercel.app
- **Backend API:** https://peli-list-production.up.railway.app
