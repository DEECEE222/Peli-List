# Hooks de React

## useState

Usado en `MovieForm` para gestionar cada campo del formulario de forma independiente y en `Home` para el estado de búsqueda y filtro.

## useEffect

Usado en `useMovies` para cargar las películas del servidor cuando el componente se monta. Se ejecuta una sola vez gracias a la dependencia en `load` envuelto con `useCallback`.

## useMemo

Usado en `Home` para filtrar la lista de películas. El cálculo solo se repite cuando cambia la lista, el texto de búsqueda o el filtro de estado — no en cada render.

```ts
const filtered = useMemo(() => {
  if (state.status !== 'success') return [];
  return state.data
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter(m => statusFilter === 'all' || m.status === statusFilter);
}, [state, search, statusFilter]);
```

## useCallback

Usado en `useMovies` para estabilizar las referencias de `load`, `addMovie` y `deleteMovie`. Sin `useCallback`, estas funciones se recrearían en cada render causando bucles infinitos en `useEffect`.

## Custom hook: useMovies

Encapsula toda la lógica de red relacionada con películas: carga inicial, añadir y eliminar. Devuelve el estado de red (`NetworkState<Movie[]>`) y las funciones de acción. Cualquier componente puede usarlo sin conocer los detalles de la API.
