import mongoose from 'mongoose';
const Schema = mongoose.Schema
const pedidoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true,
    },
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    }],
    estado: {
        type: String,
        enum: ['pendiente', 'completado'], 
        default: 'pendiente',
        required: true,
    },
    importeTotal: {
        type: Number,
        default: 0,
        required: true,
    },
});
export default mongoose.model('Pedido', pedidoSchema);


