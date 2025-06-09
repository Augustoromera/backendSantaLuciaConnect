import mongoose from 'mongoose';

const paradaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String },
    id_ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    orden: { type: Number, required: true}
});

export default mongoose.model('Parada', paradaSchema);
