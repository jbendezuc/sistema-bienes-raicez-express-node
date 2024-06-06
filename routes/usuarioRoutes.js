import express from 'express';

import { formularioLogin,formularioRegistro,registrar,formularioOlvidePassword,confirmarEmail } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);  //Invoca la ruta para mostrar el formulario
router.get('/registro', formularioRegistro);  //Invoca la ruta para mostrar el formulario
router.post('/registro', registrar);  //Invoca la ruta para registrar DATOS
router.get('/olvide-password', formularioOlvidePassword);  //Invoca la ruta para mostrar el formulario
router.get('/confirmacion/:token',confirmarEmail); //Confirmacion del Email

export default router;