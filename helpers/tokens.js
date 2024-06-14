import jwt from 'jsonwebtoken';

const generarJWT = (datos) => {
    return jwt.sign(
        {id:datos.id,nombre:datos.nombre},process.env.TOKEN_CLAVE,{expiresIn:'1d'})
}

const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32) + Math.random().toString(32).substring(2) ;

export {
    generarId,
    generarJWT
} 