import express from 'express';
import {admin,crear} from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades',admin)    //Routa que redireciona al controller admin
router.get('/propiedad/crear',crear) 

export default router