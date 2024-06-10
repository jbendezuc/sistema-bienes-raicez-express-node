import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

//Crear la App
const app = express();

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended:true}) );

//Habilitar Cookie Parser
app.use( cookieParser() );    //Requerido por csurf para funcionar correctamente

//Habilitar CSRF
app.use( csrf({cookie:true}) )  //le indicamos que trabajara con cookie, estara habilitado de forma global el el project



//Conexion a la BD
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion correctamente a la BD');
} catch (error) {
    console.log(error);
}

//Habilitar Template - Engine
app.set('view engine','pug');
app.set('views', './views');

//Carpeta Publica para que reconozca todo los archivos staticos css/img/js
app.use( express.static('public') );

//Routing
app.use('/auth',usuarioRoutes);             //usar "use" permite escanear todas las rutas q inicien con use


//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen( port,() =>{
    console.log(`El Servidor esta funcionando en el puerto http://localhost:${port}`);
});