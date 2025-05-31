import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    id_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Ruta', rutaSchema);
