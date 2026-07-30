/**
 * ToolShare - Lógica Principal (Vanilla JS)
 */

// 1. Mock Data de Herramientas
const toolsData = [
    {
        id: 1,
        title: "Taladro Percutor Bosch 800W",
        category: "Carpintería",
        categoryIcon: "ph-hammer",
        owner: { name: "Carlos Mendoza", initial: "C", rating: 4.8, reviews: 12 },
        distance: "3 cuadras",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
        status: "available",
        statusText: "Disponible ahora"
    },
    {
        id: 2,
        title: "Escalera Telescópica 3m",
        category: "Mecánica",
        categoryIcon: "ph-wrench",
        owner: { name: "Ana Pérez", initial: "A", rating: 5.0, reviews: 8 },
        distance: "5 cuadras",
        image: "https://images.unsplash.com/photo-1534062483863-12501a1bd3b1?auto=format&fit=crop&q=80&w=800",
        status: "borrowed",
        statusText: "Devuelve el jueves"
    },
    {
        id: 3,
        title: "Hidrolavadora Karcher K3",
        category: "Jardinería",
        categoryIcon: "ph-leaf",
        owner: { name: "Luis Romero", initial: "L", rating: 4.9, reviews: 25 },
        distance: "1 km",
        image: "https://images.unsplash.com/photo-1629851609200-a92e1ee81b7e?auto=format&fit=crop&q=80&w=800",
        status: "available",
        statusText: "Disponible ahora"
    },
    {
        id: 4,
        title: "Sierra Circular Makita 1500W",
        category: "Carpintería",
        categoryIcon: "ph-hammer",
        owner: { name: "Miguel Torres", initial: "M", rating: 4.7, reviews: 5 },
        distance: "2.5 km",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800",
        status: "available",
        statusText: "Disponible ahora"
    },
    {
        id: 5,
        title: "Juego de Llaves Stanley",
        category: "Mecánica",
        categoryIcon: "ph-wrench",
        owner: { name: "Javier Espinosa", initial: "J", rating: 5.0, reviews: 31 },
        distance: "1 cuadra",
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800",
        status: "borrowed",
        statusText: "Devuelve mañana"
    },
    {
        id: 6,
        title: "Rodillo y Extensión de Pintura",
        category: "Pintura",
        categoryIcon: "ph-paint-roller",
        owner: { name: "Sofía Vargas", initial: "S", rating: 4.6, reviews: 3 },
        distance: "8 cuadras",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
        status: "available",
        statusText: "Disponible ahora"
    }
];

// 2. Renderizar Catálogo
function renderCatalog(data) {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = ''; // Limpiar antes de renderizar

    if (data.length === 0) {
        grid.innerHTML = '<p class="text-secondary" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron herramientas en esta categoría.</p>';
        return;
    }

    data.forEach(tool => {
        // Generar tarjeta
        const article = document.createElement('article');
        article.className = 'tool-card glass';
        
        const dotClass = tool.status === 'available' ? 'status-dot available' : 'status-dot borrowed';
        const pulseAnim = tool.status === 'available' ? 'pulse-dot' : ''; // Reutilizando la clase pulse si se desea

        article.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${tool.image}" alt="${tool.title}" class="card-img" loading="lazy">
                <div class="status-badge">
                    <span class="${dotClass} ${tool.status === 'available' ? 'pulse-dot' : ''}"></span>
                    ${tool.statusText}
                </div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <span class="card-category"><i class="ph ${tool.categoryIcon}"></i> ${tool.category}</span>
                        <h3 class="card-title">${tool.title}</h3>
                    </div>
                </div>
                
                <div class="card-owner">
                    <div class="owner-avatar">${tool.owner.initial}</div>
                    <div class="owner-info">
                        <span class="owner-name">${tool.owner.name}</span>
                        <div class="owner-rating">
                            <i class="ph-fill ph-star"></i> ${tool.owner.rating} <span>(${tool.owner.reviews})</span>
                        </div>
                    </div>
                </div>

                <div class="card-footer">
                    <span class="distance"><i class="ph ph-map-pin"></i> ${tool.distance}</span>
                    <button class="btn-icon-round" aria-label="Ver detalles">
                        <i class="ph ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(article);
    });
}

// 3. Manejo de Temas (Dark/Light Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Animación simple de ícono
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            if (body.classList.contains('dark-theme')) {
                icon.className = 'ph ph-sun';
            } else {
                icon.className = 'ph ph-moon';
            }
            icon.style.transform = 'rotate(0deg)';
        }, 150);
    });
}

// 4. Manejo de Filtros
function setupFilters() {
    const filtersContainer = document.getElementById('filters-container');
    const chips = filtersContainer.querySelectorAll('.chip');
    
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            // Remover 'active' de todos
            chips.forEach(c => c.classList.remove('active'));
            // Añadir 'active' al seleccionado
            const target = e.currentTarget;
            target.classList.add('active');
            
            // Obtener texto (ignorando el icono)
            const category = target.textContent.trim();
            
            // Filtrar datos
            if (category === 'Todos') {
                renderCatalog(toolsData);
            } else {
                const filtered = toolsData.filter(tool => tool.category === category);
                renderCatalog(filtered);
            }
        });
    });
}

// 5. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar con todos los datos
    renderCatalog(toolsData);
    
    // Configurar listeners
    setupThemeToggle();
    setupFilters();
    
    // Simular búsqueda (Interactivo)
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = toolsData.filter(tool => 
            tool.title.toLowerCase().includes(term) || 
            tool.category.toLowerCase().includes(term)
        );
        renderCatalog(filtered);
    });
});
