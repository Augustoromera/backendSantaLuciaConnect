import mongoose from 'mongoose';
import { boolean } from 'zod';

const horarioSchema = new mongoose.Schema({
    id_ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: false },
    id_parada: { type: mongoose.Schema.Types.ObjectId, ref: 'Parada', required: true },
    horario: { type: String, required: true }, // formato HH:mm
    tipo_dia: { type: String, enum: ['habil', 'sabado', 'domingo'], required: true },
    nro_orden: { type: Number, required: true },
    turno: { type: String, enum: ['mañana', 'tarde', 'noche'], required: true },
    shown: {type: Boolean, default: false},
});

export default mongoose.model('Horario', horarioSchema);
