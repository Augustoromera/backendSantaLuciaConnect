import express from 'express';
import { crearPedido } from '../controllers/pedido.controllers.js';

const routerPedido = express.Router();

routerPedido.post('/nuevoPedido', crearPedido);

export default routerPedido;
