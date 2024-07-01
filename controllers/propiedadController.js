import Categoria from "../models/Categoria.js"
import Precio from "../models/Precio.js"


const admin = (req,res) => {

    res.render('propiedades/admin',{
        pagina: "Mis Propiedades",
        barra: true
    })

}

//Formulario para Crear una nueva Propiedad
const crear = async(req,res) => {

    //Consultar Categoria y Precio
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    
    res.render('propiedades/crear',{
        pagina: "Mis Propiedades",
        categorias,
        precios
    })

}

export {
    admin,
    crear
}