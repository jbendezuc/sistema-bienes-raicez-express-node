import express from 'express';
import { body } from 'express-validator'; //Validar Formularios en las RUTAS
import {admin,crear,guardar} from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades',admin)    //Routa que redireciona al controller admin
router.get('/propiedad/crear',crear) 
router.post('/propiedad/crear',
    body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripcion no puede ir Vacia')
    .isLength({ max:200 }).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
    body('precio').isNumeric().withMessage('Selecciona un Precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estacionamiento'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de WC')
    ,guardar) //Routa para Guardar en la BD del formulario

export default router