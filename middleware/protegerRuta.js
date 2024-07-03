
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

const protegerRuta = async (req,res,next) => {
    console.log('Desde el Middleware');

    //Verificar si hay un Token
    const { _token } = req.cookies;

    if(!_token){
        return res.redirect('/auth/login');
    }

    //Comprobar el Token
    try {
        
        const decoded = jwt.verify(_token, process.env.TOKEN_CLAVE)     //Verificacion del Token de los Cookies y decodifica
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

        //Almacenar el usuario al Req
        if(usuario){
            req.usuario = usuario;                                  //Crea una variable global para usarlo en todos los req.
        }else{
            return res.redirect('/auth/login');
        }

        next();                                                     //Siguiente middleware

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')    //Limpia la Cookie
    } 
}

export default protegerRuta;