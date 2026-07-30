/**
 * ToolShare - Lógica Principal (Vanilla JS) + LocalStorage DB
 */

// 1. Renderizar Catálogo (Home)
function renderCatalog(data) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return; // Si no estamos en Home, salir.

    grid.innerHTML = ''; // Limpiar antes de renderizar

    if (data.length === 0) {
        grid.innerHTML = '<p class="text-secondary" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron herramientas en esta categoría.</p>';
        return;
    }

    data.forEach(tool => {
        // Generar tarjeta
        const article = document.createElement('article');
        article.className = 'tool-card glass';
        // Ajustamos la clase de la tarjeta para usar las proporcionadas por Stitch
        article.className = 'glass-card rounded-xl overflow-hidden cursor-pointer group flex flex-col h-full';
        
        const dotClass = tool.status === 'available' ? 'pulse-available' : 'pulse-borrowed';
        
        article.innerHTML = `
            <div class="relative h-48 md:h-56 w-full overflow-hidden">
                <img alt="${tool.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${tool.image}"/>
                <div class="absolute top-sm right-sm bg-surface/80 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-white/10 shadow-lg">
                    <div class="w-2 h-2 rounded-full ${dotClass} ${tool.status === 'available' ? 'bg-[#97BC62]' : 'bg-white/50'}"></div>
                    <span class="font-label-sm text-on-surface">${tool.statusText}</span>
                </div>
            </div>
            <div class="p-md flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="font-headline-md text-on-surface mb-1">${tool.title}</h3>
                    <p class="font-body-md text-on-surface-variant line-clamp-2 mb-sm">Propietario: ${tool.owner.name}</p>
                </div>
                <div class="flex items-center justify-between mt-auto pt-sm border-t border-white/5">
                    <div class="flex items-center gap-1 text-on-surface-variant">
                        <span class="material-symbols-outlined text-[16px]">directions_walk</span>
                        <span class="font-label-md text-xs">${tool.distance}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-primary text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="font-label-md text-sm text-on-surface">${tool.owner.rating} <span class="text-on-surface-variant">(${tool.owner.reviews})</span></span>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(article);
    });
}

// 2. Manejo de Temas (Dark/Light Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('span.material-symbols-outlined');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Aquí podrías agregar lógica si usas el modo claro en el futuro.
    });
}

// 3. Manejo de Filtros (Home)
function setupFilters(allTools) {
    const filtersContainer = document.getElementById('filters-container');
    if (!filtersContainer) return;
    
    const chips = filtersContainer.querySelectorAll('button');
    
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            // Estilos inactivos para todos
            chips.forEach(c => {
                c.className = 'px-md py-xs rounded-full glass-panel text-on-surface-variant font-label-md hover:text-on-surface transition-colors whitespace-nowrap';
            });
            
            // Estilos activos para el seleccionado
            const target = e.currentTarget;
            target.className = 'px-md py-xs rounded-full bg-primary/20 border border-primary text-primary font-label-md whitespace-nowrap shadow-[0_0_15px_rgba(151,188,98,0.2)]';
            
            const category = target.textContent.trim();
            
            if (category === 'Todos') {
                renderCatalog(allTools);
            } else {
                const filtered = allTools.filter(tool => tool.category === category);
                renderCatalog(filtered);
            }
        });
    });
}

// 4. Lógica de Búsqueda (Home)
function setupSearch(allTools) {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allTools.filter(tool => 
            tool.title.toLowerCase().includes(term) || 
            tool.category.toLowerCase().includes(term)
        );
        renderCatalog(filtered);
    });
}

// 5. Lógica de Login (login.html)
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        loginUser(email); // Guarda la sesión en LocalStorage
        window.location.href = 'dashboard.html'; // Redirige al panel
    });
    
    // Si ya está logueado, redirigir automáticamente
    if (getCurrentUser()) {
        window.location.href = 'dashboard.html';
    }
}

// 6. Lógica de Dashboard (dashboard.html)
function setupDashboard() {
    // Verificar si el usuario está autenticado
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Renderizar la tabla de herramientas dinámicamente
    renderDashboardTools();

    const btnAddTool = document.getElementById('btn-add-tool');
    if (!btnAddTool) return;
    
    btnAddTool.addEventListener('click', () => {
        // En una app real, esto abriría un modal. Para la demo, usamos prompts rápidos.
        const title = prompt("DEMO: Escribe el nombre de la herramienta a publicar:");
        if (!title) return; // Cancelado
        
        const category = prompt("DEMO: Categoría (Ej. Construcción, Jardinería):", "Construcción");
        
        const newTool = {
            title: title,
            category: category,
            categoryIcon: "ph-wrench",
            owner: { name: "Alejandro (Tú)", initial: "A", rating: 5.0, reviews: 0 },
            distance: "a 0 metros (tu casa)",
            image: "https://images.unsplash.com/photo-1508873535684-277a3cb8c90a?auto=format&fit=crop&q=80&w=800", // Imagen genérica
            status: "available",
            statusText: "Disponible"
        };
        
        // Guardar en la "Base de Datos" (LocalStorage)
        addTool(newTool);
        
        alert("¡Herramienta publicada con éxito en LocalStorage!");
        window.location.reload(); // Recargar para ver contadores actualizados
    });
    
    // Actualizar un contador del dashboard de forma dinámica
    const activeLoans = document.querySelector('.glass-panel:nth-child(2) .font-headline-lg');
    if (activeLoans) {
        const tools = getTools();
        const borrowedCount = tools.filter(t => t.status === 'borrowed').length;
        activeLoans.textContent = borrowedCount;
    }
}

// 7. Renderizar herramientas en Dashboard
function renderDashboardTools() {
    const tbody = document.getElementById('dashboard-tools-tbody');
    if (!tbody) return;

    const tools = getTools();
    tbody.innerHTML = '';

    if (tools.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-3 text-center text-on-surface-variant">No tienes herramientas publicadas.</td></tr>';
        return;
    }

    tools.forEach(tool => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/5 transition-colors group';
        
        const statusBadge = tool.status === 'available' 
            ? `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#97BC62]/10 text-[#97BC62] font-label-sm text-label-sm border border-[#97BC62]/20"><span class="w-1.5 h-1.5 rounded-full bg-[#97BC62] pulse-available"></span>Disponible</span>`
            : `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-white/70 font-label-sm text-label-sm border border-white/10"><span class="w-1.5 h-1.5 rounded-full bg-white/50 pulse-borrowed"></span>Prestado</span>`;

        tr.innerHTML = `
            <td class="px-4 py-3 flex items-center gap-3">
                <div class="w-10 h-10 rounded bg-surface-variant flex items-center justify-center border border-white/10 overflow-hidden">
                    <img class="w-full h-full object-cover" alt="${tool.title}" src="${tool.image}"/>
                </div>
                <span class="font-medium group-hover:text-primary transition-colors">${tool.title}</span>
            </td>
            <td class="px-4 py-3 text-on-surface-variant">${tool.category}</td>
            <td class="px-4 py-3">${statusBadge}</td>
            <td class="px-4 py-3 text-right">
                <button onclick="deleteTool(${tool.id})" class="text-error hover:bg-error/10 p-2 rounded-full transition-colors" title="Eliminar"><span class="material-symbols-outlined text-[18px]">delete</span></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- ENRUTAMIENTO BÁSICO FRONTEND ---
function initApp() {
    const path = window.location.pathname;
    
    // Ejecutar lógica según la página actual
    if (path.includes('login.html')) {
        setupLogin();
    } 
    else if (path.includes('dashboard.html')) {
        setupDashboard();
    } 
    else {
        // Por defecto asumimos que estamos en el Home (index.html)
        const toolsData = getTools(); // Extrae datos de LocalStorage
        renderCatalog(toolsData);
        setupFilters(toolsData);
        setupSearch(toolsData);
        setupThemeToggle();
    }
}

// Dado que los scripts están al final del body, podemos ejecutar de inmediato
initApp();
