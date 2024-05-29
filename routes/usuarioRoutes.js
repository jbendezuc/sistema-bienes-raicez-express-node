import express from 'express';

import { formularioLogin,formularioRegistro } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);  //Invoca al Controller
router.get('/registro', formularioRegistro);


export default router;