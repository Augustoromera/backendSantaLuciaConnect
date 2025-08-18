import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema({
    nombre:{type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telefono: {type: String},
    asunto: {type: String},
    mensaje: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' || null},
})

export default mongoose.model('contacto', contactoSchema);