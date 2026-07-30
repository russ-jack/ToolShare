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
        article.className = 'glass-card rounded-xl overflow-hidden cursor-pointer group flex flex-col h-full';
        article.setAttribute('onclick', `openToolModal(${tool.id})`);
        
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

// --- ESTADO GLOBAL DEL CATÁLOGO ---
window.catalogState = {
    term: '',
    category: 'Todos',
    allTools: []
};

function updateCatalogView() {
    let filtered = window.catalogState.allTools;
    
    // Filtrar por categoría
    if (window.catalogState.category !== 'Todos') {
        filtered = filtered.filter(t => t.category === window.catalogState.category);
    }
    
    // Filtrar por búsqueda
    if (window.catalogState.term) {
        const term = window.catalogState.term.toLowerCase();
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(term) || 
            t.category.toLowerCase().includes(term) ||
            (t.description && t.description.toLowerCase().includes(term))
        );
    }
    
    renderCatalog(filtered);
}

// 3. Manejo de Filtros (Home)
function setupFilters(allTools) {
    window.catalogState.allTools = allTools;
    const filtersContainer = document.getElementById('filters-container');
    if (!filtersContainer) return;
    
    const chips = filtersContainer.querySelectorAll('button');
    
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            chips.forEach(c => c.className = 'px-md py-xs rounded-full glass-panel text-on-surface-variant font-label-md hover:text-on-surface transition-colors whitespace-nowrap');
            
            const target = e.currentTarget;
            target.className = 'px-md py-xs rounded-full bg-primary/20 border border-primary text-primary font-label-md whitespace-nowrap shadow-[0_0_15px_rgba(151,188,98,0.2)]';
            
            window.catalogState.category = target.textContent.trim();
            updateCatalogView();
        });
    });
}

// 4. Lógica de Búsqueda (Home)
function setupSearch(allTools) {
    window.catalogState.allTools = allTools;
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    // Escuchar el botón Enter y la escritura normal
    searchInput.addEventListener('input', (e) => {
        window.catalogState.term = e.target.value.trim();
        updateCatalogView();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.catalogState.term = e.target.value.trim();
            updateCatalogView();
        }
    });
}

// 2. Lógica del Home (index.html)
function setupHome() {
    // Configurar menú de usuario
    const user = getCurrentUser();
    const userMenuContainer = document.getElementById('user-menu-container');
    
    if (userMenuContainer) {
        if (user) {
            userMenuContainer.innerHTML = `
                <img id="profile-btn" alt="User profile" class="w-8 h-8 rounded-full object-cover border border-white/20 cursor-pointer hover:border-primary transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrUpYEx51DkFZej9cE-k9F8WIjZPu7bZnweVIThQrwO8feX5apjUDcDEiYQEVRucBm1Ygu8CV6rzrEoy5TbNgAi4CekpraYuUScNeBaNOElyzvGuhuLLoo7-icY_JpV2Dgfwg1ALIV-hbbcelxbi54wIXiiwM0oQPaLDyoNiASA_x2C3GHbHVcBP2cFy31EmlNz1TLF29MlJkMj5UPtE6oyKCCGsSjh0hTQGivNUtA5fi7nJwSA7SniQ"/>
                <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-2xl glass-card ring-1 ring-white/10 focus:outline-none z-50 overflow-hidden border border-white/10">
                    <div class="px-4 py-3 border-b border-white/10">
                        <p class="text-sm font-medium text-on-surface">${user.name}</p>
                        <p class="text-xs text-on-surface-variant truncate mt-0.5">${user.email}</p>
                    </div>
                    <div class="py-1">
                        <a href="dashboard.html" class="block px-4 py-2 text-sm text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">dashboard</span> Admin Dashboard</a>
                        <button onclick="logout()" class="w-full text-left block px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">logout</span> Cerrar Sesión</button>
                    </div>
                </div>
            `;
            setupProfileDropdown();
        } else {
            userMenuContainer.innerHTML = `
                <a href="login.html" class="block font-label-md text-[#97BC62] hover:text-[#01390c] hover:bg-[#97BC62] transition-colors border border-[#97BC62] px-4 py-1.5 rounded-full">Iniciar Sesión</a>
            `;
        }
    }
}

// 5. Lógica de Login (login.html)
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar que sea admin@vecindario.com y 12345678
        if (email === 'admin@vecindario.com' && password === '12345678') {
            loginUser(email); // Guarda la sesión en LocalStorage
            window.location.href = 'dashboard.html'; // Redirige al panel
        }
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

    // Configurar menús y pestañas
    setupSidebar();
    setupProfileDropdown();

    // Renderizar la tabla de herramientas dinámicamente en todas las vistas
    renderDashboardTools();

    const btnAddTool = document.getElementById('btn-add-tool');
    const btnAddToolView = document.getElementById('btn-add-tool-view');
    
    const handleAdd = () => {
        showAddToolModal((toolData) => {
            const newTool = {
                title: toolData.title,
                category: toolData.category,
                categoryIcon: "ph-wrench",
                owner: { name: "Alejandro (Tú)", initial: "A", rating: 5.0, reviews: 0 },
                distance: "a 0 metros (tu casa)",
                image: toolData.image, 
                price: toolData.price,
                description: "Herramienta disponible para la comunidad.",
                status: "available",
                statusText: "Disponible"
            };
            
            addTool(newTool);
            renderDashboardTools();
            showToast("Herramienta publicada con éxito");
        });
    };

    if (btnAddTool) btnAddTool.addEventListener('click', handleAdd);
    if (btnAddToolView) btnAddToolView.addEventListener('click', handleAdd);
    
    // Actualizar un contador del dashboard de forma dinámica
    const activeLoans = document.querySelector('.glass-panel:nth-child(2) .font-headline-lg');
    if (activeLoans) {
        const tools = getTools();
        const borrowedCount = tools.filter(t => t.status === 'borrowed').length;
        activeLoans.textContent = borrowedCount;
    }
}

// Lógica de Tabs / SPA
function setupSidebar() {
    const links = document.querySelectorAll('.sidebar-link');
    const views = document.querySelectorAll('.view-content');
    const subtitle = document.getElementById('dashboard-subtitle');

    const viewTitles = {
        'dashboard': 'Tu taller está funcionando de manera óptima. Tienes herramientas prestadas y solicitudes nuevas.',
        'herramientas': 'Administra el inventario de todas las herramientas que has publicado para prestar.',
        'solicitudes': 'Gestiona las peticiones de los vecinos que quieren alquilar tus equipos.',
        'historial': 'Revisa el registro de todos tus préstamos completados pasados.',
        'ajustes': 'Actualiza tu perfil y la configuración de privacidad de tu taller.'
    };

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover 'active' de todos
            links.forEach(l => {
                l.classList.remove('active', 'text-primary', 'font-bold', 'border-r-2', 'border-primary', 'bg-white/5');
                l.classList.add('text-on-surface-variant', 'font-medium');
            });
            
            // Activar clickeado
            const target = e.currentTarget;
            target.classList.remove('text-on-surface-variant', 'font-medium');
            target.classList.add('active', 'text-primary', 'font-bold', 'border-r-2', 'border-primary', 'bg-white/5');

            // Cambiar Vista
            const viewId = target.getAttribute('data-view');
            views.forEach(v => {
                if(v.id === `view-${viewId}`) {
                    v.classList.remove('hidden');
                    v.classList.add('block');
                } else {
                    v.classList.add('hidden');
                    v.classList.remove('block');
                }
            });

            // Cambiar Subtitulo
            if (subtitle && viewTitles[viewId]) {
                subtitle.textContent = viewTitles[viewId];
            }
        });
    });
}

// 7. Renderizar herramientas en Dashboard
function renderDashboardTools() {
    const tbodys = document.querySelectorAll('.dashboard-tools-tbody');
    if (tbodys.length === 0) return;

    const tools = getTools();

    tbodys.forEach(tbody => {
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
    });
}

// 8. Utilidades UI (Modales y Toasts)
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 px-4 py-3 rounded-lg font-label-md text-label-md shadow-2xl z-[100] transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 border border-white/10 ${
        type === 'success' ? 'bg-[#97BC62] text-[#01390c]' : 'bg-error text-on-error'
    }`;
    toast.innerHTML = `<span class="material-symbols-outlined text-[20px]">${type === 'success' ? 'check_circle' : 'error'}</span> ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showConfirmModal(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 transition-opacity duration-300 px-4';
    
    const modal = document.createElement('div');
    modal.className = 'glass-card rounded-2xl p-6 w-full max-w-sm border border-white/10 shadow-2xl transform scale-95 opacity-0 transition-all duration-300';
    
    modal.innerHTML = `
        <h3 class="font-headline-md text-headline-md text-on-surface mb-2">${title}</h3>
        <p class="text-on-surface-variant font-body-md text-body-md mb-6">${message}</p>
        <div class="flex justify-end gap-3">
            <button id="btn-cancel" class="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface hover:bg-white/5 transition-colors">Cancelar</button>
            <button id="btn-confirm" class="px-4 py-2 rounded-lg font-label-md text-label-md bg-error text-on-error hover:opacity-90 transition-opacity">Borrar</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        modal.classList.remove('scale-95', 'opacity-0');
    }, 10);
    
    const close = () => {
        overlay.classList.add('opacity-0');
        modal.classList.add('scale-95', 'opacity-0');
        setTimeout(() => overlay.remove(), 300);
    };
    
    modal.querySelector('#btn-cancel').onclick = close;
    modal.querySelector('#btn-confirm').onclick = () => {
        onConfirm();
        close();
    };
}

function showAddToolModal(onSubmit) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 transition-opacity duration-300 px-4';
    
    const modal = document.createElement('div');
    modal.className = 'glass-card rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl transform scale-95 opacity-0 transition-all duration-300 max-h-[90vh] overflow-y-auto hide-scrollbar';
    
    modal.innerHTML = `
        <h3 class="font-headline-md text-headline-md text-on-surface mb-4">Nueva Herramienta</h3>
        <div class="space-y-4 mb-6">
            <div>
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Nombre de la herramienta</label>
                <input id="tool-name" type="text" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10" placeholder="Ej: Taladro Percutor">
            </div>
            <div>
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Categoría</label>
                <select id="tool-category" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10 bg-[#0c0e14]">
                    <option value="Construcción">Construcción</option>
                    <option value="Jardinería">Jardinería</option>
                    <option value="Automotriz">Automotriz</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Eléctricas">Eléctricas</option>
                    <option value="Manuales">Manuales</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Imagen de la Herramienta (Opcional)</label>
                <div class="relative group">
                    <input id="tool-image" type="file" accept="image/*" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer">
                    <p class="text-[11px] text-on-surface-variant mt-1">Si no subes una, usaremos una imagen profesional por defecto.</p>
                </div>
            </div>
            
            <div class="mb-4">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Precio por Día</label>
                <input id="tool-price" type="number" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10" placeholder="Ej: 15.00" value="15">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Disponible Desde</label>
                    <input id="tool-date-from" type="date" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10 [color-scheme:dark]">
                </div>
                <div>
                    <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Hasta</label>
                    <input id="tool-date-to" type="date" class="w-full glass-input rounded-lg py-2 px-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10 [color-scheme:dark]">
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-3">
            <button id="btn-cancel" class="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface hover:bg-white/5 transition-colors">Cancelar</button>
            <button id="btn-submit" class="px-4 py-2 rounded-lg font-label-md text-label-md bg-[#97BC62] text-[#01390c] hover:opacity-90 transition-opacity font-medium">Publicar</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        modal.classList.remove('scale-95', 'opacity-0');
        modal.querySelector('#tool-name').focus();
    }, 10);
    
    const close = () => {
        overlay.classList.add('opacity-0');
        modal.classList.add('scale-95', 'opacity-0');
        setTimeout(() => overlay.remove(), 300);
    };
    
    modal.querySelector('#btn-cancel').onclick = close;
    modal.querySelector('#btn-submit').onclick = () => {
        const title = modal.querySelector('#tool-name').value.trim();
        const category = modal.querySelector('#tool-category').value;
        const price = parseFloat(modal.querySelector('#tool-price').value) || 15.00;
        const imageInput = modal.querySelector('#tool-image');
        
        if (!title) {
            showToast('El nombre es obligatorio', 'error');
            return;
        }

        // Manejar subida de imagen con FileReader
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                onSubmit({ title, category, image: base64Image, price });
                close();
            };
            reader.readAsDataURL(file);
        } else {
            // Imagen por defecto si no se sube nada
            const defaultImage = 'https://images.unsplash.com/photo-1508873535684-277a3cb8c90a?auto=format&fit=crop&q=80&w=800';
            onSubmit({ title, category, image: defaultImage, price });
            close();
        }
    };
}

// Global functions for inline HTML calls
window.processRequest = function(btn) {
    btn.closest('.glass-panel').remove();
    showToast('Solicitud procesada con éxito', 'success');
};

window.deleteTool = function(id) {
    showConfirmModal('¿Eliminar herramienta?', 'Esta acción no se puede deshacer.', () => {
        const db = getDB();
        db.tools = db.tools.filter(t => t.id !== id);
        saveDB(db);
        renderDashboardTools();
        showToast('Herramienta eliminada correctamente', 'success');
    });
};

window.openToolModal = function(id) {
    const db = getDB();
    const tool = db.tools.find(t => t.id === id);
    if (!tool) return;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center opacity-0 transition-opacity duration-300 p-4';
    
    const price = tool.price || 15.00;
    const desc = tool.description || 'Herramienta en excelentes condiciones. Ideal para tus proyectos de ' + tool.category.toLowerCase() + '. Se entrega limpia y probada.';
    
    const modal = document.createElement('div');
    modal.className = 'glass-card rounded-2xl w-full max-w-4xl border border-white/10 shadow-2xl transform scale-95 opacity-0 transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative max-h-[95vh]';
    
    modal.innerHTML = `
        <div class="md:w-1/2 h-64 md:h-auto relative">
            <img src="${tool.image}" class="w-full h-full object-cover" alt="${tool.title}" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                <div>
                    <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 text-white font-label-sm text-label-sm border border-white/20 mb-2 backdrop-blur-md">
                        <span class="w-1.5 h-1.5 rounded-full ${tool.status === 'available' ? 'bg-[#97BC62] pulse-available' : 'bg-white/50 pulse-borrowed'}"></span>
                        ${tool.statusText}
                    </span>
                    <h3 class="font-headline-md text-headline-md text-white">${tool.title}</h3>
                </div>
            </div>
            <button id="btn-close-mobile" class="absolute top-4 right-4 md:hidden text-white bg-black/50 rounded-full p-1 border border-white/20">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <p class="text-primary font-display text-2xl font-bold">$${price}<span class="text-on-surface-variant font-label-sm text-[14px] font-normal"> / día</span></p>
                    <p class="text-on-surface-variant text-label-sm mt-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">location_on</span> ${tool.owner.name} (${tool.distance})
                    </p>
                </div>
                <button id="btn-close-modal" class="hidden md:block text-on-surface-variant hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2 border border-white/5">
                    <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>
            
            <div class="mb-6">
                <h4 class="font-label-md text-label-md text-on-surface mb-2">Descripción</h4>
                <p class="text-on-surface-variant text-body-md leading-relaxed">${desc}</p>
            </div>
            
            <!-- Reservas Previas -->
            <div class="mb-6">
                <h4 class="font-label-md text-label-md text-on-surface mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">calendar_month</span> Disponibilidad</h4>
                <div class="flex gap-2 text-label-sm text-on-surface-variant bg-white/5 p-3 rounded-lg border border-white/5">
                    <span class="w-2 h-2 rounded-full bg-error mt-1.5"></span>
                    <p>Reservada del <strong>12 al 15 de este mes</strong>. Resto del mes disponible.</p>
                </div>
            </div>
            
            <!-- Formulario de Préstamo -->
            <div class="space-y-4 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                <div>
                    <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2">Fechas de Préstamo</label>
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">date_range</span>
                        <input id="date-range-${id}" type="text" placeholder="Selecciona el rango de días..." class="w-full glass-input rounded-lg py-3 pl-10 pr-3 text-on-surface focus:outline-none focus:border-[#97BC62] border border-white/10 placeholder-on-surface-variant/50 cursor-pointer" readonly>
                    </div>
                </div>
                
                <div class="pt-3 mt-3 border-t border-white/10 flex justify-between items-center">
                    <span class="text-on-surface-variant font-body-md">Costo Total:</span>
                    <span id="total-cost-${id}" class="text-white font-headline-sm text-headline-sm font-bold">$0.00</span>
                </div>
            </div>
            
            <!-- Botones de Acción -->
            <div class="mt-auto flex flex-col gap-3">
                <button id="btn-request" class="w-full py-3 rounded-lg font-label-md text-label-md bg-[#97BC62] text-[#01390c] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${tool.status !== 'available' ? 'opacity-50 cursor-not-allowed saturate-0' : 'shadow-[0_0_20px_rgba(151,188,98,0.2)]'}" ${tool.status !== 'available' ? 'disabled' : ''}>
                    <span class="material-symbols-outlined text-[20px]">${tool.status === 'available' ? 'handshake' : 'block'}</span>
                    ${tool.status === 'available' ? 'Solicitar Préstamo' : 'No Disponible'}
                </button>
                
                <a href="https://wa.me/1234567890?text=Hola%20${encodeURIComponent(tool.owner.name)},%20me%20interesa%20alquilar%20tu%20${encodeURIComponent(tool.title)}" target="_blank" class="w-full py-3 rounded-lg font-label-md text-label-md bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-medium hover:bg-[#25D366]/30 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    Contactar por WhatsApp
                </a>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        modal.classList.remove('scale-95', 'opacity-0');
    }, 10);
    
    const close = () => {
        overlay.classList.add('opacity-0');
        modal.classList.add('scale-95', 'opacity-0');
        setTimeout(() => overlay.remove(), 300);
    };
    
    const btnCloseDesktop = modal.querySelector('#btn-close-modal');
    if (btnCloseDesktop) btnCloseDesktop.onclick = close;
    
    const btnCloseMobile = modal.querySelector('#btn-close-mobile');
    if (btnCloseMobile) btnCloseMobile.onclick = close;
    
    const btnRequest = modal.querySelector('#btn-request');
    if (btnRequest) {
        btnRequest.onclick = () => {
            showToast('Solicitud enviada al dueño. ¡Espera su respuesta!', 'success');
            close();
        };
    }

    // Dynamic cost calculation with Flatpickr
    const inputRange = modal.querySelector(`#date-range-${id}`);
    const totalCostLabel = modal.querySelector(`#total-cost-${id}`);
    
    if (window.flatpickr) {
        flatpickr(inputRange, {
            mode: "range",
            locale: "es",
            minDate: "today",
            dateFormat: "Y-m-d",
            showMonths: window.innerWidth >= 768 ? 2 : 1, // Mostrar 2 meses en desktop
            onChange: function(selectedDates) {
                if (selectedDates.length === 2) {
                    const start = selectedDates[0];
                    const end = selectedDates[1];
                    const diffTime = end - start;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    
                    if (diffDays > 0) {
                        const total = diffDays * price;
                        totalCostLabel.textContent = `$${total.toFixed(2)}`;
                        totalCostLabel.classList.add('text-[#97BC62]');
                    } else {
                        totalCostLabel.textContent = '$0.00';
                        totalCostLabel.classList.remove('text-[#97BC62]');
                    }
                } else {
                    totalCostLabel.textContent = '$0.00';
                    totalCostLabel.classList.remove('text-[#97BC62]');
                }
            }
        });
    }
};

window.logout = function() {
    logoutUser(); // Definida en db.js
    window.location.href = 'index.html';
};

function setupProfileDropdown() {
    const btn = document.getElementById('profile-btn');
    const dropdown = document.getElementById('profile-dropdown');
    
    if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }
}

// --- ENRUTAMIENTO BÁSICO FRONTEND ---
function initApp() {
    const path = window.location.pathname;

    // Detectar página actual (Soportando URLs limpias de Vercel sin .html)
    if (path.includes('login')) {
        setupLogin();
    } else if (path.includes('dashboard')) {
        setupDashboard();
    } else {
        // Asumimos index (home)
        setupHome();
        const toolsData = getTools(); // Extrae datos de LocalStorage
        renderCatalog(toolsData);
        setupFilters(toolsData);
        setupSearch(toolsData);
        setupThemeToggle();
    }
}

// Dado que los scripts están al final del body, podemos ejecutar de inmediato
initApp();
