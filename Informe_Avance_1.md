# AVANCE DE PROYECTO I - DESARROLLO DE INTERFACES II

**Nombre del Proyecto:** ToolShare  
**Plataforma de Despliegue:** Vercel

---

## 1. Resumen

ToolShare es una plataforma web orientada al préstamo y alquiler compartido de herramientas entre vecinos de una misma comunidad. Busca resolver el problema del gasto innecesario en herramientas de uso poco frecuente, promoviendo la economía circular. El sistema será utilizado por personas que necesitan herramientas específicas para proyectos puntuales y por aquellos dispuestos a compartir o alquilar las suyas. 

Sus principales funcionalidades incluyen un catálogo interactivo de herramientas, barra de búsqueda en tiempo real, filtros por categoría, un sistema de inicio de sesión y un panel de administración (Dashboard) para gestionar las herramientas publicadas. Como resultado, se espera lograr una comunidad más colaborativa, reduciendo costos individuales, optimizando el uso de recursos y fomentando la confianza vecinal mediante una interfaz web moderna, intuitiva y de estética premium.

---

## 2. Introducción

Actualmente, las personas que realizan reparaciones en el hogar o proyectos de bricolaje enfrentan la necesidad de comprar herramientas costosas (como taladros percutores, sierras circulares o hidrolavadoras) que terminarán almacenadas y sin uso la mayor parte del año. El proyecto está dirigido a comunidades residenciales, barrios y entusiastas del "hazlo tú mismo" (DIY). 

Se ha identificado la necesidad de conectar de manera eficiente a personas que poseen estas herramientas con quienes las necesitan temporalmente. Implementar esta solución tecnológica es crucial porque centraliza la oferta y demanda en una plataforma segura y fácil de usar, reemplazando el proceso informal e incómodo de "pedir prestado al vecino". ToolShare propone un sistema web donde los usuarios pueden explorar un catálogo, publicar sus herramientas disponibles y gestionar su inventario desde un panel administrativo profesional.

---

## 3. Justificación del proyecto

- **¿Por qué es necesario implementar este sistema?** Porque fomenta la sostenibilidad y el ahorro económico al evitar compras redundantes de equipos que tienen una tasa de uso muy baja.
- **¿Qué problema solucionará?** La subutilización de herramientas y la falta de acceso a equipo especializado debido a barreras de costo.
- **¿Qué procesos permitirá mejorar?** El proceso de solicitud de herramientas, centralizándolo con un inventario claro, estados de disponibilidad (disponible/prestado) y un sistema visual rápido.
- **¿Qué dificultades presenta actualmente el proceso?** Pedir prestado a vecinos de forma tradicional suele ser desorganizado, carece de un catálogo visible de "quién tiene qué", y no hay garantías formales de devolución.
- **¿Qué ventajas tendría utilizar una aplicación web?** Acceso 24/7 al inventario de la comunidad, búsquedas instantáneas, diseño responsivo accesible desde el celular y una gestión centralizada para el dueño de las herramientas.
- **¿Qué podría ocurrir si el problema no se soluciona?** Se mantendrá el consumismo innecesario, la acumulación de herramientas en desuso, la pérdida de espacio en los hogares y la pérdida de oportunidades de colaboración comunitaria.

---

## 4. Beneficiarios

### 4.1 Beneficiarios directos

- **Dueños de herramientas (Prestamistas/Administradores):** Utilizarán el sistema para publicar sus herramientas y gestionar su estado. Obtendrán el beneficio de rentabilizar o dar uso a sus equipos, mejorando su control mediante el panel administrativo, permitiéndoles registrar nuevas herramientas con gran facilidad.
- **Usuarios solicitantes (Prestatarios):** Utilizarán el sistema para buscar y solicitar herramientas. Obtendrán el beneficio de ahorrar dinero al no tener que comprar equipos nuevos. Su proceso de búsqueda será mucho más rápido gracias a la barra de búsqueda y los filtros por categoría.

### 4.2 Beneficiarios indirectos

- **Comunidad local / Barrio:** Se beneficiará de una mayor cohesión social y confianza mutua generada por la interacción constante.
- **Medio ambiente:** Se beneficiará por la reducción del consumo masivo y la menor fabricación y transporte de herramientas nuevas, disminuyendo la huella de carbono.

---

## 5. Objetivos

### 5.1 Objetivo general
Desarrollar un prototipo de sistema web de economía colaborativa que permita gestionar la búsqueda y registro de herramientas compartidas entre vecinos, mejorando el acceso a equipos especializados mediante una interfaz moderna y accesible.

### 5.2 Objetivos específicos
- Diseñar una interfaz interactiva (Home) con estilo *Glassmorphism* para visualizar el catálogo de herramientas disponibles.
- Implementar funcionalidades dinámicas de búsqueda y filtrado por categorías usando JavaScript Vanilla para facilitar la localización de herramientas.
- Diseñar un formulario de inicio de sesión que simule el acceso seguro a la plataforma.
- Desarrollar un panel administrativo (Dashboard) que permita registrar nuevas herramientas de forma interactiva.
- Simular la persistencia de datos mediante *LocalStorage* para garantizar el funcionamiento del flujo completo sin necesidad de un backend real.

---

## 6. Definición y alcance

### 6.1 Definición del proyecto
- **Tipo de sistema:** Aplicación Web de una sola página (SPA simulada) orientada a la presentación frontend.
- **Problema que atenderá:** Falta de acceso económico a herramientas y desorganización en el préstamo vecinal.
- **Usuarios que podrán ingresar:** Vecinos de la comunidad (modo vista) y administradores de herramientas.
- **Información que administrará:** Catálogo de herramientas (título, categoría, propietario, distancia, estado, imagen) y métricas básicas de administración.
- **Procesos que permitirá realizar:** Búsqueda en tiempo real, filtrado, inicio de sesión (simulado) y registro de nuevas herramientas persistidas localmente.
- **Tecnologías utilizadas:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla), Tailwind CSS (CDN para prototipado ágil) y LocalStorage API.
- **Resultado final esperado:** Un prototipo web completamente funcional a nivel interfaz, desplegado en Vercel y listo para ser navegado e interactumed.

### 6.2 Alcance del proyecto
El prototipo académico incluirá:
- Inicio de sesión (Autenticación simulada).
- Catálogo interactivo de productos.
- Panel administrativo con métricas.
- Consultas y búsquedas en tiempo real.
- Actualización de estados (Publicación de nuevas herramientas).
- Diseño adaptable para computadoras y dispositivos móviles (Mobile First).

### 6.3 Limitaciones del proyecto
- El sistema no contará inicialmente con una aplicación móvil nativa.
- No se integrará una pasarela de pago real para alquileres.
- No se integrará con bases de datos en la nube (Backend real); el sistema operará únicamente como prototipo académico apoyado en LocalStorage.
- No se enviarán correos electrónicos reales para recuperar contraseñas o notificar préstamos.

### 6.4 Módulos del sistema

- **Módulo de Catálogo (Home):** Permitirá buscar, filtrar por categorías (Construcción, Jardinería, Automotriz, etc.) y visualizar las herramientas disponibles. Utilizado por todos los visitantes del sistema.
- **Módulo de Autenticación (Login):** Permitirá simular el acceso seguro de los usuarios al sistema para gestionar sus equipos. Utilizado por usuarios que desean acceder a su panel.
- **Módulo de Administración (Dashboard):** Permitirá al usuario administrador visualizar métricas estáticas, revisar la tabla de "Mis Herramientas" y registrar nuevas herramientas que se actualizarán automáticamente en el catálogo. Utilizado exclusivamente por el propietario o encargado del perfil.

---

## 7. Entregables Prácticos

- **Repositorio de GitHub:** Integrado y con el código organizado (HTML, CSS, JS separados).
- **URL de Producción (Vercel):** *[Inserte aquí el enlace generado por Vercel]*
- **Validación:** El código cumple con HTML Semántico, carece de frameworks complejos de JS y demuestra interactividad real mediante manipulación del DOM y Storage.
