import { check,validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import {generarId} from "../helpers/tokens.js";
import {emailRegistro} from '../helpers/emails.js';

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
    await check('repetir_password').equals(req.body.password).withMessage('El password no coincide').run(req);

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
    
    //validacion de que no se repita los emails
    //Busqueda de un usuario
    const {nombre,email,password} = req.body;
    //const usuarioExiste = await Usuario.findOne({where: {email: req.body.email}});
    const usuarioExiste = await Usuario.findOne({where: {email}});
    if(usuarioExiste){
        return res.render('auth/registro',{
            pagina:"Crear Cuenta",
            errores: [{
                msg: "El usuario Ya existe"
            }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    //Crear un Usuario
    /* const usuario = await Usuario.create(req.body); Forma clasica*/
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()
    })

    //Enviar datos del usuario Registrado para Confirmar Cuenta
    emailRegistro({
        nombre: usuario.nombre,
        email:usuario.email,
        token:usuario.token
    });

    //Mensaje de Cuenta Creada x Confirmar
    res.render('template/mensaje',{
        pagina: "Cuenta Creada Correctamente",
        mensaje: "Hemos Enviado un Email de Confirmación, presiona en el enlace"
    })
}

const confirmarEmail = (req,res) => {
    const {token} = req.params;     // Permite extraer el parametro que viene en la URL
    console.log('Cargando Confirmacion');

    //Validar si el Token es Valido

    //Confirmar la Cuenta
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
    confirmarEmail,
    formularioOlvidePassword
}