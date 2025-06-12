import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
    id_ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: false },
    id_parada: { type: mongoose.Schema.Types.ObjectId, ref: 'Parada', required: true },
    horario: { type: String, required: true } // formato HH:mm
});

export default mongoose.model('Horario', horarioSchema);
