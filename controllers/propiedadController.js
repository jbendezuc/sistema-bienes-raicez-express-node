import { validationResult } from "express-validator"
import {Categoria,Precio, Propiedad} from "../models/index.js"
/* import Categoria from "../models/Categoria.js"
import Precio from "../models/Precio.js" */


const admin = (req,res) => {

    res.render('propiedades/admin',{
        pagina: "Mis Propiedades",
        barra: true
    })

}

//Formulario para Crear una nueva Propiedad
const crear = async(req,res) => {

    //Consultar en la BD Categoria y Precio
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    
    res.render('propiedades/crear',{
        pagina: "Mis Propiedades",
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })

}

//Crear una nueva Propiedad
const guardar = async(req,res) => {

    //Mostrar mensajes de Validacion, desde la Ruta
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        //Consultar en la BD Categoria y Precio
        const [categorias,precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

         return res.render('propiedades/crear',{
            pagina: "Mis Propiedades",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            categorias,
            precios,
            datos: req.body
        })
    }

    //Guardar en la tabla Propiedades
    const {titulo, descripcion, habitaciones,estacionamiento,wc,calle,lat,lng, precio: precioID, categoria: categoriaID} = req.body;

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioID,
            categoriaID
        })       
    } catch (error) {
        console.log(error);
    }

}

export {
    admin,
    crear,
    guardar
}