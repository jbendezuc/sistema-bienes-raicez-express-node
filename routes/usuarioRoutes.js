import express from 'express';

import { cerrarSesion,formularioLogin,autenticar,formularioRegistro,registrar,formularioOlvidePassword,confirmarEmail,resetPassword,confirmarTokenRestauracion,restaurarPassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);  //Invoca la ruta para mostrar el formulario
router.post('/login',autenticar);   //Invoca la ruta para iniciar session

// Cerrar Sesion
router.post('/cerrar-sesion',cerrarSesion)

router.get('/registro', formularioRegistro);  //Invoca la ruta para mostrar el formulario
router.post('/registro', registrar);  //Invoca la ruta para registrar DATOS
router.get('/confirmacion/:token',confirmarEmail); //Confirmacion del Email

router.get('/olvide-password', formularioOlvidePassword);  //Invoca la ruta para mostrar el formulario
router.post('/olvide-password',resetPassword) //Envio de datos para recuperar su password

router.get('/olvide-password/:token',confirmarTokenRestauracion); // Confirmacion del Email
router.post('/olvide-password/:token',restaurarPassword); //Restaurar password

export default router;