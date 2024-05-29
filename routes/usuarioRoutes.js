import express from 'express';

const router = express.Router();

router.get('/login', (req,res) => {
    res.render('auth/login',{
        autenticado: false,
    });
})

router.get('/nosotros', (req,res) => {
    res.json({
        "nombre":"Jose",
        "DNI":7551
    });
})

export default router;