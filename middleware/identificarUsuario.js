import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const identificarUsuario = async (req,res,next) => {

    //Itendificar Usuario
    const {_token} = req.cookies;               //instalar su dependecia y configurar en el index el cookie

    if(!_token){
        req.usuario = null;
        return next();
    }

    //Comprobar el Token
    try {
        const decoded = jwt.verify(_token,process.env.TOKEN_CLAVE); //Retorna la informacion dentro del token
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

        if(usuario){
            req.usuario = usuario
        }
        return next();

    } catch (error) {
        console.log(error);
        return res.clearCookie('_token').redirect('/auth/login');
    }


}

export default identificarUsuario;