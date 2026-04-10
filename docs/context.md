# Context API

## MovieContext

Comparte el estado global de películas entre todos los componentes sin necesidad de pasar props manualmente.

### Por qué Context y no props

Sin Context, `addMovie` y `deleteMovie` tendrían que pasarse como props desde `App` hasta `Home`, `MovieForm` y `MovieCard`. Con Context, cualquier componente puede acceder a estas funciones directamente.

### Implementación

```ts
const MovieContext = createContext<MovieContextType | null>(null);

export function MovieProvider({ children }) {
  const { state, load, addMovie, deleteMovie } = useMovies();
  return (
    <MovieContext.Provider value={{ state, addMovie, deleteMovie, reload: load }}>
      {children}
    </MovieContext.Provider>
  );
}
```

### Cuándo usar Context

Context es útil cuando varios componentes en distintos niveles del árbol necesitan acceder al mismo estado. No es adecuado para estado muy local (un formulario, un modal) que solo usa un componente.
