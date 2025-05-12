import { Router } from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { createAdminUsers } from '../controllers/auth.controller.js';
import routerAdmin from './admin.js';
import routerPedido from './pedidos.js';
import menuRouter from '../controllers/menurouter.js';


const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile);


router.use('/admin-page', authRequired, isAdmin, routerAdmin);
router.post('/create-admin-users', createAdminUsers);
router.use(menuRouter);

router.use('/pedidos', authRequired, routerPedido);

export default router;