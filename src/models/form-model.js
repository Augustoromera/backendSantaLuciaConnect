import { Schema, model } from 'mongoose';

const formSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: false,
    },

    subject: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    }
});

export default model('Form', formSchema);
