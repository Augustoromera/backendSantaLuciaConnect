import mongoose from 'mongoose';
import fs from 'fs';
import Horario from './src/models/horario.model.js';

const MONGO_URI = 'mongodb+srv://augusto:wallaby42@proyectoweb.e2tzutv.mongodb.net/santaluciaconnect?retryWrites=true&w=majority';

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const data = JSON.parse(fs.readFileSync('horarios_monteros_a_stalucia.json', 'utf8'));

    // Carga masiva
    const result = await Horario.insertMany(data);
    console.log(`✅ Insertados ${result.length} documentos en Horario`);

    mongoose.disconnect();
}

main().catch(err => {
    console.error('❌ Error al insertar horarios:', err);
    process.exit(1);
});
