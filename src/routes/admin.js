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
    eliminarUsuario,
    crearRuta,
    crearParada,
    crearHorario,
    eliminarParada
} from '../controllers/admin.controllers.js';

const routerAdmin = express.Router();

routerAdmin.get('/listarUsuarios', cargarUsuarios);
routerAdmin.post('/nuevoUsuario', crearUsuario);
routerAdmin.put('/inactivarUsuario', inactivarUsuario);
routerAdmin.put('/editarUsuario', editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id', eliminarUsuario);
routerAdmin.post('/nuevaRuta', crearRuta);
routerAdmin.post('/nuevaParada', crearParada);
routerAdmin.post('/nuevoHorario', crearHorario);
routerAdmin.delete('/eliminarParada/:id', eliminarParada);


export default routerAdmin;
