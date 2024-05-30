import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

//Crear la App
const app = express();

//Habilitar Template - Engine
app.set('view engine','pug');
app.set('views', './views');

//Carpeta Publica para que reconozca todo los archivos staticos css/img/js
app.use(express.static('public'));

//Routing
app.use('/auth',usuarioRoutes);             //usar "use" permite escanear todas las rutas q inicien con use


//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port,() =>{
    console.log(`El Servidor esta funcionando en el puerto http://localhost:${port}`);
});