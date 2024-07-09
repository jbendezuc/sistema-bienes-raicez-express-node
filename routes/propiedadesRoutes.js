import express from 'express';
import { body } from 'express-validator'; //Validar Formularios en las RUTAS
import {admin,crear,guardar, agregarImagen,almacenarImagen,editar, guardarCambios} from '../controllers/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin)    //Routa que redireciona al controller admin (VISTA)
router.get('/propiedad/crear', crear)                   //Routa para Direccionar a la VISTA
router.post('/propiedad/crear',
    body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripcion no puede ir Vacia')
    .isLength({ max:200 }).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
    body('precio').isNumeric().withMessage('Selecciona un Precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estacionamiento'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de WC')
    , protegerRuta, guardar)                             //Routa para Guardar en la BD del formulario
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen)  //Routa para Mostrar la vista EDITAR
router.post('/propiedades/agregar-imagen/:id', protegerRuta, upload.single('imagen'), almacenarImagen ) //upload('imagen'), reconoce que se esta cargado un archivo de un elemento con nombre "imagen" = al form
router.get('/propiedades/editar/:id', protegerRuta, editar) //Routa para ir a la vista EDITAR
router.post('/propiedades/editar/:id',
    body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripcion no puede ir Vacia')
    .isLength({ max:200 }).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una Categoria'),
    body('precio').isNumeric().withMessage('Selecciona un Precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estacionamiento'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de WC')
    , protegerRuta, guardarCambios)                    //Routa para Actualizar Cambios en la BD del formulario

export default router