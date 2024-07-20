import express from 'express';
import { inicio,categoria,noEncontrado,buscador } from '../controllers/appController.js'; 

const router = express.Router();


//Pagina Inicio
router.get('/', inicio);

//Categoria
router.get('/categorias/:id', categoria);

//404
router.get('/404', noEncontrado);

//Buscador
router.post('/buscador', buscador);

export default router;