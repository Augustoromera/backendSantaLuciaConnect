import express from 'express';
import {
    cargarUsuarios,
    crearUsuario,
    inactivarUsuario,
    editarUsuario,
    eliminarUsuario,
    crearRuta,
    crearParada,
    crearHorario,
    eliminarParada,
    registrarContacto,
    cargarMensajes
} from '../controllers/admin.controllers.js';
import { editarHorario, editarParada, eliminarHorario } from '../controllers/horarios.controller.js';

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
routerAdmin.put('/editarHorario', editarHorario);
routerAdmin.put('/editarParada', editarParada);
routerAdmin.delete('/eliminarHorario/:id', eliminarHorario);
routerAdmin.post('/mensajeContacto', registrarContacto);
routerAdmin.get('/listarMensajes', cargarMensajes);

export default routerAdmin;
