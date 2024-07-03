import {exit} from 'node:process'
import categorias from './categorias.js'
/* import Categoria from '../models/Categoria.js' */
import precios from './precios.js'
/* import Precio from '../models/Precio.js' */
import usuarios from './usuarios.js';
import {Categoria,Precio, Propiedad, Usuario} from '../models/index.js';
import db from '../config/db.js'


const importarDatos = async () => {
    try {
        //Autenticar
        await db.authenticate();
        
        //Generar las Columnas (al sincronizar la BD detecta las importaciones de los modelos, crea las tablas)
        await db.sync();
        
        //Insertar Datos (crea todo los datos que estan en categorias)     
        await Promise.all([
            Categoria.bulkCreate(categorias),   //todos los datos de categorias
            Precio.bulkCreate(precios),          //todos los datos de precios
            Usuario.bulkCreate(usuarios)
        ]);

        console.log('Datos Importados Correctamente');
        exit();                 // que no tenga nada, significa q finalice exitosamente

    } catch (error) {
        console.log(error);
        exit(1);                //Que el exite tenga un 1, significa q tiene un error
    }
}

const eliminarDatos = async() => {
    try{

        //Desactivar la Reestriccion
        await Propiedad.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        /* 
        Eliminar de manera paralela el truncate de las tablas
        await Promise.all([
            Precio.destroy({where:{}, truncate:true}),
            Categoria.destroy({where:{}, truncate:true})     //Eliminando y reiniciando con el Truncate el indice del ID
            
            //db.sync({force:true}) Fuerza a Borrar TODO LOS DATOS DE LA BD y Crear de 0
       ]); */
        await Precio.destroy({where:{}, truncate:true});
        await Categoria.destroy({where:{}, truncate:true})  
        await Usuario.destroy({where:{}, truncate:true})  
        //Activar  la restriccion de foreignKey
        await Propiedad.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        //SEGUNDA FORMA DE LIMPIAR LAS TABLAS DE LOS SEED
        //await db.sync({force: true})
        console.log('Datos Eliminados Correctamente');
        exit();

    }catch(error){
        console.log(error)
        exit(1)
    }
}

//SCRIPT invoca IMPORTARDATOS
if(process.argv[2] === "-i"){
    importarDatos();
}

//SCRIPT invoca ELIMINARDATOS
if(process.argv[2] === "-e"){
    eliminarDatos();
}