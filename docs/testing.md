# Testing manual

## Pruebas realizadas

### Formulario
- ✅ Añadir película con todos los campos
- ✅ Añadir película sin título — muestra error de validación
- ✅ Añadir película sin año — muestra error de validación
- ✅ Los campos se limpian tras añadir correctamente

### Lista
- ✅ Las películas de ejemplo aparecen al cargar
- ✅ La película añadida aparece inmediatamente en la lista
- ✅ Eliminar una película la quita de la lista
- ✅ El filtro por estado funciona correctamente
- ✅ La búsqueda por título filtra en tiempo real

### Estados de red
- ✅ Con servidor corriendo — carga y muestra películas
- ✅ Sin servidor — muestra mensaje de error en la lista

### Responsive
- ✅ En móvil el formulario y la lista se apilan verticalmente
- ✅ En escritorio aparecen en dos columnas

### Navegación
- ✅ La ruta `/` muestra la página principal
- ✅ Una ruta inexistente muestra la página 404
