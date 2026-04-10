# Rutas y navegación

## Estructura de rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Página principal con lista y formulario |
| `*` | `NotFound` | Página 404 para rutas no existentes |

## Configuración

```tsx
<BrowserRouter>
  <MovieProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MovieProvider>
</BrowserRouter>
```

El `MovieProvider` envuelve las rutas para que el contexto esté disponible en todas las páginas.
