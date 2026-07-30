const API_URL = 'http://localhost:3000/api';

// Datos de respaldo (fallback) por si el backend no está disponible en Vercel
const fallbackTools = [
    {
        id: 1, title: "Taladro Percutor Bosch 800W", category: "Construcción", categoryIcon: "ph-hammer",
        owner: { name: "Carlos R.", initial: "C", rating: 4.9, reviews: 24 }, distance: "a 3 cuadras",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgFMzvwpz-agMDivsChCp6IlCUQ7GA2Bp1-fYpaIQKz_XFqLBzng9dWgST0YRq6u9y9ETBLQTG4-1TkhC2eAImcwQoysQdYihAw_CLdgQV7c8HjOHTFPDb-2w7xtxqQAshKBgs9zDUdz5PHn5U7KvGxUY9ZkznLv1_GKTrn9TsVmw2YwjADoTx-7b4ejgwz8UEswa_naIw04B7nDs6gx9BCPvDK3vuPPK5Y4wvYCuQAMsMgWn805L0lg",
        status: "available", statusText: "Disponible"
    },
    {
        id: 2, title: "Escalera Telescópica 3m", category: "Construcción", categoryIcon: "ph-wrench",
        owner: { name: "Ana P.", initial: "A", rating: 5.0, reviews: 12 }, distance: "a 5 cuadras",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0EBlfURFRLDMeAU8Zde-PLgkHPmvh8y46PWJI_OT5Zq_QPCfAh17e1ahTvwpOM58YH_CRaWZJx5Wb_MVtHfxq3NFj6Lc1R6h8N-1hLUNo8T8wYs-EQXgbtNmxS4z8anb0VnLGMNWRD7A_Ssx84h06o9yX1deGox99InpZVgkangfOGavg6fYz4Tu4BN9EjaNp_a5xc6FKsLqEJTIyZVMHLz_wcq_II1L2R7l_PLxAcP3gLCEr1mv7NQ",
        status: "borrowed", statusText: "Devuelve mañana"
    },
    {
        id: 3, title: "Sierra Circular Makita", category: "Construcción", categoryIcon: "ph-hammer",
        owner: { name: "Miguel T.", initial: "M", rating: 4.7, reviews: 38 }, distance: "a 1 km",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk1rEOkIIN0LDnT6Y1Qw3UA0QnNhlfRIbds_plFYTlBtzCzrIOkrU-BgUv9IhIiK5DjVZtcJgxwc1pLf81bFLmSfZ3HaLF0FR6jXVvJMgbK1og_H1KDrUPWkQxy4xKc2CvTpzrw9meJjheHaIzsUQi9ucJyJzlsGUbic18vFZ6EOPs6pf9qZbEJbNIf4ipnlrpWIdLuyNaTCoDIRbrrmYeW5cYwyNxyJ7SXoqXgcIQsQORoPBxLPzsmQ",
        status: "available", statusText: "Disponible"
    }
];

// --- Funciones Auxiliares ---
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// --- AUTH LOGIC (Fake for compatibility) ---
// Usamos LocalStorage temporalmente solo para mantener la sesión abierta simulada
const DB_KEY = 'toolshare_auth';

export function initDB() {
    try {
        const data = localStorage.getItem(DB_KEY);
        if (!data) throw new Error("Empty DB");
        JSON.parse(data); // Validar formato
    } catch (e) {
        localStorage.setItem(DB_KEY, JSON.stringify({ 
            currentUser: null,
            users: [ { id: 1, name: "Alejandro", email: "admin@vecindario.com", role: "admin", initial: "A" } ]
        }));
    }
}

export function getDB() {
    initDB();
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) || { currentUser: null, users: [] };
    } catch (e) {
        return { currentUser: null, users: [] };
    }
}

export function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function loginUser(email, password) {
    // Simulación simple para MVP
    if (email === "admin@vecindario.com" && password === "admin123") {
        const db = getDB();
        db.currentUser = db.users[0];
        saveDB(db);
        return true;
    }
    return false;
}

export function logoutUser() {
    const db = getDB();
    db.currentUser = null;
    saveDB(db);
}

export function getCurrentUser() {
    return getDB().currentUser;
}

// --- API REAL (Backend) ---

let cachedTools = [];

export async function fetchToolsFromAPI() {
    try {
        const tools = await fetchAPI('/tools');
        // Adaptar estructura del backend a lo que espera el frontend
        cachedTools = tools.map(t => ({
            ...t,
            title: t.name,
            owner: { name: "Usuario", initial: "U", rating: t.rating || 5, reviews: t.reviews || 0 }
        }));
    } catch (e) {
        console.warn("Usando datos locales de respaldo (Vercel o servidor apagado).");
        cachedTools = fallbackTools;
    }
}

// Leer Catálogo (Síncrono usando la caché para no romper el resto de main.js)
export function getTools() {
    return cachedTools;
}

// Añadir Herramienta
export async function addTool(tool) {
    const backendTool = {
        name: tool.title,
        category: tool.category,
        price: tool.price || 0,
        description: tool.description || '',
        status: tool.status || 'Disponible',
        image: tool.image
    };
    
    try {
        const saved = await fetchAPI('/tools', {
            method: 'POST',
            body: JSON.stringify(backendTool)
        });
        await fetchToolsFromAPI(); // Recargar caché
        return saved;
    } catch (e) {
        console.warn("Backend falló. Guardando herramienta en caché local (modo Vercel fallback).");
        tool.id = Date.now();
        tool.owner = getCurrentUser() || { name: "Usuario", initial: "U", rating: 5, reviews: 0 };
        tool.distance = "a 1 cuadra";
        cachedTools.unshift(tool); // Añadir al principio
        fallbackTools.unshift(tool);
        return tool;
    }
}
