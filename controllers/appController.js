
import {Precio, Categoria, Propiedad} from '../models/index.js'

const inicio = async (req,res) => {

    const [categorias, precios ] = await Promise.all([
        Categoria.findAll({raw: true}),  //Permite traer datos simples para ser utilizados, pero no permite utilizar metodos con esas respuestas, categoria.save() 
        Precio.findAll({raw: true})
    ])


    res.render('inicio',{
        pagina: 'Inicio',
        categorias,
        precios
    });
}

const categoria = () => {

}

const noEncontrado = () => {

}

const buscador = () => {

}
export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}