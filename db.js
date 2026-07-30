/**
 * db.js - Simulación de Base de Datos con LocalStorage (Sin Backend)
 * Ideal para la presentación académica.
 */

const DB_KEY = 'toolshare_db';

// Datos iniciales (Catálogo semilla)
const initialData = {
    users: [
        { id: 1, name: "Alejandro", email: "admin@vecindario.com", role: "admin", initial: "A" }
    ],
    tools: [
        {
            id: 1,
            title: "Taladro Percutor Bosch 800W",
            category: "Construcción",
            categoryIcon: "ph-hammer",
            owner: { name: "Carlos R.", initial: "C", rating: 4.9, reviews: 24 },
            distance: "a 3 cuadras",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgFMzvwpz-agMDivsChCp6IlCUQ7GA2Bp1-fYpaIQKz_XFqLBzng9dWgST0YRq6u9y9ETBLQTG4-1TkhC2eAImcwQoysQdYihAw_CLdgQV7c8HjOHTFPDb-2w7xtxqQAshKBgs9zDUdz5PHn5U7KvGxUY9ZkznLv1_GKTrn9TsVmw2YwjADoTx-7b4ejgwz8UEswa_naIw04B7nDs6gx9BCPvDK3vuPPK5Y4wvYCuQAMsMgWn805L0lg",
            status: "available",
            statusText: "Disponible"
        },
        {
            id: 2,
            title: "Escalera Telescópica 3m",
            category: "Construcción",
            categoryIcon: "ph-wrench",
            owner: { name: "Ana P.", initial: "A", rating: 5.0, reviews: 12 },
            distance: "a 5 cuadras",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0EBlfURFRLDMeAU8Zde-PLgkHPmvh8y46PWJI_OT5Zq_QPCfAh17e1ahTvwpOM58YH_CRaWZJx5Wb_MVtHfxq3NFj6Lc1R6h8N-1hLUNo8T8wYs-EQXgbtNmxS4z8anb0VnLGMNWRD7A_Ssx84h06o9yX1deGox99InpZVgkangfOGavg6fYz4Tu4BN9EjaNp_a5xc6FKsLqEJTIyZVMHLz_wcq_II1L2R7l_PLxAcP3gLCEr1mv7NQ",
            status: "borrowed",
            statusText: "Devuelve mañana"
        },
        {
            id: 3,
            title: "Sierra Circular Makita",
            category: "Construcción",
            categoryIcon: "ph-hammer",
            owner: { name: "Miguel T.", initial: "M", rating: 4.7, reviews: 38 },
            distance: "a 1 km",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk1rEOkIIN0LDnT6Y1Qw3UA0QnNhlfRIbds_plFYTlBtzCzrIOkrU-BgUv9IhIiK5DjVZtcJgxwc1pLf81bFLmSfZ3HaLF0FR6jXVvJMgbK1og_H1KDrUPWkQxy4xKc2CvTpzrw9meJjheHaIzsUQi9ucJyJzlsGUbic18vFZ6EOPs6pf9qZbEJbNIf4ipnlrpWIdLuyNaTCoDIRbrrmYeW5cYwyNxyJ7SXoqXgcIQsQORoPBxLPzsmQ",
            status: "available",
            statusText: "Disponible"
        },
        {
            id: 4,
            title: "Hidrolavadora Karcher",
            category: "Limpieza",
            categoryIcon: "ph-leaf",
            owner: { name: "Luis R.", initial: "L", rating: 4.9, reviews: 25 },
            distance: "a 4 cuadras",
            image: "https://images.unsplash.com/photo-1629851609200-a92e1ee81b7e?auto=format&fit=crop&q=80&w=800",
            status: "available",
            statusText: "Disponible"
        },
        {
            id: 5,
            title: "Set de Llaves Stanley",
            category: "Automotriz",
            categoryIcon: "ph-wrench",
            owner: { name: "Javier E.", initial: "J", rating: 5.0, reviews: 31 },
            distance: "a 1 cuadra",
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800",
            status: "borrowed",
            statusText: "En préstamo"
        },
        {
            id: 6,
            title: "Cortadora de Césped",
            category: "Jardinería",
            categoryIcon: "ph-leaf",
            owner: { name: "Sofía V.", initial: "S", rating: 4.6, reviews: 3 },
            distance: "a 8 cuadras",
            image: "https://images.unsplash.com/photo-1589051039495-2070f7ac16ce?auto=format&fit=crop&q=80&w=800",
            status: "available",
            statusText: "Disponible"
        }
    ],
    currentUser: null
};

// --- CORE DB LOGIC ---

// Inicializar DB si está vacía
function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
}

// Leer DB
function getDB() {
    initDB();
    return JSON.parse(localStorage.getItem(DB_KEY));
}

// Escribir DB
function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- APP API ---

// Listar herramientas
function getTools() {
    return getDB().tools;
}

// Agregar nueva herramienta (Funciona en la presentación)
function addTool(tool) {
    const db = getDB();
    tool.id = Date.now(); // ID dinámico
    db.tools.unshift(tool); // Agregar al inicio de la lista
    saveDB(db);
}

// Eliminar herramienta
function deleteTool(id) {
    if (!confirm('¿Estás seguro de eliminar esta herramienta?')) return;
    const db = getDB();
    db.tools = db.tools.filter(t => t.id !== id);
    saveDB(db);
    window.location.reload();
}

// Login
function loginUser(email) {
    const db = getDB();
    // Cualquier login entra como el usuario admin (Alejandro) para la demo
    db.currentUser = db.users[0];
    saveDB(db);
    return true;
}

// Cerrar sesión
function logoutUser() {
    const db = getDB();
    db.currentUser = null;
    saveDB(db);
}

// Revisar sesión activa
function getCurrentUser() {
    return getDB().currentUser;
}

// Auto-inicializar la BD al cargar la página
initDB();
