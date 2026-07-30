const db = require('../config/db');

// Obtener todas las herramientas
exports.getAllTools = (req, res) => {
    const query = 'SELECT * FROM tools ORDER BY id DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error obteniendo herramientas:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(rows);
    });
};

// Obtener herramienta por ID
exports.getToolById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM tools WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error obteniendo herramienta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (!row) return res.status(404).json({ error: 'Herramienta no encontrada' });
        res.json(row);
    });
};

// Crear nueva herramienta
exports.createTool = (req, res) => {
    const { name, category, price, description, status, image } = req.body;
    
    // Asumimos que el usuario actual tiene ID 1 (Alejandro)
    const owner_id = 1;
    const distance = "a 1 cuadra"; // Simulado
    const rating = 5.0; // Simulado
    const reviews = 0; // Simulado

    const query = `INSERT INTO tools (name, category, price, description, status, image, owner_id, distance, rating, reviews) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, category, price, description, status, image, owner_id, distance, rating, reviews], function(err) {
        if (err) {
            console.error('Error creando herramienta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        // Devolver la herramienta recién creada
        const getQuery = 'SELECT * FROM tools WHERE id = ?';
        db.get(getQuery, [this.lastID], (err, row) => {
            res.status(201).json(row);
        });
    });
};

// Actualizar herramienta
exports.updateTool = (req, res) => {
    const id = req.params.id;
    const { name, category, price, description, status, image } = req.body;
    
    const query = `UPDATE tools 
                   SET name = ?, category = ?, price = ?, description = ?, status = ?, image = ? 
                   WHERE id = ?`;
                   
    db.run(query, [name, category, price, description, status, image, id], function(err) {
        if (err) {
            console.error('Error actualizando herramienta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Herramienta no encontrada' });
        
        res.json({ message: 'Herramienta actualizada correctamente' });
    });
};

// Borrar herramienta
exports.deleteTool = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM tools WHERE id = ?';
    
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Error borrando herramienta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Herramienta no encontrada' });
        
        res.json({ message: 'Herramienta eliminada correctamente' });
    });
};
