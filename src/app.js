import express from 'express';
import jwt from 'jsonwebtoken';

import choferRoutes from './routes/chofer.routes.js';
import claseRoutes from './routes/clase.routes.js';
import clasificacionRoutes from './routes/clasificacion.routes.js';
import colorRoutes from './routes/color.routes.js';
import control_calidadRoutes from './routes/control_calidad.routes.js';
import corteRoutes from './routes/corte.routes.js';
import defectosRoutes from './routes/defectos.routes.js';
import glaseoRoutes from './routes/glaseo.routes.js';
import grupoRoutes from './routes/grupo.routes.js';
import loteRoutes from './routes/lote.routes.js';
import maquinaRoutes from './routes/maquina.routes.js';
import pesoRoutes from './routes/peso.routes.js';
import presentacionRoutes from './routes/presentacion.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import tallaRoutes from './routes/talla.routes.js';
import tipoRoutes from './routes/tipo.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

import materiaprimaRoutes from './routes/materiaprima.routes.js';
import procesoRoutes from './routes/proceso.routes.js';

import { fileURLToPath } from 'url'; // Importar fileURLToPath
import path from 'path'; // Importar path
import cors from 'cors'; // Importar cors

import pg from 'pg';
import { config } from 'dotenv';

config()

const app = express();
app.use(express.json()); // Para que interprete los objetos json

const pool = new pg.Pool({
    connectionString: process.env.BD_DATABASE_URL
})

// Definir módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de CORS
const corsOptions = {
    origin: '*', // Dirección del dominio del servidor
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions)); // Aquí ahora funciona correctamente

// Rutas
app.use('/api', choferRoutes);
app.use('/api', claseRoutes);
app.use('/api', clasificacionRoutes);
app.use('/api', colorRoutes);
app.use('/api', control_calidadRoutes);
app.use('/api', corteRoutes);
app.use('/api', defectosRoutes);
app.use('/api', glaseoRoutes);
app.use('/api', grupoRoutes);
app.use('/api', loteRoutes);
app.use('/api', maquinaRoutes);
app.use('/api', pesoRoutes);
app.use('/api', presentacionRoutes);
app.use('/api', proveedorRoutes);
app.use('/api', tallaRoutes);
app.use('/api', tipoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', vehiculoRoutes);

app.use('/api', materiaprimaRoutes);
app.use('/api', procesoRoutes);


// Ruta de prueba para API
app.get("/api", (req, res) => {
    res.json({
        mensaje: "API RESTful de mi Tesis :D"
    });
});

// Ruta de login para generar un token JWT
app.get("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Maritza",
        email: "kchalen14@gmail.com"
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(400).json({
        message: 'Ruta no encontrada :('
    });
});

// Iniciar servidor
app.listen(3001, function() {
    console.log("Node.js app running on port 3001...");
});

export default app;
