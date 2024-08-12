const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

//Habilitar el CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Conectar a la base de datos MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
