import express from 'express';

import { formularioLogin,formularioRegistro,formularioOlvidePassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);  //Invoca al Controller
router.get('/registro', formularioRegistro);
router.get('/olvide-password', formularioOlvidePassword);

export default router;