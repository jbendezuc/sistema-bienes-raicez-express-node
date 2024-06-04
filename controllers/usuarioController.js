import { check,validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";


const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: "Inciar Sesion"
    });
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
       pagina: "Crear Cuenta"
    });
}

const registrar = async (req,res) => {
    //Validación express-validator
    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req);
    await check('email').isEmail().withMessage('Eso no es un Email').run(req);
    await check('password').isLength({min:6}).withMessage('Minimo 6 caracteres').run(req);
    await check('repetir_password').equals('password').withMessage('El password no coincide').run(req);

    let resultado = validationResult(req);

    //Verificar que el resultado este vacio, si es false, q return
    if(!resultado.isEmpty()){

        return res.render('auth/registro',{
            pagina: "Crear Cuenta",
            errores: resultado.array(),  //retorna los errores en formato array
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    
    

    //Crear un Usuario
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
}

const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password',{
       pagina: "Recupera tus accesos a Bienes Raices"
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}