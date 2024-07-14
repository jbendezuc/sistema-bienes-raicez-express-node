import { validationResult } from "express-validator"
import {unlink} from "node:fs/promises"         //permite encontrar la Ruta y eliminar un archivo del DISCO DURO
import {Categoria,Precio,Propiedad} from "../models/index.js"
/* import Categoria from "../models/Categoria.js"
import Precio from "../models/Precio.js" */


const admin = async (req,res) => {

    //OBTENER EL QUERY-STRING => necesario para el paginador
        //const pagina = req.query
    const { pagina: paginaActual} = req.query;
    
    //creas una expresion para validar el Paginador
    const expresion = /^[0-9]$/;
    
    if (!expresion.test(paginaActual)) {    //si no es un numero, que redireccione
        return res.redirect('/mis-propiedades?pagina=1');
    }

    try {
        
        const {id} = req.usuario;

        //Limites y Offset para el paginador
        const limit = 10;   //limite por consulta
        const offset = ((paginaActual * limit) - limit); //cuantos registros se va a saltar para mostrar, los 10 primeros, los 20 primeros

        //Busqueda por usuario, todos los datos q le pertenecen
        /* const propiedades = await Propiedad.findAll({
            limit,
            offset,
            where:{
                usuarioID: id
            }, //INNER JOIN en SQLIZE para mostrar tablas relacionadas
            include:[
                { model: Categoria, as:'categoria' },
                { model: Precio, as:'precio' }
            ]
        }) */

        //Busqueda por usuario, todos los datos q le pertenecen
        //Busqueda de la cantida de registros que hay "COUNT"
        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
                limit,
                offset,
                where:{
                    usuarioID:id
                },
                include:[
                    {model: Categoria, as: 'categoria'},
                    {model: Precio, as: 'precio'}
                ]
            }),
            Propiedad.count({
                where:{
                    usuarioID: id
                }
            })
            
        ]);

        res.render('propiedades/admin',{
            pagina: "Mis Propiedades",
            propiedades,
            csrfToken: req.csrfToken(),
            paginas: Math.ceil( total / limit ),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit   
        })
    } catch (error) {
        console.log(error);
    }

    

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

const agregarImagen = async (req,res) => {

    //Validar que la Propiedad Exista
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id); //Busqueda por Primary Key

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la Propiedad pertenece a quien visita la Pagina
    if(req.usuario.id.toString() !== propiedad.usuarioID.toString() ){
        return res.redirect('/mis-propiedades');
    }

    res.render('propiedades/agregar-imagen',{
        pagina: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}


const almacenarImagen = async(req,res,next) => {

    //Validar que la Propiedad Exista
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id); //Busqueda por Primary Key

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este Publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la Propiedad pertenece a quien visita la Pagina
    if(req.usuario.id.toString() !== propiedad.usuarioID.toString() ){
        return res.redirect('/mis-propiedades');
    }

    try {
        console.log(req.file) //Permite leer los archivos cargados dropzone = input file

        //Almacenar la Imagen y Publicar la Propiedad
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1;

        await propiedad.save();

        next();

    } catch (error) {
        console.log(error);
    }


}

const editar = async(req,res) => {
    
    //Validar que la Propiedad Exista
    const { id } = req.params;

    //Buscar si la Propiedad Existe
    const propiedad = await Propiedad.findByPk(id); //Busqueda por Primary Key

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la Propiedad pertenece a quien visita la Pagina
    if(req.usuario.id.toString() !== propiedad.usuarioID.toString() ){
        return res.redirect('/mis-propiedades');
    }
    
    //Consultar en la BD Categoria y Precio
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    
    res.render('propiedades/editar',{
        pagina: "Editar Propiedad",
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    })

}

const guardarCambios = async(req,res) => {

    //Validacion de Formulario - Mostrar mensajes de Validacion, desde la Ruta
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        //Consultar en la BD Categoria y Precio
        const [categorias,precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

         return res.render('propiedades/editar',{
            pagina: "Editar Propiedades",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            categorias,
            precios,
            datos: req.body
        })
    }

    //Validar que la Propiedad Exista
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id); //Busqueda por Primary Key

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la Propiedad pertenece a quien visita la URL
    if(req.usuario.id.toString() !== propiedad.usuarioID.toString() ){
        return res.redirect('/mis-propiedades');
    }

    //Editar la Propiedad
    //Guardar en la tabla Propiedades
    const {titulo, descripcion, habitaciones,estacionamiento,wc,calle,lat,lng, precio: precioID, categoria: categoriaID} = req.body;

    try {
        propiedad.set({                             //METODO SET, permite ACTUALIZAR la tabla
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

        await propiedad.save();

    //Redireccionamos a la Ruta, todo salio OK
    res.redirect("/mis-propiedades");

    } catch (error) {
        console.log(error);
    }
}

const eliminar = async(req,res) => {
    
    //Validar que la Propiedad Exista
    const { id } = req.params;

    //Buscar si la Propiedad Existe
    const propiedad = await Propiedad.findByPk(id); //Busqueda por Primary Key

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Validar que la Propiedad pertenece a quien visita la Pagina
    if(req.usuario.id.toString() !== propiedad.usuarioID.toString() ){
        return res.redirect('/mis-propiedades');
    }
    
    //Eliminando la Imagen del Disco Duro
    await unlink(`public/uploads/${propiedad.imagen}`)  //Unlik se importa para poder ser usado

    //Eliminando los datos de la BD
    await propiedad.destroy();

    res.redirect('/mis-propiedades');

}

//Mostrar Propiedad AREA PUBLICA
const mostrarPropiedad = async(req,res) => {

    //Validar que la Propiedad Exista
    const {id} = req.params;

    //Buscar si la Propiedad Existe
    const propiedad = await Propiedad.findByPk(id,{include:[
            { model: Categoria, as:'categoria' },
            { model: Precio, as:'precio' }
        ]});

    if(!propiedad){
        return res.redirect('/404');
    }

    res.render('propiedades/mostrar',{
        pagina: propiedad.titulo,
        propiedad
    });
}

export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad
}