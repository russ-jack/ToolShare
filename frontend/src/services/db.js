const API_URL = 'http://localhost:3000/api';

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
        console.warn("No se pudo conectar al Backend. Revisa CORS o asegúrate que el servidor esté corriendo.");
        cachedTools = [];
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
    const saved = await fetchAPI('/tools', {
        method: 'POST',
        body: JSON.stringify(backendTool)
    });
    await fetchToolsFromAPI(); // Recargar caché
    return saved;
}
