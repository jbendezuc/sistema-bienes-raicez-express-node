
import express from 'express';
import { propiedades } from '../controllers/apiController.js';

const router = express.Router();

//Routas API
router.get('/propiedades',propiedades)      //Routa API propiedades
 


export default router;