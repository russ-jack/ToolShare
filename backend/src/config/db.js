const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta database exista
const dbDir = path.resolve(__dirname, '../../database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'toolshare.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error conectando a SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        initDB();
    }
});

function initDB() {
    db.serialize(() => {
        // Crear tabla de usuarios
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT DEFAULT 'user',
            initial TEXT
        )`);

        // Crear tabla de herramientas
        db.run(`CREATE TABLE IF NOT EXISTS tools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'Disponible',
            image TEXT,
            owner_id INTEGER,
            distance TEXT,
            rating REAL,
            reviews INTEGER,
            FOREIGN KEY (owner_id) REFERENCES users (id)
        )`, () => {
            // Insertar datos semilla si la tabla está vacía
            db.get("SELECT COUNT(*) as count FROM tools", (err, row) => {
                if (row && row.count === 0) {
                    seedDatabase();
                }
            });
        });
    });
}

function seedDatabase() {
    console.log('Insertando datos semilla...');
    
    // Insert user
    db.run(`INSERT INTO users (name, email, role, initial) VALUES ('Alejandro', 'admin@vecindario.com', 'admin', 'A')`, function(err) {
        const ownerId = this.lastID || 1;
        
        const tools = [
            { name: "Taladro Percutor Bosch 800W", category: "Construcción", price: 15.00, description: "Ideal para concreto y mampostería. Incluye brocas.", status: "Disponible", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 3 cuadras", rating: 4.9, reviews: 24 },
            { name: "Escalera Telescópica 3m", category: "Construcción", price: 12.00, description: "Aluminio, ligera y muy estable. Soporta hasta 150kg.", status: "Devuelve mañana", image: "https://images.unsplash.com/photo-1590496794008-383c8070b257?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 5 cuadras", rating: 5.0, reviews: 12 },
            { name: "Sierra Circular Makita", category: "Construcción", price: 20.00, description: "Corte preciso en madera. Disco recién cambiado.", status: "Disponible", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 1 km", rating: 4.7, reviews: 38 },
            { name: "Hidrolavadora Karcher", category: "Limpieza", price: 25.00, description: "Presión de 1600 PSI. Perfecta para patios y autos.", status: "Disponible", image: "https://images.unsplash.com/photo-1585250005705-eb89d81373ae?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 2 cuadras", rating: 4.8, reviews: 15 },
            { name: "Caja de Herramientas Completa", category: "Automotriz", price: 10.00, description: "120 piezas. Dados, llaves, desarmadores.", status: "En préstamo", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 4 cuadras", rating: 4.9, reviews: 42 },
            { name: "Cortadora de Césped", category: "Jardinería", price: 30.00, description: "Eléctrica, ancho de corte 38cm. Incluye extensión.", status: "Disponible", image: "https://images.unsplash.com/photo-1592424001806-b3c1b11ce517?auto=format&fit=crop&q=80&w=800", owner_id: ownerId, distance: "a 800 m", rating: 4.6, reviews: 8 }
        ];

        const stmt = db.prepare(`INSERT INTO tools (name, category, price, description, status, image, owner_id, distance, rating, reviews) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        for (let t of tools) {
            stmt.run(t.name, t.category, t.price, t.description, t.status, t.image, t.owner_id, t.distance, t.rating, t.reviews);
        }
        stmt.finalize();
    });
}

module.exports = db;
