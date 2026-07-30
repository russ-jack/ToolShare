const express = require('express');
const cors = require('cors');

// Inicializar la app Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar base de datos (esto inicializa SQLite y crea tablas)
require('./config/db');

// Middlewares
app.use(cors()); // Permitir peticiones desde cualquier origen (Frontend)
app.use(express.json()); // Parsear JSON del body de las peticiones

// Rutas
const toolRoutes = require('./routes/toolRoutes');
// const authRoutes = require('./routes/authRoutes'); // Para después

app.use('/api/tools', toolRoutes);
// app.use('/api/auth', authRoutes);

// Endpoint de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor Backend de ToolShare funcionando 🚀' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`===========================================`);
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`Punto de acceso API: http://localhost:${port}/api/tools`);
    console.log(`===========================================`);
});
