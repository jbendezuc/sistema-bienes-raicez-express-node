import express from 'express';


//Crear la App
const app = express();


//Routing
app.get('/', function(req,res){
    res.send('Informacion Texto Plano');
})

app.get('/nosotros', function(req,res){
    res.json({
        "nombre":"Jose",
        "DNI":7551
    });
})



//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port,() =>{
    console.log(`El Servidor esta funcionando en el puerto http://localhost:${port}`);
});