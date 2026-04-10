# Cliente de API

## src/api/client.ts

Centraliza todas las llamadas al servidor. Usa `fetch` con una función genérica `request<T>` que maneja los errores y deserializa la respuesta.

```ts
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return undefined as T;
  const body: ApiResponse<T> = await res.json();
  if (!res.ok) throw new Error(body.error ?? `Error ${res.status}`);
  return body.data;
}
```

## Tipos alineados

Los tipos `Movie`, `Genre` y `Status` están definidos en `src/types/index.ts` y coinciden exactamente con los del backend. Esto garantiza que el frontend y el backend hablan el mismo lenguaje.

## Gestión de estados de red

Se usa el tipo discriminado `NetworkState<T>`:

```ts
type NetworkState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };
```

En la UI se renderiza algo diferente según el estado:
- `loading` → texto "Cargando películas..."
- `error` → mensaje de error en rojo
- `success` → lista de películas
