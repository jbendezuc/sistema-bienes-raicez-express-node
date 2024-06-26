import { check,validationResult } from "express-validator";
import bcrypt from "bcrypt"
import Usuario from "../models/Usuario.js";
import {generarId,generarJWT} from "../helpers/tokens.js";
import {emailRegistro,emailOlvidePassword} from '../helpers/emails.js';

const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: "Inciar Sesion",
        csrfToken: req.csrfToken()
    });
}

const autenticar = async(req,res) => {
    //Validar Inputs
    await check('email').isEmail().withMessage('Obligatorio un Email').run(req);
    await check('password').notEmpty().withMessage('Obligatorio una Contraseña').run(req);

    //Mostrar los resultados de la validacion
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/login',{
            pagina: "Inciar Sesión",
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    //Consultar si existe el usuario
    const {email,password} = req.body;
    const usuario = await Usuario.findOne({where: {email}})

    if(!usuario){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            errores: [{msg: "El email no existe"}]
        })
    }

    //Validar si el usuario esta confirmado
    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            errores: [{msg: "Falta confirmar el correo" }]
        })
    }
    
    //Comparar Contraseña Hasheadas vs Plano
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            errores: [{msg: "Contraseña Incorrecta" }]
        })
    }

    const token = generarJWT({id:usuario.id,nombre:usuario.nombre});

    return res.cookie('_token',token,{
        httpOnly:true,
        secure: true,
        sameSite: true
    }).redirect('/mis-propiedades');
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
       pagina: "Crear Cuenta",
       csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
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

const confirmarEmail = async (req,res) => {
    const {token} = req.params;     // Permite extraer el parametro que viene en la URL
    
    //Validar si el Token es Valido
    const usuario = await Usuario.findOne({where: {token}});

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
        pagina: "Error al confirmar tu cuenta",
        mensaje: "Hubo un error al confirmar tu cuenta, intenta denuevo",
        error: true
    })
    } 

    //Confirmar la Cuenta // ACTUALIZAR EL DATO

    usuario.token = null;
    usuario.confirmado = true;

    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: "Cuenta Confirmada",
        mensaje: "La cuenta se confirmo correctamente"
    
})}



const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password',{
       pagina: "Recupera tus accesos a Bienes Raices",
       csrfToken: req.csrfToken()
    });
}

const resetPassword = async(req,res) => {
    
    //Validar Email
    await check('email').isEmail().withMessage('Eso no es un Email').run(req);
    
    let resultado = validationResult(req);

    //Verificar que los inputs no esten vacios, si es false, q return
    if(!resultado.isEmpty()){

        return res.render('auth/olvide-password',{
            pagina: "Recupera tus accesos a Bienes Raices",
            errores: resultado.array(),             //retorna los errores en formato array
            csrfToken: req.csrfToken(),             //Validacion de los formularios
        })
    }

    //Buscar un usuario
    const {email} = req.body;
    const usuario = await Usuario.findOne({where: {email}});
    
    if(!usuario){
        return res.render('auth/olvide-password',{
            pagina: "Recupera tus accesos a Bienes Raices",
            csrfToken: req.csrfToken(),                         //Validacion de los formularios
            errores: [{msg: "El email no Pertenece a ningun usuario"}]
        })
    }

    //Generar un Token y enviar Email
    usuario.token = generarId();
    await usuario.save();

    //Enviar Email
    emailOlvidePassword({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //Mostrar mensaje
    res.render('template/mensaje',{
        pagina: "Reestablecer Password",
        mensaje: "Hemos Enviado un Email de Confirmación, presiona en el enlace"
    })

}

const confirmarTokenRestauracion = async (req,res) => {

    const {token} = req.params;

    //Validar si el Token es Valido
    const usuario = await Usuario.findOne({where: {token}});

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
        pagina: "Error al restaurar tu cuenta",
        mensaje: "Hubo un error al restaurar tu cuenta, intenta denuevo",
        error: true
    })
    }
    
    res.render('auth/reset-password',{
        pagina: "Restaurar Password",
        csrfToken: req.csrfToken()
    })
}

const restaurarPassword = async(req,res) => {

    //Validar el formulario
    await check('password').isLength({min:6}).withMessage('Minimo 6 caracteres').run(req);

    let resultado = validationResult(req);
    if(!resultado.isEmpty()){
        return res.render('auth/reset-password',{
            pagina: "Restaurar Password",
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    const {password} = req.body;
    const {token} = req.params;

    //Identificar quien hace el cambio
    const usuario = await Usuario.findOne({where: {token}});  

    //Hashear el Nuevo Password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password,salt);
    
    usuario.token = null
    
    usuario.save();

    //Mostramos Mensaje
    res.render('auth/confirmar-cuenta',{
        pagina: "Password Reestablecido",
        mensaje: "Se reestablecio Correctamente"
    })

}

export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    confirmarEmail,
    formularioOlvidePassword,
    resetPassword,
    confirmarTokenRestauracion,
    restaurarPassword
}