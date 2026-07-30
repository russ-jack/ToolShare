# ToolShare - Plataforma de Préstamo Vecinal

ToolShare es una aplicación web diseñada para fomentar la economía colaborativa mediante el préstamo de herramientas entre vecinos. Esta plataforma cuenta con un diseño premium (Glassmorphism), interfaz oscura moderna y flujos de usuario intuitivos.

## 🚀 Tecnologías Utilizadas

Para garantizar un rendimiento ultra rápido y demostrar habilidades de desarrollo frontend avanzado, este proyecto se ha construido bajo la estricta regla de **"Cero Frameworks Pesados"**:

*   **Estructura:** HTML5 Semántico.
*   **Estilos:** CSS3 Nativo + TailwindCSS (vía CDN para utilidades rápidas).
*   **Lógica y Estado:** JavaScript Vanilla (ES6+).
*   **Base de Datos (Simulada):** `localStorage` (Permite que la app funcione sin backend para demostraciones, manteniendo la persistencia en el navegador).
*   **Componentes UI Especiales:** `Flatpickr` (Librería Vanilla JS para el calendario de reservas).
*   **Despliegue:** Vercel (Edge Network).

## ✨ Características Principales

1.  **Catálogo Dinámico (Home):**
    *   Tarjetas de herramientas con imágenes, descripciones, precio por día y distancia del dueño.
    *   Búsqueda en tiempo real combinada con filtrado por categorías (Construcción, Jardinería, etc.).
2.  **Modal de Reserva Premium:**
    *   Diseño *Glassmorphism* que se superpone al catálogo.
    *   Integración de **Flatpickr** para seleccionar un rango de fechas.
    *   Cálculo automático de precio total (Días seleccionados × Tarifa diaria).
    *   Botón dinámico de **WhatsApp** que pre-llena un mensaje para contactar al dueño directamente.
3.  **Dashboard de Usuario (SPA):**
    *   Navegación tipo Single Page Application (SPA) manejada con atributos `data-view`, sin recargar la página.
    *   Panel de gestión de herramientas propias con opciones para eliminar y publicar nuevas.
4.  **Formulario de "Nueva Herramienta":**
    *   Soporte para subir fotos locales (convertidas a formato Base64 vía `FileReader` para almacenamiento local).
    *   Sistema de fallback con imágenes profesionales por defecto.
    *   Selector de disponibilidad integrado.

## 📁 Estructura del Proyecto

*   `index.html`: Catálogo público y landing page.
*   `login.html`: Pantalla de autenticación y registro.
*   `dashboard.html`: Panel de control privado del usuario.
*   `main.js`: Controlador principal de la lógica, eventos, modales y renderizado de la UI.
*   `db.js`: Gestor de la base de datos simulada en `localStorage` e inyección de datos semilla (`initialData`).
*   `styles.css`: Hojas de estilo personalizadas (Animaciones, Glassmorphism, temas oscuros y overrides de Flatpickr/Autofill).

## 🛠 Instalación y Ejecución Local

Debido a su naturaleza Vanilla, no requiere instalación de dependencias complejas (node_modules). 

1. Clona el repositorio:
   ```bash
   git clone https://github.com/russ-jack/ToolShare.git
   ```
2. Usa un servidor local ligero (como Live Server en VSCode o `npx serve`) en la raíz del proyecto para evitar bloqueos de CORS al importar scripts.
3. Abre `index.html` en tu navegador.

---
*Diseñado y desarrollado enfocándose en UX premium, arquitectura limpia y alto rendimiento sin dependencias.*
