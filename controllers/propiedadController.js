import { validationResult } from "express-validator"
import {Categoria,Precio, Propiedad} from "../models/index.js"
/* import Categoria from "../models/Categoria.js"
import Precio from "../models/Precio.js" */


const admin = (req,res) => {

    res.render('propiedades/admin',{
        pagina: "Mis Propiedades"
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

    const {id: usuarioID} = req.usuario;             //Recuperamos la variable global creada en el middleware ProtecionRuta, toda la info del usuario

    try {
        const propiedadGuardada = await Propiedad.create({              //Cuando realizamos un Guardado en la BD, genera una copia en una variable
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioID,
            categoriaID,
            usuarioID,
            imagen: ''
        }) 
        
    const {id} = propiedadGuardada;

    //Redireccionamos a la Ruta, todo salio OK
    res.redirect(`/propiedades/agregar-imagen/${id}`);

    } catch (error) {
        console.log(error);
    }

}

const agregarImagen = (req,res) => {

    //Validar que la Propiedad Exista

    //Validar que no este Publicada

    //Validar que la Propiedad pertenece a quien visita la Pagina
    
    res.render('propiedades/agregar-imagen',{
        pagina: "Agregar Imagen",
        csrfToken: req.csrfToken()
    })
}

export {
    admin,
    crear,
    guardar,
    agregarImagen
}