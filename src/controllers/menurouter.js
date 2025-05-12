import { Router } from 'express';
import menuModel from '../models/menu-model.js';
const menuRouter = Router();

menuRouter.get('/mostrarMenus', async (req, res) => {
    try {
        const menus = await menuModel.find();
        res.status(200).json({
            ok: true,
            menus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
});

export default menuRouter;
