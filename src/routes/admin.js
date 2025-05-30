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


export default routerAdmin;
