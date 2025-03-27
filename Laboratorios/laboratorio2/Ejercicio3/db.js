const mongoose = require('mongoose');

let connection = null;

async function connectDB() {
    if (!connection) {
        try {
            const conn = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;
            connection = await mongoose.connect(conn);
            console.log('Conexión a MongoDB establecida correctamente');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
        }
    }
}

module.exports = connectDB;