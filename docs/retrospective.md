# Reflexión final

## Qué aprendí

Este proyecto me permitió conectar por primera vez todas las piezas: un frontend React con TypeScript y Tailwind comunicándose con un backend Express a través de una API REST. La parte más interesante fue diseñar los tipos compartidos entre frontend y backend para que ambos lados hablasen el mismo lenguaje.

## Cómo conecté frontend, backend y API

El frontend usa `src/api/client.ts` para hacer peticiones al servidor. Los tipos están definidos en `src/types/index.ts` y coinciden con los del backend. El Context API distribuye el estado de las películas a todos los componentes sin necesidad de pasar props manualmente.

## Principales problemas encontrados

El mayor problema fue la gestión de los estados de red. Al principio intenté usar variables booleanas separadas (`isLoading`, `hasError`) pero era fácil llegar a estados imposibles (loading y error al mismo tiempo). La solución fue usar un tipo discriminado `NetworkState<T>` que solo permite un estado a la vez.

Otro problema fue el CORS entre el frontend en `localhost:5173` y el backend en `localhost:3001`. Se resolvió configurando el middleware de cors en Express con la URL del frontend.

## Cómo usé la IA

Usé IA para generar la estructura inicial del proyecto y los archivos de configuración. También para resolver errores de TypeScript específicos y para refactorizar el hook `useMovies`. En todos los casos revisé el código generado antes de usarlo — en algún momento propuso soluciones más complejas de lo necesario y tuve que simplificarlas.

## Conclusión

El proyecto fullstack es donde todo cobra sentido. Ver cómo el frontend y el backend se comunican en tiempo real, con tipos que garantizan que los datos tienen la forma correcta en ambos lados, es la diferencia entre programar piezas sueltas y construir una aplicación real.
