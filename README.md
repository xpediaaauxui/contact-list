# Libro de contactos

Aplicación web para visualizar, buscar, filtrar y administrar contactos.
Desarrollada en el transcurso de la cátedra Programación I - Diseño Digital y Programación Web (ISEC, 2026).

**Ver la app en línea:** [https://xpediaaauxui.github.io/contact-list/](https://xpediaaauxui.github.io/contact-list/)

Hecho por Hernández Luciano Martin

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la página: encabezado, buscador, formulario, lista y footer. |
| `styles.css` | Estilos con tema oscuro y degradados por categoría. |
| `app.js` | Lógica: datos iniciales, render, búsqueda, filtros, formulario, CRUD y localStorage. |

## Cómo ejecutarlo

- **En línea:** abrir el link de arriba. No hace falta instalar nada.
- **En tu computadora:** descargar el repositorio y abrir `index.html` en el navegador (doble clic).

## Funcionalidades

- **Visualizar:** muestra los contactos en filas, con avatar de la inicial y color según la categoría.
- **Buscar:** filtra por nombre mientras se escribe.
- **Filtrar:** por categoría o por favoritos.
- **Contador:** indica cuántos contactos se muestran del total.
- **Agregar:** formulario con validación de nombre y teléfono obligatorios, y de email válido si se completa. Los campos con error se marcan en rojo.
- **Editar:** carga el contacto en el formulario y lo actualiza.
- **Eliminar:** pide confirmación antes de borrar.
- **Favoritos:** marca o desmarca un contacto, con franja dorada.
- **Persistencia:** los cambios se guardan en `localStorage` y se recuperan al recargar la página.

## Datos

Los contactos iniciales están en un array de objetos dentro de `app.js`. Al iniciar, la app usa `localStorage` si hay datos guardados; si no, usa ese array.

Para volver a los datos iniciales, hay que borrar el `localStorage` del sitio desde las herramientas de desarrollo del navegador.

## Créditos

El código fue desarrollado con asistencia de Claude (Anthropic), y el equipo lo revisó y lo adaptó. El comentario de atribución está junto a `JSON.parse` en `app.js`.

## Licencia

Este proyecto usa la licencia MIT. Ver el archivo [LICENSE](LICENSE).
