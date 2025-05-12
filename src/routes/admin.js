import express from 'express';
import { check } from 'express-validator';
import {
    cargarUsuarios,
    cargarMenu,
    crearMenu,
    editarMenu,
    eliminarMenu,
    crearUsuario,
    inactivarUsuario,
    editarUsuario,
    listarPedido,
    completarPedido,
    eliminarUsuario
} from '../controllers/admin.controllers.js';

const routerAdmin = express.Router();

routerAdmin.get('/listarUsuarios', cargarUsuarios);
routerAdmin.post('/nuevoUsuario', crearUsuario);
routerAdmin.put('/inactivarUsuario', inactivarUsuario);
routerAdmin.put('/editarUsuario', editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id', eliminarUsuario);

routerAdmin.get('/listarMenu', cargarMenu);
routerAdmin.post('/nuevoMenu', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('detalle', 'El detalle es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty()
], crearMenu);
routerAdmin.put('/editarMenu', editarMenu);
routerAdmin.delete('/eliminarMenu/:id', eliminarMenu);

routerAdmin.get('/listarPedido', listarPedido);
routerAdmin.put('/completarPedido', completarPedido);

export default routerAdmin;
