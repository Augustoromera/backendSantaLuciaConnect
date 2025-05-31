import mongoose from 'mongoose';

const tarifaSchema = new mongoose.Schema({
    id_ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    tipoOrigen: { type: String, required: true },
    destino: { type: String, required: true },
    precio: { type: Number, required: true }
});

export default mongoose.model('Tarifa', tarifaSchema);
