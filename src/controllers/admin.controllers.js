import { validationResult } from 'express-validator';
import usuarioModel from '../models/user.model.js';
import rutaModel from '../models/ruta.model.js';
import paradaModel from '../models/parada.model.js';
import horarioModel from '../models/horario.model.js';
import mensajeContacto from '../models/contacto.model.js';
import bcrypt from 'bcrypt';
const cargarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find();
        res.status(200).json({
            ok: true,
            usuarios,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'por favor contactate con el administrador',
        });
    }

}
const inactivarUsuario = async (req, res) => {
    try {
        const usuariosInactivar = await usuarioModel.findById(req.body._id);
        if (!usuariosInactivar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún usuario con ese id',
            });
        }
        const usuarioInactivo = req.body;
        usuarioInactivo.estado = 'inactive';
        await usuarioModel.findByIdAndUpdate(req.body._id, usuarioInactivo);
        res.status(200).json({
            msg: 'Usuario inhabilitado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};
const editarUsuario = async (req, res) => {
    try {
        let userId = req.body._id;
        const usuarioEditar = await usuarioModel.findById(userId);
        if (!usuarioEditar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún menú con ese id',
            });
        }
        await usuarioModel.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({
            msg: 'Usuario editado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};
const crearUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped(),
        });
    }
    try {
        const usuario = new usuarioModel(req.body);
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(usuario.password, salt);
        await usuario.save();
        res.status(201).json({
            msg: 'Usuario creado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};

const crearRuta = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped(),
        });
    }
    try {
        const ruta = new rutaModel(req.body);
        await ruta.save();
        res.status(201).json({
            msg: 'Ruta creada correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
}

const crearParada = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped(),
        });
    }
    try {
        const parada = new paradaModel(req.body);
        await parada.save();
        res.status(201).json({
            msg: 'Parada creada correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
}

const crearHorario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped(),
        });
    }
    try {
        const horario = new horarioModel(req.body);
        await horario.save();
        res.status(201).json({
            msg: 'Horario creado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminar = await usuarioModel.findById(req.params.id);
        if (!usuarioEliminar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún menú con ese id',
            });
        }
        await usuarioModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};

const eliminarParada = async (req, res) => {
    try {
        const paradaEliminar = await paradaModel.findById(req.params.id);
        if (!paradaEliminar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ninguna parada con este id',
            });
        }
        await paradaModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: 'Parada eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
}

const registrarContacto = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, asunto, mensaje } = req.body;

        const user = await usuarioModel.findOne({ email });

        const registro = new mensajeContacto({
            nombre,
            apellido,
            email,
            telefono,
            asunto,
            mensaje,
            userId: user ? user._id : null
        });

        await registro.save();
        res.status(200).json({
            msg: "Mensaje enviado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al enviar el mensaje"
        })
    }
}

export {
    cargarUsuarios,
    crearUsuario,
    inactivarUsuario,
    editarUsuario,
    eliminarUsuario,
    crearRuta,
    crearParada,
    crearHorario,
    eliminarParada,
    registrarContacto
};