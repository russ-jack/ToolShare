# Estructura del Proyecto ToolShare

Este documento explica cómo está organizado el código generado para garantizar que sea escalable, limpio y fácil de mantener.

## Arquitectura de Archivos

```text
ToolShare/
├── index.html            # Página principal (Home) orientada al cliente (prestatario).
├── dashboard.html        # Panel de administración (Admin Dashboard) para dueños de herramientas.
├── styles.css            # Hoja de estilos con animaciones y utilidades 'glassmorphism'.
├── tailwind.config.js    # Configuración centralizada de Tailwind CSS (tokens de diseño).
├── main.js               # (Opcional) Archivo para interacciones JavaScript adicionales.
└── ESTRUCTURA.md         # Documentación de la estructura del proyecto.
```

## Detalles de Refactorización

1. **Separación de Vistas:** El código que proporcionaste incluía dos páginas HTML en un solo bloque. Lo hemos separado en `index.html` (vista Home) y `dashboard.html` (vista de gestión).
2. **Extracción de Configuración:** La configuración enorme de Tailwind (`tailwind.config`) que estaba repetida en ambos archivos se movió a `tailwind.config.js`. Esto hace que el HTML sea mucho más limpio y fácil de leer.
3. **Consolidación de Estilos:** Las etiquetas `<style>` que contenían las clases de "glassmorphism" y las animaciones de latido (`pulse`) se unificaron en `styles.css`. Ahora ambas páginas comparten los mismos estilos base, manteniendo la consistencia visual ultra-premium.

## Tecnologías Utilizadas
- **HTML5:** Semántico y estructurado.
- **Tailwind CSS (vía CDN):** Para utilidades rápidas y diseño responsivo sin necesidad de un paso de compilación (build step) por ahora.
- **CSS3 Personalizado:** Para efectos avanzados como desenfoque de fondo (`backdrop-filter`) y animaciones clave (`@keyframes`).
- **Google Fonts & Material Symbols:** Para tipografía moderna (Inter) e iconografía elegante.

¡Todo listo para desplegar en Vercel!
