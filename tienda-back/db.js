require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            
        });
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error de conexión a la base de datos MongoDB:', error);
        process.exit(1); // Salir del proceso con un código de error
    }
}

module.exports = connectDB;
